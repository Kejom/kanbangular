import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc, QueryDocumentSnapshot, addDoc, where } from "firebase/firestore";
import { Project } from "../models/project.model";
import { AuthService } from "./auth.service";
import { ProjectAccess } from "../models/project-access.model";

@Injectable()
export class ProjectService{

    private store: Firestore;
    private projectCollection = "projects";
    private projectAccessCollection = "projectAccesses"
    private projects: Project[] = [];
    selectedProject?: Project | null;
    projectsChanged = new Subject<Project[]>();
    selectedProjectChanged = new Subject<Project | null>();


    constructor(private firebaseService: FirebaseService, private authService: AuthService) {
        this.store = firebaseService.getStorage();
        this.initProjects();
    }

    async getProjects() {
        if(this.authService.isAdmin() || this.authService.isDevops())
            return this.projects.slice();
        return this.getProjectsByAccess()
    }



    private async getProjectsByAccess(){
        let userId = this.authService.loggedUser?.id;

        if(!userId)
            return [];

        let userAccesses = await this.getProjectAccessByUserId(userId);
        let projectIds = userAccesses.map(a => a.projectId);
        return this.projects.filter(p =>  projectIds.includes(p.id));
    }

    async initProjects() {
        const q = query(collection(this.store, this.projectCollection));
        const snapshot = await getDocs(q);

        snapshot.forEach(doc => {
            this.projects.push(this.convert(doc));
        })
        this.triggerProjectsChanged();
    }

    async addProject(project: Project) {
        const projectRef = await addDoc(collection(this.store, this.projectCollection), project);
        project.id = projectRef.id;
        this.projects.push(project);
        this.triggerProjectsChanged();
    }

    async removeProject(projectId: string) {
        let projectRef = doc(this.store, this.projectCollection, projectId);
        await deleteDoc(projectRef);
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.triggerProjectsChanged();
    }

    async getProjectAccessByUserId(userId: string){
        const q = query(collection(this.store, this.projectAccessCollection), where('userId', '==', userId));
        const snapshot = await getDocs(q);
        let accesses: ProjectAccess[] = [];
        snapshot.forEach(doc => {accesses.push(doc.data() as ProjectAccess)});
        return accesses;
    }

    async getProjectAccessByProjectId(projectId: string){
        const q = query(collection(this.store, this.projectAccessCollection), where('projectId', '==', projectId));
        const snapshot = await getDocs(q);
        let accesses: ProjectAccess[] = [];
        snapshot.forEach(doc => {accesses.push(doc.data() as ProjectAccess)});
        return accesses;
    }

    async addProjectAccess(projectAccess: ProjectAccess){
         await addDoc(collection(this.store, this.projectAccessCollection), projectAccess);
    }

    async removeProjectAccess(projectAccess: ProjectAccess){
        const q = query(collection(this.store, this.projectAccessCollection), where('userId', '==', projectAccess.userId), where('projectId', '==', projectAccess.projectId));
        const snapshot = await getDocs(q);

        snapshot.forEach(doc => deleteDoc(doc.ref));
    }

    selectProject(projectId: string) {
        let project = this.projects.find(p => p.id === projectId);

        if (!project)
            return;

        this.selectedProject = project;
        this.selectedProjectChanged.next(this.selectedProject);

    }

    deselectProject(){
        this.selectedProject = null;
        this.selectedProjectChanged.next(this.selectedProject);
    }

    private async triggerProjectsChanged() {
        let projects = await this.getProjects()
        this.projectsChanged.next(projects);
    }


    private convert(doc: QueryDocumentSnapshot): Project {
        let project = doc.data() as Project;
        project.id = doc.id;
        return project;
    }
}
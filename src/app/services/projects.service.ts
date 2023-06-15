import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc, QueryDocumentSnapshot, addDoc } from "firebase/firestore";
import { Project } from "../models/project.model";
import { AuthService } from "./auth.service";

@Injectable()
export class ProjectService{

    private store: Firestore;
    private projectCollection = "projects";
    private projects: Project[] = [];
    selectedProject?: Project;
    projectsChanged = new Subject<Project[]>();
    selectedProjectChanged = new Subject<Project | null>();


    constructor(private firebaseService: FirebaseService, private authService: AuthService) {
        this.store = firebaseService.getStorage();
        this.initProjects();
    }

    getProjects() {
        return this.projects.slice();
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

    selectProject(projectId: string) {
        let project = this.projects.find(p => p.id === projectId);

        if (!project)
            return;

        this.selectedProject = project;
        this.selectedProjectChanged.next(this.selectedProject);

    }

    private triggerProjectsChanged() {
        this.projectsChanged.next(this.projects.slice());
    }


    private convert(doc: QueryDocumentSnapshot): Project {
        let project = doc.data() as Project;
        project.id = doc.id;
        return project;
    }
}
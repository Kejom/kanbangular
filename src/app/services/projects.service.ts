import {Injectable} from "@angular/core"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { Project } from "../models/project.model";
import { AuthService } from "./auth.service";

@Injectable()
export class ProjectService{

    private store: Firestore;
    private projectCollection = "projects";

    constructor(private firebaseService: FirebaseService, private authService: AuthService){
        this.store = firebaseService.getStorage();
    }

    async getProjects(){
        const q = query(collection(this.store, this.projectCollection));
        const snapshot = await getDocs(q);
        let projects: Project[] = [];

        snapshot.forEach(doc => {
            projects.push(this.convert(doc));
        })

        return projects;
    }

    private convert(doc:  QueryDocumentSnapshot): Project {
        let project = doc.data() as Project;
        project.id = doc.id;
        return project;
    }

}
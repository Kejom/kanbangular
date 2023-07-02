import { Injectable } from "@angular/core"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc, addDoc, where  } from "firebase/firestore";
import { Task } from "../models/task.model";


@Injectable()
export class TasksService {

    private store: Firestore;
    private tasksCollection = "tasks"

    constructor(private firebaseService: FirebaseService) { 
        this.store = firebaseService.getStorage();
    }

    async getByFeatureId(featureId: string){
        const q = query(collection(this.store, this.tasksCollection), where('featureId', '==', featureId));
        const snapshot = await getDocs(q);
        let tasks: Task[] = [];

        snapshot.forEach(doc => {
            let task = doc.data() as Task;
            task.id = doc.id;
            tasks.push(task);
        })

        return tasks;
    }

    async getByProjectId(projectId: string){
        const q = query(collection(this.store, this.tasksCollection), where('projectId', '==', projectId));
        const snapshot = await getDocs(q);
        let tasks: Task[] = [];

        snapshot.forEach(doc => {
            let task = doc.data() as Task;
            task.id = doc.id;
            tasks.push(task);
        })

        return tasks;
    }

    async get(taskId: string){
        let taskRef = doc(this.store, this.tasksCollection, taskId);
        let snapshot = await getDoc(taskRef);
        let task = snapshot.data() as Task;
        task.id = snapshot.id;
        return task;
    }

    async add(task: Task){
        let taskRef = await addDoc(collection(this.store, this.tasksCollection), task);
        task.id = taskRef.id;
        return task;
    }

    async edit(task: Task){
        let taskRef = doc(this.store, this.tasksCollection, task.id);
        await setDoc(taskRef, task);
    }

    async remove(taskId: string){
        let taskRef = doc(this.store, this.tasksCollection, taskId);
        await deleteDoc(taskRef);
    }


}
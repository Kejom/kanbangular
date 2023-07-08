import { Injectable } from "@angular/core"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc, where } from "firebase/firestore";
import { User } from "../models/user.model";
import { ProjectAccess } from "../models/project-access.model";

@Injectable()
export class UsersService{
    private storage: Firestore;
    private usersCollection = "users";
    private projectAccessCollection = "projectAccesses"
    private userCache: {[id: string]: User} = {}

    constructor(private firebaseService: FirebaseService){
        this.storage = firebaseService.getStorage();
    }

    async getUsers(){
        const q = query(collection(this.storage, this.usersCollection));
        const snapshot = await getDocs(q);
        let users: User[] = [];
        
        snapshot.forEach((doc) => {
            users.push(doc.data() as User);
        })

        return users;
    }

    async getUser(id: string){
        if(this.userCache[id])
            return this.userCache[id];

        let userRef = doc(this.storage, this.usersCollection, id);
        let snapshot = await getDoc(userRef);
        let user = snapshot.data() as User;
        user.id = snapshot.id;
        this.userCache[user.id] = user;
        return user
    }

    async getUsersByProjectId(projectId: string){
        const q = query(collection(this.storage, this.projectAccessCollection), where('projectId', '==', projectId));
        const snapshot = await getDocs(q);
        let accesses: ProjectAccess[] = [];
        snapshot.forEach(doc => { accesses.push(doc.data() as ProjectAccess) });
        let users: User[] = [];

        for (let i = 0; i< accesses.length; i++) {
            let userId = accesses[i].userId;
            let user = await this.getUser(userId);
            users.push(user);
        }

        return users;
    }

    async updateUser(user: User){
        let userRef = doc(this.storage, this.usersCollection, user.id);
        await setDoc(userRef, user);
        this.userCache[user.id] = user;
    }

    async removeUser(id: string){
        let userRef = doc(this.storage, this.usersCollection, id);
        await deleteDoc(userRef);
        delete this.userCache[id];
    }
}
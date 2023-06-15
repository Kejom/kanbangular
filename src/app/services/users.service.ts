import { Injectable } from "@angular/core"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { User } from "../models/user.model";

@Injectable()
export class UsersService{
    private storage: Firestore;
    private usersCollection = "users";

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
        let userRef = doc(this.storage, this.usersCollection, id);
        let snapshot = await getDoc(userRef);
        return snapshot.data() as User;
    }

    async updateUser(user: User){
        let userRef = doc(this.storage, this.usersCollection, user.id);
        await setDoc(userRef, user);
    }

    async removeUser(id: string){
        let userRef = doc(this.storage, this.usersCollection, id);
        await deleteDoc(userRef);
    }
}
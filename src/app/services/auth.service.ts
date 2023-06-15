import { Injectable} from "@angular/core"
import {Subject} from "rxjs"
import { FirebaseService } from "./firebase.service";
import { Auth, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { FirebaseApp } from "firebase/app";
import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../models/user.model";
import { LoginData } from "../models/login-data.model";

@Injectable()
export class AuthService{
    private app: FirebaseApp;
    private auth: Auth;
    private provider: GoogleAuthProvider;
    private storage: Firestore;
    loggedUser: User | null = null;
    private usersCollection = "users";

    authChange = new Subject<boolean>();
    

    constructor(private firbaseService: FirebaseService){
        this.app = firbaseService.getApp();
        this.auth = getAuth(this.app);
        this.provider = new GoogleAuthProvider();
        this.storage = firbaseService.getStorage();
        this.handleAuthStateChange();
    }

    async registerUser(user: User, password: string){
        let userCredentials = await createUserWithEmailAndPassword(this.auth, user.email, password);
        console.log(userCredentials)
        console.log(userCredentials.user.uid)
        user.id = userCredentials.user.uid;

        let userRef = doc(this.storage, this.usersCollection, user.id);
        await setDoc(userRef, user);
        let snapshot = await getDoc(userRef);
        this.loggedUser = snapshot.data() as User;
        this.authChange.next(true);
    }

    async loginUser(loginData: LoginData){
        await signInWithEmailAndPassword(this.auth, loginData.email, loginData.password);
    }

    async logout(){
        await signOut(this.auth);
    }

    async handleAuthStateChange(){
        onAuthStateChanged(this.auth, async (user) => {
            if(!user){
                this.loggedUser = null;
                this.authChange.next(false);
                return;
            }

            this.loggedUser = await this.getUser(user.uid);
            this.authChange.next(true);
        })
    }

    isAdmin(){
        if(this.loggedUser)
            return this.loggedUser.role === "admin";
        return false;
    }

    isDevops(){
        if(this.loggedUser)
            return this.loggedUser.role === "devops" || this.loggedUser.role === "admin";
        return false;
    }


    private async getUser(uid: string): Promise<User>{
        let userRef = doc(this.storage, this.usersCollection, uid);
        let snapshot = await getDoc(userRef);
        return snapshot.data() as User;
    }


}
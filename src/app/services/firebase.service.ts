import {FirebaseApp, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
export class FirebaseService{

    private firebaseConfig = {
        apiKey: "AIzaSyDR1S4Mr6RP8QOoO2agEhdnfkNhRTUm2o4",
        authDomain: "kanbangular-fbb01.firebaseapp.com",
        projectId: "kanbangular-fbb01",
        storageBucket: "kanbangular-fbb01.appspot.com",
        messagingSenderId: "688096019242",
        appId: "1:688096019242:web:60c221aacd8b12c2b41453"
      };

    private app: FirebaseApp;

    constructor(){
        this.app = initializeApp(this.firebaseConfig);
    }

    getStorage(){
        return getFirestore(this.app)
    }

    getApp(){
        return this.app;
    }

}
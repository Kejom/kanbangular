import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { FirebaseService } from "./firebase.service";
import { Firestore, collection, getDocs, query, doc, getDoc, setDoc, deleteDoc, addDoc, where  } from "firebase/firestore";
import { Feature } from "../models/feature.model";


@Injectable()
export class FeatureService{
    private store: Firestore;
    private featureCollection = "features";
    private features: Feature[] = [];

    featuresChanged = new Subject<Feature[]>();

    constructor(private firebaseService: FirebaseService){
        this.store = firebaseService.getStorage();
    }

    async initFeaturesForProject(projectId: string){
        this.features = await this.getFeaturesByProjectId(projectId);
        this.triggerFeaturesChanged();
    }

    async getFeature(featureId: string){
        let featureRef = doc(this.store, this.featureCollection, featureId);
        let snapshot = await getDoc(featureRef);
        let feature = snapshot.data() as Feature;
        feature.id = snapshot.id;
        return feature;
    }

    async addFeature(feature: Feature){
        let featureRef = await addDoc(collection(this.store, this.featureCollection), feature);
        feature.id = featureRef.id;
        this.features.push(feature);
        this.triggerFeaturesChanged();
    }

    async updateFeature(feature: Feature){
        let featureRef = doc(this.store, this.featureCollection, feature.id);
        await setDoc(featureRef, feature);

        let indexOfFeature = this.features.findIndex(f => f.id === feature.id);
        if(indexOfFeature < 0)
            return;
        
        this.features[indexOfFeature] = feature;
        this.triggerFeaturesChanged();
    }

    async removeFeature(featureId: string){
        let featureRef = doc(this.store, this.featureCollection, featureId);
        await deleteDoc(featureRef);
        this.features = this.features.filter(f => f.id !== featureId);
        this.triggerFeaturesChanged();
    }

    private async getFeaturesByProjectId(projectId: string){
        const q = query(collection(this.store, this.featureCollection), where('projectId', '==', projectId));
        const snapshot = await getDocs(q);
        let features: Feature[] = [];

        snapshot.forEach(doc => {
            let feature = doc.data() as Feature;
            feature.id = doc.id;
            features.push(feature);
        })

        return features;
    }

    private triggerFeaturesChanged(){
        this.featuresChanged.next(this.features.slice());
    }
}
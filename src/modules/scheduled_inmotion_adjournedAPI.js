import { db } from "./firebaseConfig.js";
import { ref, push, update, onValue, remove } from "firebase/database";

const baseUrl = "https://model-united-nations-4a5ad-default-rtdb.europe-west1.firebasedatabase.app/subjects";

export async function addingSubject(subject, category){
    const newSubject = {
        subject,
        category,
        status: 'Scheduled',
        parties: 'Not yet assigned',
        resolution: 'To be drafted',
        attachment: 'none'
        // no categories yet, it will be specified in the front end
    }
    const url = baseUrl + '.json';

    const options={
        method: 'POST',
        body: JSON.stringify(newSubject),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const resp = await fetch(url, options)
    const data = await resp.json()
    if(!resp.ok){
        throw new Error(resp.statusText);
    }
    return data;
}

export async function getAllSubjects(){
    const url = baseUrl + '.json';

    const response = await fetch(url);
    const subjects = await response.json();

    // this is for showing it in the Column, you convert it to array, otherwise the function you passed to others Divs wont work,
    const subjectsArray = Object.keys(subjects).map(key => ({
        id: key, 
        subject: subjects[key].subject, 
        parties: subjects[key].parties, 
        status: subjects[key].status, 
        resolution: subjects[key].resolution,
        category: subjects[key].category
    }));

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return subjectsArray;
}

export async function patchSubject(firebaseID, status, parties, resolution) {
    const url = baseUrl + `/${firebaseID}.json`;
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ status, parties, resolution}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return {id:firebaseID, ...data};
}


export async function removeSubject(firebaseID){
    const url = baseUrl + `/${firebaseID}.json`;
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return data;
}
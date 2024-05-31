import { useEffect, useState } from "react";
import { patchSubject } from "../modules/scheduled_inmotion_adjournedAPI";
import MUNScheduledCard from "./MUNScheduledCard";

function MUNInMotionsDiv({ passedAllSubjects, passedRefreshData }) {

    const [status, setStatus] = useState('')
    const [resolution, setResolution] = useState('')

    async function addIt(event) { // here is when the action starts, when the button hit, 
        //the handleChange changes will be passed here through the use of the previous useState
        event.preventDefault()
        console.log(subject, category);
        await addingSubject(subject, category)
        setSubject('')
        setCategory('')
        event.target.reset()
        passedRefreshData()
    } //sorteringen i module för att dela upp todos.

    async function patchIt(firebaseID, parties) {
        const tempResolution = prompt('Write resolution type: Legally-binding or Non-binding')
        //parties here will already be the ones that the user assigned above
        console.log(tempResolution);
        setStatus('Adjourned')
        console.log(status);
        if (tempResolution === "Legally-binding" || tempResolution === "Non-binding" ) {
            await patchSubject(firebaseID, 'Adjourned', parties, tempResolution)
        
        } else {
            return
        }
        //firebaseID, status, parties, resolution
        passedRefreshData();

    }

    //create components for the map (motion card)
    //it will pass the firebaseID as props
    //move patch it function into the compenent so thatyou can use that firebaseID prop is the patchIt function

    return (<div class="column inMotionsColumn"> 
        <h2 id="textAlignCenter">In Motions</h2>

        {passedAllSubjects.filter((subjects) => subjects.status === "In Motions").map((subjects) => (

            <div key={subjects.id}>

                <div id="cards" className={subjects.category}>
                    <h4>{subjects.subject}</h4>
                    <p>Raised by {subjects.parties}</p>
                    <p>Status: Ongoing </p>
                    <p>Resolution {subjects.resolution}</p>

                    <p><button className="button" onClick={() => patchIt(subjects.id)}>Adjourn</button></p>
                </div>
            </div>)
        )}

    </div>);
}

export default MUNInMotionsDiv;

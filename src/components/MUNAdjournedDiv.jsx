import { useEffect, useState } from "react";
import { removeSubject } from "../modules/scheduled_inmotion_adjournedAPI";
import MUNScheduledCard from "./MUNScheduledCard";

function MUNAdjournedDiv({ passedAllSubjects, passedRefreshData }) {

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

    async function patchIt(firebaseID) {
        const tempConfirmation = prompt('Are you sure you want to move this case to Archive? You will not see this in you planbook anymore. Yes/No')
        //parties here will already be the ones that the user assigned above
        console.log(tempConfirmation);

        //firebaseID, status, parties, resolution
        if (tempConfirmation === "Yes") {
            await removeSubject(firebaseID)
        } else {
            return
        }
        passedRefreshData();

    }

    return (<div className="column adjournedColumn">
        <h2 id="textAlignCenter">Adjourned</h2>

        {passedAllSubjects.filter((subjects) => subjects.status === "Adjourned").map((subjects) => (

            <div key={subjects.id}>

                <div id="cards" className={subjects.category}>
                    <h4>{subjects.subject}</h4>
                    <p>Status: {subjects.status}</p>
                    <p>Motions sealed by {subjects.parties}</p>
                    
                    <p>{subjects.resolution}</p>

                    <p><button className="button" onClick={() => patchIt(subjects.id)}>Move to Archives</button></p>
                </div>
            </div>)
        )}

    </div>);
}

export default MUNAdjournedDiv;


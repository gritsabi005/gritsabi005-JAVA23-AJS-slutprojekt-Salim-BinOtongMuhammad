import { useEffect, useState } from "react";
import { patchSubject } from "../modules/scheduled_inmotion_adjournedAPI";
import MUNScheduledCard from "./MUNScheduledCard";


function MUNScheduledDiv({ passedAllSubjects, passedRefreshData }) {

    const [parties, setParties] = useState('')
    const [status, setStatus] = useState('')
    const [resolution, setResolution] = useState('')

    let tempParties = '' // you use this for clearing the UI purpose


    function whenWritten(event) { // any change in the UI is processed here
        tempParties = event.target.value;
        setParties(tempParties)
    }

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
        const tempParties = prompt('Write parties concerned')
        //parties here will already be the ones that the user assigned above
        console.log(tempParties);
        setParties(tempParties)
        console.log(parties);
        setStatus('In Motions')
        console.log(status);
        setResolution('Drafted')
        console.log(resolution);
        //firebaseID, status, parties, resolution

        if (tempParties === null || tempParties.trim() === "") {
            return; 
        }
        
        await patchSubject(firebaseID, 'In Motions', tempParties, 'Drafted')
        console.log(parties, status, resolution);
        passedRefreshData();

    }

    //create components for the map (motion card)
    //it will pass the firebaseID as props
    //move patch it function into the compenent so thatyou can use that firebaseID prop is the patchIt function

    return (<div className="column scheduledColumn"> 
        <h2 id="textAlignCenter">Scheduled</h2>

            {passedAllSubjects.filter((subjects) => subjects.status === "Scheduled").map((subjects) => (

                <div key={subjects.id} >
                    <div id="cards" className={subjects.category}>
                        <h4>{subjects.subject}</h4>
                        <p>Status: On {subjects.status} </p>
                        <p>Awaiting assigned parties</p>

                        <p><button className="button" onClick={() => patchIt(subjects.id)}>Start Motion</button></p>

                    </div>
                </div>)
            )}

    </div>);
}

export default MUNScheduledDiv;


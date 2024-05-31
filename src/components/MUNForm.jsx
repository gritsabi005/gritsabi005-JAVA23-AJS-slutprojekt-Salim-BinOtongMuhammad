import { useEffect, useState } from "react";
import { addingSubject } from "../modules/scheduled_inmotion_adjournedAPI.js";

function MUNForm({ passedAllSubjects, passedRefreshData }) {

    const [subject, setSubject] = useState('')
    const [category, setCategory] = useState('')

    let tempSubject = '' // you use this for clearing the UI purpose
    let tempCategory = ''

    function whenWritten(event) { // any change in the UI is processed here
        tempSubject = event.target.value;
        tempCategory = event.target.value
        if (event.target.id === "subject") {
            setSubject(tempSubject)
        } else if (event.target.id === "category") {
            setCategory(tempCategory)
        }
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

    return (
        <form id="MUNForm" onSubmit={addIt}>
            <p id="whiteit">|</p>
            <h1 id="centerIt">Model United Nations</h1>
            <p id="whiteit">|</p>
            <div id="centerIt" className="marginIt">
                <input type="text" id="subject" placeholder="Write case" onChange={whenWritten} required></input>
                <select id="category" onChange={whenWritten} required>
                    <option disabled selected>Choose category</option>
                    <option value="WHO">WHO</option>
                    <option value="UNSC">UNSC</option>
                    <option value="UNICEF">UNICEF</option>
                    <option value="UNGA">UNGA</option>
                </select>
                <button>Schedule</button>
            </div>
            <div id="columnIt">
                <div className="box WHO">WHO</div>
                <div className="box UNSC">UNSC</div>
                <div className="box UNICEF">UNICEF</div>
                <div className="box UNGA">UNGA</div>
            </div>
        </form>
    );
}

export default MUNForm;

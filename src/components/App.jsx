import { useEffect, useState } from "react";
import Header from "./Header";
import MUNForm from "./MUNForm";
import { getAllSubjects } from "../modules/scheduled_inmotion_adjournedAPI";
import MUNScheduledDiv from "./MUNScheduledDiv";
import MUNInMotionsDiv from "./MUNInMotionsDiv";
import MUNAdjournedDiv from "./MUNAdjournedDiv";
import Error from "./Error";
import Loading from "./Loading";


export function App() {

    const [allSubjects, setAllSubjects] = useState([])
    const [status, setStatus] = useState('')

    const baseUrl = "https://model-united-nations-4a5ad-default-rtdb.europe-west1.firebasedatabase.app/subjects";

    async function refreshData() {
        const data = await getAllSubjects() // you dont have to specify the url here because you passed it from the scheduled_inmotion_adjourned.js class
        setAllSubjects(data)
    }

    useEffect(() => {
        setStatus('loading')
        refreshData()
            .then(setStatus('success'))
            .catch(() => {
                setStatus('error');
            })
    }, [])


    return (<>
        <div className="mun-form-wrapper">
            <MUNForm passedAllSubjects={allSubjects} passedRefreshData={refreshData} />
        </div>

        {status === 'error' && <Error />}
        {status === 'loading' && <Loading />}



        <div className="content">
            {status === 'success' && <MUNScheduledDiv passedAllSubjects={allSubjects} passedRefreshData={refreshData} />}
            {status === 'success' && <MUNInMotionsDiv passedAllSubjects={allSubjects} passedRefreshData={refreshData} />}
            {status === 'success' && <MUNAdjournedDiv passedAllSubjects={allSubjects} passedRefreshData={refreshData} />}
        </div>
    </>);
}

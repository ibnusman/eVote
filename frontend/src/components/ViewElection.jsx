import axios from "axios";
import React,{useEffect, useState} from "react";


export const ViewElection = () =>{
    const [elections,setElections] = useState("")


  useEffect(()=>{
const fatchElection = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/api/dashboard/electionList")
            console.log(response.data);
            setElections(response.data)

        } catch (error) {
            console.log(error)
        }
        
    }

fatchElection();
},[]);


    return(
        <>
        <p> {elections.length} elections loaded  </p>
        
        </>
    )
}

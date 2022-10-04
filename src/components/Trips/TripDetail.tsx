import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db"
import { useParams } from "react-router-dom";

export default function TripDetail(){
    const params = useParams<any>();
    const { id } = params;
    const { getByID } = useIndexedDB("trips");
    const [data, setData] = useState(null);

    useEffect(() => {
        getByID(parseInt(id)).then(res => {
            setData(res)
        })
    }, []);
    
    return(
        <>123</>
    )
}
import { useQuery } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {LOAD_COUNTRIES} from '../GraphQL/Queries';

export default function GetCountries() {
    // eslint-disable-next-line no-unused-vars
    const {error, loading, data} = useQuery(LOAD_COUNTRIES);
    const [capitals, setCapitals] = useState(null);

    useEffect(() => {
        if (data){
            setCapitals(data['countries']);
        }
    }, [data]);

    return (
        <div>
            {" "}
            { capitals && capitals.map((val) => {
                return <h1> { val['capital'] }</h1>;
            })}
        </div>
    );
}
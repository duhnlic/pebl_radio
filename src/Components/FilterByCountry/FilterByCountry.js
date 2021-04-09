import {useState, useEffect} from 'react';

export default function FilterByCountry({handleCountryChange}){
    const [results, setResults] = useState([]);
    const apiKey = process.env.REACT_APP_STATION_KEY;

    const getCountries = async () =>{

        try{ 
            const res = await fetch("https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?countries=", {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-key":`${apiKey}`,
		        "x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com"
                }
            });
            const data = await res.json();
            setResults(data.results);
	    } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{

        getCountries();
      },[]);   

    return(
        <div className="ResultCountry">
            
            <label htmlFor="Country">Country</label>
            <select name="Country"  id="result-country" onChange={handleCountryChange}>
                {results.map((stationObject) =>{
                    return(
                        <option key={stationObject.i}>{stationObject.code}</option>

                    )})}
            </select>
        </div>
    )
}
import {useState, useEffect} from 'react';

export default function FilterByGenre({handleGenreChange}){
    const [results, setResults] = useState([]);
    const apiKey = process.env.REACT_APP_STATION_KEY;

    const getCountries = async () =>{

        try{ 
            const res = await fetch("https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?categories=1", {
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
        <div className="ResultGenre">
            <label htmlFor="Genre">Genre</label>
            <select name="Genre" id="result-genre" onChange={handleGenreChange}>
                {results.map((stationObject)=>{
                    return(
                            <option key={stationObject.i}>{stationObject.c}</option>
                    )})}
            </select>
        </div>
    )
}
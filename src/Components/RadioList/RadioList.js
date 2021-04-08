const RadioList = ({results}) =>{
    // console.log(JSON.stringify(results, null, 2));
    // return early if there are no stations
    if (!results.length){
        return <h2>No Stations Matching That Description</h2>
    }

    return(
        <div className="stations-gallery">
            {results.map((stationObject, x) =>{
                if (x < 50){
                return(
                <div key={stationObject.i} className="station">
                    <div>
                        <button type="submit">

                        </button>
                    </div>
                    <div>
                        <h3>{stationObject.n}</h3>
                        <p>{stationObject.g}</p>
                        <p>{stationObject.c}</p>
                        <img src={stationObject.l} alt="station-logo"></img>
                        <hr />
                    </div>
                </div>
            )}})}

        </div>
    )
}

export default RadioList;
const RadioList = ({results}) =>{
    console.log(results);
    // return early if there are no stations
    if (!results.length){
        return <h2>No Stations Matching That Description</h2>
    }

    return(
        <div className="staions-gallery">
            {results.map(station =>(
                <div key={station.id} className="station">
                    <button type="submit">

                    </button>

                </div>
            ))}

        </div>
    )
}

export default RadioList;
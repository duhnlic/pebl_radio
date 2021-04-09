import play from '../../shared/play_push_icon.svg'
import radio from '../../shared/radio_icon2.svg'

const RadioList = ({results, setCurrentMedia, setCurrentStation}) =>{
    // console.log(JSON.stringify(results, null, 2));
    // return early if there are no stations
    if (!results.length){
        return <h2>Welcome to Stewdio Radio</h2>
    }

    return(
        <div className="stations-gallery">
            {results.map((stationObject, x) =>{
                if (x < 50){
                return(
                <div key={stationObject.i} className="station">
                    <div className="radio-list">
                        <h3>{stationObject.n}</h3>
                        <p>{stationObject.g}</p>
                        <p>{stationObject.c}</p>
                        <img src={radio} height="30" width="30" alt="station-logo"></img>
                        <hr />
                    </div>
                    <div>
                        <button 
                        onClick={() => 
                            setCurrentMedia(stationObject.u)
                            // setCurrentStation(stationObject.n)
                        }>
                            <img src={play} height="30px" width="30px" className="play-pause" alt="Play/Pause" />
                        </button>
                    </div>
                </div>
            )}})}

        </div>
    )
}

export default RadioList;

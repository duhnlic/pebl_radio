import play from '../../shared/play_push_icon.svg'
import radio from '../../shared/radio_icon2.svg'
import NavBar from '../NavBar/NavBar'
export default function CuratedStations({stations, setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setCurrentId, setTrue}){


    if (stations === undefined || !stations.length){
        return <h2>ERROR ERROR ERROR</h2> 
    }
    return(
        <div>
            <NavBar/>
            <div className="stations-gallery">
            {stations.map((stationObject, x) =>{
                if (x < 2000){
                return(
                <div key={stationObject.i} className="station">
                    <div className="radio-list">
                        <h3>{stationObject.name}</h3>
                        <p>{stationObject.genre}</p>
                        <p>{stationObject.country}</p>
                        <img src={radio} height="50" width="50" alt="station-logo"></img>
                    </div>
                    <div  className="radio-button">
                        <button 
                        onClick={() => { 
                                setCurrentMedia(stationObject.url)
                                setCurrentStation(stationObject.name)
                                setCurrentCountry(stationObject.country)
                                setCurrentGenre(stationObject.genre)
                                setCurrentId(stationObject._id)
                                setTrue()
                            }
                        }>
                            <img src={play} height="30px" width="30px" className="play-pause" alt="Play/Pause" />
                        </button>
                    </div>
                </div>
            )}})}

        </div>
        </div>
        )

}
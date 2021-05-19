import play from '../../shared/play_push_icon.svg'
import radio from '../../shared/radio_icon2.svg'


const RadioList = ({ results, setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setCurrentId, setPlayPause, setTrue}) =>{
    // console.log(JSON.stringify(results, null, 2));
    // return early if there are no stations
    if (results === undefined || !results.length){

        return (
            <div className="top-pick-gallery">
                <div>
                    <div className="welcome">
                            <h2 className="welcome-message">This Month's Top Picks</h2>
                    </div>
                    <div className="top-pick">
                        <div className="welcome">
                            <h3 className="">Soma FM: Beat Blender</h3>
                            <p>US</p>
                            <p>Downtempo & Deep House</p>
                            <img src={radio} height="30" width="30" alt="station-logo"></img>
                        </div>
                        <div  className="radio-button">
                            <button 
                                onClick={() => { 
                                        setCurrentMedia('http://ice1.somafm.com/beatblender-128-mp3')
                                        setCurrentStation('Soma FM: Beat Blender')
                                        setCurrentCountry('US')
                                        setCurrentGenre('Downtempo & Deep House')
                                        setCurrentId()
                                        setTrue()
                                    }
                                }>
                                <img src={play} height="30px" width="30px" className="play-pause" alt="Play/Pause" />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="top-pick">
                        <div className="welcome">
                            <h3 className="">Acid Jazz FM</h3>
                            <p>US</p>
                            <p>Jazz & World</p>
                            <img src={radio} height="30" width="30" alt="station-logo"></img>
                        </div>
                        <div  className="radio-button">
                            <button 
                                onClick={() => { 
                                        setCurrentMedia('http://79.111.14.76:8002/acidjazz')
                                        setCurrentStation('Acid Jazz FM')
                                        setCurrentCountry('US')
                                        setCurrentGenre('Jazz & World')
                                        setCurrentId()
                                        setTrue()
                                    }
                                }>
                                <img src={play} height="30px" width="30px" className="play-pause" alt="Play/Pause" />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="top-pick">
                        <div className="welcome">
                            <h3 className="">From Left Field</h3>
                            <p>US</p>
                            <p>Jazz & World</p>
                            <img src={radio} height="30" width="30" alt="station-logo"></img>
                        </div>
                        <div  className="radio-button">
                            <button 
                                onClick={() => { 
                                        setCurrentMedia('http://79.120.39.202:8002/leftfield')
                                        setCurrentStation('From Left Field')
                                        setCurrentCountry('US')
                                        setCurrentGenre('Jazz & World')
                                        setCurrentId()
                                        setTrue()
                                    }
                                }>
                                <img src={play} height="30px" width="30px" className="play-pause" alt="Play/Pause" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="stations-gallery">
            {results.map((stationObject, x) =>{
                if (x < 500){
                return(
                <div key={stationObject.i} className="station">
                    <div className="radio-list">
                        <h3>{stationObject.name}</h3>
                        <p>{stationObject.tags}</p>
                        <p>{stationObject.country}</p>
                        <img src={!stationObject.favicon ? radio : stationObject.favicon} height="50" width="50" alt="station-logo"></img>
                    </div>
                    <div  className="radio-button">
                        <button 
                        onClick={() => { 
                                setCurrentMedia(stationObject.url_resolved)
                                setCurrentStation(stationObject.name)
                                setCurrentCountry(stationObject.country)
                                setCurrentGenre(stationObject.tags)
                                setTrue()
                            }
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

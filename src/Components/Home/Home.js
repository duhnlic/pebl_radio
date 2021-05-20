import UserSearchBar from '../UserSearchBar/UserSearchBar'
import RadioList from '../RadioList/RadioList'
import NavBar from '../NavBar/NavBar'


export default function Home({setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setCurrentId, setCurrentFavicon, results, setPlayPause, setTrue, setFalse, handleChange, handleSubmit, searchString, handleCountryChange, handleGenreChange}){

    return(
        <div>
            <NavBar/>
            <center>
            <UserSearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}            
            />
            {/* <p className="disclaimer">DISCLAIMER: Pebl Radio is not responsible for broken links from station providers.</p> */}
          <div className="station-gallery">
            <RadioList
          setCurrentMedia={setCurrentMedia}
          setCurrentStation={setCurrentStation}
          setCurrentCountry={setCurrentCountry}
          setCurrentGenre={setCurrentGenre}
          setCurrentId={setCurrentId}
          setCurrentFavicon={setCurrentFavicon}
          results={results}
          setPlayPause={setPlayPause}
          setTrue={setTrue}
          setFalse={setFalse}        
            />
            </div>
            </center>  
        </div>
    )

}
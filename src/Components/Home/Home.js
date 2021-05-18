import UserSearchBar from '../UserSearchBar/UserSearchBar'
import RadioList from '../RadioList/RadioList'
import NavBar from '../NavBar/NavBar'

export default function Home({setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setCurrentId, results, setPlayPause, setTrue, handleChange, handleSubmit, searchString, handleCountryChange, handleGenreChange}){

    return(
        <div>
            <NavBar/>
            <UserSearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}            
            />
            <p className="disclaimer">DISCLAIMER: Pebl Radio is not responsible for broken links from station providers.</p>
            <RadioList
          setCurrentMedia={setCurrentMedia}
          setCurrentStation={setCurrentStation}
          setCurrentCountry={setCurrentCountry}
          setCurrentGenre={setCurrentGenre}
          setCurrentId={setCurrentId}
          results={results}
          setPlayPause={setPlayPause}
          setTrue={setTrue}        
            />
        </div>
    )

}
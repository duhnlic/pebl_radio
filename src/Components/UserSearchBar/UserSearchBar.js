import FilterByCountry from '../FilterByCountry/FilterByCountry';
import FilterByGenre from '../FilterByGenre/FilterByGenre';
import play from '../../shared/play1.svg'

export default function UserSearchBar({ handleSubmit, handleChange, searchString, handleCountryChange, handleGenreChange }) {
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <input
          placeholder="Search"
          type="text"
          name="searchString"
          required
          onChange={handleChange}
          value={searchString}
        />
        <button type="submit">
          <img src={play} height="100px" width="150px" className="play-pause" alt="Play/Pause" />
        </button>
        <FilterByCountry handleCountryChange={handleCountryChange}/>
        <FilterByGenre handleGenreChange={handleGenreChange}/>
      </form>
    );
  }


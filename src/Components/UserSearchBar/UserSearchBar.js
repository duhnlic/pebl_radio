// import FilterByCountry from '../FilterByCountry/FilterByCountry';
// import FilterByGenre from '../FilterByGenre/FilterByGenre';
import search from '../../shared/search_icon2.svg'

export default function UserSearchBar({ handleSubmit, handleChange, searchString, handleCountryChange, handleGenreChange }) {

    return (
      <div>
      <center>
      <form onSubmit={handleSubmit} className="user-search">
        <input
          placeholder="Search"
          type="text"
          name="searchString"
          required
          onChange={handleChange}
          value={searchString}
        />
        <button type="submit" className="search-button">
          <img src={search} height="40px" width="40px" className="search" alt="search-icon" />
        </button>
        {/* <FilterByCountry handleCountryChange={handleCountryChange}/> */}
        {/* <FilterByGenre handleGenreChange={handleGenreChange}/> */}
      </form>
      </center>
      </div>
    );
  }


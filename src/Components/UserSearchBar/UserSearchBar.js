// import FilterByCountry from '../FilterByCountry/FilterByCountry';
// import FilterByGenre from '../FilterByGenre/FilterByGenre';
import logo from '../../shared/radio_logo.svg'

export default function UserSearchBar({ handleSubmit, handleChange, searchString }) {
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
        {/* <FilterByCountry handleQuantityChange={handleQuantityChange}/>
        <FilterByGenre handleRatingChange={handleRatingChange}/> */}
        <button type="submit">
          <img src={logo} height="1.5rem" width="2rem" className="app-logo" alt="Stewdio Internet Radio App" />
        </button>
      </form>
    );
  }

//   handleQuantityChange, handleRatingChange, handleLanguageChange
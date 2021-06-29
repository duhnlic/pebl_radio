import  {NavLink} from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';


export default function NavBar(){

    return(
        <div className="navbar-main">
            <div className="navbar">
            {/* <SearchIcon className="navicon"/>
            <NavLink to="/" className="navlink">Search</NavLink> */}
            <PersonIcon className="navicon"/>
            <NavLink to="profile" className="navlink">Profile</NavLink>
            <AppsIcon className="navicon"/>
            <NavLink to="/" className="navlink">Curated Stations</NavLink>
            </div>
        </div>
    )
}
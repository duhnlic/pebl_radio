import  {NavLink} from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

export default function NavBar(){

    return(
        <div className="navbar-main">
            <div className="navbar">
            <SearchIcon/>
            <NavLink to="/" className="navlink">Search</NavLink>
            <PersonIcon/>
            <NavLink to="profile" className="navlink">Profile</NavLink>
            <AppsIcon/>
            <NavLink to="pebl-curated" className="navlink">Curated Stations</NavLink>
            </div>
        </div>
    )
}
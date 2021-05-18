import  {NavLink} from 'react-router-dom';

export default function NavBar(){

    return(
        <div className="navbar">
            <NavLink to="/" className="navlink">Search</NavLink>
            <NavLink to="profile" className="navlink">Profile</NavLink>
            <NavLink to="pebl-curated" className="navlink">Curated Stations</NavLink>
        </div>
    )
}
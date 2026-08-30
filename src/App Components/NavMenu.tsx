import { Link } from "react-router-dom";
import logOut from "../logout";

function NavMenu(){

    return(
        <>
            <div className="m-10">
                <ul>
                    <li><Link to="/" className="cursor-pointer">Home</Link></li>
                    <li><Link to="/login" className="cursor-pointer">Log In</Link></li>
                    <li><Link to="/logout-success" onClick={logOut} className="active:text-red-500 cursor-pointer">Log Out</Link></li>
                    <li><Link to="/dashboard" className="cursor-pointer">Dashboard</Link></li>
                    <li><Link to="/access-token" className="cursor-pointer">AccessToken</Link></li>
                    <li><Link to="/generic-component" className="cursor-pointer">GenericComponent</Link></li>
                    <li><Link to="/properties-page" className="cursor-pointer">Properties Page</Link></li>
                    
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
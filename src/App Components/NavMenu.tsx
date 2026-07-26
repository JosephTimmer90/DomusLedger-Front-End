import { Link } from "react-router-dom";
import { useBoundStore } from '../store'

function NavMenu(){
    const clearAccessToken = useBoundStore((store) => store.clearAccessToken);
    return(
        <>
            <div className="m-10">
                <ul>
                    <li><Link to="/" className="cursor-pointer">Home</Link></li>
                    <li><Link to="/login" className="cursor-pointer">Log In</Link></li>
                    <li><Link to="/logout-success" onClick={clearAccessToken} className="active:text-red-500 cursor-pointer">Log Out</Link></li>
                    <li><Link to="/dashboard" className="cursor-pointer">Dashboard</Link></li>
                    <li><Link to="/access-token" className="cursor-pointer">AccessToken</Link></li>
                    <li><Link to="/generic-component" className="cursor-pointer">GenericComponent</Link></li>
                    
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
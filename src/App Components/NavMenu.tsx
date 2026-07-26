import { Link } from "react-router-dom";
import { useBoundStore } from '../store'

function NavMenu(){
    const clearAccessToken = useBoundStore((store) => store.clearAccessToken);
    return(
        <>
            <div className="m-10">
                <ul>
                    <li><Link to="/" className="cursor-pointer">Home</Link></li>
                    <li><Link to="/DashBoard" className="cursor-pointer">Dashboard</Link></li>
                    <li><Link to="/Login Screen" className="cursor-pointer">Log In</Link></li>
                    <li><Link to="/AccessToken" className="cursor-pointer">AccessToken</Link></li>
                    <li><Link to="/GenericComponent" className="cursor-pointer">GenericComponent</Link></li>
                    <li><Link to="/LogOutSuccess" onClick={clearAccessToken} className="active:text-red-500 cursor-pointer">Log Out</Link></li>
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
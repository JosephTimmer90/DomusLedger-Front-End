import { Link} from "react-router-dom";
import { useBoundStore } from '../store'

function NavMenu(){
    const clearAccessToken = useBoundStore((store) => store.clearAccessToken);
    return(
        <>
            <div className="m-10">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/DashBoard">Dashboard</Link></li>
                    <li><Link to="/Login Screen">Log In</Link></li>
                    <li><Link to="/AccessToken">AccessToken</Link></li>
                    <li><Link to="/GenericComponent">GenericComponent</Link></li>
                    <li><button onClick={clearAccessToken} className="active:text-red-500">Log Out</button></li>
                    
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
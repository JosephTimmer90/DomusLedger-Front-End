import { Link} from "react-router-dom";

function NavMenu(){
    return(
        <>
            <div className="m-10">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/DashBoard">Dashboard</Link></li>
                    <li><Link to="/Login Screen">Log In</Link></li>
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
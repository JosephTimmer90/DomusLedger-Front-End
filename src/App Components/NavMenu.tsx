import { Link } from "react-router-dom";
import logOut from "../logout";

function NavMenu(){

    return(
        <>
            <div className="m-10">
                <ul>
                    <li className="m-5"><Link to="/" className="cursor-pointer offset-path">Home
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    <li className="m-5"><Link to="/login" className="cursor-pointer offset-path">Log In
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    <li className="m-5"><Link to="/logout-success" onClick={logOut} className="active:text-red-500 cursor-pointer offset-path">Log Out
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    <li className="m-5"><Link to="/dashboard" className="cursor-pointer offset-path">Dashboard
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    <li className="m-5"><Link to="/access-token" className="cursor-pointer offset-path">AccessToken
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    <li className="m-5"><Link to="/generic-component" className="cursor-pointer offset-path">GenericComponent
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    <li className="m-5"><Link to="/properties-page" className="cursor-pointer offset-path">Properties Page
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </Link></li>
                    
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
import { NavLink } from "react-router-dom";
import logOut from "../logout";

function NavMenu(){

    return(
        <>
            <div className="m-10">
                <ul>
                    <li className="m-5"><NavLink to="/" className="cursor-pointer offset-path">Home
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/login" className="cursor-pointer offset-path">Log In
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/logout-success" onClick={logOut} className="active:text-red-500 cursor-pointer offset-path">Log Out
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/dashboard" className="cursor-pointer offset-path">Dashboard
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/access-token" className="cursor-pointer offset-path">AccessToken
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/generic-component" className="cursor-pointer offset-path">GenericComponent
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/properties-page" className="cursor-pointer offset-path">Properties Page
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/tenants-page" className="cursor-pointer offset-path">Tenants Page
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/leases-page" className="cursor-pointer offset-path">Leases Page
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                        </NavLink></li>
                    <li className="m-5"><NavLink to="/layout/units-page" className="cursor-pointer offset-path">Units Page
                        <span className="deco-1" aria-hidden='true'></span>
                        <span className="deco-2" aria-hidden='true'></span>
                        <span className="deco-3" aria-hidden='true'></span>
                        <span className="deco-4" aria-hidden='true'></span>
                    </NavLink></li>
                    
                </ul>
            </div>
        </>
    )
}

export default NavMenu;
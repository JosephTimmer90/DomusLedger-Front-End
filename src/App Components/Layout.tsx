import {Link, Outlet } from "react-router";
import logOut from '../logout';

function Layout (){
    return (
        <div>
            <div className="flex justify-end mr-5">
                <Link
                    className="border-2 border-white p-2 hover:bg-white hover:text-black active:bg-red-500"
                    onClick={logOut}
                    to="/logout-success">Log Out</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;
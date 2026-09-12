import { Outlet } from "react-router";
import NavMenu from "./NavMenu";

function Header(){
    return(
        <div className=" w-full h-[100vh] flex justify-between height-screen">
            <div className=" w-[5vw] flex items-center left-side">
                    <nav className="w-[5vw] flex justify-center NavScreenContainer">
                        <button className="text-5xl rotate-90 NavSreenButton">|||</button>
                        <div className="absolute top-0 left-0 border-2 w-[25vw] h-[100vh] hidden t-base bg-[#16171d] z-5 NavScreenMenu">
                            <NavMenu ></NavMenu>
                        </div>
                    </nav>

            </div>
            <div className="w-[95vw] right-side"> 
                <Outlet  />
            </div>
        </div>
    )
}

export default Header;
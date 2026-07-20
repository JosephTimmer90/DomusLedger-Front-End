import { Outlet } from "react-router";
import NavMenu from "./NavMenu";

function Header(){
    return(
        <div className=" w-full h-[20vh] flex-col content-center justify-center height-screen">
            <div className="">
                <div className="flex flex-row height-[20vh]">
                    <div className="w-15/16"></div>
                    <nav className="w-1/16 NavScreenContainer">
                        <button className="text-5xl rotate-90 NavSreenButton">|||</button>
                        <div className="absolute top-0 right-0 border-2 w-[25vw] h-[55vh] hidden t-base bg-[#16171d] z-5 NavScreenMenu">
                            <NavMenu ></NavMenu>
                        </div>
                    </nav>
                </div>
            </div>
        <Outlet/>
        </div>
    )
}

export default Header;
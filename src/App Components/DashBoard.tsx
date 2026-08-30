import { useBoundStore } from "../store";
import { Link } from 'react-router-dom';
import logOut from "../logout"
import { intlNumberFormat, toUTCDate } from '../utils/format'

function DashBoard(){
    const count = useBoundStore((store) => store.count);
    const increment = useBoundStore((store) => store.incrementCount);
    const decrement = useBoundStore((store) => store.decrementCount);
    const computerBrand = useBoundStore((store) => store.computerBrand);
    const changeComputerBrand = useBoundStore((store) => store.changeComputerBrand);

    return(
        <>
            <div className="flex justify-end mr-5">
                <Link
                    className="border-2 border-white p-2 hover:bg-white hover:text-black active:bg-red-500"
                    onClick={logOut}
                    to="/logout-success">Log Out</Link>
            </div>
            <h1>This is the dashboard.</h1>
            <div>
                <button onClick={decrement} className='inline w-16'>-</button>
                <p className='inline w-16'>{count}</p>
                <button onClick={increment} className='inline w-16'>+</button>
            </div>
            <div>
                <h3>{computerBrand}</h3>
                <input type="text" onChange={(event) => changeComputerBrand(event.target.value)} value={computerBrand} className='text-center border p-2 border-red-700' />
            </div>
            <div className="m-5">
                <p>This is an example of the intlNumber format utility: {intlNumberFormat(BigInt(12345678),"en-US")}</p>
            </div>
            <div className="m-5">
                <p>This is an example of the utc date format utility: {toUTCDate()}</p>
            </div>
        </>
        

    )
}

export default DashBoard;
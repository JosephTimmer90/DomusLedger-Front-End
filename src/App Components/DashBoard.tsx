import { useBoundStore } from "../store";

function DashBoard(){
    const count = useBoundStore((store) => store.count);
    const increment = useBoundStore((store) => store.incrementCount);
    const decrement = useBoundStore((store) => store.decrementCount);
    const computerBrand = useBoundStore((store) => store.computerBrand);
    const changeComputerBrand = useBoundStore((store) => store.changeComputerBrand);
    const clearAccessToken = useBoundStore((store) => store.clearAccessToken);

    return(
        <>
            <div className="flex justify-end mr-5">
                <button 
                    className="border-2 border-white p-2 hover:bg-white hover:text-black active:bg-red-500"
                    onClick={clearAccessToken}>Log Out</button>
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
        </>
        

    )
}

export default DashBoard;
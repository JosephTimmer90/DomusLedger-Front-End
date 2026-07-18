import { useBoundStore } from "../store";

function DashBoard(){
    const count = useBoundStore((store) => store.count);
    const increment = useBoundStore((store) => store.incrementCount);
    const decrement = useBoundStore((store) => store.decrementCount);
    const computerBrand = useBoundStore((store) => store.computerBrand);
    const changeComputerBrand = useBoundStore((store) => store.changeComputerBrand);

    return(
        <>
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
import { useBoundStore } from "../store";
import { formatAsIntlNumberDollars, toLocaleDateString } from '../utils/format';

function AllExpenses(){
    const itemsPerPage = useBoundStore((store) => store.itemsPerPage);
    const currentPage = useBoundStore((store) => store.currentPage);
    const displayExpenses = useBoundStore((store) => store.displayExpenses);
    const setCurrentPageToPrevious = useBoundStore((store) => store.setCurrentPageToPrevious);
    const setCurrentPageToNext = useBoundStore((store) => store.setCurrentPageToNext);
    const fillDisplayExpenses = useBoundStore((store) => store.fillDisplayExpenses);

    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayExpenses.slice(indexOfFirstItem, indexOfLastItem);
    fillDisplayExpenses();
    

    return (
        <>
            {currentItems?.length === 0 && <p className='text-gray-500'>No expenses or filtered expenses yet.</p>}
            <ul className='space-y-2 h-[50vh]'>
                {currentItems?.map((p) => {
                    return(
                        <li key={`${p.propertyId}-${p.vendor}-${p.date.toISOString()}`} className='bg-white p-4 rounded shadow'>
                            <p className='font-medium'>
                                Category: {p.categoryId} Date: {toLocaleDateString(p.date)} Amount: {formatAsIntlNumberDollars(p.amountCents, 'en')}
                            </p>
                            <p className='font-medium'>
                                Vendor: {p.vendor} Description: {p.description}
                            </p>
                        </li>
                    )
                })}
            </ul>
            <button
                onClick={setCurrentPageToPrevious}
                className="border-2 border-white m-5 text-center cursor-pointer max-w-[20vw] p-2 hover:bg-white">
                Previous Page
            </button>
            <button
                onClick={setCurrentPageToNext}
                className="border-2 border-white m-5 text-center cursor-pointer max-w-[20vw] p-2 hover:bg-white">
                Next Page
            </button>
            <p>Page Number: {currentPage}</p>
      </>
    )
}

export default AllExpenses;
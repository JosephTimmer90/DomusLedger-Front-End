import { useBoundStore } from "../store";
import { formatAsIntlNumberDollars, toLocaleDateString } from '../utils/format';

function AllExpenses(){
    const expenses = useBoundStore((store) => store.expensesArray);

    return (
        <>
            {expenses?.length === 0 && <p className='text-gray-500'>No expenses yet or filtered expenses.</p>}
            <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
                {expenses?.map((p) => {
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
      </>
    )
}

export default AllExpenses;
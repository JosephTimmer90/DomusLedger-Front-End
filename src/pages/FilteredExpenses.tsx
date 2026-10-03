import { useBoundStore } from "../store";
import { formatAsIntlNumberDollars, toLocaleDateString } from '../utils/format';

function FilteredExpenses(){
    const filteredExpenses = useBoundStore((store) => store.filteredExpenses);

    return (
        <>
            {filteredExpenses?.length === 0 && <p className='text-gray-500'>No expenses of the specified category.</p>}
            <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
                {filteredExpenses?.map((p) => {
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

export default FilteredExpenses;
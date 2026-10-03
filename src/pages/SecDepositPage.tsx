
import { useBoundStore } from "../store";
import { toLocaleDateString, formatAsIntlNumberDollars } from "../utils/format";


function SecDepositsPage() {
  const secDeposits = useBoundStore((store) => store.secDepositsArray);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        
            <h1 className="text-2xl font-bold">Security Deposits</h1>
        
      </div>
      {secDeposits?.length === 0 && <p className='text-gray-500'>No secDeposits yet.</p>}
                    <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
                        {secDeposits?.map((p) => {
                            return(
                                <li key={p.id} className='bg-white p-4 rounded shadow'>
                                    <p className='font-medium'>
                                        leaseId: {p.leaseId} Date: {toLocaleDateString(p.heldSince)} Security Deposit: {formatAsIntlNumberDollars(p.secDepositCents, 'en')}
                                    </p>
                                    <p className='font-medium'>
                                        Status: {p.status}
                                    </p>
                                    
                                </li>
                            )
                        
                        })}
                    </ul>
    </div>
  );
}

export default SecDepositsPage;
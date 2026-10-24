
import { useBoundStore } from "../store";
import { toLocaleDateString, formatAsIntlNumberDollars } from "../utils/format";
import SecDepositStatusBadge from './SecDepositStatusBadge';
import type { newSecDeposit } from "../secDepositsSlice";


function SecDepositsPage() {
  const secDeposits = useBoundStore((store) => store.secDepositsArray);
  const openSecDepositId = useBoundStore((store) => store.openSecDepositId);
  const updateOpenSecDepositId = useBoundStore((store) => store.updateOpenSecDepositId);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Security Deposits</h1>
      </div>
      {secDeposits?.length === 0 && <p className='text-gray-500'>No security deposits yet.</p>}
        <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
            {secDeposits?.map((deposit: newSecDeposit) => {

                return(
                
                    <li key={deposit.id} className='bg-white p-4 rounded flex justify-between'>
                        <div>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium'>
                                leaseId: {deposit.leaseId} Date: {toLocaleDateString(deposit.heldSince)} Security Deposit: {formatAsIntlNumberDollars(deposit.secDepositCents, 'en')}
                            </p>
                            <p className='font-medium'>
                                Status: {deposit.status}
                            </p>
                        </div>
                        <div>
                            <SecDepositStatusBadge
                                deposit={deposit}
                                isOpen={openSecDepositId === deposit.id}
                                onOpen={() => updateOpenSecDepositId(deposit.id)}
                                onClose={() => updateOpenSecDepositId(null)}
                                />
                        </div>
                        
                    </li>
                )
            
            })}
        </ul>
                
    </div>
  );
}

export default SecDepositsPage;
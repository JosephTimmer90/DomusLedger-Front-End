import AddLeaseForm from './AddLeaseForm';
import { useBoundStore } from "../store";
import { formatAsIntlNumberDollars } from '../utils/format';
import type { newLease } from './AddLeaseForm'

function LeasesPage() {
    const showForm = useBoundStore((store) => store.addLeaseButtonClicked);
    const leases = useBoundStore((store) => store.leasesArray);
    const toggleForm = useBoundStore((store) => store.toggleLeaseButtonClicked);

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Leases</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={toggleForm}>
          {showForm ? 'Close Form' : 'Add Lease'}
        </button>
      </div>
      {leases?.length === 0 && <p className='text-gray-500'>No leases yet.</p>}
      <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
        {leases?.map((p: newLease) => (
          <li key={p.id} className='bg-white p-4 rounded shadow'>
            <p className='font-medium'>Unit Id: {p.unitId} Tenant Id:{p.tenantId}</p>
            <p className='text-sm text-gray-500'>Monthly Rent: {formatAsIntlNumberDollars(p.monthlyRentCents, 'en')} Late Fee: {formatAsIntlNumberDollars(p.lateFeeAmtCents, 'en')}</p>
          </li>
        ))}
      </ul>
      {showForm && <AddLeaseForm />}
    </div>
  );
}

export default LeasesPage;
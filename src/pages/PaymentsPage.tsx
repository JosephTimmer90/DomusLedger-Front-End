import AddPaymentForm from './AddPaymentForm';
import { useBoundStore } from "../store";
import { formatAsIntlNumberDollars } from '../utils/format'

function PaymentsPage() {
    const showForm = useBoundStore((store) => store.addPaymentButtonClicked);
    const payments = useBoundStore((store) => store.paymentsArray);
    const toggleForm = useBoundStore((store) => store.togglePaymentButtonClicked);

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Units</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={toggleForm}>
          {showForm ? 'Close Form' : 'Add Payment'}
        </button>
      </div>
      {payments?.length === 0 && <p className='text-gray-500'>No payments yet.</p>}
      <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
        {payments?.map((p) => {
            return(
                <li key={p.id} className='bg-white p-4 rounded shadow'>
                    <p className='font-medium'>
                        Date Received: {p.receiveDate} Amount: {formatAsIntlNumberDollars(p.amount, 'en')}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Status: {p.status}
                    </p>
                </li>
            )
          
        })}
      </ul>
      {showForm && <AddPaymentForm />}
    </div>
  );
}

export default PaymentsPage;
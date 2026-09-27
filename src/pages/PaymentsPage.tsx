import AddPaymentForm from './AddPaymentForm';
import { useBoundStore } from "../store";
import { formatAsIntlNumberDollars, toLocaleDateString } from '../utils/format'

function PaymentsPage() {
    const showForm = useBoundStore((store) => store.addPaymentButtonClicked);
    const payments = useBoundStore((store) => store.paymentsArray);
    const toggleForm = useBoundStore((store) => store.togglePaymentButtonClicked);

type PaymentStatus = "Received" | "Late" | "Partial";

const statusStyle: Record<PaymentStatus, string> = {
  Received: "text-green-600",
  Late: "text-red-600",
  Partial: "text-amber-600",
};

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Payments</h1>
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
                        Date Received: {toLocaleDateString(p.receiveDate)} Amount: {formatAsIntlNumberDollars(p.amount, 'en')}
                    </p>
                    <p className={statusStyle[p.status as PaymentStatus]}>
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
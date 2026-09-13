import AddTenantForm from './AddTenantForm';
import { useBoundStore } from "../store";

function TenantsPage() {
    const showForm = useBoundStore((store) => store.addTenantButtonClicked);
    const tenants = useBoundStore((store) => store.tenantsArray);
    const toggleForm = useBoundStore((store) => store.toggleTenantButtonClicked);

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Tenants</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={toggleForm}>
          {showForm ? 'Close Form' : 'Add Tenant'}
        </button>
      </div>
      {tenants?.length === 0 && <p className='text-gray-500'>No tenants yet.</p>}
      <ul className='space-y-2'>
        {tenants?.map(p => (
          <li key={p.id} className='bg-white p-4 rounded shadow'>
            <p className='font-medium'>{p.firstName} {p.lastName}</p>
            <p className='text-sm text-gray-500'>{p.id}, {p.email} {p.phone}</p>
          </li>
        ))}
      </ul>
      {showForm && <AddTenantForm />}
    </div>
  );
}

export default TenantsPage;

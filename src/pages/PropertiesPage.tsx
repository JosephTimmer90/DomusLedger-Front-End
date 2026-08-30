import AddPropertyForm from './AddPropertyForm';
import { useBoundStore } from "../store";

function PropertiesPage() {
    const showForm = useBoundStore((store) => store.addPropertyButtonClicked);
    const properties = useBoundStore((store) => store.propertiesArray);
    const toggleForm = useBoundStore((store) => store.togglePropertyButtonClicked);

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Properties</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={toggleForm}>
          {showForm ? 'Close Form' : 'Add Property'}
        </button>
      </div>
      {properties?.length === 0 && <p className='text-gray-500'>No properties yet.</p>}
      <ul className='space-y-2'>
        {properties?.map(p => (
          <li key={p.id} className='bg-white p-4 rounded shadow'>
            <p className='font-medium'>{p.address}</p>
            <p className='text-sm text-gray-500'>{p.city}, {p.state} {p.zip}</p>
          </li>
        ))}
      </ul>
      {showForm && <AddPropertyForm />}
    </div>
  );
}

export default PropertiesPage;

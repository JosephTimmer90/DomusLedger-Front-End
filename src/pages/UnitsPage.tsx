import AddUnitForm from './AddUnitForm';
import { useBoundStore } from "../store";

function UnitsPage() {
    const showForm = useBoundStore((store) => store.addUnitButtonClicked);
    const units = useBoundStore((store) => store.unitsArray);
    const toggleForm = useBoundStore((store) => store.toggleUnitButtonClicked);
    const propertiesArray = useBoundStore((store => store.propertiesArray));



  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Units</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={toggleForm}>
          {showForm ? 'Close Form' : 'Add Unit'}
        </button>
      </div>
      {units?.length === 0 && <p className='text-gray-500'>No units yet.</p>}
      <ul className='space-y-2'>
        {units?.map((p) => {
          const foundProperty = propertiesArray.find(
            (property) => property.id === p.propertyId
          );
          const propertyAddress = foundProperty?.address ?? 'Unknown property';

          return (
            <li key={p.id} className='bg-white p-4 rounded shadow'>
              <p className='font-medium'>
                Address: {propertyAddress} Unit Number: {p.unitNumber}
              </p>
              <p className='text-sm text-gray-500'>
                Beds: {p.bedrooms}, Baths: {p.bathrooms} Square footage: {p.sqft}
              </p>
            </li>
          );
        })}
      </ul>
      {showForm && <AddUnitForm />}
    </div>
  );
}

export default UnitsPage;

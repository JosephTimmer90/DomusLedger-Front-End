import AddExpenseCategoryForm from './AddExpenseCategoryForm';
import DeleteExpenseCategoryButton from './DeleteExpenseCategoryButton'
import { useBoundStore } from "../store";

function ExpenseCategoriesPage() {
    const showForm = useBoundStore((store) => store.addExpenseCategoryButtonClicked);
    const expenseCategories = useBoundStore((store) => store.expenseCategoriesArray);
    const openExpenseCategory = useBoundStore((store) => store.openExpenseCategory);
    const toggleForm = useBoundStore((store) => store.toggleExpenseCategoryButtonClicked);
    const updateOpenExpenseCategory = useBoundStore((store) => store.updateOpenExpenseCategory);

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Expense Categories</h1>
        <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={toggleForm}>
          {showForm ? 'Close Form' : 'Add Expense Category'}
        </button>
      </div>
      {expenseCategories?.length === 0 && <p className='text-gray-500'>No expense categories yet.</p>}
      <ul className='space-y-2 overflow-y-scroll h-[65vh]'>
        {expenseCategories?.map((expenseCat) => {
            return (
                <li key={expenseCat.id} className='bg-white p-4 rounded shadow flex justify-between items-center'>
                  <p>Expense Category Name: {expenseCat.expenseCategoryName}</p>
                <div>
                  <DeleteExpenseCategoryButton
                      expenseCategory={expenseCat}
                      isOpen={openExpenseCategory === expenseCat.id}
                      onOpen={() => {updateOpenExpenseCategory(expenseCat.id)}}
                      onClose={() => {updateOpenExpenseCategory(null)}}
                      />
                  </div>
                </li>
            )
        })
        }
      </ul>
      {showForm && <AddExpenseCategoryForm />}
    </div>
  );
}

export default ExpenseCategoriesPage;

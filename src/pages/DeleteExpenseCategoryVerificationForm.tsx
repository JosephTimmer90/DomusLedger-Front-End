import type { DeleteExpenseCategoryButtonProps } from './DeleteExpenseCategoryButton';
import { useBoundStore } from "../store";

function DeleteExpenseCategoryVerificationForm(props: DeleteExpenseCategoryButtonProps){
    const deleteExpenseCategory = useBoundStore((store) => store.deleteExpenseCategory);

    return(
        <>
            <div className='bg-white border-10 border-black rounded-[5px] p-5'>
                <p className='m-[50px] text-black'>Are you sure you would like to delete {props.expenseCategory.expenseCategoryName}?</p>
                <button className='border-2 border-black p-2 m-[10px] text-black cursor-pointer' onClick={() => deleteExpenseCategory(props.expenseCategory.id)}>Delete Expense Category</button>
                <button className='border-2 border-black p-2 m-[10px] text-black cursor-pointer'onClick={props.onClose}>Cancel</button>
            </div>
        </>
    )
}

export default DeleteExpenseCategoryVerificationForm;
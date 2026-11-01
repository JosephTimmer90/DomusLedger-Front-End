import type { FormFields } from "./AddExpenseCategoryForm";
import DeleteExpenseCategoryVerificationForm from "./DeleteExpenseCategoryVerificationForm";

export type DeleteExpenseCategoryButtonProps = {
    expenseCategory: FormFields;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

function DeleteExpenseCategoryButton({expenseCategory, isOpen, onOpen, onClose}: DeleteExpenseCategoryButtonProps) {

    return(
        <>
            <div className='bg-red-500 p-[5px] border-2 border-red-500 rounded-md'>
                <button onClick={onOpen} className="cursor-pointer text-black">Delete Expense Category</button>
            </div>
            <div className="absolute top-[50vh] left-[50vw]">
                {isOpen && <DeleteExpenseCategoryVerificationForm expenseCategory={expenseCategory} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>}
            </div>
        </>

    )
}

export default DeleteExpenseCategoryButton;

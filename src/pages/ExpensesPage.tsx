import AddExpenseForm from "./AddExpenseForm";
import { useBoundStore } from "../store";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AllExpenses from "./AllExpenses";
import FilteredExpenses from "./FilteredExpenses";

function ExpensesPage() {
  const showForm = useBoundStore((store) => store.addExpenseButtonClicked);
  const toggleForm = useBoundStore((store) => store.toggleExpenseButtonClicked);
  const filterExpenses = useBoundStore((store) => store.filterExpenses);
  const showAllExpenses = useBoundStore((store) => store.showAllExpenses);
  const showFilteredExpenses = useBoundStore((store) => store.showFilteredExpenses,);
  const ShowAllTrue = useBoundStore((store) => store.setShowAllExpensesToTrue,);
  const ShowAllFalse = useBoundStore((store) => store.setShowAllExpensesToFalse,);
  const ShowFilteredTrue = useBoundStore((store) => store.setShowFilteredExpensesToTrue,);
  const ShowFilteredFalse = useBoundStore((store) => store.setShowFilteredExpensesToFalse,);

  const schema = z.object({
    category: z.string({ message: "Category must be a string." }),
  });

  type FormFields = z.output<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    filterExpenses(data.category);
    ShowAllFalse();
    ShowFilteredTrue();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("category")}
            type="dropdown"
            placeholder="category"
            className="border-2 border-white text-center p-2 min-w-[40vw]"
          />
          {errors.category && (
            <div className="text-red-500">{errors.category.message}</div>
          )}
          <button
            type="submit"
            className="border-2 border-white m-5 text-center cursor-pointer max-w-[20vw] p-2"
          >
            Filter Expenses
          </button>
          <button
            type="button"
            className="border-2 border-white m-5 text-center cursor-pointer max-w-[20vw] p-2"
            onClick={() =>{
                ShowAllTrue();
                ShowFilteredFalse();
            }}
          >
            Show All Expenses
          </button>
        </form>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={toggleForm}
        >
          {showForm ? "Close Form" : "Add Expense"}
        </button>
      </div>
      {showAllExpenses && <AllExpenses />}
      {showFilteredExpenses && <FilteredExpenses />}
      {showForm && <AddExpenseForm />}
    </div>
  );
}

export default ExpensesPage;

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";
import { formatAsBigIntCents } from "../utils/format";

export interface newExpense {
  propertyId: string;
  categoryId: string;
  amountCents: bigint;
  date: Date;
  description: string;
  vendor: string;
}

const parseLocalDateFromInput = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const schema = z.object({
  propertyId: z.string({ message: "ID must be a string." }),
  categoryId: z
    .string(),
  amountCents: z.number().int({ message: "Amount must be a whole number." }),
  date: z
    .string({ message: "Receive date must be a date string." })
    .regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Date must be MM-DD-YYYY." })
    .transform((value) => parseLocalDateFromInput(value)),
  description: z
    .string({message: 'Description must be a string.'}),
  vendor: z
    .string({ message: "Status must be a string." }),
});

export type FormFields = z.output<typeof schema>;
export type FormInputFields = z.input<typeof schema>;

function AddExpenseForm() {
  const toggleForm = useBoundStore((store) => store.toggleExpenseButtonClicked);
  const appendExpensesArray = useBoundStore(
    (store) => store.appendExpensesArray,
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInputFields, unknown, FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newExpense: newExpense = {
        propertyId: data.propertyId,
        categoryId: data.categoryId,
        amountCents: formatAsBigIntCents(data.amountCents),
        date: data.date,
        description: data.description,
        vendor: data.vendor,
      };
      appendExpensesArray(newExpense);
    } catch {
      setError("root", { message: "Form could not be submitted." });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      toggleForm();
    }
  }, [isSubmitSuccessful, reset, toggleForm]);

  return (
    <div className="flex justify-center absolute top-50 left-[calc((100vw-50vw-40px)/2)] bg-white border-20 border-black rounded-[15px]">
      <form
        className="gap-5 flex flex-col mt-5 min-w-[50vw] items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("propertyId")}
          type="number"
          placeholder="Property Id"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.propertyId && <div className="text-red-500">{errors.propertyId.message}</div>}

        <input
          {...register("categoryId")}
          type="text"
          placeholder="Category"
          className="border-2 border-black text-center p-2 min-w-[40vw] centered-date-input"
        />
        {errors.categoryId && (
          <div className="text-red-500">{errors.categoryId.message}</div>
        )}

        <input
          {...register("amountCents", { valueAsNumber: true })}
          type="number"
          placeholder="Expense Amount"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.amountCents && (
          <div className="text-red-500">{errors.amountCents.message}</div>
        )}

        <input
          {...register("date")}
          type="text"
          placeholder="Date"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.date && (
          <div className="text-red-500">{errors.date.message}</div>
        )}

        <input
          {...register("description")}
          type="text"
          placeholder="Description"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.description && (
          <div className="text-red-500">{errors.description.message}</div>
        )}

        <input
          {...register("vendor")}
          type="text"
          placeholder="Vendor"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.vendor && (
          <div className="text-red-500">{errors.vendor.message}</div>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="border-2 border-black m-5 text-center cursor-pointer max-w-[20vw] p-2"
        >
          {isSubmitting ? "loading..." : "Submit"}
        </button>

        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

export default AddExpenseForm;

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";

export interface newPayment {
    id: string;
    receiveDate: string;
    amount: bigint;
    status: string;
};

const schema = z.object({
  id: z.string({ message: "ID must be a string." }),
  receiveDate: z
    .string()
    .min(1, { message: "Receive date must contain at least 1 characters" }),
  amount: z
    .number().int({message: 'Amount must be a whole number.'}),
  status: z
    .string({message: 'Status must be a string.'}),
});

export type FormFields = z.infer<typeof schema>;

function AddPaymentForm() {
  const toggleForm = useBoundStore((store) => store.togglePaymentButtonClicked);
  const appendPaymentsArray = useBoundStore(
    (store) => store.appendPaymentsArray
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      appendPaymentsArray(data);
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
          {...register("id")}
          type="number"
          placeholder="123"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.id && <div className="text-red-500">{errors.id.message}</div>}

        <input
          {...register("receiveDate")}
          type="text"
          placeholder="date received"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.receiveDate && (
          <div className="text-red-500">{errors.receiveDate.message}</div>
        )}

        <input
          {...register("amount")}
          type="number"
          placeholder="amount received"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.amount && (
          <div className="text-red-500">{errors.amount.message}</div>
        )}

        <input
          {...register("status")}
          type="text"
          placeholder="status"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.status && <div className="text-red-500">{errors.status.message}</div>}

        <button
          disabled={isSubmitting}
          type="submit"
          className="border-2 border-black m-5 text-center cursor-pointer max-w-[20vw] p-2"
        >
          {isSubmitting ? "loading..." : "Submit"}
        </button>

        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </div>
  );
}

export default AddPaymentForm;
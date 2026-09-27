import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";
import { formatAsBigIntCents } from "../utils/format";

export interface newPayment {
  id: string;
  receiveDate: Date;
  amount: bigint;
  status: string;
}

const StatusEnum = z.enum(["Received", "Partial", "Late"]);

const parseLocalDateFromInput = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const schema = z.object({
  id: z.string({ message: "ID must be a string." }),
  receiveDate: z
    .string({ message: "Receive date must be a date string." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be YYYY-MM-DD." })
    .transform((value) => parseLocalDateFromInput(value)),
  amount: z.number().int({ message: "Amount must be a whole number." }),
  status: z
    .string({ message: "Status must be a string." })
    .refine((v) => StatusEnum.safeParse(v).success, {
      message: "Must be: Received, Partial, or Late. Case-sensitive.",
    }),
});

export type FormFields = z.output<typeof schema>;
export type FormInputFields = z.input<typeof schema>;

function AddPaymentForm() {
  const toggleForm = useBoundStore((store) => store.togglePaymentButtonClicked);
  const appendPaymentsArray = useBoundStore(
    (store) => store.appendPaymentsArray,
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

      const newPayment: newPayment = {
        id: data.id,
        receiveDate: data.receiveDate,
        amount: formatAsBigIntCents(data.amount),
        status: data.status,
      };
      appendPaymentsArray(newPayment);
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
          type="date"
          placeholder="date received"
          className="border-2 border-black text-center p-2 min-w-[40vw] centered-date-input"
        />
        {errors.receiveDate && (
          <div className="text-red-500">{errors.receiveDate.message}</div>
        )}

        <input
          {...register("amount", { valueAsNumber: true })}
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
        {errors.status && (
          <div className="text-red-500">{errors.status.message}</div>
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

export default AddPaymentForm;

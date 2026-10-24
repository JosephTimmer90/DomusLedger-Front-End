import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";
import { formatAsIntlNumberDollars } from '../utils/format'

const schema = z.object({
});

export type FormFields = z.infer<typeof schema>;

function ProcessSecDepositReturnForm({ id, leaseId, secDepositCents, onClose }: { id: string, leaseId: string, secDepositCents: bigint, onClose: () => void }) {
  const markSecDepositReturned = useBoundStore((store) => store.markSecDepositReturned);
  const toggleForm = useBoundStore((store) => store.toggleForm);

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      markSecDepositReturned(id);
      onClose();
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
        <p>Id: {id}</p>
        <p>Lease Id: {leaseId}</p>
        <p>Security deposit amount: {formatAsIntlNumberDollars(secDepositCents, 'us')} </p>
        <div>
            <button
            disabled={isSubmitting}
            type="submit"
            className="border-2 border-black m-5 text-center cursor-pointer max-w-[20vw] p-2"
            >
            {isSubmitting ? "loading..." : "Mark this security deposit as returned."}
            </button>
            <button
            disabled={isSubmitting}
            type="button"
            onClick={onClose}
            className="border-2 border-black m-5 text-center cursor-pointer max-w-[20vw] p-2"
            >
            Close Form
            </button>
        </div>

        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </div>
  );
}

export default ProcessSecDepositReturnForm;
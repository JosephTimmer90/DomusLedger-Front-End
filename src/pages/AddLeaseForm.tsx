import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";
import { formatAsBigIntCents } from "../utils/format";

export interface newLease {
    id: string;
    unitId: string;
    tenantId: string;
    lateFeeGraceDays: number;
    monthlyRentCents: bigint;
    secDepositCents: bigint;
    lateFeeAmtCents: bigint;
};

const schema = z.object({
  id: z.string({ message: "ID must be a string." }),
  unitId: z.string({ message: "Unit ID must be a string" }),
  tenantId: z.string({ message: "Tenant ID must be a string." }),
  lateFeeGraceDays: z.number().int({ message: "Late fee grace days must be a whole number." }),
  monthlyRentDollars: z.number().int({ message: "Monthly rent dollars must be a whole number representing dollars." }),
  secDepositDollars: z.number().int({ message: "Security deposit dollars must be a whole number representing dollars." }),
  lateFeeAmtDollars: z.number().int({ message: "Late fee amount dollars must be a whole number representing dollars." }),
});

export type FormFields = z.infer<typeof schema>;

function AddLeaseForm() {
  const toggleForm = useBoundStore((store) => store.toggleLeaseButtonClicked);
  const leases = useBoundStore((store) => store.leasesArray);
  const appendLeasesArray = useBoundStore(
    (store) => store.appendLeasesArray
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

      const isTaken = leases.some((lease) => lease.unitId === data.unitId);
      if (isTaken) {
        setError("unitId", {
          type: "manual",
          message: "This unit is already assigned to a lease",
        });
        return;
      }

        const newLease: newLease = {
            id: data.id,
            unitId: data.unitId,
            tenantId: data.tenantId,
            lateFeeGraceDays: data.lateFeeGraceDays,
            monthlyRentCents: formatAsBigIntCents(data.monthlyRentDollars),
            secDepositCents: formatAsBigIntCents(data.secDepositDollars),
            lateFeeAmtCents: formatAsBigIntCents(data.lateFeeAmtDollars)
        }      
      appendLeasesArray(newLease);
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
          type="text"
          placeholder="123"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.id && <div className="text-red-500">{errors.id.message}</div>}

        <input
          {...register("unitId")}
          type="text"
          placeholder="unitId"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.unitId && (
          <div className="text-red-500">{errors.unitId.message}</div>
        )}

        <input
          {...register("tenantId")}
          type="text"
          placeholder="tenantId"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.tenantId && <div className="text-red-500">{errors.tenantId.message}</div>}

        <input
          {...register("monthlyRentDollars", {valueAsNumber: true})}
          type="number"
          placeholder="monthly rent dollars"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.monthlyRentDollars && (
          <div className="text-red-500">{errors.monthlyRentDollars.message}</div>
        )}

        <input
          {...register("secDepositDollars", {valueAsNumber: true})}
          type="number"
          placeholder="security deposit dollars"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.secDepositDollars && <div className="text-red-500">{errors.secDepositDollars.message}</div>}

        <input
          {...register("lateFeeGraceDays", {valueAsNumber: true})}
          type="number"
          placeholder="lateFeeGraceDays"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.lateFeeGraceDays && <div className="text-red-500">{errors.lateFeeGraceDays.message}</div>}

        <input
          {...register("lateFeeAmtDollars", {valueAsNumber: true})}
          type="number"
          placeholder="late fee amount dollars"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.lateFeeAmtDollars && <div className="text-red-500">{errors.lateFeeAmtDollars.message}</div>}

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

export default AddLeaseForm;
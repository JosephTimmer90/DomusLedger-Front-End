import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";



const schema = z.object({
  id: z.string({ message: "ID must be a string." }),
  unitNumber: z
    .string()
    .min(1, { message: "Unit number must contain at least 1 characters" }),
  bedrooms: z
    .number().int({message: 'Number of bedrooms must be a whole number.'}),
  bathrooms: z
    .number().int({message: 'Number of bathrooms must be a whole number.'}),
  sqft: z.number().int({ message: "Square footage must be a whole number." }),
  propertyId: z.string().min(1, { message: "Property ID must be a string atleast one character long." }),
});

export type FormFields = z.infer<typeof schema>;

function AddUnitForm() {
  const toggleForm = useBoundStore((store) => store.toggleUnitButtonClicked);
  const appendUnitsArray = useBoundStore(
    (store) => store.appendUnitsArray
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
      appendUnitsArray(data);
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
          {...register("unitNumber")}
          type="text"
          placeholder="address"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.unitNumber && (
          <div className="text-red-500">{errors.unitNumber.message}</div>
        )}

        <input
          {...register("bedrooms")}
          type="text"
          placeholder="num of bedrooms"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.bedrooms && (
          <div className="text-red-500">{errors.bedrooms.message}</div>
        )}

        <input
          {...register("bathrooms")}
          type="text"
          placeholder="bathrooms"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.bathrooms && <div className="text-red-500">{errors.bathrooms.message}</div>}

        <input
          {...register("sqft")}
          type="number"
          placeholder="square footage"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.sqft && <div className="text-red-500">{errors.sqft.message}</div>}

        <input
          {...register("propertyId")}
          type="number"
          placeholder="propertyId"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.propertyId && <div className="text-red-500">{errors.propertyId.message}</div>}

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

export default AddUnitForm;

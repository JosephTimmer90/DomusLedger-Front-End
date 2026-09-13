import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
  id: z
    .number()
    .int({ message: "ID must be a whole number" }),
  firstName: z
    .string()
    .min(4, { message: "First name must contain at least 2 characters" })
    .regex(/^[a-zA-Z\s.-]+$/, {
      message: "First name contains invalid characters",
    }),
  lastName: z
    .string()
    .min(2, { message: "Last name must contain at least 2 characters" })
    .max(20, { message: "Last name is too long" })
    .regex(/^[a-zA-Z\s.-]+$/, {
      message: "Last name contains invalid characters",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" }),
});

export type FormFields = z.infer<typeof schema>;

function AddTenantForm() {
  const toggleForm = useBoundStore((store) => store.togglePropertyButtonClicked);
  const appendTenantsArray = useBoundStore(
    (store) => store.appendTenantsArray
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
      appendTenantsArray(data);
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
          {...register("id", {valueAsNumber: true})}
          type="number"
          placeholder="123"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.id && <div className="text-red-500">{errors.id.message}</div>}

        <input
          {...register("firstName")}
          type="text"
          placeholder="first name"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.firstName && (
          <div className="text-red-500">{errors.firstName.message}</div>
        )}

        <input
          {...register("lastName")}
          type="text"
          placeholder="last name"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.lastName && <div className="text-red-500">{errors.lastName.message}</div>}

        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <input
          {...register("phone")}
          type="string"
          placeholder="phone"
          className="border-2 border-black text-center p-2 min-w-[40vw]"
        />
        {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}

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

export default AddTenantForm;

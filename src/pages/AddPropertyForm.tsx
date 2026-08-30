import { useForm } from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";
import z from 'zod';
import { useBoundStore } from "../store";
import { useEffect } from "react";



const schema = z.object({
    id: z.int(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.int(),
})

export type FormFields = z.infer<typeof schema>;

function AddPropertyForm(){

    const screenWidth = useBoundStore((store) => store.screenWidth);
    const toggleForm = useBoundStore((store) => store.togglePropertyButtonClicked);
    const appendPropertiesArray = useBoundStore((store) => store.appendPropertiesArray);

    const {register,
        handleSubmit,
        reset,
        setError,
        formState: {errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            appendPropertiesArray(data);
        }
        catch(error) {
            setError("root", {message: "Form could not be submitted.",});
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
        reset(); // Clears fields back to their original defaultValues
        toggleForm();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="flex justify-center absolute top-50 left-[calc((100vw-50vw-40px)/2)] bg-white border-20 border-black rounded-[15px]">
            <form className="gap-5 flex flex-col mt-5 min-w-[50vw] items-center" onSubmit={handleSubmit(onSubmit)} >
                <input {...register("id", { required: true})} type="number" placeholder="123" className="border-2 border-black text-center p-2 min-w-[40vw]"/>
                <input {...register('address', 
                    {required: {value: true, message: "Required Field"},
                     minLength: {value: 4, message: 'Address must contain at least 4 chracters'}
                     })}
                     type="text"
                     placeholder="address"
                     className="border-2 border-black text-center p-2 min-w-[40vw]" />
                {errors.address && <div className="text-red-500">{errors.address.message}</div>}
                <input {...register("city")} type="text" placeholder="city" className="border-2 border-black text-center p-2 min-w-[40vw]" />
                <input {...register("state")} type="text" placeholder="state" className="border-2 border-black  text-center p-2 min-w-[40vw]" />
                <input {...register("zip")} type="number" placeholder="zip" className="border-2 border-black  text-center p-2 p-2 min-w-[40vw]" />
                <button disabled={isSubmitting} type="submit" className="border-2 border-black m-5 text-center cursor-pointer max-w-[20vw] p-2">{isSubmitting ? "loading..." : "Submit"}</button>
                {errors.root && <div className="text-red-500">{errors.root.message}</div>}
           </form>
        </div>
    )

}

export default AddPropertyForm;
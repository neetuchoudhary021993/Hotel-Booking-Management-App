import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FileInput from "../../ui/FileInput";

function CreateCabinForm() {

    const {register, handleSubmit, reset, getValues, formState:{errors}} = useForm()
    const queryClient = useQueryClient();

    const {isLoading:iscreating, mutate} = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully")
            //refetch data
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
            reset();

        },
        onError: (error) => toast.error(error.message)
    })
    
    function onSubmit(data){
    //        console.log('formData', data)
    mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input type="text" id="name" disabled={iscreating} {...register('name', {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" disabled={iscreating} {...register('maxCapacity', {required:"This field is required",
                min: {
                    value: 1,
                    message: "Capacity should be atleast 1"
                },
                // max: {
                //     value: 4,
                //     message:"Capacity should be between 1 to 4"
                // }
            })}/>
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" disabled={iscreating} {...register('regularPrice', {required: "This field is required",
                    min: {
                        value: 1,
                        message: "Regular price should be atleast 1"
                    }
            })}/>
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" defaultValue={0} disabled={iscreating} {...register('discount', {required: "This field is required",
                  validate: (value) => value <= getValues().regularPrice  || "Discount should be less than regular price"
            })}/>
            </FormRow>

            <FormRow label="Descriptiion" error={errors?.description?.message} >
                <textarea type="text" id="description" disabled={iscreating} {...register('description', {required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Cabin Photo" >
                <FileInput id="image" accept="image/*" {...register('image', {required: "This field is required"})}/>
                {/* <Input type="file" id="image" accept="image/*"/> */}
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">Cancel</Button>
                <Button>Add Cabin</Button>
            </FormRow>
        </form>
    );
}

export default CreateCabinForm;

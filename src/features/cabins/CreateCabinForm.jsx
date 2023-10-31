import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins";
import toast from "react-hot-toast";
import FileInput from "../../ui/FileInput";

function CreateCabinForm({cabinToEdit = {}}) {
    const {id: editId, ...editValues} = cabinToEdit;
    // console.log("EditValues", editValues)
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {errors},
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const queryClient = useQueryClient();

    const {isLoading: iscreating, mutate: createCabin} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully");
            //refetch data
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (error) => toast.error(error.message),
    });

    const {isLoading: isEditing, mutate: editCabin} = useMutation({
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin edited successfully");
            //refetch data
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (error) => toast.error(error.message),
    });

    function onSubmit(data) {
        //        console.log('formData', data)
        console.log("CabinImage", data.image[0]);
        const image = typeof data.image === 'string'?  data.image : data.image[0];
        if (isEditSession) {
            editCabin({newCabinData: {...data, image}, id: editId});
        } else {
            createCabin({...data, image: image});
        }
    }
    const isWorking = iscreating || isEditing;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {required: "This field is required"})}
                />
            </FormRow>

            <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be atleast 1",
                        },
                        // max: {
                        //     value: 4,
                        //     message:"Capacity should be between 1 to 4"
                        // }
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Regular price should be atleast 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            value <= getValues().regularPrice || "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Descriptiion" error={errors?.description?.message}>
                <textarea
                    type="text"
                    id="description"
                    disabled={isWorking}
                    {...register("description", {required: "This field is required"})}
                />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput id="image" accept="image/*" {...register("image", {required: isEditSession ? false : "This field is required"})} />
                {/* <Input type="file" id="image" accept="image/*"/> */}
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>
            </FormRow>
        </form>
    );
}

export default CreateCabinForm;

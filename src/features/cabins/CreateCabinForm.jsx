import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import {useForm} from "react-hook-form";
import FileInput from "../../ui/FileInput";
import {useCreateCabin} from "./useCreateCabin";
import {useEditCabin} from "./useEditCabin";
import Form from "../../ui/Form";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
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
    const {createCabin, iscreating} = useCreateCabin();

    const {editCabin, isEditing} = useEditCabin();

    function onSubmit(data) {
            //    console.log('formData', data)
            console.log("reset", reset)
        console.log("CabinImage", data.image[0]);
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) {
            editCabin(
                {newCabinData: {...data, image}, id: editId},
                {
                    onSuccess: (data) => {
                        reset(),
                         onCloseModal?.();
                    },
                }
            );
        } else {
            createCabin(
                {...data, image: image},
                {
                    onSuccess: (data) => {
                        reset(),
                         onCloseModal?.();
                    },
                }
            );
        }
    }
    const isWorking = iscreating || isEditing;
    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
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
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {required: isEditSession ? false : "This field is required"})}
                />
                {/* <Input type="file" id="image" accept="image/*"/> */}
            </FormRow>

            <FormRow>
                <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

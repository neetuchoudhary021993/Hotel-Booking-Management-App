import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function CreateCabinForm() {
    return (
        <form>
            <FormRow label="Cabin name">
                <Input type="text" id="name" />
            </FormRow>

            <FormRow label="Max capacity">
                <Input type="number" id="maxCapacity" />
            </FormRow>

            <FormRow label="Regular price">
                <Input type="number" id="regularPrice" />
            </FormRow>

            <FormRow label="Discount">
                <Input type="number" id="discount" defaultValue={0}/>
            </FormRow>

            <FormRow label="Descriptiion">
                <textarea type="text" id="description" />
            </FormRow>

            <FormRow label="Cabin Photo">
                <Input type="file" id="image" accept="image/*"/>
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">Cancel</Button>
                <Button>Add Cabin</Button>
            </FormRow>
        </form>
    );
}

export default CreateCabinForm;
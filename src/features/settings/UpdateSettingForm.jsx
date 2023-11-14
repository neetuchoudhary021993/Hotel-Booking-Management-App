import React from "react";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import {useUpdateSetting} from "./useUpdateSetting";

function UpdateSettingForm() {
    const {isLoading, settings: {breakfastPrice, maxBookingLength, maxGuestPerBooking, minBookingLength} = {}} =
        useSettings();
    const {updateSetting, isUpdating} = useUpdateSetting();

    if (isLoading) return <Spinner />;

    function handleUpdate(e, field) {
        const {value, defaultValue} = e.target;
        // console.log(e)
        if (!value || value == defaultValue) return;
        //if value exit then update the setting
        updateSetting({[field]: value});
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestPerBooking}
                    onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                    disabled={isUpdating}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingForm;
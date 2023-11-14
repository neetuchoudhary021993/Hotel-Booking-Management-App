import React from "react";
import Row from '../ui/Row';
import Heading from '../ui/Heading';
import UpdateSettingForm from "../features/settings/UpdateSettingForm";

function Settings() {
    return (
        <Row>
            <Heading as="h1">Update Hotel Settings</Heading>
            <UpdateSettingForm />
        </Row>
    );
}

export default Settings;

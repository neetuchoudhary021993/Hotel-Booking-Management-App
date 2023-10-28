import React, {useEffect, useState} from "react";
import {getCabins} from "../services/apiCabins";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
    const [showForm, setShowForm] = useState(false)
    // useEffect(()=> {
    //   getCabins().then(data => console.log(data))
    // }, [])
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>
            <Row>
                <CabinTable />
                <Button onClick={()=> setShowForm(!showForm)}>Add new cabin</Button>
                {showForm && <CreateCabinForm/>}
            </Row>
        </>
    );

}

export default Cabins;

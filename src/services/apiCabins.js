import supabase from "./Supabse";

//React Query

export async function getCabins() {
    //read operation
    //read the data
    let {data, error} = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    } else {
        return data;
    }
}

export async function deleteCabins(id) {
    //delete operation
    //delete the data

    const {data, error} = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    } else {
        return data;
    }
}

export async function createCabin(newCabin) {
    //create operation
    //insert/add the data or cabins

    const {data, error} = await supabase.from("cabins").insert([newCabin]).select();
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    } else {
        return data;
    }
}

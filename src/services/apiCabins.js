
import supabase, {supabaseUrl} from "./Supabse";

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

export async function createEditCabin(newCabin, id) {
    console.log("CabinImage", newCabin.image)
    //insert/add the data or cabins
    const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "");
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");
    //1. create
    if (!id) {
        query = query.insert([{...newCabin, image: imagePath}]);
    }
    //2. edit
    if (id) {
        query = query.update({...newCabin, image: imagePath}).eq("id", id);
    }

    const {data, error} = await query.select().single();
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    //1.1 upload the file image
    //https://ghyfwjiwsgsdjnbgmnvf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-10-28T16%3A58%3A39.337Z

    const {storageError} = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error("Cabin Image could not be uploaded and the cabin was not created");
    }
    return data;
}

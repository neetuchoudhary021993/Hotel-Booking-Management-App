import supabase from "./Supabse";

//React Query
export async function getCabins() {
    let {data, error} = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    } else {
        return data;
    }
}

import supabase from "./Supabse";

export async function getSettings() {
    let {data, error} = await supabase.from("settings").select("*").single();

    if (error) {
        console.error(error);
        throw new Error("Setting could not be loaded");
    }
    return data;
}

export async function updateSetting(newSetting) {
    const {data, error} = await supabase.from("settings").update(newSetting).eq("id", 1).single();
    if (error) {
        console.error(error);
        throw new Error("Setting could not be updated");
    }
    return data;
}

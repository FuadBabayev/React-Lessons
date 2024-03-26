import supabase from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.warn(error);
        throw new Error('Cabins could not be loaded');
    }
    return data;
}

// ! API Docs/cabins/Read rows   and COPY link
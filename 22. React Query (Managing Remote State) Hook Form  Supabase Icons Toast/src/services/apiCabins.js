import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.warn(error);
        throw new Error('Cabins could not be loaded');
    }
    return data;
}

// Todo: Bunu etmezden evvel https://supabase.com/dashboard/project/ppmcqelguajxxpjhuztd/auth/policies insert ucun izin ver (expressiona true yaz)
export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // ? https://ppmcqelguajxxpjhuztd.supabase.co/storage/v1/object/public/cabin-images/0.07258043113683321-cabin-004.jpg

    // * 1. Create/Edit Cabin
    let query = supabase.from('cabins');

    // Create
    if(!id) query = query.insert([{...newCabin, image : imagePath}]); // const { data, error } = await supabase.from('cabins')
    // Edit
    if(id) query = query.update({...newCabin, image : imagePath}).eq('id', id);
    
    const { data, error } = await query.select().single();
    // const { data, error } = await supabase.from('cabins').insert([{...newCabin, image : imagePath}]).select().single();

    if (error) {
        console.warn(error);
        throw new Error('Cabins could not be created');
    }

    // * 2. Upload Image
    if(hasImagePath) return data;
    const { error : storageError } = await supabase
        .storage    
        .from('cabin-images')
        .upload(imageName, newCabin.image );

    // * 3. Delete Cabin if there was an error uploading image
    if(storageError){
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
            console.warn(storageError);
            throw new Error('Cabins image could not be uploaded and the cabin was not created'); 
    }
    return data;
}

// Todo: Bunu etmezden evvel https://supabase.com/dashboard/project/ppmcqelguajxxpjhuztd/auth/policies delete ucun izin ver (expressiona true yaz)
export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)                // ! Cabins tablesindeki "id" columun paramt kimi gelen id olan setri silsin

    if (error) {
        console.warn(error);
        throw new Error('Cabins could not be deleted');
    }
    return data;

}

// ! API Docs/cabins/Read rows   and COPY link
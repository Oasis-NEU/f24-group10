import { createClient } from "@supabase/supabase-js";
const privateKey = import.meta.env.VITE_SUPABSE_ANON_KEY;
const VITE_SUPABSE_URL = 'https://tutnizjkuflqechjvxoo.supabase.co'
export const supabase = createClient(VITE_SUPABSE_URL, privateKey);


let globaldata;
/*
async function loadData() {
    const { data, error } = await supabase
      .from('recipes')  // Replace with your table name
      .select('*');  // Replace with specific columns if needed

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        globaldata = data;  // Assign the data to globaldata
    }
}

async function processIngredients() {
    await loadData();  

    if (globaldata) {
      const ingredientNames = globaldata.map(item => item.ingredientName);
      return ingredientNames
    }
  else {
        console.log('No data available.');
    }
}
async function uploadData() {
  await loadData();
  let i = 1
  for(const item of ingredients) {
    const {  error } = await supabase
    .from('ingredient') // Replace with your actual table name
    .insert([{
      ingredientId: i,
      ingredientName: item
    }]);
  i++
  }

  if (error) {
    console.error('Error uploading data:', error);
  } else {
    console.log('Data successfully uploaded:', data);
  }
}
*/



// filter, upload, delete, update, add to frontend
//

// Call the function to load and process the data

export async function delete_ingredient(ingredient) {
  const { data, error } = await supabase
    .from('ingredient')
    .delete()
    .eq('ingredientName', ingredient);

  if (error) {
    throw new error
  } else {
    return "Ingredient deleted successfully!"
  }
}



export async function upload_ingredient(ingredient) {
  const { data, count, error } = await supabase
  .from('ingredient')
  .select('*', { count: 'exact' });


  const all_ingredients = []
  data.forEach(i => {
    all_ingredients.push(i.ingredientName)
  })
  if (all_ingredients.includes(ingredient)) {
    throw new error 
  } else {
    const update_count = count + 1
    const { error2 } = await supabase
    .from('ingredient')
    .insert([{
      ingredientId: update_count,
      ingredientName: ingredient
    }]);
    return "Recipe has been uploaded!"
  }

}




export async function see_all_data() {
  const { data, error } = await supabase
      .from('recipes')  // Replace with your table name
      .select('*') // Replace with specific columns if needed
      .contains('ingredientsIds', { ingredientIds: [2] });
      //await loadData();
  /*
  if (globaldata) {
    data = globaldata[0]
    id = data.recipeId
    ingredient = data.ingredients.ingredients
    instructions = data.instructions.instructions
    Ids = data.ingredientsIds.ingredientIds
    recipeName = data.recipeName
    image = data.Image_Name
      console.log(id); 
      console.log(ingredient);
      console.log(instructions); 
      console.log(Ids); 
      console.log(recipeName); 
      console.log(image);  // Will show the array content
  } else {
    console.log("No data")
  }
  */
  console.log(data)
  console.log(error)

}

export async function ingredients_to_IDs(ingredients) {
  const Ids = []
  for (const ingredient of ingredients) {
    const { data, error } = await supabase
      .from('ingredient')
      .select('ingredientId')
      .eq('ingredientName', ingredient); // Use .eq here to match a single ingredient name

    if (error) {
      console.error('Error fetching ingredient ID:', error);
    } else if (data && data.length > 0) {
      Ids.push(data[0].ingredientId); // Push only the ingredientId
    }
  }
  return Ids
}

export async function get_all_recipes(ingredient_ids) {
  const ids = await ingredients_to_IDs(ingredient_ids);
  const { data, error } = await supabase
      .from('recipes')  // Replace with your table name
      .select('*') // Replace with specific columns if needed
      .contains('ingredientsIds', { ingredientIds: ids });
  
  if (error) {
    console.log(error)
  } else {
    //console.log(data)
  }
  console.log("data",data);
  const all_recipes = []
  console.log("all_recipes",all_recipes);
  /*data.map(recipe =>  {
    ingredient = recipe.ingredients.ingredients
    instructions = recipe.instructions.instructions
    recipeName = recipe.recipeName
    image = recipe.Image_Name
    const this_recipe = []
    const no_duplicate_ingredient = [...new Set(ingredient)];
    console.log(this_recipe);
    this_recipe.push(recipeName,image,no_duplicate_ingredient,instructions);
    console.log(this_recipe);
    all_recipes.push(this_recipe);
  });
  console.log("all_recipes2",all_recipes);
console.log(all_recipes);*/
return data;
  
}



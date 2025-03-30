
'use client'

import { useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

// Define types for the Recipe and Response
interface Ingredient {
  text: string; // Ingredient text
}

interface Recipe {
  label: string;
  image: string;
  calories: number;
  ingredientLines: string[]; // ingredientLines should be string[]
}

export const RecipeGenerator: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Store recipes as an array of Recipe objects
  const [search, setSearch] = useState<string>(""); // Store the search term
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Selected recipe or null
  const APP_ID = "175f0b77"; // API credentials
  const APP_KEY = "82d4f25cd0a053f1aeddcec159a0cdfb"; // API credentials

  // Generate recipe function
  const generateRecipe = async () => {
    try {
      const response = await axios.get(`http://edamam.com/results/recipes/?search=${search}`);
      
      if (response.data.hits.length > 0) {
        const fetchedRecipes = response.data.hits.map((hit: any) => ({
          label: hit.recipe.label,
          image: hit.recipe.image,
          calories: hit.recipe.calories,
          ingredientLines: hit.recipe.ingredientLines,
        }));
        setRecipes(fetchedRecipes); // Store the fetched recipes
      }
    } catch (error) {
      console.error("Failed to fetch recipe", error);
    }
  };

  // Open modal with selected recipe
  const openModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe); // Set selected recipe
  };

  const closeModal = () => {
    setSelectedRecipe(null); // Reset selected recipe
  };

  return (
    <div className="container mt-3 mx-auto">
      {/* Search input and button */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col mr-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-md"
            placeholder="Search for a recipe"
          />
        </div>

        <div className="flex flex-col">
          <button
            onClick={generateRecipe}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
          >
            Generate Recipe
          </button>
        </div>
      </div>

      {/* Recipes or "No Recipes found" message */}
      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No Recipes found</p>
      ) : (
        <RecipeCard
          recipes={recipes} // Pass recipes to RecipeCard
          openModal={openModal} // Handle modal opening
          closeModal={closeModal} // Handle modal closing
          selectedRecipe={selectedRecipe} // Pass selected recipe to display in modal
        />
      )}
    </div>
  );
};

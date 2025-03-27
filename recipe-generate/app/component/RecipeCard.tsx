import React from 'react';

interface Ingredient {
  text: string;
}

interface Recipe {
  label: string;
  image: string;
  calories: number;
  ingredientLines: string[]; // Changed to string[] based on your original description
}

interface RecipeCardProps {
  recipes: Recipe[]; // Change to directly use Recipe[]
  openModal: (recipe: Recipe) => void;
  closeModal: () => void;
  selectedRecipe: Recipe | null;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipes, openModal, closeModal, selectedRecipe }) => {
  return (
    <div className="flex flex-wrap">
      {recipes.map((recipe) => {
        return (
          <div key={recipe.label} className="flex flex-col mb-3 w-1/4 p-2">
            <div className="max-w-sm">
              <img
                src={recipe.image}
                className="h-[200px] object-cover w-full"
                alt={recipe.label}
              />
              <div className="p-2">
                <h5 className="text-xl font-semibold">{recipe.label}</h5>
                <p>Calories: {recipe.calories.toFixed(2)}</p>
                <button
                  className="border bg-green-500 text-white rounded p-2 mt-2"
                  onClick={() => openModal(recipe)}
                >
                  View Ingredients
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal for displaying ingredients */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h5 className="text-xl font-semibold">Ingredients</h5>
              <button onClick={closeModal} className="text-xl">&times;</button>
            </div>
            <div className="modal-body mt-4">
              <ul>
                {selectedRecipe.ingredientLines.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;

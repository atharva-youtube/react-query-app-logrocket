import React from "react";
import { useQuery, useQueryClient } from "react-query";

import Button from "./Button";

import { fetchRecipes, fetchRecipe } from "../queries";

export default function Recipes({ setActiveRecipe }) {
  const { data, isFetching } = useQuery("Recipes", fetchRecipes);
  const queryClient = useQueryClient();

  console.log(data);

  return (
    <div>
      <h2>
        Recipes List <br />
        {isFetching ? (
          "Loading"
        ) : (
          <Button
            onClick={() => {
              queryClient.refetchQueries("Recipes");
            }}
          >
            Refesh Recipes
          </Button>
        )}
      </h2>
      {data.map((Recipe) => (
        <p key={Recipe.title}>
          {Recipe.title}
          <Button
            onClick={async () => {
              // Prefetch the Recipe query

              await queryClient.prefetchQuery({
                queryKey: ["Recipe"],
                queryFn: fetchRecipes,
                initialData: { id: Recipe.id },
              });
              setActiveRecipe(Recipe.id);
            }}
          >
            Load Recipe
          </Button>{" "}
        </p>
      ))}
    </div>
  );
}

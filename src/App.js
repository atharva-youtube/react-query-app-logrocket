import logo from "./logo.svg";
import React, { lazy } from "react";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider as ReactQueryConfigProvider,
} from "react-query";

const Recipes = lazy(() => import("./components/Recipes"));
const Recipe = lazy(() => import("./components/Recipe"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  const [activeRecipe, setActiveRecipe] = React.useState(null);

  return (
    <React.Fragment>
      <h2>Fast Recipes</h2>
      <hr />
      <ReactQueryConfigProvider client={queryClient}>
        <React.Suspense fallback={<h1> Loading ...</h1>}>
          {activeRecipe ? (
            <Recipe
              activeRecipe={activeRecipe}
              setActiveRecipe={setActiveRecipe}
            />
          ) : (
            <Recipes setActiveRecipe={setActiveRecipe} />
          )}
        </React.Suspense>
      </ReactQueryConfigProvider>
    </React.Fragment>
  );
}

export default App;

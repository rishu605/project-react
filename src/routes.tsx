import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CharacterDetailsView from "./components/CharacterDetailsView";
import CharacterListView from "./components/CharacterListView";
import FavouritesView from "./components/FavouritesView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CharacterListView/>,
  },
  {
    path: "/favourites",
    element: <FavouritesView/>
  },
  {
    path: '/:id',
    element: <CharacterDetailsView/>
  }
]);

export default router
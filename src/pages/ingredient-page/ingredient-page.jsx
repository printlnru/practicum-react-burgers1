import IngridientDetails from "../../components/ingredient-details/ingredient-details";

import { useLocation } from "react-router-dom";

export default function IngredientPage() {

     const location = useLocation();
  // const locationState = location.state;
  // const background = locationState && locationState.background;

  return (
    <div>
      <IngridientDetails />
    </div>
  );
}

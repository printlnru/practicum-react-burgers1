import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

import { useLocation } from "react-router-dom";

export default function IngredientPage() {
  const location = useLocation();

  return (
    <div>
      <IngredientDetails />
    </div>
  );
}

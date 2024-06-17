
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "..";

interface IProtectedRouteElement {
  element: JSX.Element
  onlyAuth: boolean;
}


export const ProtectedRouteElement : React.FC<IProtectedRouteElement> = ({ element, onlyAuth }) => {
  const { login } = useAppSelector((store) => store.auth);

  const location = useLocation();
  const from = location.state?.from || '/';

  //Если страница только для вошедших и мы не вошли
  if (onlyAuth && !login) return <Navigate to="/login"  state={{ from: location}} />;

  //Если страница только для не вошедших а мы вошли
  return !onlyAuth && login ? (
    <Navigate to={ from } />
  ) : (
    //иначе
    element
  );
};

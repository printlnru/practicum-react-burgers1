
import { Navigate } from "react-router-dom";
import { useAppSelector } from "..";

interface IProtectedRouteElement {
  element: JSX.Element
  onlyAuth: boolean;
}


export const ProtectedRouteElement : React.FC<IProtectedRouteElement> = ({ element, onlyAuth }) => {
  const { login } = useAppSelector((store) => store.auth);

  //Если страница только для вошедших и мы не вошли
  if (onlyAuth && !login) return <Navigate to="/login" replace />;

  //Если страница только для не вошедших а мы вошли
  return !onlyAuth && login ? (
    <Navigate to="/" replace />
  ) : (
    //иначе
    element
  );
};

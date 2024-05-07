import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRouteElement = ({ element, onlyAuth }) => {
  const { login } = useSelector((store) => store.auth);

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

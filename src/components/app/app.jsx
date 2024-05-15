import AppHeader from "../app-header/app-header";

import style from "./app.module.css";

import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";

import OrdersPage from "../../pages/orders-page/orders-page";
import OrderPage from "../../pages/order-page/order-page";

import IngredientPage from "../../pages/ingredient-page/ingredient-page";

import { NotFound404 } from "../../pages/not-found-404-page/not-found-404-page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ProtectedRouteElement } from "../protected-route";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { CURRENT_INGREDIENTS_UNLOAD } from "../../services/actions/current-ingredient";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function App() {
  const Wrapper = () => {
    const location = useLocation();
    const locationState = location.state;
    const background = locationState && locationState.background;


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeModalHandle = () => {
      dispatch({ type: CURRENT_INGREDIENTS_UNLOAD });
      navigate("/");
    };

    return (
      <>
        <AppHeader />
        <main className={style.parent}>
          <Routes>
            {/* главная страница, конструктор бургеров */}
            <Route path="/" element={<MainPage />} />
            {/* страница авторизации */}
            <Route
              path="/login"
              element={
                <ProtectedRouteElement
                  onlyAuth={false}
                  element={<LoginPage />}
                />
              }
            />
            {/* страница регистрации */}
            <Route
              path="/register"
              element={
                <ProtectedRouteElement
                  onlyAuth={false}
                  element={<RegisterPage />}
                />
              }
            />
            {/* страница восстановления пароля */}
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement
                  onlyAuth={false}
                  element={<ForgotPasswordPage />}
                />
              }
            />
            {/* страница сброса пароля */}
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement
                  onlyAuth={false}
                  element={<ResetPasswordPage />}
                />
              }
            />
            {/* страница с настройками профиля пользователя */}
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  onlyAuth={true}
                  element={<ProfilePage />}
                />
              }
            />
            {/* страница ингредиента */}
            {!background && (
              <Route path="/ingredients/:id" element={<IngredientPage />} />
            )}

            {/* Модальное окно ингредиента */}
            {background && (
              <Route
                path="/ingredients/:id"
                element={
                  <Modal
                    onCloseHandle={closeModalHandle}
                    title="Детали ингредиента"
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            )}

            {/* История заказов */}
            <Route
              path="/profile/orders"
              element={
                <ProtectedRouteElement
                  onlyAuth={false}
                  element={<OrdersPage />}
                />
              }
            />
            {/* Истории заказа */}
            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRouteElement
                  onlyAuth={false}
                  element={<OrderPage />}
                />
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
      </>
    );
  };

  const background = false;

  const dispatch = useDispatch();

  //const navigate = useNavigate();

  const closeModalHandle = () => {
    dispatch({ type: CURRENT_INGREDIENTS_UNLOAD });
  };

  return (
    <Router>
      <Wrapper />
    </Router>
  );
}

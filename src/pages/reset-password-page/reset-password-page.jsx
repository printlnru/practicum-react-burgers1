import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./reset-password-page.module.css";

import { resetPasswordAct } from "../../services/actions/auth";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    password: "",
    token: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAct(state));
  };

  const forgotDate = Date.parse(localStorage.getItem("forgot"));

  const today = new Date();

  var diffMs = today - forgotDate;
  //const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  if (!!!forgotDate || diffMins > 1) {
    //2 минуты на восстановление
    return <Navigate to={"/forgot-password"} />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="text_type_main-medium pb-6">Восстановление пароля</div>

        <div className="pb-6">
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            name={"password"}
            value={state.password}
          />
        </div>

        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            name={"token"}
            value={state.token}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>

        <div className="text_type_main-default text_color_inactive pt-20">
          Вспомнили пароль?
          <Link to="/login" className="pl-2">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

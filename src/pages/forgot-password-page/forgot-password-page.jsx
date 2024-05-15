import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./forgot-password-page.module.css";

import { forgotPasswordAct } from "../../services/actions/auth";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAct(state));
    localStorage.setItem("forgot", Date());
    navigate("/reset-password");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="text_type_main-medium pb-6">Восстановление пароля</div>

        <div className="pb-6">
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={handleChange}
            name={"email"}
            value={state.email}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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

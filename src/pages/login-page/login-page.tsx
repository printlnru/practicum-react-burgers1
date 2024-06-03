import { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { loginAct } from "../../services/actions/auth";

import styles from "./login-page.module.css";
import { useAppDispatch, useAppSelector } from "../..";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((store) => store.auth);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAct(state));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="text_type_main-medium pb-6">Вход</div>

        <div className="pb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange}
            name={"email"}
            value={state.email}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="pb-6">
          <PasswordInput
            onChange={handleChange}
            name={"password"}
            value={state.password}
          />
        </div>

        <Button htmlType="submit" size="medium">
          Войти
        </Button>

        {error && <div>Не удалось войти, попробуйте ещё раз...</div>}

        <div className="text_type_main-default text_color_inactive pt-20">
          Вы — новый пользователь?
          <Link to="/register" className="pl-2">
            Зарегистрироваться
          </Link>
        </div>

        <div className="text_type_main-default text_color_inactive pt-4">
          Забыли пароль?
          <Link to="/forgot-password" className="pl-2">
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  );
}

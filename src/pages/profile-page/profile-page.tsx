import { useState, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ProfileMenu from "../../components/profile-menu/profile-menu";
import style from "./profile-page.module.css";

import { getUserInfoAct, updateUserAct } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../..";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((store) => store.auth);

  const [state, setState] = useState({
    name: "",
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
    dispatch(updateUserAct(state));
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    setState({
      ...state,
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  useEffect(() => {
    dispatch(getUserInfoAct());
  }, []);

  useEffect(() => {
    setState({
      ...state,
      name: user.name,
      email: user.email,
    });
  }, [user]);

  return (
    <div className={style.center}>
      <div className={style.app}>
        <div className={style.col1}>
          <ProfileMenu />
        </div>
        <div className={style.col2}>
          <div className={style.container}>
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <div className="pb-6">
                <Input
                  type={"text"}
                  icon="EditIcon"
                  placeholder={"Имя"}
                  name={"name"}
                  value={state.name}
                  onChange={handleChange}
                  onPointerEnterCapture
                  onPointerLeaveCapture
                />
              </div>

              <div className="pb-6">
                <Input
                  type={"email"}
                  icon="EditIcon"
                  placeholder={"Логин"}
                  name={"email"}
                  value={state.email}
                  onChange={handleChange}
                  onPointerEnterCapture
                  onPointerLeaveCapture
                />
              </div>

              <div className="pb-6">
                <Input
                  type={"password"}
                  icon="EditIcon"
                  placeholder={"Пароль"}
                  name={"password"}
                  value={state.password}
                  onChange={handleChange}
                  onPointerEnterCapture
                  onPointerLeaveCapture
                />
              </div>

              {/* на дизайне кнопок нет, а по тексту описания они должны быть */}
              <Button
                htmlType="submit"
                type="primary"
                size="medium"
                style={{ margin: "10px" }}
              >
                Сохранить
              </Button>
              <Button
                htmlType="reset"
                type="primary"
                size="medium"
                style={{ margin: "10px" }}
              >
                Отменить
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

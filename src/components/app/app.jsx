import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// import myData from '../../utils/data.json';

import style from './app.module.css';

const API_BASE_PATH = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_METHOD_NAME = '/ingredients';

export default function App() {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(API_BASE_PATH + INGREDIENTS_METHOD_NAME)
      .then(res => res.json())
      .then(data => setState({ ...state, data: data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  const { data, isLoading, hasError } = state;

  return (
    <>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        data &&
        data.success &&
        data.data.length &&
        <>
          <AppHeader />
          <main className={style.parent}>
            <div className={style.col1}>
              <BurgerIngredients allIngredients={data.data} />
            </div>
            <div className={style.col2}>
              <BurgerConstructor />
            </div>
          </main>
        </>
      }
    </>
  );
}
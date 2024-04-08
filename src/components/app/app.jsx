import { useEffect, useState } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
//import { getIngredients } from '../../services/actions/ingredients';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import style from './app.module.css';

export default function App() {


  return (
    <>
      <AppHeader />
      <main className={style.parent}>
        <div className={style.col1}>
          <BurgerIngredients />
        </div>
        <div className={style.col2}>
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}
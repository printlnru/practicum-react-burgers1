import React from 'react'
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './burger-ingredients.module.css';

import GroupIngredients from './group-ingredients/group-ingredients'


import Modal from '../modal/modal';
import IngridientDetails from '../ingredient-details/ingredient-details';

import ingredientType from "../../utils/types";


export default function BurgerIngredients({allIngredients}) {

    const [visibleModal, setVisibleModal] = React.useState({visible: false, item: null});

    const onClickTab = (value) => {
        console.log(value);
        //Scroll to value here
    }

    const closeModalHandle = () => {
        console.log("fire closeModalHandle");
        setVisibleModal({...visibleModal, visible: false, item: null});
    }

    const showModal = (e) => {
        setVisibleModal({...visibleModal, visible: true, item: e})
        console.log(e)
      }

    const { visible, item } = visibleModal

    return (
        <>
            <div className={style.textleft}>
                <span className="text text_type_main-large">Соберите бургер</span>
            </div>
            <div className={style.tabs}>
                <Tab value="bread" active onClick={onClickTab}>Булки</Tab>
                <Tab value="sauces" onClick={onClickTab}>Соусы</Tab>
                <Tab value="filling" onClick={onClickTab}>Начинки</Tab>
            </div>
            {/* TODO не понятно как сделать скролл как в макете */}
            {/* {console.log(props)} */}
            <div className={style.ingredients}>
                <GroupIngredients selectedHandler={showModal} title="Булки" elements={allIngredients.filter(element => element.type === "bun")} />
                <GroupIngredients selectedHandler={showModal} title="Соусы" elements={allIngredients.filter(element => element.type === "sauce")} />
                <GroupIngredients selectedHandler={showModal} title="Начинки" elements={allIngredients.filter(element => element.type === "main")} />
            </div>

            {visible &&
                <Modal header='Детали ингредиента' onCloseHandle={closeModalHandle}>
                    <IngridientDetails data={item} />
                </Modal>}

            {/* {
                    this.props.data && this.props.data.filter(element => element.type === "bun").map(
                        (element) => (<GroupIngredients key={element.id} element={element} />)
                    )
                }

                {
                    this.props.data && this.props.data.filter(element => element.type === "sauce").map(
                        (element) => (<GroupIngredients key={element.id} element={element} />)
                    )
                }

                {
                    this.props.data && this.props.data.filter(element => element.type === "main").map(
                        (element) => (<GroupIngredients key={element.id} element={element} />)
                    )
                } */}

        </>
    )
}

BurgerIngredients.propTypes = {
    allIngredients: PropTypes.arrayOf(ingredientType.isRequired)
}
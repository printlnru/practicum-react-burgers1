
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './burger-ingredients.module.css';

import GroupIngredients from './group-ingredients/group-ingredients'


import Modal from '../modal/modal';
import IngridientDetails from '../ingredient-details/ingredient-details';

import ingredientType from "../../utils/types";

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

import { INGREDIENTS_CHANGE_ACTIVE_TAB } from '../../services/actions/ingredients';


export default function BurgerIngredients() {

    // Получаем метод dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())

    }, []);

    const { ingredients, ingredientsRequest, ingredientsFailed, activeTab } =
        useSelector(store => store.ingredients);

    const [visibleModal, setVisibleModal] = useState({ visible: false, item: null });

    const onClickTab = (value) => {
        //console.log(value);
        dispatch({ type: INGREDIENTS_CHANGE_ACTIVE_TAB, value })
        //TODO Scroll to value here
        const element = document.getElementById(value);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            console.log("nnn")
        }
    }

    const closeModalHandle = () => {
        setVisibleModal({ ...visibleModal, visible: false, item: null });
    }

    const showModal = (e) => {
        setVisibleModal({ ...visibleModal, visible: true, item: e })
    }

    const { visible, item } = visibleModal



    const generalRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const handleScroll = () => {
        const generalTop = generalRef.current.getBoundingClientRect().top;
        const bunDist = Math.abs(generalTop - bunRef.current.getBoundingClientRect().top)
        const sauceDist = Math.abs(generalTop - sauceRef.current.getBoundingClientRect().top)
        const mainDist = Math.abs(generalTop - mainRef.current.getBoundingClientRect().top)
        const minDist = Math.min(bunDist, sauceDist, mainDist);
        const value = minDist === bunDist ? 'bun' : minDist === sauceDist ? 'sauce' : 'main';
        if (value !== activeTab) {
            //console.log("newState = " + value);
            dispatch({ type: INGREDIENTS_CHANGE_ACTIVE_TAB, value })
        }
    }

    return (
        <>
            {ingredientsRequest && 'Загрузка...'}
            {ingredientsFailed && 'Произошла ошибка'}
            {!ingredientsRequest &&
                !ingredientsFailed &&
                ingredients &&

                <>
                    <div className={style.textleft}>
                        <span className="text text_type_main-large">Соберите бургер</span>
                    </div>
                    <div className={style.tabs}>
                        <Tab value="bun" active={activeTab === 'bun'} onClick={onClickTab}>Булки</Tab>
                        <Tab value="sauce" active={activeTab === 'sauce'} onClick={onClickTab}>Соусы</Tab>
                        <Tab value="main" active={activeTab === 'main'} onClick={onClickTab}>Начинки</Tab>
                    </div>
                    {/* TODO не понятно как сделать скролл как в макете */}
                    <div className={style.ingredients} onScroll={handleScroll} ref={generalRef}>
                        <GroupIngredients subRef={bunRef} id={'bun'} selectedHandler={showModal} title="Булки" elements={ingredients.filter(element => element.type === "bun")} />
                        <GroupIngredients subRef={sauceRef} id={'sauce'} selectedHandler={showModal} title="Соусы" elements={ingredients.filter(element => element.type === "sauce")} />
                        <GroupIngredients subRef={mainRef} id={'main'} selectedHandler={showModal} title="Начинки" elements={ingredients.filter(element => element.type === "main")} />
                    </div>

                    {visible &&
                        <Modal header='Детали ингредиента' onCloseHandle={closeModalHandle}>
                            <IngridientDetails data={item} />
                        </Modal>}

                </>}
        </>
    )
}

BurgerIngredients.propTypes = {
    allIngredients: PropTypes.arrayOf(ingredientType.isRequired)
}
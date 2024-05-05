import { useEffect } from 'react';
import style from "./ingredient-details.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';
import {CURRENT_INGREDIENTS_LOAD_AS_PAGE} from '../../services/actions/current-ingredient';

export default function IngridientDetails() {

    const data = useSelector(state => state.currentIngredient.ingredient)
    const { ingredients } = useSelector(store => store.ingredients);
   
    const dispatch = useDispatch();
    const location = useLocation();


    console.log(location);
    
    const id = location.pathname.split('/')[2];

    console.log(id);

    useEffect(() => {
        if (!data) {
            
            dispatch(getIngredients())
        }else{
            
        }
    }, []);

    useEffect(() => {


        if (!data) {
            var item = ingredients.find(e => e._id == id);
            dispatch({type: CURRENT_INGREDIENTS_LOAD_AS_PAGE, value: item})
        }


        
    }, [ingredients]);


    if (!data) return "Loading...";
    else
        return (
            <>
                <img className={style.image} src={data.image_large} alt={data.name} />
                <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
                <ul className={style.row}>
                    <li className={style.list_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
                    </li>
                    <li className={style.list_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
                    </li>
                    <li className={style.list_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
                    </li>
                    <li className={style.list_item}>
                        <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
                    </li>
                </ul>
            </>
        )
}
export const ORDER_CREATE = 'ORDER_CREATE';
export const ORDER_INPROGRESS = 'ORDER_INPROGRESS';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const ORDER_CLOSE = 'ORDER_CLOSE';


const API_BASE_PATH = 'https://norma.nomoreparties.space/api';
const ORDER_METHOD_NAME = '/orders';

export function createOrder(ingredients) {
    return function (dispatch) {

        dispatch({
            type: ORDER_INPROGRESS
        })

        //console.log(ingredients)

        fetch(API_BASE_PATH + ORDER_METHOD_NAME, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "ingredients": ingredients }) //ingredients
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else {
                    //console.log("ERROR 1")
                    return Promise.reject(`Error! Status code = ${res.status}`);
                }
            })
            .then(
                data => {
                    if (data.success) {
                        let orderNumber = data.order.number;

                        dispatch({
                            type: ORDER_SUCCESS,
                            value: orderNumber
                        })
                    }

                }
                    
            )
            .catch(e => {
                //console.log("ERROR 2")
                dispatch({
                    type: ORDER_FAILED
                })
            });
    }
};
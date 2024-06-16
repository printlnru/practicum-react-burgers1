import { TIngredient, TMessageOrder, TOrder, TStatus } from "./types";

export const formatDate = (date: Date): string => {
    let today: Date = new Date();
    let orderDate: Date = new Date(date);
    let hours: number = orderDate.getHours();
    let minutes: number = orderDate.getMinutes();

    let s_hours: string = hours < 10 ? "0" + hours : hours.toString();
    let s_minutes: string = minutes < 10 ? "0" + minutes : minutes.toString();

    let timeZone: number = orderDate.getTimezoneOffset() / 60;

    //console.log(timeZone);
    let s_timeZone: string =
      " i-GMT" + (timeZone > 0 ? timeZone : "+" + timeZone * -1);

    let msInDay: number = 24 * 60 * 60 * 1000;
    today.setHours(0, 0, 0, 0);
    orderDate.setHours(0, 0, 0, 0);
    let dif: number = (+today - +orderDate) / msInDay;

    let s_dif: string;
    if (dif === 0) s_dif = "Сегодня";
    else if (dif === 1) s_dif = "Вчера";
    else s_dif = dif + " дн. назад";

    return s_dif + ", " + s_hours + ":" + s_minutes + s_timeZone;
  };


  export const getStatusAsColor = (status: TStatus): string => {
    switch (status) {
      case "created":
        return "#FFFFFF";
      case "pending":
        return "#00CCCC";
      case "done":
        return "#FFFFFF";
    }
  };

  export const getStatusAsText = (status: TStatus): string => {
    switch (status) {
      case "created":
        return "В работе";
      case "pending":
        return "Готов к выдаче";
      case "done":
        return "Выполнен";
    }
  };

  export const totalCost = (ingredients: TIngredient[]): number => {
    let rv: number = 0;
    for (let i = 0; i < ingredients.length; i++) {
      rv += ingredients[i].price;
    }
    return rv;
  }

  export const IngredientId2IngredientMapper = (origin: string, ingredients: Array<TIngredient>) : TIngredient  => {
    const lookup =  ingredients.find((element: TIngredient) => element._id === origin);
    if (lookup === undefined) {
        throw new TypeError('The value was promised to always be there!');
    }
    return lookup;
  }


  export const MessageOrder2OrderMapper = (origin: TMessageOrder, ingredients: Array<TIngredient>): TOrder => {
    return {
      createdAt: origin.createdAt,
      ingredients: origin.ingredients.map((e) =>
        IngredientId2IngredientMapper(e,ingredients)
      ),
      name: origin.name,
      number: origin.number,
      owner: null,
      price: 1,
      status: origin.status,
      updatedAt: origin.updatedAt,
      _id: origin._id,
    };
  }
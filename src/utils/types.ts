export type TIngredient = {
  _id: string;

  calories: number;
  carbohydrates: number;
  fat: number;

  image: string;
  image_large: string;
  image_mobile: string;

  name: string;
  price: number;
  proteins: number;
  type: string;
};

export type TIngredientWithUid = TIngredient & { uid: string};

export type TForgotPassword = {
  email: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TLogin = {
  email: string;
  password: string;
}

export type TUpdateUser = TLogin & {
  name: string;
};

export type TUser = {
  name: string;
  email: string;
}

export type TMoveCardCallback = (dragIndex: number, hoverIndex: number) => void;

export type TUseDropHover = {
  index: number;
  type: 'card';
}


export type TUserInfoResult = {
  success: boolean,
  user: TUser
}


export type TOrder = {
  createdAt: string; // Date;
  ingredients: Array<TIngredient>;
  name: string;

  number: number;
  owner : any;
  price: number;
  status: string; //done
  updatedAt: string; // Date;
  _id: string;

}
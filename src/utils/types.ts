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

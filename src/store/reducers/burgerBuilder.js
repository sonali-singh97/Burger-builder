import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../Shared/utility";

const INGREDIENT_PRICES = {
  salad: 10,
  cheese: 20,
  meat: 50,
  bacon: 40,
};

const initialState = {
  ingredients: null,
  totalPrice: 20,
  error: false,
  building : false
};

const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.name]: state.ingredients[action.name] + 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updatedState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name],
    building : true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updateIng = { [action.name]: state.ingredients[action.name] - 1 };
  const updateIngs = updateObject(state.ingredients, updateIng);
  const updatedSt = {
    ingredients: updateIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name],
    building : true
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 20,
    error: false,
    building : false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

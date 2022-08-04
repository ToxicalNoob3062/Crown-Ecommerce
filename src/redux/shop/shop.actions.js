import ShopActionTypes from "./shop.types";
export const updateCollections = (shopdata) => {
  return {
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: shopdata,
  };
};

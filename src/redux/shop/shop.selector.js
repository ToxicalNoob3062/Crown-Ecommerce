import { createSelector } from "reselect";

export const selectShop = (state) => state.shop;
export const selectCollections = createSelector([selectShop], (shop) => {
  return shop.collections;
});
export const selectCollectionsForPreview = createSelector([selectCollections], (collections) => {
  return Object.values(collections);
});
export const selectCollection = (collectionUrlParams) => {
  return createSelector([selectCollections], (collections) => {
    return collections[collectionUrlParams];
  });
};

export const selectIsSelectionsLoaded = createSelector([selectShop], (shop) => !!shop.collections);

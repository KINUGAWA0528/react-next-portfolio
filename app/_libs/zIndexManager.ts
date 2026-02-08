export let currentZIndex = 10000;

export const getNextZIndex = () => {
  return ++currentZIndex;
};

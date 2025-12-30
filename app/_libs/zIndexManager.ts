export let currentZIndex = 1000;

export const getNextZIndex = () => {
  return ++currentZIndex;
};

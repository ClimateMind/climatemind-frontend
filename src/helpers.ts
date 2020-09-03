// Returns a random selection from an array
export const pickRandom: any = (arr: []) => {
  const len = arr.length;
  const randomIndex = Math.floor(Math.random() * len);
  return arr[randomIndex];
};

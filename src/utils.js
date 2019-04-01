const { floor, random } = Math

export const getRandomFloat = (min, max) => random() * (max - min) + min
export const getRandomInt = (min, max) => floor(random() * (max - min + 1) + min)
export const sample = arr => arr[floor(random() * arr.length)]

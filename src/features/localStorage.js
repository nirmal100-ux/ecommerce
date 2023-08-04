

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const setCart = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
}


export const getUser = () => {
  const user = localStorage.getItem('user');
  return user === null ? null : JSON.parse(user);
}

export const getCart = () => {
  const carts = localStorage.getItem('carts');
  return carts === null ? [] : JSON.parse(carts);
}


export const cartClear = () => {
  localStorage.removeItem('carts');
}


export const clearAll = () => {
  localStorage.clear();
}


const h = 90;
const l = 100;


export default { h, l };










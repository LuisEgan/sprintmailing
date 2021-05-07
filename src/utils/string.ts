export const numberWithDots = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

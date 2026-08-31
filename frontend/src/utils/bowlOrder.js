export const formatRupees = (amount) => {
  const value = Number(amount || 0);

  return `₹${value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};

export const getBowlIngredientLine = (item) => {
  if (!item?.isBowl || !Array.isArray(item.bowlIngredients)) {
    return "";
  }

  return item.bowlIngredients
    .map((ingredient) => {
      const quantity = Number(ingredient.quantity || 1);
      return `${ingredient.name} × ${quantity}`;
    })
    .join(", ");
};

export const isBowlItem = (item) => Boolean(item?.isBowl);

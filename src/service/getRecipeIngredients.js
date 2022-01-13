// / Logíca da função acessado : https://github.com/DanielHott/Pagina-de-Receitasj
export default function getFoodIngredients(ingredient) {
  const ingredientes = [];
  const vinte = 20;
  for (let i = 1; i <= vinte; i += 1) {
    ingredientes.push({
      name: ingredient[`strIngredient${i}`],
      quantity: ingredient[`strMeasure${i}`],
    });
  }
  return ingredientes.filter((ingredientWithMeasure) => ingredientWithMeasure.name);
}

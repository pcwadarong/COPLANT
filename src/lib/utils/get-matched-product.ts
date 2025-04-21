import { ProductPreview } from '@/types';
type AnswerMap = { [key: string]: string[] };

export function getBestMatchedProduct(
  products: ProductPreview[],
  answers: AnswerMap,
): ProductPreview | null {
  if (!products.length) return null;
  const scoredProducts = products.map((product) => {
    let score = 0;

    for (const key in answers) {
      const userValues = answers[key];
      const productValue =
        product.filters![key as keyof typeof product.filters];

      const productArray: string[] = Array.isArray(productValue)
        ? productValue
        : productValue
        ? [productValue]
        : [];

      score += userValues.filter((v) => productArray.includes(v)).length;
    }

    return {
      product,
      score,
    };
  });

  scoredProducts.sort(
    (a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id),
  );
  return scoredProducts[0]?.product ?? null;
}

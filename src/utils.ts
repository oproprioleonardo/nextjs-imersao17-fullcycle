import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Order, Product } from "./models";
import { URLSearchParams } from "url";

export function calculateTotal(
  items: { product: Product; quantity: number; attributes: any[] }[]
) {
  return items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
}

export function calculateTotalOrder(order: Order) {
  return order.items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
}

export function searchProducts(
  router: AppRouterInstance,
  search: string | undefined | null,
  category_id: string | undefined | null
) {
  let path = `/products`;

  const urlSearchParams = new URLSearchParams();
  if (search) {
    urlSearchParams.append("search", search);
  }
  if (category_id && category_id !== "0") {
    urlSearchParams.append("category_id", category_id);
  }
  if (urlSearchParams.toString()) {
    path += `?${urlSearchParams.toString()}`;
  }

  router.push(path);
}

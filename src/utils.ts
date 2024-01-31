import { Order, Product } from "./models";

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

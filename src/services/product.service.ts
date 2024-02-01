import { Product } from "@/models";

export class ProductService {
  async getProduct(productId: string): Promise<Product> {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/product/${productId}`,
      {
        next: {
          revalidate: 120,
        },
      }
    );
    return response.json();
  }

  async getProductsByIds(productsIds: string[]): Promise<Product[]> {
    const responses = await Promise.all(
      productsIds.map((productsId) =>
        fetch(`${process.env.CATALOG_API_URL}/product/${productsId}`, {
          next: {
            revalidate: 120,
          },
        })
      )
    );
    return Promise.all(responses.map((response) => response.json()));
  }

  async getProducts({
    search,
    category_id,
  }: {
    search: string | undefined;
    category_id: string | undefined;
  }): Promise<Product[]> {
    let url = `${process.env.CATALOG_API_URL}/product`;
    if (category_id) {
      url += `/category/${category_id}`;
    }

    const response = await fetch(url, {
      next: {
        revalidate: 120,
      },
    });

    let data = await response.json();
    data = !data ? [] : data;
    if (search) {
      return data.filter((product: Product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    return data;
  }
}

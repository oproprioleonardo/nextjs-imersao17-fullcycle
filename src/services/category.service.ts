import { Category } from "@/models";

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/category`, {
      next: {
        revalidate: 120,
      },
    });
    return response.json();
  }
}

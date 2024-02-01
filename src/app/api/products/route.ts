import { ProductService } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const productService = new ProductService();
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") as string;
  const category_id = searchParams.get("category_id") as string;
  const products = await productService.getProducts({ search, category_id });
  return NextResponse.json(products);
}

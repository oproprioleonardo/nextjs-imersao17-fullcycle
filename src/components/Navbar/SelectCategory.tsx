"use client";

import { Category } from "@/models";
import { searchProducts } from "@/utils";
import { FormControl, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSearchParams, useRouter } from "next/navigation";

export function SelectCategory({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category_id = searchParams.get("category_id");
  return (
    <FormControl size="small" sx={{ width: 200 }}>
      <Select
        // className="select-category"
        name="select-category"
        value={category_id || "0"}
        sx={{ backgroundColor: grey[400] }}
        onChange={(event) => {
          const search = searchParams.get("search");
          const category_id = event.target.value;
          searchProducts(router, search, category_id);
        }}
      >
        <MenuItem value="0">Todas as categorias</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

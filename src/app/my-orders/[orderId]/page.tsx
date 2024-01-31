import { Total } from "@/components/Total";
import { Order, OrderStatus } from "@/models";
import { calculateTotalOrder } from "@/utils";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const order: Order = {
  id: "1",
  status: OrderStatus.PENDING,
  created_at: new Date().toUTCString(),
  items: [
    {
      id: 1,
      product: {
        id: "1",
        name: "Produto 1",
        description: "Eita",
        price: 189.99,
        category_id: 1,
        image_url: "https://source.unsplash.com/random?product",
      },
      quantity: 1,
      price: 189.99,
    },
  ],
  total: 189.99,
};

async function MyOrderDetail({ params }: { params: { orderId: string } }) {
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {order.status === OrderStatus.PENDING ? (
                <Typography variant="h1" sx={{ color: "warning.main" }}>
                  ⌛
                </Typography>
              ) : order.status === OrderStatus.PAID ? (
                <Typography variant="h1" sx={{ color: "success.main" }}>
                  ✓
                </Typography>
              ) : (
                <Typography variant="h1" sx={{ color: "error.main" }}>
                  X
                </Typography>
              )}
            </Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {order.status === OrderStatus.PENDING
                ? "Pedido pendente"
                : order.status === OrderStatus.PAID
                ? "Pedido pago"
                : "Pedido cancelado"}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Resumo do pedido</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Qtd.</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.product.price)}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Total total={calculateTotalOrder(order)} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default MyOrderDetail;
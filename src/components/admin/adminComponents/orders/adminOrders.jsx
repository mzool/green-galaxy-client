import AllOrders from "./allOrders";
import { useState } from "react";
function AdminOrders() {
  /// what to do
  const [page, setPage] = useState("all orders");
  /// rendering
  return <div>{page === "all orders" && <AllOrders />}</div>;
}

export default AdminOrders;

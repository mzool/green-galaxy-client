import AdminStylesPage from "../style/adminStylesPage";
import { useState } from "react";

function AdminSittings() {
  /// to do
  const [page, setPage] = useState("theme");
  //// rendering
  return <div className="w-full p-4 h-fit">{page == "theme" && <AdminStylesPage />}</div>;
}

export default AdminSittings;

import AdminStylesPage from "../style/adminStylesPage";
import AdminEmailPage from "./adminEmailPage"
import { useState } from "react";

function AdminSittings() {
  /// to do
  const [page, setPage] = useState("theme");
  //// rendering
  return (
    <div className="w-full p-4 h-fit flex flex-col gap-10">
      <div className="flex flex-row gap-2 items-center justify-center">
        <button
          className="bg-gray-700 text-white rounded-md px-4 py-2"
          onClick={() => setPage("emails")}
        >
          emails
        </button>
        <button
          className="bg-gray-700 text-white rounded-md px-4 py-2"
          onClick={() => setPage("theme")}
        >
          theme
        </button>
        <button
          className="bg-gray-700 text-white rounded-md px-4 py-2"
          onClick={() => setPage("visits")}
        >
          visits
        </button>
      </div>
      {page == "theme" && <AdminStylesPage />}
      {page == "emails" && <AdminEmailPage />}
      {page == "visits" && "<visits />"}
    </div>
  );
}

export default AdminSittings;

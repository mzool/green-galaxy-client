import HomePageStyle from "./HomePageStyle";
import { useState } from "react";

function AdminStylesPage() {
  const [child, setChild] = useState("home");
  /// rendering
  return <div>
    {child == "home" && <HomePageStyle/>}
  </div>;
}

export default AdminStylesPage;

import { useState } from "react";
import ChatWithUser from "./chatWithUser";
function AdminUsers() {
    const [render, setRender] = useState("chat")
  return (
    <div>
        {render === "chat" && <ChatWithUser/>}
    </div>
  )
}

export default AdminUsers
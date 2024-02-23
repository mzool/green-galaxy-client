import { useState } from "react";
import SendDiscountEmail from "./sendDiscountEmail"
import SendBlogEmail from "./sendBlogEmail"
function MainMarketing() {
  const [section, setSection] = useState("send-discount");
  /// rendering
  return (
    <div className="flex flex-col w-full bg-white p-4 gap-6">
      {/* nav */}
      <div className="flex flex-row gap-4 bg-gray-700 text-white rounded-md p-2 items-center justify-center">
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600" onClick={()=>setSection("send-discount")}>
          send new discount email
        </button>
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600" onClick={()=>setSection("send-blog")}>
          send new blog email
        </button>
      </div>
      {/* body */}
      {section === "send-discount" && <SendDiscountEmail/>}
      {section === "send-blog" && <SendBlogEmail/>}
    </div>
  );
}

export default MainMarketing;

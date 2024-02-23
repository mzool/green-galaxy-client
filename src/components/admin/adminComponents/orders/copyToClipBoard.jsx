import React, { useState } from "react";

const CopyToClipboardSection = ({ content }) => {
  const [copied, setCopied] = useState(false);
console.log(content);
  // Function to copy text to clipboard
  const copyToClipboard = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        setCopied(true);
        // Reset copied state after a few seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  return (
    <div className="flex flex-col ">
      {content.map((id) => (
        <div key={id._id} className="flex flex-row gap-2 mb-4 items-center">
          <h2>{id.name}</h2>
          <div>{id._id}</div>
          <button className="bg-green-600 text-white rounded-md p-1" onClick={() => copyToClipboard(id._id)}>Copy item id</button>
        </div>
      ))}
      {copied && <span style={{ color: "green" }}>Copied!</span>}
    </div>
  );
};

export default CopyToClipboardSection;

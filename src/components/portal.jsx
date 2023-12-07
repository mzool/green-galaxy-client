// PortalComponent.jsx
import  { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PortalComponent = ({ children }) => {
  const portalRoot = document.getElementById("portal-root");
  const portalElement = useRef(document.createElement("div"));

  useEffect(() => {
    portalRoot.appendChild(portalElement.current);

    return () => {
      portalRoot.removeChild(portalElement.current);
    };
  }, [portalRoot]);

  return createPortal(children, portalElement.current);
};

export default PortalComponent;

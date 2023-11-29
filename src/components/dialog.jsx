import { useState, useEffect } from "react";

const Dialog = ({ isOpen, onClose, children }) => {
  const [dialogOpen, setDialogOpen] = useState(isOpen);

  useEffect(() => {
    setDialogOpen(isOpen);
  }, [isOpen]);

  const closeDialog = () => {
    setDialogOpen(false);
    onClose();
  };

  return (
    <>
      {dialogOpen && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeDialog}>
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;

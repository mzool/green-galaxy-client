import { FaCheckCircle } from "react-icons/fa";
import { useRef, useEffect } from "react";

const ThankYou = ({ orderNumber }) => {
  const thanksDialog = useRef(null);

  useEffect(() => {
    const dialog = thanksDialog.current;

    // Show the modal when component mounts
    dialog.showModal();

    // Add event listener for when the dialog is closed
    dialog.addEventListener("close", handleDialogClose);

    // Cleanup event listener when component unmounts
    return () => {
      dialog.removeEventListener("close", handleDialogClose);
    };
  }, []);

  const handleDialogClose = () => {
    // Change the window location when the dialog is closed
    window.location.href = "/";
  };

  // Rendering
  return (
    <dialog ref={thanksDialog} className="p-2 rounded-md ">
      <div className="container mx-auto mt-8 text-center flex flex-col gap-2 p-4">
        <FaCheckCircle className="text-green-500 text-5xl mb-4" />
        <h1 className="text-3xl font-semibold mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed. We appreciate your business!
        </p>
        <p>your order number: {orderNumber}</p>
        <p>you can use order number for track your order</p>
        <p>Invoice will be available after order completed </p>
      </div>
      <button
        className="bg-teal-500 text-white p-2 rounded-md text-md w-full"
        onClick={() => {
          // Close the dialog when the button is clicked
          thanksDialog.current.close();
        }}
      >
        home page
      </button>
    </dialog>
  );
};

export default ThankYou;

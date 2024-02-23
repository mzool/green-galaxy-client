import { useState } from "react";

function NewReturn({ setToDo }) {
  const [order_id, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [images, setImages] = useState([]);
  const [refund, setRefund] = useState({
    type: "",
    value: "",
    date: "",
    method: "",
  });
  const [shipping, setShipping] = useState({
    cost: "",
    method: "",
    address: "",
  });
  const [itemId, setItemId] = useState("");
  const [loading, setLoding] = useState(false);
  const [condition, setCondition] = useState("");
  /// when upload a file
  function getImgsUploaded(e) {
    let images = [];
    let keys = Object.keys(e.target.files);
    keys.map((key) => {
      images.push(e.target.files[key]);
    });
    setImages(images);
  }
  /// handle return function
  function handleReturn(e) {
    e.preventDefault();
    setLoding(true);
    let formData = new FormData();
    /// handle images post
    images.forEach((img) => {
      formData.append("images", img);
    });
    formData.append("order_id", order_id);
    itemId ? formData.append("itemId", itemId) : null;
    formData.append("email", email);
    formData.append("reason", reason);
    formData.append("adminNotes", adminNotes);
    formData.append("refundType", refund.type);
    formData.append("refundValue", refund.value);
    formData.append("refundDate", refund.date);
    formData.append("refundMethod", refund.method);
    formData.append("shippingCost", shipping.cost);
    formData.append("shippingAddress", shipping.address);
    formData.append("shippingMethod", shipping.method);
    formData.append("customerNotes", customerNotes);
    formData.append("condition", condition);
    /// fetch the server
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_new_return
      }`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        setLoding(false);
        setToDo("get-all");
      });
  }
  /// rendering
  return (
    <div className="w-full p-10 bg-gray-100 rounded-md">
      <form
        className="p-4 w-full flex flex-col gap-2"
        onSubmit={(e) => handleReturn(e)}
      >
        {/* order id */}
        <label htmlFor="order_id">order id:</label>
        <input
          type="text"
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          id="order_id"
          value={order_id}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        {/* item id */}
        <label htmlFor="itemId">
          Item Id: (if user want to return one item from order has multi items)
        </label>
        <input
          type="text"
          id="itemId"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
        />
        {/* userEmail */}
        <label htmlFor="email">user email:</label>
        <input
          type="email"
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* reason */}
        <label htmlFor="reason">reason for return:</label>
        <input
          type="text"
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        {/* customer notes */}
        <label htmlFor="c_notes">customer notes or description:</label>
        <input
          type="text"
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
          id="c_notes"
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
        />
        {/* admin notes */}
        <label htmlFor="a_notes">admin notes or description:</label>
        <input
          type="text"
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
          id="a_notes"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
        />
        {/* shipping */}
        <label htmlFor="shippingCost">shipping cost:</label>
        <input
          id="shippingCost"
          type="number"
          step={"any"}
          value={shipping.cost}
          onChange={(e) =>
            setShipping((pr) => ({ ...pr, cost: e.target.value }))
          }
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
        />
        <label htmlFor="shippingAddress">shipping Address:</label>
        <input
          id="shippingAddress"
          type="text"
          value={shipping.address}
          onChange={(e) =>
            setShipping((pr) => ({ ...pr, address: e.target.value }))
          }
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
        />
        <label htmlFor="shippingMethod">shipping Method:</label>
        <input
          id="shippingMethod"
          type="text"
          value={shipping.method}
          onChange={(e) =>
            setShipping((pr) => ({ ...pr, method: e.target.value }))
          }
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
          required
        />
        {/* refund type */}
        <label htmlFor="refundType">Refund type:</label>
        <select
          name="refundType"
          id="refundType"
          value={refund.type}
          onChange={(e) => setRefund((pr) => ({ ...pr, type: e.target.value }))}
          className="rounded-md px-4 py-2 outline-0 hover:border-green-600 border focus:border-green-600"
          required
        >
          <option value="">select refund type</option>
          <option value="refund">refund</option>
          <option value="exchange">exchange</option>
          <option value="store_credit">store_credit</option>
        </select>
        {/* refund value*/}
        <label htmlFor="refundValue">refund value:</label>
        <input
          type="number"
          step={"any"}
          id="refundValue"
          required
          value={refund.value}
          onChange={(e) =>
            setRefund((pr) => ({ ...pr, value: e.target.value }))
          }
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
        />
        <label htmlFor="refundMethod">
          refund method: (cash, bank transfer....)
        </label>
        <input
          id="refundMethod"
          type="text"
          required
          value={refund.method}
          onChange={(e) =>
            setRefund((pr) => ({ ...pr, method: e.target.value }))
          }
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
        />
        <label htmlFor="refundDate">refund date:</label>
        <input
          id="refundDate"
          type="date"
          required
          value={refund.date}
          onChange={(e) => setRefund((pr) => ({ ...pr, date: e.target.value }))}
          className="outline-0 hover:border-green-600 border focus:border-green-600 px-4 py-2 rounded-md "
        />
        {/* condition */}
        <label htmlFor="condition">item condition:</label>
        <select
          name="condition"
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="rounded-md px-4 py-2 outline-0 hover:border-green-600 border focus:border-green-600"
          required
        >
          <option value="">select item condition</option>
          <option value="new">new</option>
          <option value="damaged">damaged</option>
          <option value="opened">opened</option>
          <option value="used">used</option>
        </select>
        {/* images */}
        <label htmlFor="images">Upload Images that user send:</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          required
          onChange={getImgsUploaded}
        />
        {/* submit */}
        <input
          type="submit"
          value="new return"
          className={`${
            loading
              ? "bg-gray-200 text-black"
              : "bg-gray-700 text-white hover:bg-gray-500"
          } rounded-md px-4 py-2 m-2`}
          disabled={loading}
        />
        {loading && (
          <div className="border-b-2 border-t-2 border-green-600 animate-spin h-6 w-6 rounded-full place-self-center"></div>
        )}
      </form>
    </div>
  );
}

export default NewReturn;

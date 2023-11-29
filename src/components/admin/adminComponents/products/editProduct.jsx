import { useState } from "react";

function EditProduct(props) {
  /// get the products
  const product = props.product;
  /// messages values
  let [messages, setMsgs] = useState({
    instructions:
      "You can edit the product information by insert the new value in the required field, you can not edit the ID, review the inputs carefully before submitting because you can not restore the old data after.",
    msg: "",
    errMsg: "",
  });
  /// edit form values and handle submitting
  let [editValues, setEditvalues] = useState({
    productName: "",
    productDescription: "",
    productBrand: "",
    prductPrice: "",
    productCategory: "",
    productImgs: [],
    productColors: [],
    productSizes: [],
    productOtherVaients: [],
  });
  let [allColors, setAllColors] = useState([]);
  let [allSizes, setAllSizes] = useState([]);
  let [allVareints, setAllVarients] = useState([]);
  /// add color sizes and vari ents
  function _addColor() {
    setAllColors([...allColors, editValues.productColors]);
    setEditvalues({ ...editValues, productColors: [] });
  }
  function _addSize() {
    setAllSizes([...allSizes, editValues.productSizes]);
    setEditvalues({ ...editValues, productSizes: [] });
  }
  function _addVarients() {
    setAllVarients([...allVareints, editValues.productOtherVaients]);
    setEditvalues({ ...editValues, productOtherVaients: [] });
  }
  /// get images
  function getImgs(e) {
    let imgs = [];
    Object.keys(e.target.files).forEach((_img) => {
      imgs.push(e.target.files[_img]);
    });
    setEditvalues({ ...editValues, productImgs: imgs });
  }
  /// for rendering
  let [isFetching, setStartFetching] = useState(false);
  /// sumbit the edit form
  function submitEditedProduct(e) {
    /// prevent default and start fetching for rendering purposes
    e.preventDefault();
    setStartFetching(true);
    let formData = new FormData();
    /// control images
    editValues.productImgs.forEach((img)=>{
      formData.append("images", img)
    })
    /// all varients
    setEditvalues({
      ...editValues,
      productColors: allColors,
      productSizes: allSizes,
      productOtherVaients: allVareints,
    });
    /// other edit values
    Object.keys(editValues).forEach((key) => {
      if (key === "productImgs") return
      formData.append(key, editValues[key]);
    });
    /// fetching server
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_edit_product_admin
      }`,
      {
        method: "put",
        mode: "cors",
        credentials: "include",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  /// style
  let [style, setStyle] = useState({
    container:
      "h-fit min-h-screen w-full bg-white p-4 flex justify-center text-center flex flex-col border-2 border-zinc-200 rounded-lg gap-4",
    form: "flex flex-col gap-2  w-full h-fit p-4 items-center justify-start",
    innerDiv: "flex flex-col gap-2 w-full justify-center items-start",
    input:
      "outline-0 border-2 border-zinc-300 rounded-md w-full h-8 p-2 focus:border-2 focus:border-green-200",
    outerDiv: "border-b-2 border-zinc-300 h-fit w-full p-4",
    firstDiv: "grid grid-cols-2 w-full h-fit gap-4 ",
    messagesDiv:
      "w-full h-fit text-md rounded-md p-2 flex justify-start items-center flex flex-col gap-4",
    msgDiv:
      "text-green-500 bg-zinc-50 rounded-md p-4 w-full h-fit shadow-lg shadow-green-500 border-2 border-white ",
    errDiv:
      "text-red-500 bg-zinc-50 rounded-md p-4 w-full h-fit shadow-lg shadow-red-500 border-2 border-white",
    instructionsDiv:
      "text-green-700 bg-zinc-50 rounded-md p-4 w-full h-fit shadow-lg shadow-gray-500 border-2 border-white mb-10",
  });

  //// rendering
  return (
    <div className={style.container}>
      <div className={style.firstDiv}>
        <form className={style.form} onSubmit={submitEditedProduct}>
          {/* product id */}
          <div className={style.innerDiv}>
            <label htmlFor="productId">Product_ID</label>
            <input
              type="text"
              className={style.input}
              readOnly
              value={product.productId}
            />
          </div>
          {/* product name */}
          <div className={style.innerDiv}>
            <label htmlFor="name">Product Name:</label>
            <input
              id="name"
              type="text"
              className={style.input}
              value={editValues.productName}
              onChange={(e) =>
                setEditvalues({ ...editValues, productName: e.target.value })
              }
            />
          </div>
          {/* description */}
          <div className={style.innerDiv}>
            <label htmlFor="description">description:</label>
            <input
              id="description"
              type="text"
              className={style.input}
              value={editValues.productDescription}
              onChange={(e) =>
                setEditvalues({
                  ...editValues,
                  productDescription: e.target.value,
                })
              }
            />
          </div>
          {/* category */}
          <div className={style.innerDiv}>
            <label htmlFor="category">Product Category:</label>
            <input
              id="category"
              type="text"
              className={style.input}
              value={editValues.productCategory}
              onChange={(e) =>
                setEditvalues({
                  ...editValues,
                  productCategory: e.target.value,
                })
              }
            />
          </div>
          {/* brand */}
          <div className={style.innerDiv}>
            <label htmlFor="brand">Brand:</label>
            <input
              id="brand"
              type="text"
              className={style.input}
              value={editValues.productBrand}
              onChange={(e) =>
                setEditvalues({ ...editValues, productBrand: e.target.value })
              }
            />
          </div>
          {/* colors */}
          <div className={style.innerDiv}>
            <label htmlFor="colors">Colors:</label>
            <input
              id="colors"
              type="text"
              className={`${style.input} colors`}
              value={editValues.productColors}
              onChange={(e) =>
                setEditvalues({ ...editValues, productColors: e.target.value })
              }
            />
            <div>
              <button
                type="button"
                className="bg-green-500 rounded-md p-2 text-white"
                onClick={_addColor}
              >
                add color
              </button>
            </div>
          </div>
          {/* sizes */}
          <div className={style.innerDiv}>
            <label htmlFor="sizes">Sizes:</label>
            <input
              id="sizes"
              type="text"
              className={`${style.input} sizes`}
              value={editValues.productSizes}
              onChange={(e) =>
                setEditvalues({ ...editValues, productSizes: e.target.value })
              }
            />
            <div>
              <button
                type="button"
                className="bg-green-500 rounded-md p-2 text-white"
                onClick={_addSize}
              >
                add size
              </button>
            </div>
          </div>
          {/* other varient */}
          <div className={style.innerDiv}>
            <label htmlFor="otherVarients">Other Varients:</label>
            <input
              id="otherVarients"
              type="text"
              className={`${style.input} otherVarients`}
              value={editValues.productOtherVaients}
              onChange={(e) =>
                setEditvalues({
                  ...editValues,
                  productOtherVaients: e.target.value,
                })
              }
            />
            <div>
              <button
                type="button"
                className="bg-green-500 rounded-md p-2 text-white"
                onClick={_addVarients}
              >
                add varient
              </button>
            </div>
          </div>
          {/* price */}
          <div className={style.innerDiv}>
            <label htmlFor="Price">Price:</label>
            <input
              id="Price"
              type="text"
              className={`${style.input} Price`}
              value={editValues.prductPrice}
              onChange={(e) =>
                setEditvalues({
                  ...editValues,
                  prductPrice: e.target.value,
                })
              }
            />
          </div>
          {/* imgs */}
          <div className={style.innerDiv}>
            <label htmlFor="Images">Images:</label>
            <input
              id="Images"
              type="file"
              accept="images/*"
              className={`${style.input} Images`}
              multiple
              onChange={getImgs}
            />
          </div>
          <div className={style.innerDiv}>
            <input
              id="submit"
              type="submit"
              className="w-full sm:w-3/6 bg-green-500 text-white rounded-md hover:bg-green-400 place-self-center mt-4 p-2"
              value="edit product"
            />
          </div>
        </form>
        {/* messages div */}
        <div className={style.messagesDiv}>
          <div className={style.instructionsDiv}>
            <p>{messages.instructions}</p>
          </div>
          {messages.msg && (
            <div className={style.msgDiv}>
              <p>{messages.msg}</p>
            </div>
          )}
          {messages.errMsg && (
            <div className={style.errDiv}>
              <p>{messages.errMsg}</p>
            </div>
          )}
        </div>
      </div>
      <div className={style.outerDiv}>
        <form action="">edit</form>
      </div>
      <div className={style.outerDiv}>
        <form action="">delete</form>
      </div>
      <div className={style.outerDiv}>
        <form action="">add discount</form>
      </div>
    </div>
  );
}

export default EditProduct;

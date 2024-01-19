import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { AddProductSchema } from "../../../../validation/schemas";
import { useRef, useState } from "react";

const AddProduct = () => {
  /// my error handling
  let [err, setErr] = useState("");
  //// initial values
  const initialValues = {
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
    productStock: "",
    productBrand: "",
    productColors: [],
    productOtherVarients: [],
    productSizes: [],
  };
  ///// message
  const [msg, setMsg] = useState("");
  /// handle imgs upload
  let imgRef = useRef(null);
  let [imgs, setImgs] = useState([]);
  let [imgsErr, setImgsErr] = useState("");
  /// when the button clicked
  function openImgUploader() {
    imgRef.current.click();
  }
  /// when upload a file
  function getImgsUploaded(e) {
    let images = [];
    let keys = Object.keys(e.target.files);
    keys.map((key) => {
      images.push(e.target.files[key]);
    });
    setImgs(images);
  }
  //// styles classes
  const formStyleClasses = {
    containerDiv:
      "h-fit w-full p-6 flex items-center justify-center flex-col gap-6",
    form: "w-4/6 h-fit flex flex-col bg-gray-300 text-gray-800 gap-4 p-4 items-center justify-center",
    innerDivs: "w-full",
    fields:
      "w-full rounded-lg outline-0 p-2 border-2 hover:border-gray-800 focus:border-gray-800",
    errorComponent: "text-red-600",
  };
  const [startSubmitting, setSubmitting] = useState(false);
  //// handle submit
  const handleSubmit = (values, { resetForm }) => {
    setSubmitting(true);
    if (imgs.length === 0) {
      setImgsErr("Please upload product images");
      setSubmitting(false);
      return;
    } else {
      setImgsErr("");
    }
    let fileData = new FormData();
    /// handle images post
    imgs.forEach((img) => {
      fileData.append("images", img);
    });
    /// add values to form data
    for (let key of Object.keys(values)) {
      fileData.append(key, JSON.stringify(values[key]));
    }
    /// fetch the server
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_admin_add_product
      }`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `GreenBearer ${
            import.meta.env.VITE_authorization_token
          }`,
        },
        body: fileData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Validation error") {
          setErr(data.errors[0]);
          setSubmitting(false);
        } else if (data.error) {
          setErr(data.error);
          setSubmitting(false);
        } else {
          setErr("");
          setSubmitting(false);
          setMsg(data.message);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          /// clear the form
          resetForm();
          setImgs([]);
        }
      });
  };
  return (
    <div className={formStyleClasses.containerDiv}>
      {msg && (
        <div className="w-full bg-white p-2 text-center text-gray-600">
          {msg}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={AddProductSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={formStyleClasses.form}>
            {/* product name */}
            <div className={formStyleClasses.innerDivs}>
              <label htmlFor="productName" className={formStyleClasses.label}>
                Product Name:
              </label>
              <Field
                type="text"
                id="productName"
                name="productName"
                className={formStyleClasses.fields}
              />
              <ErrorMessage
                name="productName"
                component="div"
                className={formStyleClasses.errorComponent}
              />
            </div>
            {/* product description */}
            <div className={formStyleClasses.innerDivs}>
              <label
                htmlFor="productDescription"
                className={formStyleClasses.label}
              >
                Product Description:
              </label>
              <Field
                type="text"
                id="productDescription"
                name="productDescription"
                className={formStyleClasses.fields}
              />
              <ErrorMessage
                name="productDescription"
                component="div"
                className={formStyleClasses.errorComponent}
              />
            </div>
            {/* product Category */}
            <div className={formStyleClasses.innerDivs}>
              <label
                htmlFor="productCategory"
                className={formStyleClasses.label}
              >
                Product Categtegory:
              </label>
              <Field
                type="text"
                id="productCategory"
                name="productCategory"
                className={formStyleClasses.fields}
              />
              <ErrorMessage
                name="productCategory"
                component="div"
                className={formStyleClasses.errorComponent}
              />
            </div>
            {/* product Brand */}
            <div className={formStyleClasses.innerDivs}>
              <label htmlFor="productBrand" className={formStyleClasses.label}>
                Product Brand:
              </label>
              <Field
                type="text"
                id="productBrand"
                name="productBrand"
                className={formStyleClasses.fields}
              />
              <ErrorMessage
                name="productBrand"
                component="div"
                className={formStyleClasses.errorComponent}
              />
            </div>
            {/* product colors */}
            <FieldArray
              name="productColors"
              render={({ remove, push }) => (
                <div className={formStyleClasses.innerDivs}>
                  <label
                    htmlFor="productColors"
                    className={formStyleClasses.label}
                  >
                    Colors:
                  </label>
                  {values.productColors.map((color, index) => (
                    <div key={index}>
                      <Field
                        type="color"
                        name={`productColors.${index}`}
                        className={formStyleClasses.fields}
                      />
                      <button
                        className="rounded-lg bg-red-500 p-2 m-2 text-white hover:bg-red-700"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="rounded-lg bg-green-500 p-2 m-2 text-white hover:bg-green-700"
                    type="button"
                    onClick={() => push("")}
                  >
                    Add Color
                  </button>
                  <ErrorMessage
                    name="productColors"
                    component="div"
                    className={formStyleClasses.errorComponent}
                  />
                </div>
              )}
            />

            {/* sizes */}
            <FieldArray
              name="productSizes"
              render={({ remove, push }) => (
                <div className={formStyleClasses.innerDivs}>
                  <label
                    htmlFor="productSizes"
                    className={formStyleClasses.label}
                  >
                    Sizes:
                  </label>
                  {values.productSizes.map((size, index) => (
                    <div key={index}>
                      <Field
                        type="text"
                        name={`productSizes.${index}`}
                        className={formStyleClasses.fields}
                      />
                      <button
                        className="rounded-lg bg-red-500 p-2 m-2 text-white hover:bg-red-700"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="rounded-lg bg-green-500 p-2 m-2 text-white hover:bg-green-700"
                    type="button"
                    onClick={() => push("")}
                  >
                    Add Size
                  </button>
                  <ErrorMessage
                    name="productSizes"
                    component="div"
                    className={formStyleClasses.errorComponent}
                  />
                </div>
              )}
            />
            {/* product colors */}
            <FieldArray
              name="productOtherVarients"
              render={({ remove, push }) => (
                <div className={formStyleClasses.innerDivs}>
                  <label
                    htmlFor="productOtherVarients"
                    className={formStyleClasses.label}
                  >
                    Other Varients:
                  </label>
                  {values.productOtherVarients.map((varient, index) => (
                    <div key={index}>
                      <Field
                        type="text"
                        name={`productOtherVarients.${index}`}
                        className={formStyleClasses.fields}
                      />
                      <button
                        className="rounded-lg bg-red-500 p-2 m-2 text-white hover:bg-red-700"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="rounded-lg bg-green-500 p-2 m-2 text-white hover:bg-green-700"
                    type="button"
                    onClick={() => push("")}
                  >
                    Add Varient
                  </button>
                  <ErrorMessage
                    name="productOtherVarients"
                    component="div"
                    className={formStyleClasses.errorComponent}
                  />
                </div>
              )}
            />
            {/* price */}
            <div className={formStyleClasses.innerDivs}>
              <label htmlFor="productPrice" className={formStyleClasses.label}>
                product Price:
              </label>
              <Field
                type="number"
                id="productPrice"
                name="productPrice"
                className={formStyleClasses.fields}
              />
              <ErrorMessage
                name="productPrice"
                component="div"
                className={formStyleClasses.errorComponent}
              />
            </div>

            {/* stock */}
            <div className={formStyleClasses.innerDivs}>
              <label htmlFor="productStock" className={formStyleClasses.label}>
                Stock:
              </label>
              <Field
                type="number"
                id="productStock"
                name="productStock"
                className={formStyleClasses.fields}
              />
              <ErrorMessage
                name="productStock"
                component="div"
                className={formStyleClasses.errorComponent}
              />
            </div>
            {/* images */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="imgs" className={formStyleClasses.label}>
                Product Images:
              </label>
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition ease-in-out duration-300"
                onClick={openImgUploader}
                type="button"
              >
                Upload Images
              </button>
              <input
                id="imgs"
                name="imgs"
                ref={imgRef}
                type="file"
                className="hidden"
                onChange={getImgsUploaded}
                accept="image/*"
                multiple
              />
              {imgsErr && <div className="text-red-500 w-full ">{imgsErr}</div>}
            </div>
            {/* submit */}
            <div className={formStyleClasses.innerDivs}>
              <button
                disabled={startSubmitting}
                type="submit"
                className={`bg-teal-700 text-white p-2 mt-4 h-10 rounded w-full cursor-pointer hover:bg-teal-800 transition ease-in-out duration-300 ${
                  startSubmitting && "animate-pulse opacity-50"
                }`}
              >
                {startSubmitting ? "adding new product..." : "Add Product"}
              </button>
            </div>
            {err && <div className="text-red-500">{err}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;

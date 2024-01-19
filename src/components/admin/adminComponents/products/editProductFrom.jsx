import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useRef } from "react";
function EditProductFrom({ initialValues, handleSubmit, id, setImgs, msg, isFetching }) {
  ///
  const imagesInput = useRef(null);
  /// style
  const style = {
    field:
      "mt-1 p-2 flex-1 border rounded-md focus:outline-none focus:border-green-400",
  };
  //// get images
  function getImages(e) {
    const allImages = e.target.files;
    for (const image in allImages) {
      if (typeof allImages[image] == "object"){
        setImgs((prev) => [...prev, allImages[image]]);
      }
    }
  }

  /// rendering
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="flex flex-col gap-4">
            {/* ... product ID ... */}
            <Field type="text" readOnly className={style.field} value={id} />
            {/* product name */}
            <Field
              type="text"
              name="productName"
              className={style.field}
              placeholder="New Product name"
            />
            {/* description */}
            <Field
              type="text"
              name="productDescription"
              className={style.field}
              placeholder="New Product description"
            />
            {/* price */}
            <Field
              type="number"
              name="productPrice"
              className={style.field}
              placeholder="New Product Price"
            />
            {/* stock */}
            <Field
              type="number"
              name="productStock"
              className={style.field}
              placeholder="New Product Stock"
            />
            {/* category */}
            <Field
              type="text"
              name="productCategory"
              className={style.field}
              placeholder="New Product Category"
            />
            {/* productBrand */}
            <Field
              type="text"
              name="productBrand"
              className={style.field}
              placeholder="New Product Brand"
            />
            {/*productDiscount  */}
            <Field
              type="number"
              name="productDiscount"
              className={style.field}
              placeholder="New Product Discount"
            />
            {/* newProduct */}
            <div className="flex flex-row gap-6">
              <label htmlFor="newProduct">Make this Product New Added:</label>
              <Field type="checkbox" name="newProduct" className="h-6 w-6" />
            </div>
            {/* isMadeToOrder */}
            <div className="flex flex-row gap-6">
              <label htmlFor="isMadeToOrder">Is Made To Order:</label>
              <Field type="checkbox" name="isMadeToOrder" className="h-6 w-6" />
            </div>
            {/* sizes */}
            <div className="mb-4">
              <label
                htmlFor="sizes"
                className="block text-sm font-medium text-gray-600"
              >
                Sizes:
              </label>
              <FieldArray name="sizes">
                {({ push, remove }) => (
                  <div>
                    {values.sizes &&
                      values.sizes.map((size, index) => (
                        <div key={index} className="flex items-center">
                          <Field
                            type="text"
                            name={`sizes[${index}]`}
                            className={style.field}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 bg-green-500 text-white rounded-md p-2"
                    >
                      Add Size
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            {/* otherVarients */}
            <div className="mb-4">
              <label
                htmlFor="otherVarients"
                className="block text-sm font-medium text-gray-600"
              >
                otherVarients:
              </label>
              <FieldArray name="otherVarients">
                {({ push, remove }) => (
                  <div>
                    {values.otherVarients &&
                      values.otherVarients.map((varient, index) => (
                        <div key={index} className="flex items-center">
                          <Field
                            type="text"
                            name={`otherVarients[${index}]`}
                            className={style.field}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 bg-green-500 text-white rounded-md p-2"
                    >
                      Add Varient
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            {/* Colors FieldArray */}
            <div className="mb-4">
              <label
                htmlFor="colors"
                className="block text-sm font-medium text-gray-600"
              >
                Colors:
              </label>
              <FieldArray name="colors">
                {({ push, remove }) => (
                  <div>
                    {values.colors &&
                      values.colors.map((color, index) => (
                        <div key={index} className="flex items-center">
                          <Field
                            type="color"
                            name={`colors[${index}]`}
                            className={style.field}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 bg-green-500 text-white rounded-md p-2"
                    >
                      Add Color
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            {/* productImgs */}
            <input
              type="file"
              onChange={(e) => getImages(e)}
              ref={imagesInput}
              className="hidden"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={isFetching}
              className="px-6 py-2 bg-green-500 rounded-md hover:bg-green-600 text-white w-fit"
              onClick={() => imagesInput.current.click()}
            >
              upload new images
            </button>
            <div className="flex flex-row gap-6">
              <label htmlFor="newProduct">Delete Existing Images:</label>
              <Field
                disabled={isFetching}
                type="checkbox"
                name="deleteExistingImages"
                className="h-6 w-6"
              />
            </div>
            {/* message */}
            <div className="text-gray-700 p-2">{msg}</div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                disabled={isFetching}
                type="submit"
                className={`w-full ${
                  isFetching
                    ? "bg-gray-100 text-black"
                    : "bg-green-500 text-white hover:bg-green-400"
                } rounded-md  p-2`}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProductFrom;

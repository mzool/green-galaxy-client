import { Formik, Field, Form, ErrorMessage } from "formik";

const AboutUsSettings = () => {
  /// message
  ///
  const initialValues = {
    description: "",
    textColor: "",
    bgColor: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log("Form values:", values);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="w-full h-fit p-4 flex flex-col gap-2 items-center justify-center"
        >
          {/* description  */}
          <div className="mb-4 w-3/6 ">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-700"
            >
              About Us Description:
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={20}
              onChange={handleChange}
              value={values.description}
              className="mt-1 p-2 w-full border-2 rounded-md outline-0 focus:border-green-300 hover-border-green-300 rounded-lg "
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {/* text color */}
          <div className="mb-4 w-3/6">
            <label
              htmlFor="textColor"
              className="block text-sm font-medium text-gray-600"
            >
              Text Color:
            </label>
            <input
              value={values.textColor}
              onChange={handleChange}
              type="color"
              id="textColor"
              className="p-2 border border-zinc-300 rounded-md focus:outline-none focus:bg-green-100 w-3/6 g-gray-200 ftext-white"
            />
          </div>
          {/* background color */}
          <div className="mb-4 w-3/6">
            <label
              htmlFor="bgColor"
              className="block text-sm font-medium text-gray-600"
            >
              background Color:
            </label>
            <input
              value={values.bgColor}
              onChange={handleChange}
              type="color"
              id="bgColor"
              className="p-2 border border-zinc-300 rounded-md focus:outline-none focus:bg-green-100 w-3/6 bg-gray-200 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-3/6 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-400 outline-0"
          >
            apply changes
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AboutUsSettings;

/// change text
// change background and colors

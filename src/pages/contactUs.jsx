import { useState } from "react";
import contactUsSchema from "../validation/contactus_schema.js";
import TagsForSEO from "../components/utilities/reactHelmet.jsx"
function Contact() {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  /// error message
  let [messages, setMsgs] = useState({
    msg: "",
    err: "",
  });
  /// handleSubmition
  let [isFetching, setIsFetching] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setIsFetching(true);
    /// check that all form data values are filled
    let isDataFilled = true;
    let isDataValid = true;
    for (const key of Object.keys(formData)) {
      if (formData[key].length == 0) {
        setMsgs({ msg: "", err: "fill all fields" });
        isDataFilled = false;
        setIsFetching(false);
      }
    }
    if (isDataFilled === false) {
      return;
    }
    contactUsSchema
      .validate(formData)
      .catch((err) => {
        setMsgs({ err: err.message, msg: "" });
        isDataValid = false;
        setIsFetching(false);
      })
      .then(() => {
        if (isDataValid) {
          fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
              import.meta.env.VITE_contact_us
            }`,
            {
              method: "post",
              mode: "cors",
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.message === "Validation error") {
                setIsFetching(false);
                setMsgs({
                  msg: "",
                  err: "please follow the instructions when filling the inputs.",
                });
              } else {
                setIsFetching(false);
                setMsgs({ err: "", msg: data.message });
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  message: "",
                });
                setTimeout(() => {
                  setMsgs({ msg: "", err: "" });
                }, 10000);
              }
            });
        }
      });
  }

  /// style
  let style = {
    parent: "flex flex-col h-fit w-full p-5",
    form: "flex flex-col h-fit place-self-center bg-white text-gray-700 m-2 flex flex-col gap-5 p-5 w-fll md:w-3/6 h-full rounded border-2 border-zinc-200 shadow-lg shadow-green-600",
    label: "block text-lg font-medium leading-6 text-gray-900",
    input:
      "block w-full py-1.5 pl-7 pr-20 text-gray-700 border-b-2 border-gray-500 focus:border-green-600 outline-0 sm:text-sm sm:leading-6",
    textarea:
      "overflow-x-hidden whitespace-pre-wrap resize-none w-full h-full rounded-md border-2 border-gray-500 focus:border-green-600 outline-0 p-3 text-gray-900 sm:text-sm sm:leading-6",
    btn: "bg-green-600 rounded text-white text-xl p-2 hover:bg-green-500 w-full transition ease-in-out duration-300",
  };
  /// rendering

  return (
    <div className={style.parent}>
      <TagsForSEO
        title={"contact us"}
        pageURL={"https://green-galaxy.net/contact-us"}
        descriptionOfThePage={
          "if you have any question or issue, contact us and send your concern to our email by filling the form"
        }
        urlToImageDescripeThePage={""}
      />
      {/* form */}
      <form className={style.form} onSubmit={handleSubmit}>
        {/* contact us header */}
        <div className="w-full place-self-start">
          <h1 className="text-2xl">Contact Us:</h1> <hr />
        </div>
        <div className="w-5/6 place-self-center">
          <label className={style.label} htmlFor="name">
            name:
          </label>
          <input
            className={style.input}
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="w-5/6 place-self-center">
          <label className={style.label} htmlFor="email">
            email:
          </label>
          <input
            className={style.input}
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="w-5/6 place-self-center">
          <label className={style.label} htmlFor="phone">
            phone:
          </label>
          <input
            id="phone"
            className={style.input}
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="w-5/6 place-self-center h-2/6">
          <label className={style.label} htmlFor="message">
            message:
          </label>
          <textarea
            className={style.textarea}
            id="message"
            type="textarea"
            max={1000}
            rows={10}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        {messages.err && (
          <div className="w-5/6 place-self-center m-1 text-red-500">
            {messages.err}
          </div>
        )}
        {messages.msg && (
          <div className="w-5/6 place-self-center m-1 text-green-500">
            {messages.msg}
          </div>
        )}
        {isFetching ? (
          <div className="w-5/6 place-self-center m-5 flex items-center justify-center">
            <div
              className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600`}
            ></div>
          </div>
        ) : (
          <div className="w-5/6 place-self-center m-5">
            <input type="submit" className={style.btn} value={"send"} />
          </div>
        )}
      </form>
    </div>
  );
}

export default Contact;

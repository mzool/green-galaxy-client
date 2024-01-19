import { useRef } from "react";
function SalesComponent({sales, setSales}) {
    /// ref for image input
    const salesImgInput = useRef(null);
    /// rendering
  return (
    <div className="h-full flex flex-col gap-2">
      <h2 className="place-self-center font-bold text-2xl bg-teal-300 rounded-lg p-2">
        Sales controller
      </h2>
      <form className="p-4 flex flex-col gap-4 w-full h-full">
        {/* title */}
        <div>
          <label htmlFor="title">change title:</label>
          <input
            type="text"
            id="title"
            className="p-2 rounded-lg outline-0 w-full border-2 border-teal-500"
            value={sales.title}
            onChange={(e) =>
              setSales((pr) => ({ ...pr, title: e.target.value }))
            }
          />
        </div>
        {/* description */}
        <div>
          <label htmlFor="description">change Description:</label>
          <input
            type="text"
            id="description"
            className="p-2 rounded-lg outline-0 w-full border-2 border-teal-500"
            value={sales.description}
            onChange={(e) =>
              setSales((pr) => ({ ...pr, description: e.target.value }))
            }
          />
        </div>
        {/* image url */}
        <div className=" w-full h-full rounded-lg ">
          <label htmlFor="salesImg">change Sales Image:</label>
          <button
            type="button"
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 ml-4"
            onClick={() => openFile(salesImgInput)}
          >
            upload new image
          </button>
          <input
            type="file"
            className="hidden"
            ref={salesImgInput}
            id="salesImg"
            onChange={(e) =>
              setSales((pr) => ({ ...pr, image: e.target.files[0] }))
            }
          />
        </div>
        {/* action button */}
        <div>
          {/* text  */}
          <label htmlFor="text">action button text:</label>
          <input
            type="text"
            id="text"
            className="p-2 rounded-lg outline-0 w-full border-2 border-teal-500"
            value={sales.actionButton.text}
            onChange={(e) =>
              setSales((pr) => ({
                ...pr,
                actionButton: {
                  ...pr.actionButton,
                  text: e.target.value,
                },
              }))
            }
          />
          {/* URL  */}
          <label htmlFor="URL">action button URL:</label>
          <input
            type="URL"
            id="URL"
            className="p-2 rounded-lg outline-0 w-full border-2 border-teal-500"
            value={sales.actionButton.URL}
            onChange={(e) =>
              setSales((pr) => ({
                ...pr,
                actionButton: {
                  ...pr.actionButton,
                  URL: e.target.value,
                },
              }))
            }
          />
          {/* bg color for button  */}
          <label htmlFor="bgColor">action button background color:</label>
          <input
            type="color"
            id="bgColor"
            className="p-2 rounded-lg outline-0 w-full p-4 border-2 border-teal-500 cursor-pointer bg-teal-500"
            value={sales.actionButton.bgColor}
            onChange={(e) =>
              setSales((pr) => ({
                ...pr,
                actionButton: {
                  ...pr.actionButton,
                  bgColor: e.target.value,
                },
              }))
            }
          />
          {/* text color for button  */}
          <label htmlFor="textColor">action button text color:</label>
          <input
            type="color"
            id="textColor"
            className="p-2 rounded-lg outline-0 w-full p-4 border-2 border-teal-500 cursor-pointer bg-teal-500"
            value={sales.actionButton.textColor}
            onChange={(e) =>
              setSales((pr) => ({
                ...pr,
                actionButton: {
                  ...pr.actionButton,
                  textColor: e.target.value,
                },
              }))
            }
          />
        </div>
      </form>
    </div>
  );
}

///
function openFile(ref) {
  ref.current.click();
}

export default SalesComponent;

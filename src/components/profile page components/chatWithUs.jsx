import Send from "../../assets/sndeArrow";

function ChatWithUs() {
  return (
    <div className="h-96 bg-green-700 p-2 rounded-lg w-11/12 m-4 grid grid-rows-2">
      {/* messages section */}
      <div className="row-span-5 overflow-y-scroll mb-2"></div>
      {/* input section */}
      <div className="row-span-1">
        <form className="grid grid-cols-6 p-2">
          <div className="col-span-5 w-full">
            <input
              type="text"
              className="bg-white p-2 rounded-lg outline-0 w-full"
            />
          </div>
          <button className="col-span-1 flex items-center justify-center hover:bg-teal-600 ml-2 rounded-lg">
            <Send color={"white"} width={8} height={8}/>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWithUs;

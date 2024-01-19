import Send from "../../assets/sndeArrow";
import { io } from "socket.io-client";
import { useEffect, useState, useRef, useContext } from "react";
import theStore from "../../store/store.js";
import getDate from "../../functions/getDate.js";
function ChatWithUs() {
  /// get the store
  const { store } = useContext(theStore);
  //// send message
  const [userMessage, setUserMessage] = useState("");
  //// all client messages
  const [clientMessages, setClientMessages] = useState([
    {
      timeStamp: getDate(),
      text: `${store.user.name} connected`,
      name: store.user.name,
      room: store.user._id,
    },
  ]);
  /// all admin messages
  const [allAdminMessages, setAdminMessages] = useState([
    {
      timeStamp: getDate(),
      text: "Green Galaxy Support connected",
      name: "Support Team",
    },
  ]);
  //// reference for the chat conatiner
  const chatBody = useRef(null);
  /// make the socket as reference to get it gloablly
  const socket = useRef(null);
  /// handle socket connection
  useEffect(() => {
    socket.current = io("http://localhost:3000/client");
    // /// welcome message from server
    socket.current.on("welcome", (msg) => {
      setAdminMessages((pr) => [
        ...pr,
        {
          text: msg,
          timeStamp: getDate(),
          name: "Support Team",
        },
      ]);
    });

    
    // Cleanup: Disconnect the socket.current when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);
  //// here to combine all messages together based on time stamp for rendering reasons and arrage messages from oldest
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    //// merg admin messages and client messages
    const allMsgs = allAdminMessages.concat(clientMessages);
    //// arrange messages depends on the message time
    const arrangedMsgs = allMsgs.map((msg)=>{
      return {...msg, timeStamp: new Date(msg.timeStamp)}
    })
    arrangedMsgs.sort((a, b)=> a - b);
    /////
    setAllMessages(arrangedMsgs);
  }, [allAdminMessages, clientMessages]);
  //////////////////////////////////////////////// handel send message
  function sendMessage(e) {
    e.preventDefault();
    if (userMessage.length === 0) {
      return;
    }
    const msg = {
      text: userMessage,
      timeStamp: getDate(),
      name: store.user.name,
      room: store.user._id,
    };
    socket.current.emit("userMessage", msg);
    setClientMessages((pr) => [...pr, msg]);
    setUserMessage("");
    setTimeout(() => {
      chatBody.current.scrollTo({
        top: chatBody.current.scrollHeight,
        behavior: "smooth",
      });
    }, 1);
  }
  //// rendering
  return (
    <div className="h-fit p-6 w-full grid grid-rows-2">
      {/* messages section */}
      <div
        className="row-span-5 h-96 overflow-y-scroll mb-2 bg-green-800 rounded-lg text-white w-full p-4 flex flex-col gap-1"
        ref={chatBody}
      >
        {allMessages.map((msg, index) => (
          <div
            key={index}
            className="flex flex-col text-sm gap-1 w-fit py-2 px-6 rounded text-white bg-teal-600"
          >
            <div className="flex flex-row gap-2 w-full">
              <p className="text-xs">{msg.name}</p>
            </div>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      {/* input section */}
      <div className="row-span-1 h-20 bg-gray-200 rounded-lg p-4">
        <form className="grid grid-cols-6 p-2" onSubmit={sendMessage}>
          <div className="col-span-5 w-full">
            <input
              type="text"
              className="bg-white p-2 rounded-lg outline-0 w-full"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </div>
          <button className="col-span-1 flex items-center justify-center hover:bg-teal-600 ml-2 rounded-lg">
            <Send color={"green"} width={8} height={8} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWithUs;

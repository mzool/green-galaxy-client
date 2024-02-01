import { io } from "socket.io-client";
import { useState, useEffect, useContext, useRef } from "react";
import theStore from "../../../../store/store.js";
import getDate from "../../../../functions/getDate.js";
import Send from "../../../../assets/sndeArrow.jsx";
function ChatWithUser() {
  /// get the store
  const { store } = useContext(theStore);
  //// send message
  const [adminMsg, setMsg] = useState("");
  //// all client messages
  const [clientMessages, setClientMessages] = useState([]);
  /// all admin messages
  const [allAdminMessages, setAdminMessages] = useState([]);
  //// all rooms
  const [rooms, setRooms] = useState([]);
  //// handle socket connection
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_socket_admin}`);

    /// welcome message
    socket.current.on("welcome", (msg) => {
      setAdminMessages((pr) => [
        ...pr,
        {
          timeStamp: getDate(),
          text: msg,
          sender: "Support Team",
        },
      ]);
    });

    //// on user message
    socket.current.on("userMessage", (msg) => {
      setRooms((pr) => [...pr, msg.room]);
      setClientMessages((pr) => [
        ...pr,
        {
          timeStamp: msg.timeStamp,
          text: msg.text,
          sender: msg.sender,
          room: msg.room,
        },
      ]);
    });
    //// past messages
    socket.current.on("pastChat", (msg) => {
      setClientMessages((pr) => [
        ...pr,
        {
          timeStamp: msg.messageTime,
          text: msg.text,
          sender: msg.sender,
          room: msg.room,
        },
      ]);
    });
    // Cleanup: Disconnect the socket.current when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);

  //// here to combine all messages together based on time stamp for rendering reasons
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    //// merg admin messages and client messages
    const allMsgs = allAdminMessages.concat(clientMessages);
    /////
    setAllMessages(allMsgs);
  }, [allAdminMessages, clientMessages]);

  //////////////////////////////////////////////// handel send message
  const chatBody = useRef(null);
  //// handle send messages
  function sendMessage(e) {
    e.preventDefault();
    if (adminMsg.length === 0) {
      return;
    }
    socket.current.emit("userMessage", adminMsg);
    const msg = {
      text: adminMsg,
      timeStamp: getDate(),
      sender: "Support Team",
    };
    setAdminMessages((pr) => [...pr, msg]);
    setMsg("");
    setTimeout(() => {
      chatBody.current.scrollTo({
        top: chatBody.current.scrollHeight,
        behavior: "smooth",
      });
    }, 1);
  }
  //// rendering
  return (
    <div className="h-fit p-6 w-full flex flex-col gap-2">
      {/* rooms */}
      <div className="flex flex-row overflow-x-scroll gap-2 bg-gray-200 text-gray-700 p-2 items-center rounded-md">
        <h2>All active rooms: </h2>
        {rooms?.length > 0 &&
          rooms.map((room) => (
            <button
              key={room}
              className="px-4 py-2 rounded-md bg-green-600 text-white"
            >
              {room}
            </button>
          ))}
      </div>
      {/* messages section */}
      <div>
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
                <p className="text-xs">{msg.sender}</p>
                <p className="text-xs border-l-2 px-2">{msg.timeStamp}</p>
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
                value={adminMsg}
                onChange={(e) => setMsg(e.target.value)}
              />
            </div>
            <button className="col-span-1 flex items-center justify-center hover:bg-teal-600 ml-2 rounded-lg">
              <Send color={"green"} width={8} height={8} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatWithUser;

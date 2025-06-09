import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../assets/firebase-config";
import { useAutoScroll } from "../hooks/useAutoScroll";

function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const [replyStatus, setReplyStatus] = useState(false);

  const bottomRef = useAutoScroll([messages]); // 傳入依賴：每次 messages 更新會觸發滾動

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createAt")
    );

    // 監聽訊息
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const msgData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(msgData);
    });
    return () => unsubscribe();
  }, [room]);

  // 新增訊息api
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const messageData = {
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        text: newMessage,
        createAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      };
      if (replyStatus) {
        messageData.replyData = replyData;
        setReplyStatus(false);
      }
      await addDoc(messageRef, messageData);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // 收回訊息api
  const handleRecallMessage = async (e, email, id) => {
    e.preventDefault();
    if (auth.currentUser.email !== email) return;
    await updateDoc(doc(db, "messages", id), {
      text: "[已刪除]",
      isDeleted: true,
    });
  };

  //回覆訊息
  const [replyData, setReplyData] = useState("");
  const handleReplyMessage = (e, message) => {
    e.preventDefault();
    setReplyStatus(true);
    setReplyData(message);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-bold text-center">
          TechChat 聊天室
        </div>
        <div
          className="card-body pb-0"
          style={{ height: "70vh", overflowY: "auto" }}
        >
          {messages.map((message) => {
            let formattedDate = "取得日期中...";
            let replyDate = "取得日期中...";
            if (message.createAt?.seconds) {
              const date = new Date(message.createAt.seconds * 1000);
              formattedDate = date.toLocaleString(); // 避免非 Date 物件呼叫 toLocaleString
            }
              if (message.replyData?.createAt?.seconds) {
              const date = new Date(message.replyData?.createAt?.seconds * 1000);
              replyDate = date.toLocaleString(); // 避免非 Date 物件呼叫 toLocaleString
            }
            return (
              <div key={message.id}>
                {message.replyData && (
                  <div className="d-flex align-items-start">
                    <i className="bi bi-arrow-90deg-right"></i>
                    <img
                      src={message.replyData.photoURL}
                      alt="userPhotoUrl"
                      width={30}
                      className="rounded-circle"
                    />
                    <div className="d-flex align-items-center">
                      <span className="ms-2  fs-5 ">
                        {message.replyData.user}
                      </span>
                      <span className="ms-2 small fw-light">
                        {replyDate}
                      </span>
                    </div>
                  </div>
                )}
                <div className="d-flex align-items-start">
                  <img
                    src={message.photoURL}
                    alt="userPhotoUrl"
                    width={50}
                    className="rounded-circle"
                  />
                  <div className="d-flex align-items-center">
                    <span className="ms-2  fs-5 ">{message.user}</span>
                    <span className="ms-2 small fw-light">{formattedDate}</span>
                  </div>
                </div>
                {/* 收回訊息 */}
                {message.isDeleted ? (
                  // 當訊息已收回時顯示
                  <div className="message fst-italic text-decoration-line-through">
                    <span className="chat-hover">訊息已收回</span>
                  </div>
                ) : (
                  <>
                    <div className=" message">
                      <span className="chat-hover">
                        {message.text}
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn "
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                          <ul className="dropdown-menu">
                            {auth.currentUser.email === message.email && (
                              <li>
                                <a
                                  className="dropdown-item"
                                  onClick={(e) =>
                                    handleRecallMessage(
                                      e,
                                      message.email,
                                      message.id
                                    )
                                  }
                                >
                                  收回訊息
                                </a>
                              </li>
                            )}
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  handleReplyMessage(e, message);
                                }}
                              >
                                回覆此訊息
                              </a>
                            </li>
                          </ul>
                        </div>
                      </span>
                    </div>
                  </>
                )}
                {/* </div> */}
              </div>
            );
          })}

          {/* 當messages更新時自動滾動到此元素 */}
          <div ref={bottomRef} />
        </div>
        <div className="card-footer">
          {replyStatus && (
            <div className="form-control">
              回覆 <span className="fw-bold me-1">{replyData.user}</span>
              <a onClick={() => setReplyStatus(false)}>
                <i className="bi bi-x-lg"></i>
              </a>
            </div>
          )}
          <form className="d-flex gap-2" onSubmit={handleSubmit}>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              type="text"
              className="form-control"
              placeholder="輸入訊息"
            />
            <button className="btn btn-primary" type="submit">
              發送
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Chat;

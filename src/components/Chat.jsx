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
console.log("auth", auth);
function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createAt")
    );

    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const msgData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(msgData);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addDoc(messageRef, {
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        text: newMessage,
        createAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRightClick = async (e, email, id) => {
    e.preventDefault(); // 阻止瀏覽器右鍵選單
    if (auth.currentUser.email !== email) return;
    await updateDoc(doc(db, "messages", id), {
      text: "[已刪除]",
      isDeleted: true,
    });
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-bold text-center">
          TechChat 聊天室
        </div>
        <div
          className="card-body"
          style={{ height: "70vh", overflowY: "auto" }}
        >
          {messages.map((message) => {
            console.log("message", message);
            let formattedDate = "尚未取得日期";
            if (message.createAt?.seconds) {
              const date = new Date(message.createAt.seconds * 1000);
              formattedDate = date.toLocaleString(); // 避免非 Date 物件呼叫 toLocaleString
            }
            return (
              <div key={message.id}>
                <div className="d-flex align-items-start">
                  <img
                    src={message.photoURL}
                    alt="userPhotoUrl"
                    width={40}
                    className="rounded-circle"
                  />
                  <div className="d-flex flex-column">
                    <span className="ms-2 fw-bold">{message.user}</span>
                    <span className="ms-2 small">{formattedDate}</span>
                  </div>
                </div>
                <div
                  className={`bg-light rounded p-2 my-2 ${
                    message.isDeleted ? "text-muted display-inline-block text-decoration-line-through bg-danger" : ""
                  }`}
                  onContextMenu={(e) =>
                    handleRightClick(e, message.email, message.id)
                  }
                >
                  {message.isDeleted ? "訊息已收回" : message.text}
                </div>
              </div>
            );
          })}
        </div>
        <div className="card-footer">
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

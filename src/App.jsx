import { useState } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";


import "./App.css";

const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [enterCode, setEnderCode] = useState(null);
  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />

      </>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label htmlFor="">聊天室號碼</label>
          <input type="text" onChange={(e) => setEnderCode(e.target.value)} />
          <button onClick={() => setRoom(enterCode)}>輸入聊天室號碼</button>
        </div>
      )}
    </>
  );
}

export default App;

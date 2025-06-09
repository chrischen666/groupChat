import { useState } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";

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
        <div className="container d-flex vh-100 justify-content-center align-items-center">
          <div
            className="card p-4 shadow-sm"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h4 className="text-center mb-3">輸入聊天室號碼</h4>
            <div className="mb-3">
              <input
                id="roomInput"
                type="text"
                className="form-control"
                placeholder="請輸入聊天室代碼"
                onChange={(e) => setEnderCode(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={() => setRoom(enterCode)}
            >
              進入聊天室
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

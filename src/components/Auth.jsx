import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../assets/firebase-config";
import Cookies from "universal-cookie";
export const Auth = (props) => {
  const { setIsAuth } = props;
  const cookies = new Cookies();
  // signInWithPopup 是一個在網路應用程式中常見的使用者認證 (Authentication) 方法
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result; // 正確取得使用者資料
      cookies.set("auth-token", user.refreshToken); //  設定 token cookie
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #f1f8ff)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        {/* Chat title */}
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">TechChat 聊天室</h1>
          <p className="text-muted mb-0">請使用 Google 快速登入</p>
        </div>

        {/* Google Login Button */}
        <div className="d-grid gap-3">
          <button
            className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2"
            onClick={signInWithGoogle}
          >
            <div
              className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <span className="fw-semibold">使用 Google 登入</span>
          </button>
        </div>

        {/* Terms */}
        <div className="text-center text-muted mt-4 small">
          點擊登入即表示您同意我們的{" "}
          <a href="#" className="text-decoration-none">
            服務條款
          </a>
        </div>
      </div>
    </div>
  );
};

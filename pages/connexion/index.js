import { useAuth } from "/components/utils/UserContext";
import { useRouter } from "next/router";

export default function () {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <div className="loginPage">
      <div className="loginContent">
        <div className="container">
          <div className="form-info">
            <div className="logo">
              <a className="">
                <h1>
                  <img src="/images/logo.svg" />
                </h1>
              </a>
            </div>
            <h3>Welcome to Hikes.quebec</h3>
          </div>
          <form className="loginForm">
            <div className="action">
              <div className="googleSignIn" onClick={() => signInWithGoogle()}>
                <img src="/images/signInGoogle.png" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

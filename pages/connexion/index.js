import { useState } from "react";
import { useAuth } from "/components/utils/UserContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Link from "next/link";

export default function () {
  const [formError, setFormError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const onSubmit = async (formData) => {
    if (!formData.email || !formData.password) {
      return setFormError("Enter credentials!");
    }

    try {
      setFormError("");
      await signIn(formData.email, formData.password);
      router.push("/");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContent">
        <div className="container">
          <div className="form-info">
            <h3>Connexion</h3>
            {formError && (
              <div className="form-error">
                <p>{formError}</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
            {/*<div className="fields">
              <input
                type="text"
                {...register("email")}
                className="name"
                placeholder="Email"
              />
              <input
                type="text"
                {...register("password")}
                className="name"
                placeholder="Password"
              />
            </div>*/}
            <div className="action">
              {/*<button className="btn">Login</button>*/}
              <div className="googleSignIn" onClick={() => signInWithGoogle()}>
                <img src="/images/signInGoogle.png" />
              </div>
              <div className="text">
                <p>
                  Or register{" "}
                  <Link href="/register">
                    <a>Here</a>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

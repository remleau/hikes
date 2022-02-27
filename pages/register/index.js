import { useState } from 'react';
import { useAuth } from '/components/utils/UserContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function () {
  const [formError, setFormError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const { signUp } = useAuth();
  const router = useRouter();

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmation_password) {
      return setFormError('Password do not match you bitch!');
    }
    
    try {
      setFormError('');
      await signUp(formData.email, formData.password);
      router.push('/')
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <div className="loginPage">
      <div className="loginContent">
        <div className="container">
          <div className="form-info">
            <h3>Register</h3>
            {formError && <div className="form-error"><p>{formError}</p></div>}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
            <div className="fields">
              <input type="text" {...register("email")} className="name" placeholder="Email"/>
              <input type="text" {...register("password")} className="name" placeholder="Password" />
              <input type="text" {...register("confirmation_password")} className="name" placeholder="Confirm password" />
            </div>
            <div className="action">
              <button className="btn">Register</button>
              <div className="text">
                <p>Or signIn <a href="/connexion">Here</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
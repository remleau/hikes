import { useState } from 'react';
import { useAuth } from '/components/utils/UserContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';
import { useEffect } from 'react';

export default function () {
  const [userData, setUserData] = useState();
  const [formError, setFormError] = useState(null);
  const { register, handleSubmit } = useForm();
  const { getUserData } = useAuth();
  const router = useRouter();

  useEffect(async () => {
    setUserData(() => getUserData());
  }, [])


  const onSubmit = async (formData) => {
    if (!formData) {
      return setFormError('What the fuck my mannn!');
    }

    try {
      console.log(formData);
      setFormError('');
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <LayoutContainer pageClasse="settingsPage" api="">
      {formError && <div className="form-error"><p>{formError}</p></div>}

      <SubHero pageTitle="Settings page" />      

      <form onSubmit={handleSubmit(onSubmit)} className="userDataForm">
        <div className="formDescription">
          <p>My informations</p>
        </div>

        <div className="fields">
          <div className="flex">
            <label htmlFor="" className='w-1/3'>
              <span>Is email verified: {userData?.emailVerified ? 'true' : 'false'}</span>
              <span>Created at: {userData?.metadata?.creationTime}</span>
              <span>Last sign In: {userData?.metadata?.lastSignInTime}</span>
            </label>
          </div>
        </div>

        <div className="fields">
          <div className="flex">
            <label htmlFor="" className="w-1/2">
              <span>Courriel</span>
              <input type="text" {...register("email")} className="" defaultValue={userData?.email} />
            </label>

            <label htmlFor="" className="w-1/2">
              <span>UID</span>
              <input type="text" disabled {...register("uid")} className="" defaultValue={userData?.uid} />
            </label>
          </div>
        </div>

        <div className="action">
          <button className="btn">Update</button>
        </div>
      </form>

    </LayoutContainer>
  ) 
}
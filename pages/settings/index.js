import { useState } from 'react';
import { useAuth } from '/components/utils/UserContext';
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import * as Yup from "yup";

import SubHero from '/components/subHero';
import { Input } from '/components/form'
import { LayoutContainer } from '/components/layout';
import { useEffect } from 'react';

export default function () {
  const [userData, setUserData] = useState();
  const [formError, setFormError] = useState(null);
  const { getUserData } = useAuth();
  const router = useRouter();

  useEffect(async () => {
    setUserData(() => getUserData());
  }, [])


  const formik = useFormik({
    initialValues: {
      email: userData?.email || '',
      uid: userData?.uid || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email().required("The email is required"),
    }),
    onSubmit(values) {
      console.log(values)
    },
  });

  return (
    <LayoutContainer pageClasse="settingsPage" api="">
      {formError && <div className="form-error"><p>{formError}</p></div>}

      <SubHero pageTitle="Settings page" />      

      <form onSubmit={formik.handleSubmit} className="userDataForm">
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
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                touched={formik.touched.email}
                error={formik.errors.email}
                name="email"
                type="text"
              />
            </label>

            <label htmlFor="" className="w-1/2">
              <span>UID</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.uid}
                touched={formik.touched.uid}
                error={formik.errors.uid}
                name="uid"
                type="text"
                disabled
              />
            </label>
          </div>
        </div>

        <div className="action">
          <button type="submit" className="btn">Update</button>
        </div>
      </form>

    </LayoutContainer>
  ) 
}
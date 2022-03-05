import { useState } from 'react';
import { useFormik } from "formik";
import { useData } from '/components/utils/DataContext';
import * as Yup from "yup";

import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';
import { Input, FormError, SuccesLink } from '/components/form'


export default function () {
  const [formError, setFormError] = useState(null);
  const { addHike } = useData();

  const formik = useFormik({
    initialValues: {
      name: '',
      kilometer: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("The name is required"),
      kilometer: Yup.number().typeError('You must specify a number').min(1).required("You must specify a number"),
    }),
    onSubmit(values) {
      addHike(values).then((rep) => {
        setFormError(<SuccesLink link={rep} />)
      })
      formik.resetForm({
        ...formik.initialValues,
      });
    },
  });


  return (
    <LayoutContainer pageClasse="settingsPage" api="">

      <SubHero pageTitle="Add a quick hike." />

      <form onSubmit={formik.handleSubmit} className="userDataForm">
        <div className="formDescription">
          <p>My fucking awesome hike!</p>
        </div>

        {formError && <FormError error={formError} />}

        <div className="fields">
          <div className="flex">
            <label htmlFor="" className="w-1/2">
              <span>Name</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.name}
                touched={formik.touched.name}
                error={formik.errors.name}
                name="name"
                type="text"
              />
            </label>

            <label htmlFor="" className="w-1/2">
              <span>Kilometer</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.kilometer}
                touched={formik.touched.kilometer}
                error={formik.errors.kilometer}
                name="kilometer"
                type="text"
              />
            </label>
          </div>
        </div>

        <div className="action">
          <button type="submit" className={`btn ${Object.keys(formik.errors).length === 0 ? '' : 'disabled'}`}>Create</button>
        </div>
      </form>

    </LayoutContainer>
  )
}
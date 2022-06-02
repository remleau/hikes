import { useFormik } from "formik";
import { useRouter } from 'next/router';
import * as Yup from "yup";

import { useEffect, useState } from 'react';

import { Input } from '/components/form'

export default function ({ isOpen }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      search: Yup.string().required("Are you searching?"),
    }),
    onSubmit(values) {
      router.push(`/search?search=${values.search}`)
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="searchBar" encType ="multipart/form-data">
      <div className={`search ${isOpen ? "open" : "close"}`}>
        <div className="container">
          <div className="search-bar">
            <div className="search-bar-categories">
              <p>Mountains</p>
              <p>Members</p>
            </div>
            <div className="search-bar-input">
              <Input
                onChange={formik.handleChange}
                value={formik.values.search}
                touched={formik.touched.search}
                error={formik.errors.search}
                placeholder="Search content ..."
                name="search"
                type="text"
              />

              <button type="submit" className={`btn ${Object.keys(formik.errors).length === 0 ? '' : 'disabled'}`}>Search.</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
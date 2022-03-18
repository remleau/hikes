import React from 'react';
import Link from 'next/link'
import { useState } from 'react';

export const Input = ({ onChange, value, touched, error, name, type, disabled, placeholder, innerRef, autocomplete }) => {

  return (
    <React.Fragment>
      <div className="input-field">
        <input type={type} name={name} className="" onChange={onChange} value={value} disabled={disabled} placeholder={placeholder} ref={innerRef} autoComplete={autocomplete} />
        {touched && error && (
          <div className="input-field-error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export const FormError = ({ error }) => {

  return (
    <React.Fragment>
      <div className="formSuccess">
        <p>{error}</p>
      </div>
    </React.Fragment>
  )
}


export const SuccesLink = ({ link }) => {

  return (
    <Link href={link.href}>
      <a className="succesLink">
        <span>{link.text}</span>
      </a>
    </Link>
  )
}

export const ImportFiles = ({ onChange, value, touched, error, name, type, disabled, formik, id }) => {
  const [filesName, setFilesName] = useState(null);

  return (
    <React.Fragment>
      <div className="import-field">
        <p>Import files here {filesName && Object.values(filesName)?.map((name, i) => {
          return (
            <span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>{name.name}</span>
          )
        })}</p>
        <input 
          type={type} 
          name={name} 
          id={id}
          className=""
          multiple
          disabled={disabled}
          onChange={(event) => {
            formik.setFieldValue("files", event.currentTarget.files);
            setFilesName(event.currentTarget.files)
          }}
        />
        {touched && error && (
          <div className="input-field-error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
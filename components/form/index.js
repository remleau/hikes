import React from 'react';
import Link from 'next/link'

export const Input = ({ onChange, value, touched, error, name, type, disabled }) => {

  return (
    <React.Fragment>
      <div className="input-field">
        <input type={type} name={name} className="" onChange={onChange} value={value} disabled={disabled} />
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
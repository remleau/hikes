import React from 'react';

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
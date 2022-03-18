import PropTypes from 'prop-types';

SubHero.propTypes = {
  nodeProp: PropTypes.node,
  elementProp: PropTypes.element
}

export default function SubHero({ pageTitle, children }) {

  return (
    <div className="subHero">
      <h1>{pageTitle}</h1>
      {children && (
        <div className="subHero-menus">
          {children}
        </div>
      )}
    </div> 
  )
}
import PropTypes from 'prop-types';

SubHero.propTypes = {
  nodeProp: PropTypes.node,
  elementProp: PropTypes.element
}

export default function SubHero ({ pageTitle }) {

  return (
    <div className="subHero">
      <h1>{pageTitle}</h1>
    </div>
  )
}
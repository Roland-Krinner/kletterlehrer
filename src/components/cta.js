import React from 'react'
import { Link } from 'gatsby'

const CTA = ({ children, data: { to, classes } }) => {
	return (
		<Link to={to} className={`btn btn-success btn-sm xxfont-weight-bold xxtext-decoration-none ${classes}`}>
			{children}<i className="fe fe-arrow-right ml-3"></i>
		</Link>
	)
}

export default CTA

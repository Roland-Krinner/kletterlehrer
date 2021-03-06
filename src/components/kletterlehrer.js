import React from 'react'
import { Link } from 'gatsby'

const SubPage = ({ children, data: { classes } }) => {
	return <main className={`pt-5 pt-lg-8 pb-8 pb-sm-10 ${classes}`}>{children}</main>
}

const Section = ({ children, data: { classes } }) => {
	return <section className={`py-8 py-md-12 ${classes}`}>{children}</section>
}

const CTA = ({ children, data: { to, classes } }) => {
	return (
		<Link to={to} className={`btn btn-success btn-sm ${classes}`}>
			{children}
			<i className="fe fe-arrow-right ml-3"></i>
		</Link>
	)
}

const SVG = ({ svg, file, alt }) => {
	if (file.contentType === 'image/svg+xml') {
		if (svg && svg.content) {
			return <div dangerouslySetInnerHTML={{ __html: svg.content }} />
		}
		return <img src={file.url} alt={alt} />
	}
	// Dummy
	return <img src="" alt={alt} />
}

const PictureFixedWidth = ({ data: { srcSetWebp, srcSet, src, altText, customClass } }) => {
	return (
		<picture>
			<source type="image/webp" srcSet={srcSetWebp} />
			<source srcSet={srcSet} />
			<img srcSet={srcSet} src={src} alt={altText} className={customClass} />
		</picture>
	)
}

export { SubPage, Section, CTA, SVG, PictureFixedWidth }

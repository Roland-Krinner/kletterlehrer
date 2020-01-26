import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

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

const BrandData = ({ data: { searchStr } }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulPersonalData {
				edges {
					node {
						jobRole
						name
						eMail
						street
						zipCode
						city
						country
						phone
						website
					}
				}
			}
		}
	`)
	const name = data.allContentfulPersonalData.edges[0].node.name
	const street = data.allContentfulPersonalData.edges[0].node.street
	const zipCode = data.allContentfulPersonalData.edges[0].node.zipCode
	const city = data.allContentfulPersonalData.edges[0].node.city
	const phone = data.allContentfulPersonalData.edges[0].node.phone
	const eMail = data.allContentfulPersonalData.edges[0].node.eMail
	const country = data.allContentfulPersonalData.edges[0].node.country
	const website = data.allContentfulPersonalData.edges[0].node.website
	if (searchStr === '$$contactData$$') {
		return (
			<>
				<p className="text-gray-800">
					{name}
					<br />
					{street}
					<br />
					{zipCode} {city}
					<br />
					{country}
				</p>
				<p className="text-gray-800">
					Telefon: {phone}
					<br />
					E-Mail: {eMail}
				</p>
			</>
		)
	} else if (searchStr === '$$imprintAddress$$') {
		return (
			<p className="text-gray-800">
				{name}
				<br />
				{street}
				<br />
				{zipCode} {city}
				<br />
				{country}
			</p>
		)
	} else if (searchStr === '$$imprintContact$$') {
		return (
			<p className="text-gray-800">
				Telefon: {phone}
				<br />
				E-Mail: {eMail}
				<br />
				Webseite: {website}
			</p>
		)
	}
	return ''
}

export { SubPage, Section, CTA, BrandData }

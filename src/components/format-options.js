import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { CTA } from './kletterlehrer'

const textColor = 'text-gray-700' // 'text-info'

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
				<p className={`${textColor}`}>
					{name}
					<br />
					{street}
					<br />
					{zipCode} {city}
					<br />
					{country}
				</p>
				<p className={`${textColor}`}>
					Telefon: {phone}
					<br />
					E-Mail: {eMail}
				</p>
			</>
		)
	} else if (searchStr === '$$imprintAddress$$') {
		return (
			<p className={`${textColor}`}>
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
			<p className={`${textColor}`}>
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

const defaultTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => <h1 className={`mb-1`}>{children}</h1>,
		[BLOCKS.HEADING_6]: (node, children) => <p className={`font-size-lg mb-5 ${textColor}`}>{children}</p>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className={`font-weight-bold`}>{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else if (node.content[0].value.indexOf('$$') !== -1) {
				return <BrandData data={{ searchStr: node.content[0].value }} />
			} else {
				return <p className={`${textColor}`}>{children}</p>
			}
		},
		[BLOCKS.HR]: (node, children) => <hr className={`border-gray-300 my-6`} />,
		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className={`d-flex list-item`}>
				<div className={`badge badge-rounded-circle badge-secondary mt-1 mr-4`}>
					<i className={`fe fe-check`}></i>
				</div>
				<span className={`mb-2`}>{children}</span>
			</div>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`font-weight-bold`}>{text}</span>,
	},
}

// const introTextOptions = {
// 	renderNode: {
// 		[BLOCKS.HEADING_2]: (node, children) => <h2 className={`mb-1`}>{children}</h2>,
// 		[BLOCKS.HEADING_3]: (node, children) => <h3 className={`mb-5 ${textColor}`}>{children}</h3>,
// 		[BLOCKS.PARAGRAPH]: (node, children) => {
// 			if (node.content.length === 1 && node.content[0].value === '') {
// 				return ''
// 			} else {
// 				return <p className={`font-size-lg ${textColor}`}>{children}</p>
// 			}
// 		},
// 		[INLINES.HYPERLINK]: (node, children) => {
// 			if (node.data.uri && node.data.uri.startsWith('/')) {
// 				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
// 			} else {
// 				return (
// 					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
// 						{children}
// 					</a>
// 				)
// 			}
// 		},
// 	},
// }

const options = {
	renderNode: {
		[BLOCKS.HEADING_3]: (node, children) => <h3 className={`mb-5 font-weight-bold`}>{children}</h3>,
		[BLOCKS.HEADING_2]: (node, children) => <h2 className={`mb-5 font-weight-bold`}>{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`${textColor}`}>{children}</p>,
		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className={`d-flex list-item`}>
				<div className={`badge badge-rounded-circle badge-secondary mt-1 mr-4`}>
					<i className={`fe fe-check`}></i>
				</div>
				<span className={`mb-2`}>{children}</span>
			</div>
		),
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`${textColor} font-weight-bold`}>{text}</span>,
	},
}

const cardBodyTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`${textColor} xxx__${textColor}`}>{children}</p>,
		[BLOCKS.HEADING_6]: (node, children) => <p className={`h6 ${textColor} mb-0`}>{children}</p>,
		[BLOCKS.UL_LIST]: (node, children) => <div className={`pb-5`}>{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className={`d-flex list-item`}>
				<div className={`badge badge-rounded-circle badge-secondary mt-1 mr-4`}>
					<i className={`fe fe-check`}></i>
				</div>
				<span className={`mb-2`}>{children}</span>
			</div>
		),
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className={`${textColor} font-weight-bold`}>{text}</span>,
	},
}

const formTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_5]: (node, children) => <h5 className={`mb-3 font-weight-bold`}>{children}</h5>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className={`font-size-sm ${textColor}`}>{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className={`text-success text-decoration-none`}>
						{children}
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className={`text-success text-decoration-none`}>
						{children}
					</a>
				)
			}
		},
	},
}

export { options, formTextOptions, cardBodyTextOptions, defaultTextOptions }

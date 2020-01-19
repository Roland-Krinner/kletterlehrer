import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'

const Imprint = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulStaticPages {
				edges {
					node {
						imprintHeadline
						showImprintHeadline
						imprintSubline
						showImprintSubline
						imprintBody {
							json
						}
					}
				}
			}

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
	const headline = data.allContentfulStaticPages.edges[0].node.imprintHeadline
	const displayHeadline = data.allContentfulStaticPages.edges[0].node.showImprintHeadline
	const subline = data.allContentfulStaticPages.edges[0].node.imprintSubline
	const displaySubline = data.allContentfulStaticPages.edges[0].node.showImprintSubline
	const bodyJSON = data.allContentfulStaticPages.edges[0].node.imprintBody.json

	const name = data.allContentfulPersonalData.edges[0].node.name
	const street = data.allContentfulPersonalData.edges[0].node.street
	const zipCode = data.allContentfulPersonalData.edges[0].node.zipCode
	const city = data.allContentfulPersonalData.edges[0].node.city
	const phone = data.allContentfulPersonalData.edges[0].node.phone
	const eMail = data.allContentfulPersonalData.edges[0].node.eMail
	const country = data.allContentfulPersonalData.edges[0].node.country
	const website = data.allContentfulPersonalData.edges[0].node.website

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => {
				const value = node.content[0].value
				if (value === '##imprintAddress##') {
					return (
						<p className="text-gray-800 mb-6 mb-md-8">
							{name}
							<br />
							{street}
							<br />
							{zipCode} {city}
							<br />
							{country}
						</p>
					)
				} else if (value === '##imprintContact##') {
					return (
						<p className="text-gray-800 mb-6 mb-md-8">
							Telefon: {phone}
							<br />
							E-Mail: {eMail}
							<br />
							Webseite: {website}
						</p>
					)
				} else {
					return <p className="text-gray-800 mb-6 mb-md-8">{children}</p>
				}
			},
			[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
			[BLOCKS.LIST_ITEM]: (node, children) => (
				<div className="d-flex list-item">
					<div className="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
						<i className="fe fe-check"></i>
					</div>
					<span className="mb-4">{children}</span>
				</div>
			),
			'embedded-asset-block': node => {
				const url = node.data.target.fields.file['en-US'].url
				const alt = node.data.target.fields.title['en-US']
				return <img src={url} alt={alt} />
			},
		},
	}

	return (
		<Layout pageInfo={{ pageName: 'impressum', pageType: 'subPage' }}>
			<Head title="Impressum" />
			<section className="bg-light">
				<Container>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb breadcrumb-scroll">
							<li className="breadcrumb-item">
								<Link className="text-gray-700" to="/">
									Startseite
								</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Impressum
							</li>
						</ol>
					</nav>
				</Container>
			</section>
			<section className="pt-8 pt-md-11 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col xs={12}>
							<Link to="/" className="font-weight-bold font-size-sm text-decoration-none mb-3">
								<i className="fe fe-arrow-left mr-3"></i> Zurück zur Startseite
							</Link>
							{displayHeadline === true ? <h1 className="display-4 mb-2">{headline}</h1> : ''}
							{displaySubline === true ? <p className="font-size-lg text-gray-700 mb-5 mb-md-0">{subline}</p> : ''}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<hr className="my-6 my-md-8 border-gray-300" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={8}>
							{documentToReactComponents(bodyJSON, options)}
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

export default Imprint

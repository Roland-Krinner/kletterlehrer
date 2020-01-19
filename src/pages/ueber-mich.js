import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'

const AboutPage = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulStaticPages {
				edges {
					node {
						aboutHeadline
						showAboutHeadline
						aboutSubline
						showAboutSubline
						aboutBody {
							json
						}
						aboutPortrait {
							title
							file {
								url
								contentType
							}
							fluid(maxWidth: 1600, quality: 100) {
								sizes
								src
								srcWebp
								srcSet
								srcSetWebp
							}
						}
					}
				}
			}
		}
	`)
	const headline = data.allContentfulStaticPages.edges[0].node.aboutHeadline
	const displayHeadline = data.allContentfulStaticPages.edges[0].node.showAboutHeadline
	const subline = data.allContentfulStaticPages.edges[0].node.aboutSubline
	const displaySubline = data.allContentfulStaticPages.edges[0].node.showAboutSubline
	const bodyJSON = data.allContentfulStaticPages.edges[0].node.aboutBody.json
	const imageURL = data.allContentfulStaticPages.edges[0].node.aboutPortrait.file.url
	const imageAlt = data.allContentfulStaticPages.edges[0].node.aboutPortrait.title

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-gray-800 mb-6 mb-md-8">{children}</p>,
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
		<Layout pageInfo={{ pageName: 'ueber-mich', pageType: 'subPage' }}>
			<Head title="Über mich" />
			<Container>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb breadcrumb-scroll">
						<li className="breadcrumb-item"><Link className="text-gray-700" to="/">Startseite</Link></li>
						<li className="breadcrumb-item active" aria-current="page">Über mich</li>
					</ol>
				</nav>
				<Row>
					<Col xs={12}>
						{displayHeadline === true ? <h1 className="display-4 mb-2">{headline}</h1> : ''}
						{displaySubline === true ? <p className="font-size-lg text-gray-700 mb-5 mb-md-0">{subline}</p> : ''}
					</Col>
				</Row>
				<Row>
					<Col xs={6}><img src={imageURL} alt={imageAlt} /></Col>
					<Col xs={6}>{documentToReactComponents(bodyJSON, options)}</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default AboutPage

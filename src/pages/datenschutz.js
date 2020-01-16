import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'

const Privacy = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulPrivacy {
				edges {
					node {
						headline
						subline
						displaySubline
						displayHeadline
						body {
							json
						}
					}
				}
			}
		}
	`)
	const headline = data.allContentfulPrivacy.edges[0].node.headline
	const subline = data.allContentfulPrivacy.edges[0].node.subline
	const displayHeadline = data.allContentfulPrivacy.edges[0].node.displayHeadline
	const displaySubline = data.allContentfulPrivacy.edges[0].node.displaySubline
	const bodyJSON = data.allContentfulPrivacy.edges[0].node.body.json

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
		<Layout pageInfo={{ pageName: 'datenschutz', pageType: 'subPage' }}>
			<Head title="Datenschutz" />
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

export default Privacy

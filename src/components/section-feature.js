import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="text-white">{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted mb-7 mb-md-9">{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className="btn btn-success btn-sm mb-6 mb-xl-8">
						{children}
						<i className="fe fe-arrow-right ml-3"></i>
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer">
						{children}
					</a>
				)
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
	},
}

const Feature = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						contactFeature {
							json
						}
					}
				}
			}
		}
	`)

	const bodyJSON = data.allContentfulHome.edges[0].node.contactFeature.json

	return (
		<section className="py-8 py-md-11 bg-secondary-dark-300">
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">
						<span className="badge badge-pill badge-gray-700-soft mb-3">
							<span className="h6 text-uppercase">Kontakt</span>
						</span>
						{documentToReactComponents(bodyJSON, options)}
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Feature

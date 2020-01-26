import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section, CTA } from './kletterlehrer'

const options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="text-white">{children}</h2>,
		[BLOCKS.HEADING_6]: (node, children) => {
			return (
				<span className="badge badge-pill bg-light-dark-600 text-white mb-3">
					<span className="h6 text-uppercase">{children}</span>
				</span>
			)
		},
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted">{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: 'mt-3 mt-md-4' }}>{children}</CTA>
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
		<Section data={{ classes: 'bg-dark-light-100' }}>
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center normalize-first-p normalize-last-p">{documentToReactComponents(bodyJSON, options)}</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default Feature

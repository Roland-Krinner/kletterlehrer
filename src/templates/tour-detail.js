import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'

export const query = graphql`
	query($slug: String!) {
		contentfulTourItem(slug: { eq: $slug }) {
			headline
			subline
			slug
			body {
				json
			}
		}
	}
`
const Course = ({ data }) => {
	const headline = data.contentfulTourItem.headline
	const bodyJSON = data.contentfulTourItem.body.json

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
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			<Head title={headline} />
			<section className="pt-8 pt-md-11 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col xs={12}>
							<Link to="/kurse" className="font-weight-bold font-size-sm text-decoration-none mb-3">
								<i className="fe fe-arrow-left mr-3"></i> Zur Übersicht
							</Link>
							<h1>{headline}</h1>
							{/* {displayHeadline === true ? <h1 className="display-4 mb-2">{headline}</h1> : ''}
							{displaySubline === true ? <p className="font-size-lg text-gray-700 mb-5 mb-md-0">{subline}</p> : ''} */}
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

export default Course

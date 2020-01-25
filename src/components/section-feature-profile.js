import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from './section-feature-profile.module.scss'
import Section from './section'

const imgOptions = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => '',
		[BLOCKS.HEADING_2]: (node, children) => '',
		[BLOCKS.HEADING_3]: (node, children) => '',
		[BLOCKS.PARAGRAPH]: (node, children) => '',
		[BLOCKS.EMBEDDED_ASSET]: (node, children) => {
			const title = node.data.target.fields.title['en-US']
			const url = node.data.target.fields.file['en-US'].url
			return <img src={url} alt={title} className={`${styles.image} rounded-circle`} />
		},
	},
}

const textOptions = {
	renderNode: {
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="font-weight-bold mb-3">{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else {
				return <p className="text-muted">{children}</p>
			}
		},
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					// <Link to={node.data.uri} className="btn btn-success btn-sm font-weight-bold">
					// 	{children}
					// </Link>
					<Link to={node.data.uri} className="font-weight-bold text-decoration-none text-success">
						{children} <i className="fe fe-arrow-right ml-3"></i>
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
	},
}

const Feature = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						profileText {
							json
						}
					}
				}
			}
		}
	`)
	const profileBodyJSON = data.allContentfulHome.edges[0].node.profileText.json
	return (
		<Section data={{ classes: 'bg-white' }}>
			<Container>
				<Row className="justify-content-center align-items-center">
					<Col xs={6} sm={4} lg={3} className={styles.imgWrapper}>
						{documentToReactComponents(profileBodyJSON, imgOptions)}
					</Col>
					<Col md={12} lg={9} className="mt-5 mt-lg-0 pl-lg-8">
						{documentToReactComponents(profileBodyJSON, textOptions)}
					</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default Feature

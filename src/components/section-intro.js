import React from 'react'
import { Container } from 'react-bootstrap'

import { Link, useStaticQuery, graphql } from 'gatsby'

import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const options = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted">{children}</p>,
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

const Intro = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						introText {
							json
						}
					}
				}
			}
		}
	`)
	const introBodyJSON = data.allContentfulHome.edges[0].node.introText.json
	return (
		<section className="py-8 py-md-11 bg-gray-200">
			<Container>
				{documentToReactComponents(introBodyJSON, options)}
				<Link to="/ueber-mich" className="xx__text-uppercase font-size-sm font-weight-bold text-decoration-none text-dark">
					{/* Weiterlesen <i className="fe fe-chevron-right ml-2"></i> */}
					Weiterlesen <i className="fe fe-arrow-right ml-3"></i>
				</Link>
			</Container>
		</section>
	)
}

export default Intro

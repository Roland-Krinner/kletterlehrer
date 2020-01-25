import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Section from './section'

const options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="text-white">{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted mb-7 mb-md-9">{children}</p>,
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

const FAQ = props => {
	var { q, a, index } = props
	return (
		<div className="d-flex">
			<div className="badge badge-lg badge-rounded-circle badge-success">
				<span>{index + 1}</span>
			</div>
			<div className="ml-5">
				<h4 className="text-white">{q}</h4>
				<p className="text-muted mb-6 mb-md-8">{a}</p>
			</div>
		</div>
	)
}

const FAQs = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						faQsText {
							json
						}
						faQsList {
							question
							answer {
								answer
							}
						}
					}
				}
			}
		}
	`)

	const bodyJSON = data.allContentfulHome.edges[0].node.faQsText.json
	const faqList = data.allContentfulHome.edges[0].node.faQsList
	const faqsLength = faqList.length

	return (
		<Section data={{ classes: 'bg-dark' }}>
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">
						<span className="badge badge-pill badge-gray-700-soft mb-3">
							<span className="h6 text-uppercase">FAQ</span>
						</span>
						{documentToReactComponents(bodyJSON, options)}
						{/* <h2 className="text-white">{faqsHeadline}</h2>
						<p className="font-size-lg text-muted mb-7 mb-md-9">{faqsSubline}</p> */}
					</Col>
				</Row>
				<Row>
					<Col className="col-12 col-md-6">
						{faqList.map((faq, idx) => {
							if (idx < faqsLength / 2) {
								return <FAQ q={faq.question} a={faq.answer.answer} index={idx} key={idx} />
							} else {
								return ''
							}
						})}
					</Col>
					<Col className="col-12 col-md-6">
						{faqList.map((faq, idx) => {
							if (idx >= faqsLength / 2) {
								return <FAQ q={faq.question} a={faq.answer.answer} index={idx} key={idx} />
							} else {
								return ''
							}
						})}
					</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default FAQs

import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section } from './kletterlehrer'
import { faqTextOptions } from './format-options'
import { utils } from '../utils'

const textMuted = utils.getColor('textMuted')

const FaqItem = ({ q, a, index }) => {
	return (
		<div className="d-flex">
			<div className="badge badge-lg badge-rounded-circle badge-success">
				<span>{index + 1}</span>
			</div>
			<div className="ml-5">
				<h4>{q}</h4>
				<p className={`${textMuted} mb-6 mb-md-8`}>{a}</p>
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
						contactFeature {
							json
						}
					}
				}
			}
		}
	`)
	const bodyJSON = data.allContentfulHome.edges[0].node.faQsText.json
	const faqList = data.allContentfulHome.edges[0].node.faQsList
	const faqsLength = faqList.length
	const contactFeatureJSON = data.allContentfulHome.edges[0].node.contactFeature.json
	return (
		<Section data={{ classes: 'bg-white' }}>
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">{documentToReactComponents(bodyJSON, faqTextOptions)}</Col>
				</Row>
				<Row>
					<Col className="col-12 col-md-6">
						{faqList.map((faq, idx) => {
							if (idx < faqsLength / 2) {
								return <FaqItem q={faq.question} a={faq.answer.answer} index={idx} key={idx} />
							} else {
								return ''
							}
						})}
					</Col>
					<Col className="col-12 col-md-6">
						{faqList.map((faq, idx) => {
							if (idx >= faqsLength / 2) {
								return <FaqItem q={faq.question} a={faq.answer.answer} index={idx} key={idx} />
							} else {
								return ''
							}
						})}
					</Col>
				</Row>
			</Container>
			<Container className={`mt-4 mt-md-6 mt-lg-8`} style={{zIndex: 2}}>
				<Row className={`justify-content-center text-center`}>
					<Col xs={12} sm={10} lg={8}>
						<Card className={`shadow-dark-sm overflow-hidden card-border border-success`}>
							<Card.Body className={`normalize-last-p py-6 py-md-8 py-lg-9`}>{documentToReactComponents(contactFeatureJSON, faqTextOptions)}</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default FAQs

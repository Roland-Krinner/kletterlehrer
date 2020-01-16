import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'

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
						faqSection {
							headline
							subline {
								subline
							}
							faqList {
								question
								answer {
									answer
								}
							}
						}
					}
				}
			}
		}
	`)

	const faqsHeadline = data.allContentfulHome.edges[0].node.faqSection.headline
	const faqsSubline = data.allContentfulHome.edges[0].node.faqSection.subline.subline
	const faqList = data.allContentfulHome.edges[0].node.faqSection.faqList
	const faqsLength = faqList.length

	return (
		<section className="py-8 py-md-11 bg-dark">
			<Container>
				<Row className="justify-content-center">
					<Col className="col-12 col-md-10 col-md-8 text-center">
						<span className="badge badge-pill badge-gray-700-soft mb-3">
							<span className="h6 text-uppercase">FAQ</span>
						</span>
						<h2 className="text-white">{faqsHeadline}</h2>
						<p className="font-size-lg text-muted mb-7 mb-md-9">{faqsSubline}</p>
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
		</section>
	)
}

export default FAQs

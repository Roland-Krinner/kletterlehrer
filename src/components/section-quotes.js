import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Flickity from './flickity'
import { introTextOptions } from './format-options'
import '../scss/__section-quotes.scss'

const Quotes = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						quotesText {
							json
						}
						quotesList {
							quote {
								quote
							}
							author
						}
					}
				}
			}
		}
	`)

	const quotesBodyJSON = data.allContentfulHome.edges[0].node.quotesText.json
	const quotesList = data.allContentfulHome.edges[0].node.quotesList

	return (
		<section className="py-8 py-md-11 quotes-section bg-white">
			<Container>
				<Row className="justify-content-center">
					<div className="col-12 col-md-10 col-lg-8 text-center">{documentToReactComponents(quotesBodyJSON, introTextOptions)}</div>
				</Row>
				<Row className="mt-6 quotes-wrapper">
					<Col xs={12}>
						<Card className="card-row bg-light shadow-dark-sm">
							<Row noGutters="true">
								<Col xs={12}>
									<Flickity options={{ wrapAround: true, prevNextButtons: false, pageDots: true, adaptiveHeight: true }}>
										{quotesList.map((quoteItem, idx) => {
											return (
												<div className="w-100" key={idx}>
													<Row noGutters="true" className="justify-content-center">
														<Col xs={12} md={8}>
															<Card.Body className="pt-8 pt-md-7 pb-md-8 pt-lg-9 pb-lg-9">
																<blockquote className="blockquote mb-0">
																	<p className="h3 font-weight-bold text-muted">{quoteItem.quote.quote}</p>
																	<footer className="font-size-sm text-muted">{quoteItem.author}</footer>
																</blockquote>
															</Card.Body>
														</Col>
													</Row>
												</div>
											)
										})}
									</Flickity>
									<div className="quote-symbol">
										<div className="background">
											<div className="font">
												<svg width="66" height="53" viewBox="0 0 66 53" xmlns="http://www.w3.org/2000/svg">
													<title>“</title>
													<text transform="translate(-41 -125)" fill="#2478CC" fillRule="evenodd" fontFamily="Georgia" fontSize="200">
														<tspan x="34.984" y="274">
															“
														</tspan>
													</text>
												</svg>
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Quotes

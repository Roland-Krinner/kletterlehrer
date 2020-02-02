import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Flickity from './flickity'
import { defaultTextOptions } from './format-options'
import { Section } from './kletterlehrer'
import Styles from './section-quotes.module.scss'

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
		<Section data={{ classes: 'bg-light quotes-section' }}>
			<Container>
				<Row className="justify-content-center">
					<div className="col-12 col-md-10 col-lg-8 text-center">{documentToReactComponents(quotesBodyJSON, defaultTextOptions)}</div>
				</Row>
				<Row className="mt-6">
					<Col xs={12} className={`${Styles.quotesCol}`}>
						<Card className="card-row bg-white">
							<Row noGutters="true">
								<Col xs={12}>
									<Flickity options={{ wrapAround: true, prevNextButtons: false, pageDots: true, adaptiveHeight: true }}>
										{quotesList.map((quoteItem, idx) => {
											return (
												<div className="w-100" key={idx}>
													<Row noGutters="true" className="justify-content-center">
														<Col xs={12} md={8}>
															<Card.Body className={`pt-8 pt-md-7 pb-md-8 pt-lg-9 pb-lg-9 ${Styles.cardBody}`}>
																<blockquote className="blockquote mb-0">
																	<p className="h3 font-weight-bold text-light-dark-700">{quoteItem.quote.quote}</p>
																	<footer className={`font-size-sm text-light-dark-700 ${Styles.blockquoteFooter}`}>{quoteItem.author}</footer>
																</blockquote>
															</Card.Body>
														</Col>
													</Row>
												</div>
											)
										})}
									</Flickity>
									<div className={`${Styles.quoteSymbol}`}>
										<div className={`${Styles.quoteSymbolBackground}`}>
											<div className={`${Styles.quoteSymbolFont}`}>
												<svg width="66" height="53" viewBox="0 0 66 53" xmlns="http://www.w3.org/2000/svg" className={`${Styles.quoteSymbolSvg}`}>
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
		</Section>
	)
}

export default Quotes

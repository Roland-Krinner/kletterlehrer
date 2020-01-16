import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Flickity from './flickity'
import quotesStyles from './section-quotes.module.scss'

// class Carousel extends React.Component {
// 	render() {
// 		return (
// 			<Flickity options={{ pageDots: false }}>
// 				<img src="https://via.placeholder.com/800x400?text=Hero1" />
// 				<img src="https://via.placeholder.com/800x400?text=Hero2" />
// 				<img src="https://via.placeholder.com/800x400?text=Hero3" />
// 				<img src="https://via.placeholder.com/800x400?text=Hero4" />
// 				<img src="https://via.placeholder.com/800x400?text=Hero5" />
// 				<img src="https://via.placeholder.com/800x400?text=Hero6" />
// 			</Flickity>
// 		)
// 	}
// }

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

const Quotes = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						quotesSection {
							body {
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
		}
	`)

	const quotesBodyJSON = data.allContentfulHome.edges[0].node.quotesSection.body.json
	const quotesList = data.allContentfulHome.edges[0].node.quotesSection.quotesList

	return (
		<section className="py-8 pt-md-11 pb-md-12">
			<Container>
				<Row className="justify-content-center">
					<div className="col-12 col-md-10 col-lg-8 text-center">{documentToReactComponents(quotesBodyJSON, options)}</div>
				</Row>
				{/* <Carousel /> */}
				<Row className="quotes mt-6 mt-md-8">
					<Col xs={12}>
						<Card className="card-row shadow-light-lg">
							<Row noGutters="true">
								<Col xs={12}>
									<Flickity options={{ wrapAround: true, pageDots: true, adaptiveHeight: true }}>
										{quotesList.map((quoteItem, idx) => {
											return (
												<div className="w-100" key={idx}>
													<Row noGutters="true" className="justify-content-center">
														<Col xs={12} md={8}>
															<Card.Body className={`${quotesStyles.cardBody} py-xxl-10`}>
																<blockquote className="blockquote mb-0">
																	<p>{quoteItem.quote.quote}</p>
																	<footer className={`${quotesStyles.blockquoteFooter} text-muted`}>{quoteItem.author}</footer>
																</blockquote>
															</Card.Body>
														</Col>
													</Row>
												</div>
											)
										})}
									</Flickity>
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

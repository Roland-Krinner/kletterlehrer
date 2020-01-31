import React, { useContext } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cardBodyTextOptions, options, formTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import ModalDialog from '../components/modal-dialog'
import { RegisterForm } from '../components/forms'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import Styles from './tour-detail.module.scss'

export const query = graphql`
	query($slug: String!) {
		contentfulTourItem(slug: { eq: $slug }) {
			image {
				title
				file {
					url
				}
			}
			headline
			subline
			costs
			introText {
				json
			}
			body {
				json
			}
			formHeadline
			formText {
				json
			}
		}
	}
`
const Tour = ({ data }) => {
	const imageURL = data.contentfulTourItem.image.file.url
	const imageAlt = data.contentfulTourItem.image.title
	const headline = data.contentfulTourItem.headline
	const costs = data.contentfulTourItem.costs
	const introTextJSON = data.contentfulTourItem.introText.json
	const bodyJSON = data.contentfulTourItem.body.json
	const formHeadline = data.contentfulTourItem.formHeadline
	const formTextJSON = data.contentfulTourItem.formText.json
	const prefilledText = `Ich interessiere mich für das Angebot "${headline}"`
	const dispatch = useContext(GlobalDispatchContext)
	return (
		<Layout pageInfo={{ pageName: 'touren', pageType: 'subPage' }}>
			<Head title={headline} props={'props'}/>
			<section className={`pt-5 pb-8 pb-sm-10 ${Styles.detailView}`}>
				<Container className={Styles.mobileContainer}>
					<Row>
						<Col xs={12} lg={7} className="pr-lg-0 pr-lg-3">
							<Card className="bg-dark overflow-hidden shadow-dark-sm">
								<div className="card-img-top">
									<img src={imageURL} alt={imageAlt} className="img-fluid" />
									<div className={Styles.cardImgTopDiv}>
										<div>
											<h1 className="h3 text-white mb-0">{headline}</h1>
										</div>
									</div>
								</div>
								<Card.Body className={`bg-white ${Styles.cardBody}`}>
									<div className="d-flex align-items-start">
										<span className="badge badge-secondary rounded mb-3">Preis: {costs}</span>
									</div>
									<div className="normalize-last-p">
										{documentToReactComponents(introTextJSON, cardBodyTextOptions)}
										<Button
											className="btn btn-success btn-sm"
											onClick={() => {
												dispatch({ type: 'TOGGLE_MODAL' })
											}}
										>
											Jetzt anmelden
										</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} className={`mt-5 pr-lg-0 pr-lg-3`}>
							<Card className={`content-card shadow-dark-sm`}>
								<Card.Body className={`normalize-last-p ${Styles.cardBody}`}>{documentToReactComponents(bodyJSON, options)}</Card.Body>
							</Card>
						</Col>
						<ModalDialog data={{ headline: formHeadline }}>
							{documentToReactComponents(formTextJSON, formTextOptions)}
							<RegisterForm data={{ prefilledText }} />
						</ModalDialog>
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

export default Tour

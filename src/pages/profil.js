import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { SubPage } from '../components/kletterlehrer'
import Styles from './profil.module.scss'

const Image = ({ data: { img, classes } }) => {
	const alt = img.title ? img.title : ''
	const src = img.file && img.file.url ? img.file.url : ''
	return <img src={src} alt={alt} className={classes || ''} />
}

const CardSection = ({ data: { section } }) => {
	return section.displayText === true ? (
		<Card className="shadow-dark-sm mt-20 mt-sm-7">
			<Row>
				<Col xs={12}>
					<Card.Body className={`${Styles.cardBody}` }>{documentToReactComponents(section.text.json, defaultTextOptions)}</Card.Body>
				</Col>
			</Row>
		</Card>
	) : (
		''
	)
}

const Profil = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulProfilePage {
				edges {
					node {
						introText {
							json
						}
						featureBackgroundImage {
							title
							file {
								url
							}
						}
						featureProfileImage {
							title
							file {
								url
							}
						}
						featureHeadline
						featureSubline
						featureText {
							json
						}
						sections {
							text {
								json
							}
							displayText
						}
					}
				}
			}
		}
	`)
	const introTextJSON = data.allContentfulProfilePage.edges[0].node.introText.json
	const featureBackgroundImage = data.allContentfulProfilePage.edges[0].node.featureBackgroundImage
	const featureProfileImage = data.allContentfulProfilePage.edges[0].node.featureProfileImage
	const featureHeadline = data.allContentfulProfilePage.edges[0].node.featureHeadline
	const featureSubline = data.allContentfulProfilePage.edges[0].node.featureSubline
	const featureTextJSON = data.allContentfulProfilePage.edges[0].node.featureText.json
	const sections = data.allContentfulProfilePage.edges[0].node.sections
	return (
		<Layout pageInfo={{ pageName: 'profil', pageType: 'subPage' }}>
			<Head title="Profil" />
			<SubPage data={{ classes: 'profile-page' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Card className="shadow-dark-sm overflow-hidden">
						<Row noGutters>
							<Col xs={4} className="d-none d-md-flex">
								<div style={{ backgroundImage: `url(${featureBackgroundImage.file.url})` }} className={Styles.bgImgWrapper}></div>
							</Col>
							<Col xs={12} md={8}>
								<Card.Body className={`${Styles.cardBody} ${Styles.minHeight}`}>
									<Row className="justify-content-center mt-4">
										<Col xs={4} sm={3} lg={3} className={Styles.profileImgWrapper}>
											<Image data={{ img: featureProfileImage, classes: `${Styles.image} rounded-circle` }} />
										</Col>
										<Col xs={12} className="text-center">
											<h3 className="font-weight-bold mt-3 mb-0">{featureHeadline}</h3>
											<p className="text-muted">{featureSubline}</p>
										</Col>
									</Row>
									<Row noGutters className="mt-4">
										<Col>{documentToReactComponents(featureTextJSON, defaultTextOptions)}</Col>
									</Row>
								</Card.Body>
							</Col>
						</Row>
					</Card>
					{sections.map((section, idx) => {
						return <CardSection data={{ section }} key={idx} />
					})}
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Profil

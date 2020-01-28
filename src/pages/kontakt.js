import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Layout from '../components/layout'
import Head from '../components/head'
import { SubPage } from '../components/kletterlehrer'
import { RegisterForm } from '../components/forms'
import { defaultTextOptions, formTextOptions } from '../components/format-options'
import Styles from './kontakt.module.scss'

const Contact = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulContactPage {
				edges {
					node {
						introText {
							json
						}
						formText {
							json
						}
					}
				}
			}
		}
	`)
	const introTextJSON = data.allContentfulContactPage.edges[0].node.introText.json
	const formTextJSON = data.allContentfulContactPage.edges[0].node.formText.json
	return (
		<Layout pageInfo={{ pageName: 'kontakt', pageType: 'subPage' }}>
			<Head title="Kontakt" />
			<SubPage data={{ classes: 'kontakt-page' }}>
				<Container>
					<Row>
						<Col xs={12} lg={6}>
							{documentToReactComponents(introTextJSON, defaultTextOptions)}
						</Col>
						<Col xs={12} lg={6} className={`mt-5 mt-lg-0 ${Styles.formCardCol}`}>
							<Card className="shadow-dark-sm overflow-hidden">
								<Card.Body className={`${Styles.formCardBody}`}>
									<div className={`mt-5 ${Styles.formCardBodyDiv}`}>{documentToReactComponents(formTextJSON, formTextOptions)}</div>
									<RegisterForm data={{ prefilledText: '' }} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Contact

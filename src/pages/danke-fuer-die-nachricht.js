import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { SubPage } from '../components/kletterlehrer'

const ThankYou = (props) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulStaticPages {
				edges {
					node {
						thankYouBody {
							json
						}
					}
				}
			}
		}
	`)
	const bodyJSON = data.allContentfulStaticPages.edges[0].node.thankYouBody.json
	return (
		<Layout pageInfo={{ pageName: 'danke', pageType: 'subPage' }}>
			<Head title="Danke" props={props}/>
			<SubPage data={{ classes: '' }}>
				<Container>
					<Row>
						<Col xs={12} md={8}>
							{documentToReactComponents(bodyJSON, defaultTextOptions)}
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}

export default ThankYou

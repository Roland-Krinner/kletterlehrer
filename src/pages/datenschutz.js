import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { legalTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { SubPage } from '../components/kletterlehrer'

const Privacy = props => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulStaticPages {
				edges {
					node {
						privacyBody {
							json
						}
					}
				}
			}
		}
	`)
	const bodyJSON = data.allContentfulStaticPages.edges[0].node.privacyBody.json
	return (
		<Layout pageInfo={{ pageName: 'datenschutz', pageType: 'subPage' }}>
			<Head title="Datenschutz" props={props} />
			<SubPage data={{ classes: '' }}>
				<Container>
					<Row>
						<Col xs={12} md={8}>
							{documentToReactComponents(bodyJSON, legalTextOptions)}
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Privacy

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Head = ({ title }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSiteMetadata {
				edges {
					node {
						websiteTitle
					}
				}
			}
		}
	`)

	const websiteTitle = data.allContentfulSiteMetadata.edges[0].node.websiteTitle

	return <Helmet title={`${title} | ${websiteTitle}`} />
}

export default Head

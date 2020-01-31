import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Head = ({ props, staticURL, title, sharerTitle, sharerDescription, sharerImage }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSiteMetadata {
				edges {
					node {
						baseTitle
						siteName
						siteDescription
						baseUrl
						socialSharerImage {
							file {
								url
							}
						}
					}
				}
			}
		}
	`)

	// Title Tag
	const baseTitle = data.allContentfulSiteMetadata.edges[0].node.baseTitle
	const pageTitle = title !== '' ? `${title} | ${baseTitle}` : baseTitle

	// Site Name, Default Page Description
	const siteName = data.allContentfulSiteMetadata.edges[0].node.siteName
	const defaultPageDescription = data.allContentfulSiteMetadata.edges[0].node.siteDescription

	// Page URL
	const baseUrl = data.allContentfulSiteMetadata.edges[0].node.baseUrl
	const og_url = props && props.location ? props.location.href : staticURL ? `${baseUrl}${staticURL}` : `${baseUrl}`

	// Sharer Title
	const og_title = sharerTitle ? sharerTitle : pageTitle

	// Sharer Description
	const og_description = sharerDescription ? sharerDescription : defaultPageDescription

	// Sharer Image
	const hotSpot = 'top_right'
	const twitterSizes = '1200x628'
	const ogSizes = '1200x630'
	const sharerImageBaseUrl = sharerImage ? sharerImage : data.allContentfulSiteMetadata.edges[0].node.socialSharerImage.file.url
	const twitter_image = `https:${sharerImageBaseUrl}?fit=thumb&f=${hotSpot}&w=${twitterSizes.split('x')[0]}&h=${twitterSizes.split('x')[1]}`
	const og_image = `https:${sharerImageBaseUrl}?fit=thumb&f=${hotSpot}&w=${ogSizes.split('x')[0]}&h=${ogSizes.split('x')[1]}`

	return (
		<Helmet>
			<title>{pageTitle}</title>
			<link rel="shortcut icon" href="/favicon.ico" />
			<meta name="copyright" content={siteName} />
			<meta name="description" content={og_description} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={og_title} />
			<meta name="twitter:description" content={og_description} />
			<meta name="twitter:image" content={twitter_image} />

			{/* OpenGraph */}
			<meta property="og:locale" content="de_DE" />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:title" content={og_title} />
			<meta property="og:url" content={og_url} />
			<meta property="og:description" content={og_description} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={og_image} />
			<meta property="og:image:width" content={ogSizes.split('x')[0]} />
			<meta property="og:image:height" content={ogSizes.split('x')[1]} />

			{/* Google / SEO */}
			<meta itemprop="name" content={siteName} />
			<meta itemprop="description" content={og_description} />
			<meta itemprop="image" content={og_image} />

			{/* <link rel="canonical" href={xxx__ToDo} /> */}
			{/* <link rel="preload" href="//ergo-schober.de/static/media/Feather.65d68bd4.svg" as="font" type="image/svg+xml" crossorigin="" />
			<link rel="preload" href="//ergo-schober.de/static/media/Feather.d9c23068.woff" as="font" type="font/woff" crossorigin="" />
			<link rel="preload" href="//ergo-schober.de/static/media/Feather.fe159434.ttf" as="font" type="font/ttf" crossorigin="" />
			   */}
		</Helmet>
	)
}

export default Head

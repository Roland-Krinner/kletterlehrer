import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Head = ({ props , staticURL, title }) => {
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

	
	const hotSpot = 'top_right'
	const twitterSizes = '1200x628'
	const ogSizes = '1200x630'
	
	const baseTitle = data.allContentfulSiteMetadata.edges[0].node.baseTitle
	const siteName = data.allContentfulSiteMetadata.edges[0].node.siteName
	const siteDescription = data.allContentfulSiteMetadata.edges[0].node.siteDescription
	const baseUrl = data.allContentfulSiteMetadata.edges[0].node.baseUrl
	const sharerImageBaseUrl = data.allContentfulSiteMetadata.edges[0].node.socialSharerImage.file.url
	
	const twitterImage = `https:${sharerImageBaseUrl}?fit=thumb&f=${hotSpot}&w=${twitterSizes.split('x')[0]}&h=${twitterSizes.split('x')[1]}`
	const ogImage = `https:${sharerImageBaseUrl}?fit=thumb&f=${hotSpot}&w=${ogSizes.split('x')[0]}&h=${ogSizes.split('x')[1]}`
	
	const concatTitle = title !== '' ? `${title} | ${baseTitle}` : baseTitle
	const url = props && props.location ? props.location.href : staticURL ? `${baseUrl}${staticURL}` : `${baseUrl}`

	return (
		<Helmet>
<title>{concatTitle}{url}</title>
			<link rel="shortcut icon" href="/favicon.ico" />
			<meta name="copyright" content={siteName} />
			<meta name="description" content={siteDescription} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={concatTitle} />
			<meta name="twitter:description" content={siteDescription} />
			<meta name="twitter:image" content={twitterImage} />
			{/* <meta name="twitter:image:src" content="https://ergo-schober.de/img/og/og_1200x628.jpg" /> */}

			{/* OpenGraph */}
			<meta property="og:locale" content="de_DE" />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:title" content={concatTitle} />
			<meta property="og:url" content={url} />
			<meta property="og:description" content={siteDescription} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={ogImage} />
			<meta property="og:image:width" content={ogSizes.split('x')[0]} />
			<meta property="og:image:height" content={ogSizes.split('x')[1]} />
			
			{/* Google/SEO */}
			<meta itemprop="name" content={concatTitle} />
			<meta itemprop="description" content={siteDescription} />
			<meta itemprop="image" content={ogImage} />
			{/* <link rel="canonical" href={xxx__ToDo} /> */}
			{/* <link rel="preload" href="//ergo-schober.de/static/media/Feather.65d68bd4.svg" as="font" type="image/svg+xml" crossorigin="" />
			<link rel="preload" href="//ergo-schober.de/static/media/Feather.d9c23068.woff" as="font" type="font/woff" crossorigin="" />
			<link rel="preload" href="//ergo-schober.de/static/media/Feather.fe159434.ttf" as="font" type="font/ttf" crossorigin="" />
			   */}
		</Helmet>
	)
}

export default Head

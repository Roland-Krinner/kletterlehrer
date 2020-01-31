module.exports = {
	plugins: [
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Kletterlehrer`,
				short_name: `Kletterlehrer`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#ffffff`, 
				display: `standalone`,
				icon: `src/images/icon.svg`, // This path is relative to the root of the site.
				// icons: [
				// 	{
				// 		src: `/favicons/icon-48x48.png`,
				// 		sizes: `48x48`,
				// 		type: `image/png`,
				// 	},
				// ],
			},
		},
		`gatsby-transformer-inline-svg`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
				host: process.env.CONTENTFUL_HOST,
				environment: process.env.CONTENTFUL_ENVIRONMENT,
			},
		},
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `src`,
				path: `${__dirname}/src/`,
			},
		},
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-relative-images`,
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 750,
							linkImagesToOriginal: false,
						},
					},
				],
			},
		},
	],
}

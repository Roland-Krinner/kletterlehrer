const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const courseItemTemplate = path.resolve(`src/templates/course-detail.js`)
	const tourItemTemplate = path.resolve(`src/templates/tour-detail.js`)
	const res = await graphql(`
		query {
			allContentfulCourseItem {
				edges {
					node {
						slug
					}
				}
			}
			allContentfulTourItem {
				edges {
					node {
						slug
					}
				}
			}
		}
	`)
	res.data.allContentfulCourseItem.edges.forEach(edge => {
		createPage({
			component: courseItemTemplate,
			path: `/kurse/${edge.node.slug}`,
			context: {
				slug: edge.node.slug,
			},
		})
	})
	res.data.allContentfulTourItem.edges.forEach(edge => {
		createPage({
			component: tourItemTemplate,
			path: `/touren/${edge.node.slug}`,
			context: {
				slug: edge.node.slug,
			},
		})
	})
}

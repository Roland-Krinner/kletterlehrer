import React from 'react'
import { Link } from 'gatsby'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

const cardBodyTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-gray-800 xxx__text-muted">{children}</p>,
		[BLOCKS.HEADING_6]: (node, children) => <p className="h6 text-muted mb-0">{children}</p>,
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-secondary mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-2">{children}</span>
			</div>
		),
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className="text-gray-800 font-weight-bold">{text}</span>,
	},
}

const introTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="mb-1">{children}</h2>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-5 text-muted">{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-gray-800">{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					// <Link to={node.data.uri} className="font-weight-bold text-decoration-none text-success">
					// 	{children}
					// 	<i className="fe fe-arrow-right ml-3"></i>
					// </Link>
					<Link to={node.data.uri} className="btn btn-success btn-sm font-weight-bold text-decoration-none">
						{children}
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer">
						{children}
					</a>
				)
			}
		},
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-4">{children}</span>
			</div>
		),
	},
}

const options = {
	renderNode: {
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-5 font-weight-bold">{children}</h3>,
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="mb-5 font-weight-bold">{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-gray-800">{children}</p>,
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-secondary mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-2">{children}</span>
			</div>
		),
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className="text-gray-800 font-weight-bold">{text}</span>,
	},
}

const formTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_5]: (node, children) => <h5 className="mb-3 font-weight-bold">{children}</h5>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-sm text-gray-800">{children}</p>,
	},
}

export { introTextOptions, options, formTextOptions, cardBodyTextOptions }

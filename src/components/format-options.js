import React from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

const introTextOptions = {
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

export { introTextOptions, options, formTextOptions }

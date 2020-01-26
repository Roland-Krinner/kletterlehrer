import React from 'react'
import { Link } from 'gatsby'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { CTA, BrandData } from './kletterlehrer'

const defaultTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => <h1 className="h2 mb-1">{children}</h1>,
		[BLOCKS.HEADING_6]: (node, children) => <p className="h3 mb-5 text-muted">{children}</p>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-3 font-weight-bold">{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else if (node.content[0].value.indexOf('$$') !== -1) {
				return <BrandData data={{ searchStr: node.content[0].value }} />
			} else {
				return <p className="text-gray-800">{children}</p>
			}
		},
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-secondary mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-2">{children}</span>
			</div>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-success text-decoration-none">
						{children}
					</a>
				)
			}
		},
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className="font-weight-bold">{text}</span>,
	},
}

const introTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="mb-1">{children}</h2>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-5 text-muted">{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => {
			if (node.content.length === 1 && node.content[0].value === '') {
				return ''
			} else {
				return <p className="font-size-lg text-gray-800">{children}</p>
			}
		},
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return <CTA data={{ to: node.data.uri, classes: '' }}>{children}</CTA>
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-success text-decoration-none">
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

const formTextOptions = {
	renderNode: {
		[BLOCKS.HEADING_5]: (node, children) => <h5 className="mb-3 font-weight-bold">{children}</h5>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-sm text-gray-800">{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className="text-success text-decoration-none">
						{children}
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-success text-decoration-none">
						{children}
					</a>
				)
			}
		},
	},
}

export { introTextOptions, options, formTextOptions, cardBodyTextOptions, defaultTextOptions }

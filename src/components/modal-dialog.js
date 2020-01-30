import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import Styles from './modal-dialog.module.scss'

const ModalDialog = ({ children, data: { headline } }) => {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)
	const modalHeadline = headline || ''
	return (
		<Modal show={state.modalVisible} size="md" aria-labelledby="vertical-modal-title" centered className={`${Styles.modal}`}>
			<Modal.Header closeButton={false}>
				<Modal.Title>{modalHeadline}</Modal.Title>
				<button
					type="button"
					className="close"
					onClick={() => {
						dispatch({ type: 'TOGGLE_MODAL' })
					}}
				>
					<span aria-hidden="true">×</span>
					<span className="sr-only">Close</span>
				</button>
			</Modal.Header>
			<Modal.Body className={`${Styles.modalBody}`}>{children}</Modal.Body>
			{/* <Modal.Footer className={`${Styles.modalFooter}`}>
				<p className="h6">
					* Unverbindliche Anfrage stellen
				</p>
			</Modal.Footer> */}
		</Modal>
	)
}

export default ModalDialog

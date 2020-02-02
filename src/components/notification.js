import React, { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider'
import Styles from './notification.module.scss'

function Notification() {
	const dispatch = useContext(GlobalDispatchContext)
	const state = useContext(GlobalStateContext)

	return (
		<div className={`${Styles.notificationWrapper}`}>
			<Toast
				onClose={() => {
					dispatch({ type: 'HIDE_NOTIFICATION' })
				}}
				show={state.notificationVisible}
				delay={3000}
				autohide
				animation={false}
				className="no-select"
			>
				<Toast.Header>
					<strong className="mr-auto">Hinweis</strong>
				</Toast.Header>
				<Toast.Body>
					{state.messages.map((message, idx) => {
						return <p key={idx}>{message}</p>
					})}
				</Toast.Body>
			</Toast>
		</div>
	)
}

export default Notification

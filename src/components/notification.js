import React, { useState, useContext, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import { Context as NotificationContext } from '../context/context'
import '../scss/__notification.scss'

function Notification() {
	const notificationContext = useContext(NotificationContext)
	const { notificationData } = notificationContext
	const [show, setShow] = useState(null)
	const [messages, setMessages] = useState([])

	useEffect(() => {
		setShow(notificationData.showNotification || false)
		setMessages(notificationData.messages || [])
	}, [notificationData])

	return (
		<div className="notification-wrapper">
			<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation={false} className="no-select x_no-pointer-events">
				<Toast.Header>
					<strong className="mr-auto">Achtung</strong>
				</Toast.Header>
				<Toast.Body>
					{messages.map((message, idx) => {
						return <p key={idx}>{message}</p>
					})}
				</Toast.Body>
			</Toast>
		</div>
	)
}

export default Notification

import React, { createContext, useState } from 'react'

export const Context = createContext({})

export const Provider = ({ children }) => {
	const [notificationData, setNotificationData] = useState({
		showNotification: false,
		messages: [],
	})
	const someContext = {
		notificationData,
		setNotificationData,
	}

	return <Context.Provider value={someContext}>{children}</Context.Provider>
}

export const { Consumer } = Context

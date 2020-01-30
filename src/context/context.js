import React, { createContext, useState } from 'react'

export const Context = createContext({})

export const Provider = ({ children }) => {
	const [notificationData, setNotificationData] = useState({
		showNotification: false,
		messages: [],
	})

	const [modalVisible, setModalVisible] = useState(false);

	const someContext = {
		notificationData,
		setNotificationData,
		modalVisible,
		setModalVisible
	}

	return <Context.Provider value={someContext}>{children}</Context.Provider>
}

export const { Consumer } = Context

import React, { useReducer } from 'react'

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
	theme: 'light',
	modalVisible: false,
	notificationVisible: false,
	messages: []
}

function reducer(state, action) {
	switch (action.type) {
		case 'TOGGLE_THEME': {
			return {
				...state,
				theme: state.theme === 'light' ? 'dark' : 'light',
			}
		}
		case 'TOGGLE_MODAL': {
			return {
				...state,
				modalVisible: !state.modalVisible,
			}
		}
		case 'UPDATE_NOTIFICATION': {
			return {
				...state,
				notificationVisible: action.notificationVisible,
				messages: action.messages
			}
		}
		case 'HIDE_NOTIFICATION': {
			return {
				...state,
				notificationVisible: false,
			}
		}
		default:
			throw new Error('Bad action.')
	}
}

const GlobalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	)
}

export default GlobalContextProvider

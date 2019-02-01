import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import initStore from '@/redux/init-store'
import App from '@/components/App'
import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'

const store = initStore()

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
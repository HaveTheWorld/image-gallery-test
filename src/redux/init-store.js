import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import images, { FILL_IMAGES } from '@/redux/ducks/images'

export default () => {
	const reducer = combineReducers({
		images
	})

	const enhancer = composeWithDevTools(
		applyMiddleware(
			thunk
		)
	)

	const store = createStore(reducer, {}, enhancer)
	
	const savedImages = localStorage.getItem('images')
	savedImages && store.dispatch({ type: FILL_IMAGES, payload: JSON.parse(savedImages) })

	return store
}
import uuid from 'uuid/v4'

/* ===== Constants ===== */
export const moduleName = 'images'

export const FILL_IMAGES = `${moduleName}/FILL_IMAGES`
export const ADD_IMAGE = `${moduleName}/ADD_IMAGE`
export const REMOVE_IMAGE = `${moduleName}/REMOVE_IMAGE`
export const EDIT_COMMENT = `${moduleName}/EDIT_COMMENT`
export const VIEW_IMAGE = `${moduleName}/VIEW_IMAGE`
export const CLOSE_IMAGE = `${moduleName}/CLOSE_IMAGE`
export const SORT_IMAGES = `${moduleName}/SORT_IMAGES`

/* ===== Initial state ===== */
const initialState = {
	items: [],
	activeImageId: ''
}

/* ===== Selectors ===== */
export const getActiveImage = state => {
	const { items, activeImageId } = state[moduleName]
	return items.find(({ id }) => id === activeImageId)
}

/* ===== Reducer ===== */
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case FILL_IMAGES:
			return { ...state, items: payload }

		case ADD_IMAGE: {
			const id = uuid()
			const items = [...state.items, { id, ...payload }]
			localStorage.setItem('images', JSON.stringify(items))
			return { ...state, items }
		}

		case REMOVE_IMAGE: {
			const items = state.items.filter(({ id }) => id !== payload)
			localStorage.setItem('images', JSON.stringify(items))
			return { ...state, items }
		}

		case EDIT_COMMENT: {
			const { id, comment } = payload
			const items = state.items.map(item => {
				if (item.id === id) { item.comment = comment }
				return item
			})
			localStorage.setItem('images', JSON.stringify(items))
			return { ...state, items }
		}

		case VIEW_IMAGE:
			return { ...state, activeImageId: payload }

		case CLOSE_IMAGE:
			return { ...state, activeImageId: '' }

		case SORT_IMAGES:
			return { ...state, items: payload }

		default:
			return state
	}
}

/* ===== Action creators ===== */
export const fillImages = images => ({ type: FILL_IMAGES, payload: images })
export const addImage = image => ({ type: ADD_IMAGE, payload: image })
export const removeImage = imageId => ({ type: REMOVE_IMAGE, payload: imageId })
export const editComment = (imageId, comment) => ({ type: EDIT_COMMENT, payload: { id: imageId, comment } })
export const viewImage = imageId => ({ type: VIEW_IMAGE, payload: imageId })
export const closeImage = () => ({ type: CLOSE_IMAGE })
export const sortImages = (dragIndex, hoverIndex) => (dispatch, getState) => {
	const { items } = getState()[moduleName]
	const dragImage = items[dragIndex]

	const newItems = items.filter((item, index) => index !== dragIndex)
	newItems.splice(hoverIndex, 0, dragImage)
	
	dispatch({ type: SORT_IMAGES, payload: newItems })
}
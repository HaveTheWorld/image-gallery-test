import uuid from 'uuid/v4'

/* ===== Constants ===== */
export const moduleName = 'images'

export const FILL_IMAGES = `${moduleName}/FILL_IMAGES`
export const ADD_IMAGE = `${moduleName}/ADD_IMAGE`
export const REMOVE_IMAGE = `${moduleName}/REMOVE_IMAGE`
export const EDIT_COMMENT = `${moduleName}/EDIT_COMMENT`

/* ===== Initial state ===== */
const initialState = {
	items: []
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

		default:
			return state
	}
}

/* ===== Action creators ===== */
export const fillImages = images => ({ type: FILL_IMAGES, payload: images })
export const addImage = image => ({ type: ADD_IMAGE, payload: image })
export const removeImage = imageId => ({ type: REMOVE_IMAGE, payload: imageId })
export const editComment = (imageId, comment) => ({ type: EDIT_COMMENT, payload: { id: imageId, comment } })
export const loadData = () => {
	try {
		const savedCartItems = sessionStorage.getItem('cart')
		if (savedCartItems === null) {
			return undefined
		}
		return JSON.parse(savedCartItems)
	} catch (error) {
		console.error('Error loading items from session storage', error.message)
		return undefined
	}
}

export const saveData = data => {
	try {
		const dataToSave = JSON.stringify(data)
		sessionStorage.setItem('cart', dataToSave)
	} catch (error) {
		console.error('Error saving items to session storage', error.message)
		return undefined
	}
}

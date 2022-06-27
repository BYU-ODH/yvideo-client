class BrowserStorage {

	displayBlocksKey = `displayBlocks`

	/**
	 * Sets the collection display type to either block or list
	 *
	 * @param type The type you want to set collectionDisplay to. Must be either `block` or `list`.
	 */
	set displayBlocks(value) {
		localStorage.setItem(this.displayBlocksKey, value)
	}

	/**
	 * Sets the collection display type to either block or list
	 *
	 * @returns either `block` or `list`
	 */
	get displayBlocks() {
		return localStorage.getItem(this.displayBlocksKey) === `true`
	}

	publicDisplayBlocksKey = `publicDisplayBlocks`

	/**
	 * Sets the public collection display type to either block or list
	 *
	 * @param type The type you want to set publicCollectionDisplay to. Must be either `block` or `list`.
	 */
	set publicDisplayBlocks(value) {
		localStorage.setItem(this.publicDisplayBlocksKey, value)
	}

	/**
	 * Sets the public collection display type to either block or list
	 *
	 * @returns either `block` or `list`
	 */
	get publicDisplayBlocks() {
		return localStorage.getItem(this.publicDisplayBlocksKey) === `true`
	}
}

const browserStorage = new BrowserStorage()

export default browserStorage

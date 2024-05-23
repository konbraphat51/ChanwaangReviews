const INDEX_FILE = "src/data/articles/articles.json"
const LOCALES = ["en", "ja"]

class Article {
	constructor(
		filename,
		title,
		media,
		tags,
		short,
		importance,
		link,
		hasPage,
		time,
	) {
		this.filename = filename
		this.title = title
		this.media = media
		this.tags = tags
		this.short = short
		this.importance = importance
		this.link = link
		this.hasPage = hasPage
		this.time = time
	}
}

class ArticleIndexReader {
	constructor() {
		this.articles = []

		this.ReadIndex = this.ReadIndex.bind(this)
	}

	/**
	 * Update index data
	 */
	async ReadIndex() {
		const response = await fetch(INDEX_FILE)
		let fileContent = await response.text()
		this.raw_json = JSON.parse(fileContent)
		this.#ProcessData()
	}

	/**
	 * Select articles based on criteria
	 * @param {boolean} and - true for AND, false for OR
	 */
	SelectArticles(
		and = true,
		title = [],
		media = [],
		tags = [],
		short = [],
		importance = [],
		link = [],
		hasPage = null,
		minTime = 0,
		maxTime = 100000000000000,
		sorting = [
			["importance", "desc"],
			["time", "desc"],
		],
	) {
		//copy
		let filtered = this.articles.concat()

		//title
		filtered = this.#FilterInclusive(filtered, "title", title, and)

		//media
		filtered = this.#FilterInclusive(filtered, "media", media, and)

		//tags
		filtered = this.#FilterMatching(filtered, "tags", tags, and)

		//short
		filtered = this.#FilterInclusive(filtered, "short", short, and)

		//importance
		filtered = this.#FilterValue(filtered, "importance", importance)

		//link
		filtered = this.#FilterInclusive(filtered, "link", link, and)

		//hasPage
		filtered = this.#FilterValue(filtered, "hasPage", hasPage)

		//time
		filtered = this.#FilterTime(filtered, minTime, maxTime)

		//sort
		return this.#Sort(filtered, sorting)
	}

	/**
	 * Process raw data received
	 */
	#ProcessData() {
		this.articles = []
		this.raw_json.forEach((element) => {
			this.articles.push(
				new Article(
					element.filename,
					element.title,
					element.media,
					element.tags,
					element.short,
					element.importance,
					element.link,
					element.hasPage,
					element.time,
				),
			)
		})
	}

	/**
	 * Check string including keywords
	 */
	#FilterInclusive(target, key, keywords, and) {
		let result = []
		target.forEach((article) => {
			let targetStrings = []
			if (typeof article[key] === "string") {
				targetStrings.push(article[key])
			} else {
				//object
				//has several locale
				article[key].forEach((element) => {
					targetStrings.push(element)
				})
			}

			targetStrings.forEach((targetString) => {
				if (and) {
					//AND
					let ok = true
					keywords.forEach((keyword) => {
						if (!targetString.includes(keyword)) {
							ok = false
							return // break from forEach
						}
					})
					if (ok) {
						result.push(article)
						return // break from forEach
					}
				} else {
					//OR
					let ok = false
					keywords.forEach((keyword) => {
						if (targetString.includes(keyword)) {
							result.push(article)
							ok = true
							return // break from forEach
						}
					})

					if (ok) {
						return // break from forEach
					}
				}
			})
		})

		return result
	}

	/**
	 * Check list matching keywords
	 */
	#FilterMatching(target, key, keywords, and) {
		let result = []
		target.forEach((article) => {
			if (and) {
				//AND
				let ok = true
				keywords.forEach((keyword) => {
					if (!article[key].includes(keyword)) {
						ok = false
						return // break from forEach
					}
				})
				if (ok) {
					result.push(article)
				}
			} else {
				//OR
				keywords.forEach((keyword) => {
					if (article[key].includes(keyword)) {
						result.push(article)
						return // break from forEach
					}
				})
			}
		})

		return result
	}

	#FilterValue(target, key, values) {
		let result = []
		target.forEach((article) => {
			if (values.includes(article[key])) {
				result.push(article)
			}
		})
		return result
	}

	#FilterTime(target, minTime, maxTime) {
		let result = []
		target.forEach((article) => {
			if (article.time >= minTime && article.time <= maxTime) {
				result.push(article)
			}
		})
		return result
	}

	#Sort(target, sorting) {
		//copy
		let result = target.concat()

		result.sort((a, b) => {
			//comparison
			for (let i = 0; i < sorting.length; i++) {
				let key = sorting[i][0]
				let order = sorting[i][1]
				if (a[key] < b[key]) {
					return order === "asc" ? -1 : 1
				}
				if (a[key] > b[key]) {
					return order === "asc" ? 1 : -1
				}
			}
			return 0
		})

		return result
	}
}

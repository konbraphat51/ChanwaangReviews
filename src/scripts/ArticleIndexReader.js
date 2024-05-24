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
		createdAt,
		updatedAt,
	) {
		this.filename = filename
		this.title = title
		this.media = media
		this.tags = tags
		this.short = short
		this.importance = importance
		this.link = link
		this.hasPage = hasPage
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

class ArticleIndexReader {
	constructor() {
		this.articles = []

		this.ReadIndex = this.ReadIndex.bind(this)
		this.SelectArticles = this.SelectArticles.bind(this)
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
		link = [],
		hasPage = [],
		importanceMin = 0,
		importanceMax = 5,
		minCreatedTime = 0,
		maxCreatedTime = 100000000000000,
		minUpdatedTime = 0,
		maxUpdatedTime = 100000000000000,
		sorting = [
			["importance", "desc"],
			["updatedTime", "desc"],
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

		//link
		filtered = this.#FilterInclusive(filtered, "link", link, and)

		//hasPage
		filtered = this.#FilterValue(filtered, "hasPage", hasPage)

		//importance
		filtered = this.#FilterBetween(
			filtered,
			"importance",
			importanceMin,
			importanceMax,
		)

		//createdAt
		filtered = this.#FilterBetween(
			filtered,
			"createdAt",
			minCreatedTime,
			maxCreatedTime,
		)

		//updatedAt
		filtered = this.#FilterBetween(
			filtered,
			"updatedAt",
			minUpdatedTime,
			maxUpdatedTime,
		)

		//sort
		return this.#Sort(filtered, sorting)
	}

	/**
	 * Process raw data received
	 */
	#ProcessData() {
		this.articles = []
		this.raw_json["articles"].forEach((element) => {
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
					element.createdAt,
					element.updatedAt,
				),
			)
		})
	}

	/**
	 * Check string including keywords
	 */
	#FilterInclusive(target, key, keywords, and) {
		if (keywords.length === 0) {
			return target
		}

		let result = []
		target.forEach((article) => {
			let targetStrings = []
			if (typeof article[key] === "string") {
				targetStrings.push(article[key])
			} else {
				//object
				//has several locale
				Object.keys(article[key]).forEach((locale) => {
					targetStrings.push(article[key][locale])
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
		if (keywords.length === 0) {
			return target
		}

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
		if (values.length === 0) {
			return target
		}

		let result = []
		target.forEach((article) => {
			if (values.includes(article[key])) {
				result.push(article)
			}
		})
		return result
	}

	#FilterBetween(target, key, min, max) {
		let result = []
		target.forEach((article) => {
			if (article[key] >= min && article[key] <= max) {
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

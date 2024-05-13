const INDEX_FILE = "src/data/articles.json"
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
	}

	/**
	 * Update index data
	 */
	ReadIndex() {
		fetch(INDEX_FILE)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				this.raw_json = data
				this.#ProcessData()
			})
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
		sorting = [],
	) {
		//copy
		let filtered = this.articles.concat()

		//title
		filtered = this.#FilterInclusive("title", title, and)

		//media
		filtered = this.#FilterInclusive("media", media, and)

		//tags
		filtered = this.#FilterMatching("tags", tags, and)

		//short
		filtered = this.#FilterInclusive("short", short, and)

		//importance
		filtered = this.#FilterValue(filtered, "importance", importance)

		//link
		filtered = this.#FilterInclusive("link", link, and)

		//hasPage
		filtered = this.#FilterValue(filtered, "hasPage", hasPage)
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
}

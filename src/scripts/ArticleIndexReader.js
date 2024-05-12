const INDEX_FILE = "src/data/articles.json"

class Article {
	constructor(filename, title, media, tags, short, importance, link, hasPage) {
		this.filename = filename
		this.title = title
		this.media = media
		this.tags = tags
		this.short = short
		this.importance = importance
		this.link = link
		this.hasPage = hasPage
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
		hasPage = [],
		sorting = [],
	) {}

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
				),
			)
		})
	}
}

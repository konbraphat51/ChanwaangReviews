const INDEX_FILE = "src/data/articles.json"

class Article {
	constructor(title, media, tags, short, importance, link, hasPage) {
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
	 * Process raw data received
	 */
	#ProcessData() {}
}

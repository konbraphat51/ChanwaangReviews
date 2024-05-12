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

	readIndex() {
		const index = require("../data/index.json")
		this.articles = index.articles
	}

	getArticles() {
		return this.articles
	}
}

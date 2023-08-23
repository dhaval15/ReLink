import { Bookmark, BookmarkCheckResult, BookmarkResult } from "./types";

class LinkdingApi {
	instanceUrl: string;
	token: string;
	pageSize: number;
	constructor(instanceUrl: string, token: string, pageSize: number = 10) {
		this.instanceUrl = instanceUrl;
		this.token = token;
		this.pageSize = pageSize;
	}

	async getBookmarks(query?: string, page: number = 0): Promise<BookmarkResult> {
		const url = new URL('api/bookmarks/', this.instanceUrl);
		const params = {} as any;
		if (query)
			params.q = query;
		params.limit = this.pageSize.toString();
		params.offset = (page * this.pageSize).toString();

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Authorization': `Token ${this.token}`
			}
		});

		if (response.status !== 200)
			throw new Error('Unable to load bookmarks');

		const data = await response.json();

		return {
			prevPage: data.previous ? page - 1 : undefined,
			nextPage: data.next ? page + 1 : undefined,
			results: data.results as Bookmark[]
		};
	}
	async getBookmark(id: number): Promise<Bookmark> {
		const url = new URL(`api/bookmarks/${id}/`, this.instanceUrl);

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Authorization': `Token ${this.token}`
			}
		});

		if (response.status !== 200)
			throw new Error('Unable to load bookmark');

		const data = await response.json();

		return data as Bookmark;
	}

	async checkUrl(urlToCheck: string): Promise<BookmarkCheckResult> {
		const url = new URL(`api/bookmarks/check/`, this.instanceUrl);
		const params = { url: urlToCheck };

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Authorization': `Token ${this.token}`
			}
		});

		if (response.status !== 200)
			throw new Error('Unable to check URL');

		const data = await response.json();

		return data as BookmarkCheckResult;
	}

	async createBookmark(bookmark: Bookmark): Promise<void> {
		const url = new URL(`api/bookmarks/`, this.instanceUrl);

		await fetch(url.toString(), {
			method: 'POST',
			body: JSON.stringify({
				url: bookmark.url,
				title: bookmark.title,
				description: bookmark.description,
				unread: bookmark.unread,
				tag_names: bookmark.tag_names
			}),
			headers: {
				'Authorization': `Token ${this.token}`,
				'Content-Type': 'application/json'
			}
		});
	}

	async updateBookmark(bookmark: Bookmark): Promise<void> {
		const url = new URL(`api/bookmarks/${bookmark.id}/`, this.instanceUrl);

		await fetch(url.toString(), {
			method: 'PATCH',
			body: JSON.stringify({
				title: bookmark.title,
				description: bookmark.description,
				unread: bookmark.unread,
				tag_names: bookmark.tag_names
			}),
			headers: {
				'Authorization': `Token ${this.token}`,
				'Content-Type': 'application/json'
			}
		});
	}

	async updateBookmarkRead(id: number): Promise<void> {
		const bookmark = await this.getBookmark(id);
		const url = new URL(`api/bookmarks/${id}/`, this.instanceUrl);

		await fetch(url.toString(), {
			method: 'PATCH',
			body: JSON.stringify({ unread: !bookmark.unread }),
			headers: {
				'Authorization': `Token ${this.token}`,
				'Content-Type': 'application/json'
			}
		});
	}

	async deleteBookmark(id: number): Promise<void> {
		const url = new URL(`api/bookmarks/${id}/`, this.instanceUrl);

		await fetch(url.toString(), {
			method: 'DELETE',
			headers: {
				'Authorization': `Token ${this.token}`,
				'Content-Type': 'application/json'
			}
		});
	}

	async getTags(): Promise<string[]> {
		const url = new URL(`api/tags/`, this.instanceUrl);
		const params = {
			limit: '1000'
		};

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Authorization': `Token ${this.token}`
			}
		});

		if (response.status !== 200)
			throw new Error('Unable to load tags');

		const data = await response.json();

		return data?.results?.map((tag: { name: string }) => tag.name) || [];
	}
}

export default LinkdingApi;


import { getSettings } from "./settingsApi";
import {Bookmark, BookmarkCheckResult, BookmarkResult}from "./types";

const PAGE_SIZE = 10;

const getBookmarks = async (query?: string, page: number = 0): Promise<BookmarkResult> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    // Add a delay to debug loading states
    // await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));

    const url = new URL('api/bookmarks/', settings.instanceUrl);
    const params = {} as any;

    if (query)
        params.q = query;

    params.limit = PAGE_SIZE.toString();
    params.offset = (page * PAGE_SIZE).toString();

    const response = await fetch(url.toString(),{
				method: 'GET',
        headers: {
            'Authorization': `Token ${settings.token}`
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
};

const getBookmark = async (id: number): Promise<Bookmark> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    const url = new URL(`api/bookmarks/${id}/`, settings.instanceUrl);

    const response = await fetch(url.toString(),{
				method: 'GET',
        headers: {
            'Authorization': `Token ${settings.token}`
        }
    });

    if (response.status !== 200)
        throw new Error('Unable to load bookmark');

		const data = await response.json();

    return data as Bookmark;
};

const checkUrl = async (urlToCheck: string): Promise<BookmarkCheckResult> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    const url = new URL(`api/bookmarks/check/`, settings.instanceUrl);
		const params = { url: urlToCheck };

    const response = await fetch(url.toString(),{
				method: 'GET',
        headers: {
            'Authorization': `Token ${settings.token}`
        }
    });

    if (response.status !== 200)
        throw new Error('Unable to check URL');

		const data = await response.json();

    return data as BookmarkCheckResult;
};

const createBookmark = async (bookmark: Bookmark): Promise<void> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    const url = new URL(`api/bookmarks/`, settings.instanceUrl);

    await fetch(url.toString(),{
				method: 'POST',
        body: JSON.stringify({
            url: bookmark.url,
            title: bookmark.title,
            description: bookmark.description,
            unread: bookmark.unread,
            tag_names: bookmark.tag_names
        }),
        headers: {
            'Authorization': `Token ${settings.token}`,
            'Content-Type': 'application/json'
        }
    });
};

const updateBookmark = async (bookmark: Bookmark): Promise<void> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    const url = new URL(`api/bookmarks/${bookmark.id}/`, settings.instanceUrl);

    await fetch(url.toString(),{
				method: 'PATCH',
        body: JSON.stringify({
            title: bookmark.title,
            description: bookmark.description,
            unread: bookmark.unread,
            tag_names: bookmark.tag_names
        }),
        headers: {
            'Authorization': `Token ${settings.token}`,
            'Content-Type': 'application/json'
        }
    });
};

const updateBookmarkRead = async (id: number): Promise<void> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    const bookmark = await getBookmark(id);
    const url = new URL(`api/bookmarks/${id}/`, settings.instanceUrl);

    await fetch(url.toString(),{
				method: 'PATCH',
        body: JSON.stringify({ unread: !bookmark.unread }),
        headers: {
            'Authorization': `Token ${settings.token}`,
            'Content-Type': 'application/json'
        }
    });
};

const deleteBookmark = async (id: number): Promise<void> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');
    
    const url = new URL(`api/bookmarks/${id}/`, settings.instanceUrl);
    
    await fetch(url.toString(),{
				method: 'DELETE',
        headers: {
            'Authorization': `Token ${settings.token}`,
            'Content-Type': 'application/json'
        }
    });
};

const getTags = async (): Promise<string[]> => {
    const settings = await getSettings();

    if (settings.instanceUrl === undefined || settings.token === undefined)
        throw new Error('Missing Linkdig settings. Please provide them from the Settings page.');

    const url = new URL(`api/tags/`, settings.instanceUrl);
		const params = {
				limit: '1000'
		};

    const response = await fetch( url.toString(),{
				method: 'GET',
        headers: {
            'Authorization': `Token ${settings.token}`
        }
    });

    if (response.status !== 200)
        throw new Error('Unable to load tags');

		const data = await response.json();

    return data?.results?.map((tag: { name: string }) => tag.name) || [];
};

export {
    getBookmarks,
    getBookmark,
    checkUrl,
    createBookmark,
    updateBookmark,
    updateBookmarkRead,
    deleteBookmark,
    getTags
};

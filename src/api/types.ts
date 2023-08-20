
export interface Bookmark {
    id: number;
    url: string;
    title: string;
    description: string | null;
    website_title: string | null;
    website_description: string | null;
    is_archived: boolean;
    unread: boolean;
    shared: boolean;
    tag_names?: string[];
    date_added: string;
    date_modified: string | null;
}

export interface BookmarkResult {
    prevPage?: number;
    nextPage?: number;
    results: Bookmark[]
}

export interface BookmarkCheckResult {
    bookmark: Bookmark | null;
    metadata: BookmarkCheckMetadata;
}

export interface BookmarkCheckMetadata {
    url: string;
    title: string | null;
    description: string | null;
}

export interface Settings {
    instanceUrl?: string;
    token?: string;
    disableClipboard?: boolean;
    initialViewMode?: ViewMode;
    browserMode?: BrowserMode;
}

export type BrowserMode = 'in-app' | 'external' | null;

export type ViewMode = 'unread' | 'all' | null;

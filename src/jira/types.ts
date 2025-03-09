export interface Issue {
    id: string;
    key: string;
    fields: {
        summary: string;
        description: string;
        status: {
            name: string;
        };
        project: {
            id: string;
            key: string;
            name: string;
        };
        assignee?: {
            displayName: string;
            emailAddress: string;
        };
        reporter: {
            displayName: string;
            emailAddress: string;
        };
        created: string;
        updated: string;
    };
}

export interface Project {
    id: string;
    key: string;
    name: string;
    avatarUrls: {
        [size: string]: string;
    };
}

interface FetchIssuesResponse {
    issues: Issue[];
    total: number;
}

interface CreateIssueRequest {
    fields: {
        project: {
            id: string;
        };
        summary: string;
        description: string;
        issuetype: {
            id: string;
        };
    };
}

interface CreateIssueResponse {
    id: string;
    key: string;
    self: string;
}
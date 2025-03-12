import axios from 'axios';
import { Issue } from './types';

const JIRA_BASE_URL = 'https://your-jira-instance.atlassian.net/rest/api/2';

// Function to fetch issues from Jira
export const fetchIssues = async (projectKey: string): Promise<Issue[]> => {
    try {
        const response = await axios.get(`${JIRA_BASE_URL}/search`, {
            params: {
                jql: `project=${projectKey}`,
                fields: 'summary,status,assignee'
            },
            headers: {
                'Authorization': `Basic ${Buffer.from('your-email:your-api-token').toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.issues;
    } catch (error) {
        console.error('Error fetching issues:', error);
        throw error;
    }
};

export const fetchIssue = async (projectKey: string): Promise<Issue> => {
    const result = await axios.get(`${JIRA_BASE_URL}/rest/api/2/issue/${projectKey}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'your-id',
                password: 'your-password'
            }
        }
    )
    return result.data;
}

export function setupJiraIntegration() {
    // implementation of setupJiraIntegration
    // 로그인 정보를 사용자로부터 받자.
        
};

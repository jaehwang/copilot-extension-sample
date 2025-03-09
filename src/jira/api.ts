import axios from 'axios';
import { Issue, Project } from './types';

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

// Function to create a new issue in Jira
export const createIssue = async (issueData: Issue): Promise<Issue> => {
    try {
        const response = await axios.post(`${JIRA_BASE_URL}/issue`, issueData, {
            headers: {
                'Authorization': `Basic ${Buffer.from('your-email:your-api-token').toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating issue:', error);
        throw error;
    }
};

// existing code in api.ts

export function setupJiraIntegration() {
    // implementation of setupJiraIntegration
    // 로그인 정보를 사용자로부터 받자.
        
};
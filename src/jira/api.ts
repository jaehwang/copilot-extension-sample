import axios from 'axios';
import * as vscode from 'vscode';
import { Issue } from './types';

// Get Jira base URL from settings
function getJiraBaseUrl(): string {
    const config = vscode.workspace.getConfiguration('jiraGithubCopilotChat');
    const baseUrl = config.get<string>('jiraBaseUrl');
    if (!baseUrl) {
        throw new Error('Jira base URL is not configured. Please set it in the extension settings.');
    }
    return baseUrl;
}

// Retrieve Jira credentials from settings
function getJiraCredentials(): { username: string, password: string } {
    const config = vscode.workspace.getConfiguration('jiraGithubCopilotChat');
    const username = config.get<string>('username');
    const password = config.get<string>('password');
    
    if (!username || !password) {
        throw new Error('Jira credentials are not configured. Please set them in the extension settings.');
    }
    
    return { username, password };
}

export const fetchIssue = async (s: string): Promise<Issue> => {
    const baseUrl = getJiraBaseUrl();
    const { username, password } = getJiraCredentials();

    // 사용자에게 프로젝트 키 입력 요청
    const issueKey = await vscode.window.showInputBox({
        placeHolder: 'PROJECT-123',
        prompt: 'Please enter the Jira issue key',
        validateInput: (value) => {
            return value && value.trim().length > 0 ? null : 'Please enter a valid Jira issue key';
        }
    });

    vscode.window.setStatusBarMessage(`Fetching Jira issue ${issueKey}...`, 2000);
    
    const result = await axios.get(`${baseUrl}/rest/api/2/issue/${issueKey}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            auth: {
                username: username,
                password: password
            }
        }
    )
    return result.data;
}

export function setupJiraIntegration() {
    // You can add code here to guide the user through the setup process.
     const config = vscode.workspace.getConfiguration('jiraGithubCopilotChat');
    
     if (!config.get('jiraBaseUrl') || !config.get('username') || !config.get('password')) {
         vscode.window.showInformationMessage(
             'Jira 통합을 위해 설정이 필요합니다. File > Preferences > Settings에서 "Jira GitHub Copilot Chat"을 검색하여 설정하세요.'
         );
     }
};

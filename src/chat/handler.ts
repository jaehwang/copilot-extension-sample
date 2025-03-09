import * as vscode from 'vscode';
import { fetchIssues, createIssue } from '../jira/api';
import { Issue } from '../jira/types';

//export const chatRequestHandler: vscode.ChatRequestHandler = async (request, context, stream, token) => {
export function registerJiraParticipant(context: vscode.ExtensionContext) {
   
    const handler: vscode.ChatRequestHandler = async (request, context, stream, token) => {
        if (request.command === 'fetchIssues') {
            stream.progress('Fetching issues...');
            const projectKey: string = request.prompt
            try {
                const issues = await fetchIssues(projectKey);
                stream.progress(issues.length > 0 ? `Fetched ${issues.length} issues.` : 'No issues found.');
            } catch (error) {
                stream.progress('Failed to fetch issues.' );
            }
            
        } else {
            stream.progress('Unknown method.');
        }
    };

    vscode.chat.createChatParticipant('chat-kjh-jira', handler);
};

import * as vscode from 'vscode';
import { fetchIssue } from '../jira/api';
import { Issue } from '../jira/types';

export function registerJiraParticipant(context: vscode.ExtensionContext) {
   
    const handler: vscode.ChatRequestHandler = async (request, context, stream, token) => {
        if (request.command === 'fetchIssue') {
            stream.progress('Fetching issues...');
            const projectKey: string = request.prompt
            try {
                const issue:Issue = await fetchIssue(projectKey);
                stream.progress(issue.fields.summary);
            } catch (error) {
                stream.progress('Failed to fetch issues.' );
            }
            
        } else {
            stream.progress('Unknown method.');
        }
    };

    vscode.chat.createChatParticipant('chat-kjh-jira', handler);
};

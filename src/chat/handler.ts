import * as vscode from 'vscode';
import { fetchIssue } from '../jira/api';
import { Issue } from '../jira/types';

export function registerJiraParticipant(context: vscode.ExtensionContext) {
   
    const handler: vscode.ChatRequestHandler = async (request, context, stream, token) => {
        if (request.command === 'fetchIssue') {
            stream.progress('Fetching issues...');
            const prompt: string = request.prompt
            try {
                const issue:Issue = await fetchIssue(prompt);
                stream.progress(issue.fields.summary);
                for (const [key, value] of Object.entries(issue.fields)) {
                    console.log(`${key}: ${value}`);
                }
            } catch (error) {
                stream.progress('Failed to fetch issues:'+error);
            }
            
        } else {
            stream.progress('Unknown method.');
        }
    };

    vscode.chat.createChatParticipant('chat-kjh-jira', handler);
};

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
                const issue_content = `Issue: ${issue.key} - ${issue.fields.summary} \n\nDescription: ${issue.fields.description}`;
                
                stream.progress(issue_content);
                const messages =[
                    vscode.LanguageModelChatMessage.User('You are a professional software engineer. Understand the issue and provide a solution.'),
                    vscode.LanguageModelChatMessage.User(issue_content)
                ]
                const chatResponse = await request.model.sendRequest(messages, {}, token);

                for await (const fragment of chatResponse.text) {
                    stream.markdown(fragment);
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

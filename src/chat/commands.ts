import * as vscode from 'vscode';
import { createIssue, fetchIssues } from '../jira/api';
import { logInfo, logError } from '../utils/logger';

export function registerChatCommands(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('chat.createIssue', async () => {
            const title = await vscode.window.showInputBox({ prompt: 'Enter the issue title' });
            const description = await vscode.window.showInputBox({ prompt: 'Enter the issue description' });

            if (title && description) {
                try {
                    const issueData = {
                        id : '10000',
                        key : '10000',
                        fields: {
                            project: {
                                id: '10000',
                                key : '10000',
                                name: 'Project Name'
                            },
                            summary: title,
                            description: description,
                            issuetype: {
                                id: '10001'
                            },
                            status: {
                                name: 'To Do'
                            },
                            reporter: {
                                displayName: 'Reporter Name',
                                emailAddress: 'reporter@example.com'
                            },
                            created: new Date().toISOString(),
                            updated: new Date().toISOString()
                        }
                    };
                    const issue = await createIssue(issueData);


                    logInfo(`Issue created: ${issue.id}`);
                    vscode.window.showInformationMessage(`Issue created: ${issue.id}`);
                } catch (error) {
                    logError('error');
                    vscode.window.showErrorMessage('Failed to create issue.');
                }
            }
        }),

        vscode.commands.registerCommand('chat.fetchIssues', async () => {
            try {
                const issues = await fetchIssues('10000');
                logInfo(`Fetched ${issues.length} issues.`);
                vscode.window.showInformationMessage(`Fetched ${issues.length} issues.`);
            } catch (error) {
                logError('error');
                vscode.window.showErrorMessage('Failed to fetch issues.');
            }
        })
    );
}
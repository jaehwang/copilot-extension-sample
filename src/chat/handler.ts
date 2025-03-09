import * as vscode from 'vscode';
import { fetchIssues, createIssue } from '../jira/api';
import { Issue } from '../jira/types';

export const chatRequestHandler: vscode.ChatRequestHandler = async (request, context, stream, token) => {
    const command = request.command;

    if (command === 'fetchIssues') {
        try {
            const issues: Issue[] = await fetchIssues('10000');
            stream.markdown(`Fetched Issues:\n${issues.map(issue => `- ${issue.key}: ${issue.summary}`).join('\n')}`);
        } catch (error) {
            stream.markdown(`Error fetching issues: error.message`);
        }
    } else if (command === 'createIssue') {
        const { title, description } = request.arguments;
        try {
            const issueData = {
                id: '10000',
                key: '10000',
                fields: {
                    project: {
                        id: '10000',
                        key: '10000',
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
                        emailAddress: 'id@host',
                    },
                    created: new Date().toISOString(),
                    updated: new Date().toISOString()
                }
            };
            const newIssue = await createIssue(issueData);
            stream.markdown(`Created Issue: ${newIssue.key} - ${newIssue.fields.summary}`);
        } catch (error) {
            stream.markdown(`Error creating issue: $error`);
        }
    } else {
        stream.markdown('Unknown command. Please use /fetchIssues or /createIssue.');
    }
};
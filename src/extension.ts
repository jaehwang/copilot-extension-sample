import * as vscode from 'vscode';
import { registerJiraParticipant } from './chat/handler';
import { logInfo } from './utils/logger';

export function activate(context: vscode.ExtensionContext) {
    logInfo('Activating Jira GitHub Copilot Chat Extension');

    // Add any additional event listeners or setup here
    registerJiraParticipant(context);
}

export function deactivate() {
    logInfo('Deactivating Jira GitHub Copilot Chat Extension');
}
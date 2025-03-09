import * as vscode from 'vscode';
import { registerChatCommands } from './chat/commands';
import { setupJiraIntegration } from './jira/api';
import { logInfo } from './utils/logger';

export function activate(context: vscode.ExtensionContext) {
    logInfo('Activating Jira GitHub Copilot Chat Extension');

    // Set up Jira integration
    setupJiraIntegration();

    // Register chat commands
    registerChatCommands(context);

    // Add any additional event listeners or setup here
}

export function deactivate() {
    logInfo('Deactivating Jira GitHub Copilot Chat Extension');
}
import * as vscode from 'vscode';

export function logInfo(message: string): void {
    console.log(`[INFO] ${message}`);
    vscode.window.showInformationMessage(message);
}

export function logError(message: string): void {
    console.error(`[ERROR] ${message}`);
    vscode.window.showErrorMessage(message);
}

export function logWarning(message: string): void {
    console.warn(`[WARNING] ${message}`);
    vscode.window.showWarningMessage(message);
}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProjectManager } from './project';

const projectManager = new ProjectManager();
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(...[
		vscode.commands.registerCommand('dwt.quickstart', async () => {
			projectManager.createProject();
		}),
		vscode.commands.registerCommand('dwt.doc', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/web-twain/docs/info/api/'));
		}),
		vscode.commands.registerCommand('dwt.demo', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://demo.dynamsoft.com/web-twain/'));
		}),
		vscode.commands.registerCommand('dwt.about', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/web-twain/overview/'));
		}),
		vscode.commands.registerCommand('dwt.license', async () => {
			vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/customer/license/trialLicense?product=dwt'));
		}),
	]);
}

// This method is called when your extension is deactivated
export function deactivate() {}

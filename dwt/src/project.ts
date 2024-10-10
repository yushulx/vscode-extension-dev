import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { copyFolder } from './utils';

export class ProjectManager {

    async createProject() {
        let src: string = path.join(__dirname, '../res/quickstart/');

        // Select the project folder
        const answer = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Do you want to create a new folder?' });
        if (!answer) { return; }

        let des: string = '';
        if (answer === "Yes") {
            des = await this.openFolder();
            if (des !== '') {
                copyFolder(src, des);
            }
        }
        else {
            let folders = vscode.workspace.workspaceFolders;
            if (!folders) {
                des = await this.openFolder();
                if (des !== '') {
                    copyFolder(src, des);
                }
            }
            else {
                des = folders[0].uri.fsPath;
                vscode.window.showInformationMessage(folders[0].uri.fsPath);
                copyFolder(src, des);
            }
        }
    }

    async openFolder() {
        const projectName = await vscode.window.showInputBox({
            prompt: 'Enter a name for the new project',
            validateInput: (value: string): string => {
                if (!value.length) {
                    return 'A project name is required';
                }
                return '';
            }
        });
        if (!projectName) {
            return '';
        }

        let workspace = '';
        const folderUris = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, canSelectMany: false, openLabel: 'Select folder' });
        if (!folderUris) {
            return '';
        }

        let workspaceFolderUri = folderUris[0];
        workspace = workspaceFolderUri.fsPath;
        let projectFolder = path.join(workspace, projectName);
        if (!fs.existsSync(projectFolder)) {
            fs.mkdirSync(projectFolder);
        }

        console.log("Open " + projectFolder);
        await vscode.commands.executeCommand("vscode.openFolder", Uri.file(projectFolder), { forceNewWindow: true });

        return projectFolder;
    }
}
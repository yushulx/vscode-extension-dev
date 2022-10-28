/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectManager = void 0;
const fs = __webpack_require__(3);
const path = __webpack_require__(4);
const vscode = __webpack_require__(1);
const vscode_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(5);
class ProjectManager {
    async createProject() {
        let src = path.join(__dirname, '../res/quickstart/');
        // Select the project folder
        const answer = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Do you want to create a new folder?' });
        if (!answer) {
            return;
        }
        let des = '';
        if (answer === "Yes") {
            des = await this.openFolder();
            if (des !== '') {
                (0, utils_1.copyFolder)(src, des);
            }
        }
        else {
            let folders = vscode.workspace.workspaceFolders;
            if (!folders) {
                des = await this.openFolder();
                if (des !== '') {
                    (0, utils_1.copyFolder)(src, des);
                }
            }
            else {
                des = folders[0].uri.fsPath;
                vscode.window.showInformationMessage(folders[0].uri.fsPath);
                (0, utils_1.copyFolder)(src, des);
            }
        }
    }
    async openFolder() {
        const projectName = await vscode.window.showInputBox({
            prompt: 'Enter a name for the new project',
            validateInput: (value) => {
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
        await vscode.commands.executeCommand("vscode.openFolder", vscode_1.Uri.file(projectFolder), { forceNewWindow: true });
        return projectFolder;
    }
}
exports.ProjectManager = ProjectManager;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.httpsDownload = exports.copyFolder = void 0;
const fs = __webpack_require__(3);
const path = __webpack_require__(4);
const https = __webpack_require__(6);
const vscode = __webpack_require__(1);
function copyFolder(src, des) {
    fs.readdir(src, (err, files) => {
        if (err) {
            return;
        }
        files.forEach(file => {
            let srcFile = path.join(src, file);
            let desFile = path.join(des, file);
            console.log(srcFile);
            console.log(desFile);
            if (fs.statSync(srcFile).isDirectory()) {
                fs.mkdirSync(desFile);
                copyFolder(srcFile, desFile);
            }
            else {
                fs.copyFileSync(srcFile, desFile);
            }
        });
    });
}
exports.copyFolder = copyFolder;
async function httpsDownload(url, filename) {
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        cancellable: true
    }, (progress, token) => {
        token.onCancellationRequested(() => {
            console.log("User canceled the long running operation");
        });
        progress.report({ message: "Downloading " + filename });
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filename);
            https.get(url, function (response) {
                response.pipe(file);
                file.on("finish", () => {
                    file.close();
                    console.log("Download Completed");
                    resolve("Download Completed");
                });
            });
        });
    });
}
exports.httpsDownload = httpsDownload;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("https");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const project_1 = __webpack_require__(2);
const projectManager = new project_1.ProjectManager();
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
        vscode.commands.registerCommand('dwt.samples', async () => {
            vscode.env.openExternal(vscode.Uri.parse('https://www.dynamsoft.com/web-twain/resources/code-gallery/'));
        }),
    ]);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map
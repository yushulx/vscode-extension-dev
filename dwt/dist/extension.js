(()=>{"use strict";var e={126:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.ProjectManager=void 0;const n=t(147),r=t(17),a=t(496),s=t(496),c=t(593);o.ProjectManager=class{async createProject(){let e=r.join(__dirname,"../res/quickstart/");const o=await a.window.showQuickPick(["Yes","No"],{placeHolder:"Do you want to create a new folder?"});if(!o)return;let t="";if("Yes"===o)t=await this.openFolder(),""!==t&&(0,c.copyFolder)(e,t);else{let o=a.workspace.workspaceFolders;o?(t=o[0].uri.fsPath,a.window.showInformationMessage(o[0].uri.fsPath),(0,c.copyFolder)(e,t)):(t=await this.openFolder(),""!==t&&(0,c.copyFolder)(e,t))}}async openFolder(){const e=await a.window.showInputBox({prompt:"Enter a name for the new project",validateInput:e=>e.length?"":"A project name is required"});if(!e)return"";let o="";const t=await a.window.showOpenDialog({canSelectFolders:!0,canSelectFiles:!1,canSelectMany:!1,openLabel:"Select folder"});if(!t)return"";o=t[0].fsPath;let c=r.join(o,e);return n.existsSync(c)||n.mkdirSync(c),console.log("Open "+c),await a.commands.executeCommand("vscode.openFolder",s.Uri.file(c),{forceNewWindow:!0}),c}}},593:(e,o,t)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.httpsDownload=o.copyFolder=void 0;const n=t(147),r=t(17),a=t(687),s=t(496);o.copyFolder=function e(o,t){n.readdir(o,((a,s)=>{a||s.forEach((a=>{let s=r.join(o,a),c=r.join(t,a);console.log(s),console.log(c),n.statSync(s).isDirectory()?(n.mkdirSync(c),e(s,c)):n.copyFileSync(s,c)}))}))},o.httpsDownload=async function(e,o){await s.window.withProgress({location:s.ProgressLocation.Notification,cancellable:!0},((t,r)=>(r.onCancellationRequested((()=>{console.log("User canceled the long running operation")})),t.report({message:"Downloading "+o}),new Promise(((t,r)=>{const s=n.createWriteStream(o);a.get(e,(function(e){e.pipe(s),s.on("finish",(()=>{s.close(),console.log("Download Completed"),t("Download Completed")}))}))})))))}},496:e=>{e.exports=require("vscode")},147:e=>{e.exports=require("fs")},687:e=>{e.exports=require("https")},17:e=>{e.exports=require("path")}},o={};function t(n){var r=o[n];if(void 0!==r)return r.exports;var a=o[n]={exports:{}};return e[n](a,a.exports,t),a.exports}var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const o=t(496),r=new(t(126).ProjectManager);e.activate=function(e){e.subscriptions.push(o.commands.registerCommand("dwt.quickstart",(async()=>{r.createProject()})),o.commands.registerCommand("dwt.doc",(async()=>{o.env.openExternal(o.Uri.parse("https://www.dynamsoft.com/web-twain/docs/info/api/"))})),o.commands.registerCommand("dwt.demo",(async()=>{o.env.openExternal(o.Uri.parse("https://demo.dynamsoft.com/web-twain/"))})),o.commands.registerCommand("dwt.about",(async()=>{o.env.openExternal(o.Uri.parse("https://www.dynamsoft.com/web-twain/overview/"))})),o.commands.registerCommand("dwt.license",(async()=>{o.env.openExternal(o.Uri.parse("https://www.dynamsoft.com/customer/license/trialLicense?product=dwt"))})),o.commands.registerCommand("dwt.samples",(async()=>{o.env.openExternal(o.Uri.parse("https://www.dynamsoft.com/web-twain/resources/code-gallery/"))})))},e.deactivate=function(){}})(),module.exports=n})();
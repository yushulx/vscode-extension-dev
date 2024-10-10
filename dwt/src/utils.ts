import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as vscode from 'vscode';

export function copyFolder(src: string, des: string) {
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
			} else {
				fs.copyFileSync(srcFile, desFile);
			}
		});
	});
}

export async function httpsDownload(url: string, filename: string) {
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
			https.get(url, function (response: any) {
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
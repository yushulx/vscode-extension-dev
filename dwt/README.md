# Angular Snippets for Dynamic Web TWAIN
This extension contains TypeScript snippets and Angular project templates for [Dynamic Web TWAIN](https://www.dynamsoft.com/web-twain/overview/). You can use it to quickly create a web document scanning application. The extension also provides shortcuts to the online demos and API documentation of Dynamic Web TWAIN.

![TypeScript snippets for Dynamic Web TWAIN](https://www.dynamsoft.com/codepool/img/2022/10/dynamic-web-twain-typescript-snippet.gif)

## Dynamic Web TWAIN Version
v18.3.0

## Usage
- Angular Project for Dynamic Web TWAIN.

    1. Press `F1` to show command palette and input **dwt** to list all supported commands.
    
        ![vscode commands for Dynamic Web TWAIN](https://www.dynamsoft.com/codepool/img/2022/10/web-twain-vscode-command.png)
    2. Select **Create Angular Project for Dynamic Web TWAIN** to create a new Angular project.
    3. Request a [30-day FREE trial license](https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform) and update the license key in `src/app/dynamic-web-twain.service.ts`
        ```typescript
        Dynamsoft.DWT.ProductKey = "LICENSE-KEY";
        ```
    4. Run the project.
        ```bash
        npm install && ng serve
        ```

- TypeScript Code Snippets.

    In `*.ts` file, type `dwt` to list available code snippets.

    ![TypeScript snippet for Dynamic Web TWAIN](https://www.dynamsoft.com/codepool/img/2022/10/dynamic-web-twain-angular-snippet.png)

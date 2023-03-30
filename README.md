React Chrome Extension

Deployed Link: https://chrome.google.com/webstore/detail/real1/ojbbkajfjaohmhffklknfipdhfenbkhe

Instructions for future developers 

Only use these below 5 steps if you are starting out:
1. Check if you have npm installed. 
     ```
     $ "npm -v" into command prompt.
     ```
     If you saw version details of npm:
     ```
     go to step 2
     ```
     else: 
     ```
     Make sure you have installed Node. Use this link:  
     I am using Node version 18.11.0.
     Or Can even install node if you have Anaconda : conda install -c conda-forge nodejs
     ```
2. Go to root of folder in command prompt via "cd" command. 
3. Check if have virtual environment installed. 
     ```
     $ "virtualenv --version"into command prompt.
     ```
     If you saw version details of virtual environment
     ```
     $"virtualenv venv"
     ```
     $ "source venv/bin/activate"
     ```
     Go to step 4
     ```
     else: 
     ```
     "sudo pip3 install virtualenv"
     "virtualenv venv"
     "source venv/bin/activate"
     ```
OR 
If you have Anaconda installed then create a virtual environment. And open terminal. 

4. Delete package-lock.json file. 
5. Type this: "npm i" into the command prompt which will re-add the package-lock.json



For testing:
1. Comment 3 lines(66 to 68) in popup.tsx
    ```
    //const root = document.createElement('div')
    //document.body.appendChild(root)
    //ReactDOM.render(<App />, root)
    ```
2. Type: "npm test" into command prompt
3. Type: "npm run coverage" into command prompt



For development:
1. Type: "npm start" into command prompt
2. Open Chrome
3. Go to extension page. 
4. Turn on "developer mode" button in the top right
4. Click "load unpacked" button in the top left.
5. Find "dist" folder and open that.
6. Can now go to the right of URL bar and click the puzzle icon. Pin the extension. 
7. Can now try out the extension on 

For production:
1. npm run build

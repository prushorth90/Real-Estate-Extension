React Chrome Extension

Deployed Link: https://chrome.google.com/webstore/detail/real1/ojbbkajfjaohmhffklknfipdhfenbkhe

Instructions for future developers 

Only use these below 5 steps if you are starting out:
1. Check if you have npm installed. Type "npm -v" into command prompt.
1.1 If you saw version details of npm:
1.1.1 go to step 2
1.2 else: 
1.2.1 Make sure you have installed Node. Use this link:  
1.2.2 I am using Node version 18.11.0.
2. Go to root of folder in command prompt via "cd" command. 
3. Check if have virtual environment installed. Type "virtualenv --version"
3.1 If you saw version details of virtual environmentL
3.1.1 Type in "virtualenv venv"
3.1.2 Type in "source venv/bin/activate"
3.1.3 Go to step 4
3.2 else: 
3.2.1 Type in "sudo pip3 install virtualenv"
3.2.2 Type in "virtualenv venv"
3.2.3 Type in "source venv/bin/activate"
OR 
3.2.4 If you have Anaconda installed then create a virtual environment. And open terminal. 
3.2.5 Can even install node via: conda install -c conda-forge nodejs
4. Delete package-lock.json file. 
5. Type this: "npm i" into the command prompt which will re-add the package-lock.json



For testing:
1. Comment 3 lines(66 to 68) in popup.tsx
1.1 //const root = document.createElement('div')
1.2 //document.body.appendChild(root)
1.3 //ReactDOM.render(<App />, root)
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

## Real1 Chrome Extension

## Deployed Link: 
```
https://chrome.google.com/webstore/detail/real1/ojbbkajfjaohmhffklknfipdhfenbkhe
```

## Beginning Instructions for future developers 

Only use these below 4 steps if you are starting out:
1. Check if you have npm installed. 
     ```
     $ npm -v 
     ```
     If you saw version details of npm:
     ```
     go to step 2
     ```
     else: 
     ```
     Make sure you have installed Node. Use this link:  https://nodejs.org/en/download
     I am using Node version 18.11.0 on Mac.
     ```
2. Go to root of folder in command prompt via "cd" command. For example
    ```
     cd desktop/real1-main
     ```
3. Check if have virtual environment installed.

     ```
     $ virtualenv --version 
     ```
     If you saw version details of virtual environment
     ```
     $ virtualenv venv
     $ source venv/bin/activate
     Go to step 4
     ```
     else: 
     ```
     sudo pip3 install virtualenv
     virtualenv venv
     source venv/bin/activate
     ```

4. Type 
   ```
   $ npm i 
    ```
   which will add the node modules. In the unlikely event this fails then may need to delete package-lock.json and run "npm i" again



## For testing:
1. Comment 3 lines(66 to 68) in popup.tsx
    ```
    //const root = document.createElement('div')
    //document.body.appendChild(root)
    //ReactDOM.render(<App />, root)
    ```
    ```
    $ npm test
    ```
    ```
    $ npm run coverage
    ```
    will add coverage folder
2. Once done with testing undo comment of 3 lines in step 1 


## For development:
1.  Type
    ```
    $ npm start
    ```
    which will add dist folder
2. Open Chrome
3. Go to extension page: url = chrome://extensions/ 
4. Turn on "developer mode" button in the top right
4. Click "load unpacked" button in the top left.
5. Find "dist" folder and open that.
6. Can now go to the right of URL bar and click the puzzle icon. Pin the extension. 
7. Can now try out the extension on websites Realtor/Zillow 

## For production:
1. Type
  ```
  $ npm run build
  ```

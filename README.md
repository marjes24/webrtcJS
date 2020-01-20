## Simple WebRTC project
---

* This is a simple react/node project to hopefully use for my webrtc native c++ to browser testing
* Project is heavily inspired by https://webrtc.github.io/samples/src/content/peerconnection/pc1/ , main difference being this project uses a simple node signal server rather than both peers running on the same webpage
---
### Server setup
* 
    ```bash
        ##Install node modules in server directory
        npm install
        ## Build 
        npm run build
        ## Run 
        npm run start
---
### Application setup
* This project is a create-react-app project
    ```
    ## Install node modules in client/app directory
    npm install
    ## Start 
    npm run start
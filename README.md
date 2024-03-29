# stare-into-the-void
Search engine and exploration tool for NASA image APIs. Visit at [stareintothevoid.com](https://stareintothevoid.com)

## Version Control Strategy
For our version control strategy we used a slightly modified GitHub flow. We start by having feature branches which represent feature sets. These are not intended to be deleted after merging, and these branches can be merged in the development branch either through plain merges or PRs. We have a development branch we use for collecting changes from feature branches for testing and such. Finally we have the main branch which requires a PR with approval to merge into, and which builds and deploys into firebase.

## Project Setup

### Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). As such, to use this project you will need to install the current LTS version of Node.js and ensure it is added to your PATH variable.

Once Node.js is installed verify this by running `node -v` in any terminal, and that the result is a version >16.

After ensuring Node.js is installed, run `npm install -g yarn` to globally install the yarn package manager which exists on top of Node's package system traditionally managed by npm (Node Package Manager).

Now run `yarn global add firebase` to globally install the Firebase npm package which some package we use depend on. 

Navigate to the project directory in a terminal and run `yarn install`, then navigate to the git submodule directory and run `yarn install` again. 

Now you should be good to go, but you will also likely want to install the firebase tools package by running `yarn global add firebase-tools`.

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

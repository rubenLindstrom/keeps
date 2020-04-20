# Keeps

Full stack social note keeping app, built with React, Node and Firebase cloud functions for editing notes, collaboratively.

## See the website live

The website is deployed at [https://keeps-81a16.web.app](https://keeps-81a16.web.app). :earth_africa:

## Client

To get going with the app, you run the following command in the root directory

#### `npm install`

After that you're good to go, and can run

#### `npm start`

to start the devlopment server. :tent:

### File structure

    .
    ├── src                           # Contains all the source-code
    │   ├── components                # Contains the react components
    │   │  ├── sidebar                # Contains the components that relate to the sidebar
    │   │  │  ├── addNote.js          # Contains the input control to add a note
    │   │  │  ├── notes.js            # Contains the component for the list of notes
    │   │  │  └── sidebar.js          # Contains the main export of the directory, tying the other components together
    │   │  ├── atoms.js               # Contains small self containing components that are used globally
    │   │  ├── authRoute.js           # Contains the decorated react-router route for verifying auth status for protected routes
    │   │  ├── editor.js              # Contains the RTE for the notes
    │   │  └── nav.js                 # Contains the navigation element
    │   ├── contexts                  # Contains the contexts for globally accessible state
    │   │  ├── authContext.js         # Contains the global state for the authentication
    │   │  └── noteContext.js         # Contains the global state for the notes
    │   ├── images
    │   ├── pages                     # Contains the containers that make out each route
    │   ├── scss
    │   │  ├── partials               # In typical scss fashion, contains partials to the styling
    │   │  │  └── typography.scss     # Global typography styling
    │   │  └── index.scss             # Contains the global styling, mainly for layout
    ├── app.js.                       # Contains the root component
    ├── firebaseAuth.js.              # Contains the firebase client auth implementation
    ├── helpers.js.                   # Contains commly used helper functions
    ├── hooks.js.                     # Connect custom react hooks for separating stateful common logic
    ├── index.js.                     # The root react file
    └── services.js.                  # Contains the network related functions

### Tests

The app comes with Jest configured, but the test coverage is currently low. The idea is to complement the app with unit tests as well as some integration tests, to increase confidence when building it out. :microscope:

Tests can be run with

#### `npm test`

## Cloud functions

To get going with the backend, you can run the following command in the _functions_ directory :zap:

#### `npm install`

The functions are available by running

#### `firebase serve`

### File structure

    .
    ├── functions                     # Contains all the cloud functions implementations
    │   ├── handlers                  # Contains the raw functions that implement each route
    │   │  ├── auth.js                # Contains the authenticated-related routes
    │   │  └── notes.js               # Contains the routes related to the notes
    │   |── middleware                # Contains all the middleware
    │   │  └── auth.js                # Contains the middleware for veriying user permissions
    │   |── util                      # Contains commonly used utility
    │   │  ├── firebase.js            # Contains the firebase admin sdk connection
    │   │  └── herlps.js              # Contains simple helper functions
    └── index.js.                     # Connects the handlers to their respective route, and implements triggers

Ember Collective 🔥
========================

Ember Collective is an educational resource for anti-racism and supporting the Black Lives Matter movement. You can browse non-profit organizations to support, interact with the Police Brutality Tracker, and send donation match challenges to other users.

Live demo: https://plant-flashcards.netlify.app

[Link to backend](https://github.com/isabelxklee/ember-collective-backend)

[Project tracker](https://github.com/isabelxklee/ember-collective/projects/1)

![Ember Collective Homepage](https://i.imgur.com/buewPGc.png)

## Getting started
1. Install the [Rails backend](https://github.com/isabelxklee/ember-collective-backend)
2. Install [Node.js and npm](https://www.npmjs.com/get-npm)

    ```$ brew install node```
    
3. Clone this repo and cd into the directory
4. Install all dependencies

    ```$ npm install```

5. Make sure the Rails server is running and then run the app

    ```$ npm start```

## Features

![Police Brutality Tracker](https://i.imgur.com/hH7mFOg.png)

### Police Brutality Tracker
* Displays an interactive map using the Mapbox API
* Pulls data about police brutality events from an external dataset provided by [Mapping Police Violence](https://mappingpoliceviolence.org)
* Converted +7,000 lines of data from a CSV file to a JSON file

### Donation Match Challenges
* Users can challenge each other to match donations to an existing organization on the site
* Built self-referential relationships to join the logged in user with another user

### Education Resources
* Browse anti-racism and police abolition resources by tags

### Global state management
* Used Redux to globally manage the application state

### React components
* Created +20 React components and organized the code structure by separating them into feature-specific folders
* Implemented inverse data flow to send props down and up between parent components and child components
* Used asynchronous fetches to pull data from the Rails backend

### ActiveRecord Associations
* Designed 10 database models that have `has_many`, `belongs_to` and `has_many through` associations
* Used ActiveModelSerializers, which turns model attributes into JSON object keys

![Profile Page](https://i.imgur.com/UFgIXmi.png)

## Tech Stack
* React.js
* Redux
* Ruby on Rails API (Backend: https://github.com/isabelxklee/ember-collective-backend)
* PostgreSQL
* HTML/CSS
* Active Record

## Tools
* [Rack CORS](https://github.com/cyu/rack-cors)
* [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
* [BCrypt](https://github.com/codahale/bcrypt-ruby): Ruby binding the OpenBSD bcrypt() password hashing algorithm.
* [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start): The Geocoding API is a service that provides geocoding and reverse geocoding of addresses.
* [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api/): Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles.
* [Moment.js](https://momentjs.com): Parse, validate, manipulate, and display dates and times in JavaScript.
* [Pluralize](https://www.npmjs.com/package/react-pluralize): Display plural or singular form of a word based on a count.
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start): React Router is a collection of navigational components that compose declaratively with your application.
* [React Scroll to Top Button](https://www.npmjs.com/package/react-scroll-up-button): React Component for a fixed scroll to top button. 

## Live demo
https://plant-flashcards.netlify.app

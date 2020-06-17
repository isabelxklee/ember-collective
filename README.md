Ember Collective 🔥
========================

## Summary
Ember Collective is a 

[Link to backend](https://github.com/isabelxklee/ember-collective-backend)

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

### Asynchronous fetches
* Pulls breaking news articles from the News API using asynchronous fetches

### ActiveRecord Associations
* Models have `has_many`, `belongs_to` and `has_many through` associations
* Uses ActiveModelSerializers, which turns model attributes into JSON object keys

### React
* Update the application state using React lifecycle methods
* Organize the code structure by separating components into presentation components and container components
* Implement inverse data flow to send props down and up between parent components and child components

## Domain Model
Coming soon...

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
* [BCrypt](https://github.com/codahale/bcrypt-ruby)
* [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start): The Geocoding API is a service that provides geocoding and reverse geocoding of addresses.
* [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api/): Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles.
* [Moment.js](https://momentjs.com): Parse, validate, manipulate, and display dates and times in JavaScript.
* [Pluralize](https://www.npmjs.com/package/react-pluralize): Display plural or singular form of a word based on a count.

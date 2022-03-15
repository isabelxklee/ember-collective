Ember Collective 🔥
========================

Ember Collective is an educational resource for anti-racism and supporting the Black Lives Matter movement. You can browse non-profit organizations to support, interact with the Police Brutality Tracker, and send donation match challenges to other users.

* [Website](https://embercollective.netlify.app)
* [Link to backend](https://github.com/isabelxklee/ember-collective-backend)
* [Project tracker](https://github.com/isabelxklee/ember-collective/projects/1)

## Table of contents
* [Getting started](#getting-started)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Tools](#tools)

![Ember Collective Homepage](https://i.imgur.com/buewPGc.png)

<a name="getting-started"/>

## Getting started
1. Install the [Rails backend](https://github.com/isabelxklee/ember-collective-backend)
2. Install [Node.js and npm](https://www.npmjs.com/get-npm)

    ```
    $ brew install node
3. Clone this repo and cd into the directory
4. Install all dependencies

    ```
    $ npm install
5. Make sure the Rails server is already running and open up a new terminal to run this app

    ```
    $ npm start
<a name="features"/>

## Features

![Police brutality tracker](https://i.imgur.com/hH7mFOg.png)

### Police brutality tracker
* Displays an interactive map using the Mapbox API
* Pulls data about police brutality events from an external dataset provided by [Mapping Police Violence](https://mappingpoliceviolence.org)
* Converted +7,000 lines of data from a CSV file to a JSON file

### Browse organizations
* View a list of non-profit organizations and mutual aid funds that support the Black Lives Matter movement
* Filter organizations by tag or search for keywords, titles, and locations
* Users with accounts over 2-days old can nominate new organizations and verify existing organizations' information

### Donation match challenges
* Users can challenge each other to match donations to an existing organization on the site
* Built self-referential relationships to join the logged in user with another user

### Education resources
* Browse anti-racism and police abolition resources by tags

### Memorial page
* A memorial page for the Black people that we've have lost to police brutality and racial violence.
* Remember their names, learn their stories, and support their families' gofundmes and foundations.

### Global state management
* Used Redux to globally manage the application state

### React components
* Created +20 React components and organized the code structure by separating them into feature-specific folders
* Implemented inverse data flow to send props down and up between parent components and child components
* Used asynchronous fetches to pull data from the Rails backend

### ActiveRecord associations
* Designed 10 database models that have `has_many`, `belongs_to` and `has_many through` associations
* Used ActiveModelSerializers, which turns model attributes into JSON object keys

![Profile Page](https://i.imgur.com/UFgIXmi.png)

<a name="tech-stack"/>

## Tech stack
* React.js
* Redux
* Ruby on Rails API (Backend: https://github.com/isabelxklee/ember-collective-backend)
* PostgreSQL
* HTML/CSS
* Active Record

<a name="tools"/>

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
https://embercollective.org

![alt filmOpediaReactLogo](https://github.com/danielvonboros/filmOpedia-client/blob/main/src/mat/filmopediaReactLogo.png?raw=true)
Not just another internet movie database

<p>React frontend application for <a href="https://github.com/danielvonboros/filmOpedia">filmopedia API</a></p>
<p>Client side single page application</p>

### Description

### Tools used

| Property          | Tool       |
| ----------------- | ---------- |
| Language          | JavaScript |
| Library           | React      |
| Route handling    | axios      |
| Styling Framework | Bootstrap  |
| State management  | Redux      |
| API               | REST       |
| bundler           | parcel     |

### Dependencies

<ul>
<li>axios</li>
<li>bootstrap</li>
<li>node-sass</li>
<li>parcel-bundler</li>
<li>prop-types</li>
<li>react-dom</li>
<li>react-router-dom</li>
<li>babel</li>
</ul>

### User Stories

<ul>
<li>As a user, I want to be able to access information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.</li>
<li>As a user, I want to be able to create a profile so I can save data about my favorite movies</li>
</ul>

### Application functions

The Filmopedia Application provides a collection of movies, that can be viewed by registered users. User data is also stored in a collection and API calls are made

### Setting up the tools:

First up, make sure you have parcel installed globally. Parcel is the bundler that is used to bundle the application and make it accessible in your browser.

Do this by typing

```
$ npm install --global parcel@next
```

in your terminal

You can now download the repo to your computer, install the necessary modules by running:

```
$ npm install
```

Make sure there were no errors installing the necessary modules to your application.

### Start the application

Now start the development server by typing

```
$ parcel src/index.html
```

the path to index.html is supposed to be put behind the parcel command, in this case _parcel src/index.html_

or

```
$ npm run dev
```

The console shows you the port on which the application is rendered. If your browser, doesn't open automatically, open it manually and navigate to the URL given in the terminal, in most cases: http://localhost:3000

### App structure

```
    filmOpedia-client

    App
    |_  main-view
        |_  navbar
        |   |_  profile-view
        |
        |_  movie-view
        |   |_  movie-card
        |
        |_  login-view
        |   |_  registration-view
        |
        |_  genre-view
        |_  director-view

```

#### Essential features of the Components

main-view

<ul>
<li>Returns a list of ALL movies to the user (each listed item with an image, title, and description)</li>
<li>Sorting and filtering</li>
<li>Ability to select a movie for more details</li>
</ul>
navbar
<ul>
<li>Logout a user</li>
<li>Return to home screen</li>
</ul>
profile-view
<ul>
<li>Allows users to update their user info (username, password, email, date of birth)</li>
<li>Allows existing users to deregister</li>
<li>Displays favorite movies</li>
<li>Allows users to remove a movie from their list of favorites</li>
</ul>
login-view
<ul>
<li>Allows users to log in with a username and password</li>
</ul>
registration-view
<ul>
<li>Allows new users to register (username, password, email, birthday)</li>
</ul>
genre-view
<ul>
<li>Returns data about a genre, with a name and description</li>
<li>Displays example movies</li>
</ul>
director-view
<ul>
<li>Returns data about a director (name, bio, birth year, death year)</li>
<li>Displays example movies</li>
</ul>

### Contact me!

Get in touch! Contact me <a href="https://linkedin.com/in/daniel-von-boros-92878a186">here</a> to talk about collaborations.

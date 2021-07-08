# filmOpedia-client

Client side single page application built with React, Redux, and bootstrap using the Rest API containing movie data. The application uses state routing to navigate between views and share URLs. The API is hosted on heroku.

A user can register, login, and view a list of movie titles.

The user can add movies to their list of favorites and view them on their profile page.

It is responsive and can be viewed on a variety of devices with the same functionality.

A view for single movies provides detailed information about a movie, their genre and their director.

Netlify Link : filmopedia-client.netlify.app
Views and Features

MainView
● Returns a list of ALL movies to the user (each listed item with an image, and title)
● filter movie list by title
● Ability to select a movie for more details and see single movie view

MovieView
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites

LoginView
● the default access point when a user isn't logged in
● Allows users to log in with a username and password
● Link to RegistrationView to register

RegistrationView
● Allows new users to register (username, password, email, birthday)

GenreView
● Returns data about a genre, with a name and description
● Displays example movies

DirectorView
● Returns data about a director (name, bio, birth year, death year)
● Displays example movies

ProfileView
● Allows users to update their user info (username, password, email, date of birth)
● Allows existing users to deregister
● Displays favorite movies
● Allows users to remove a movie from their list of favorites

Parcel path: parcel src/index.html

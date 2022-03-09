# Merci

## Description

This is an app where users post "favours"  and other users can accept them, every favour have "tokens" that can be redeem for different kind of rewards.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can see favours page
-  **Login:** As a user I can login to the platform so that I can use favours page
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Edit user profiles** As a user I can edit my user profile to change my photo, age and about me



## Backlog

User profile:
- Location register
- Favours between friends
- Differentiate initial tokens and tokens to redeem
- Apply dark mode

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | SelectPage           | public `<Route>`            | Home page                                                    |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/favour`            | FavourPage   | public`<Route>`  | Shows all public favours in a list                              |
| `/favour/:id`        | FavourDetailPage   | user only `<PrivateRoute>`  | Details of specific favour       |
| `/myFavours`         |  MyFavourPage              | user only `<PrivateRoute>`  |  List of my favours (Accepted / Requested)                                       |
| `/chat/:receivedId`     | ChatPage      | user only  `<PrivateRoute>` | Display chat between two users                              |
| `/profile/:id` | ProfilePage      | user only `<PrivateRoute>`  | Shows profile information                               |
| `/create` | CreateFavourPage    | user only `<PrivateRoute>`  | Creates new favour                                   |



## Components

- LoginPage

- SelectPage

- SignupPage

- FavourPage

- FavourDetailPage

- MyFavourPage

- ChatPage

- ProfilePage

- CreateFavourPage

- Navbar

- Mapbox


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tournament Service
  - tournament.list()
  - tournament.detail(id)
  - tournament.add(id)
  - tournament.delete(id)
  
- Player Service 

  - player.detail(id)
  - player.add(id)
  - player.delete(id)

- Game Service

  - Game.put(id)

<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  imgUrl: {type: String, default:""},
  acceptedFavours: [{type: Schema.Types.ObjectId, ref:"favours"}],
  requestedFavours: [{type: Schema.Types.ObjectId, ref:"favours"}],
  token: {type: Number, default: 100}
}
```


Favours model

```javascript
 {
  asker: {type: Schema.Types.ObjectId, ref:"user"},
  taker: {type: Schema.Types.ObjectId, ref:"user", default: null},
  description: {type: String},
  location: {type: String},
  locationLat: {type: Number},
  locationLong: {type: Number},
  token: {type: Number}
 }
```

Message model

```javascript
 {
   content: {type: String},
   sender: {type: Schema.Types.ObjectId, ref:"user"},
   receiver: {type: Schema.Types.ObjectId, ref:"user"}
 }
```
<br>


## API Endpoints (backend routes)


| **Method** | **View**           | **Route**                                | **Description**                                                                                      | **Request - Body**                                                      |
| ---------- | ------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `GET`      | `index` or `favours` | `/`                                      | Main page route home `index` index view. If logged redirect `/swipe`                                 | {req.session.userID}                                                    |
| `GET`      | `signup`           | `/signup`                                | Render `signup` form view                                                                            |                                                                         |
| `POST`     | `swipe`            | `/signup`                                | Send signup data to server and creates user in DB. Then redirect to `/swipe`                         | {username, password, age, name, interests, aboutme, campus, profileImg} |
| `GET`      | `login`            | `/login`                                 | Render `login`form view                                                                              |                                                                         |
| `POST`     | `swipe`            | `/login`                                 | Sends login data to server and redirects to `/swipe`                                                 | {username, password}                                                    |
| `GET`      | `swipe`            | `/swipe/show/:userId`                    | Render `swipe` view                                                                                  | {req.session.filter}                                                    |
| `POST`     | `swipe`            | `/swipe/like/:userId/:likedId`           | Sends ObjID of liked user to server. Check for matches. Then redirect to `/swipe`                    | {req.params.id, req.session.userID}                                     |
| `POST`     | `swipe`            | `/swipe/dislike/:userId/:dislikedId`     | Sends objID of disliked user to server. Then redirects to `/swipe`                                   | {req.params.id, req.session.userID}                                     |
| `POST`     | `swipe`            | `/swipe/filter/:userId`                  | Sends filter option to the server. Add the filter to the current session. Then redirects to `/swipe` | {req.session.userID, req.session.filter}                                |
| `GET`      | `profile`          | `/profile/:userId`                       | Render `profile` view                                                                                | {req.sessionId}                                                         |
| `POST`     | `profile`          | `/profile/:userId/edit-imgProfile`       | Sends the new image to the server, update DB. Then render `profile` view                             | {req.session.userID, req.file.path}                                     |
| `POST`     | `profile`          | `/profile/:userId/edit-infoProfile`      | Sends the new data to server, update DB. Then render `profile` view                                  | {name, interests, aboutme}                                              |
| `POST`     | `profile`          | `/profile/:userId/add-newPhoto`          | Sends the img to server, update DB. Then render `profile` view                                       | {req.file.path}                                                         |
| `POST`     | `profile`          | `/profile/:userId/delete-photo/:photoId` | Delete img from DB. Then render `profile`view                                                        | {req.params.id}                                                         |
| `GET`      | `matches`          | `/matches/:userId`                       | Render `matches` view                                                                                | {req.session.id}                                                        |



<br>


## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

### Contributors

Luis Moncada - [`Github-Raketentrakt0r`](https://github.com/Raketentrakt0r) - [`LinkedIn-profile`](https://www.linkedin.com/in/luis-ricardo-moncada-garcia-3b9a30111/)

Diego Yupanqui - [`Github-DiegoYupanqui98`](https://github.com/DiegoYupanqui98) - [`LinkedIn-profile`](https://www.linkedin.com/in/diegoyupanqui/)

Carwi Barrios - [`Github-Carwels`](https://github.com/Carwels) - [`LinkedIn-profile`](https://www.linkedin.com/in/carwi-barrios)

Jorge Muelle - [`Github-Joramuh`](https://github.com/Joramuh) -  [`LinkedIn-profile`](https://www.linkedin.com/in/jorge-muelle/)

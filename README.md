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
| `/favours`            | FavourPage   | public`<Route>`  | Shows all public favours in a list                              |
| `/favours/:id`        | FavourDetailPage   | user only `<PrivateRoute>`  | Details of specific favour       |
| `/myFavours`         |  MyFavourPage              | user only `<PrivateRoute>`  |  List of my favours (Accepted / Requested)                                       |
| `/chat/:receivedId`     | ChatPage      | user only  `<PrivateRoute>` | Display chat between two users                              |
| `/profile/:id` | ProfilePage      | user only `<PrivateRoute>`  | Shows profile information                               |
| `/create` | CreateFavourPage    | user only `<PrivateRoute>`  | Creates new favour                                   |



## Components

- LoginPage

- SelectPage

- SignupPage

- FavoursPage

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
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  aboutMe: {type:String, default: ""},
  age :{type: Number},
  profileImg: { type: String, default:"http://cdn.onlinewebfonts.com/svg/img_574534.png"},
  acceptedFavours: [{type: Schema.Types.ObjectId, ref:"favours"}],
  requestedFavours: [{type: Schema.Types.ObjectId, ref:"favours"}],
  toke: {type: Number, default: 100}
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
| `GET`      | `index` | `/`                                      | Main page route home `index` index view.                             |    |
| `GET`      | `signup`           | `/auth/signup`                                | Render `signup` form view                                                                            |                                                                         |
| `POST`     | `signup`            | `/auth/signup`                                | Send signup data to server and creates user in DB. Then redirect to `/favours`                         | {username, password, e-mail} |
| `GET`      | `login`            | `/auth/login`                                 | Render `login`form view                                                                              |                                                                         |
| `POST`     | `login`            | `/auth/login`                                 | Sends login data to server and redirects to `/favours`                                                 | {e-mail, password}                                                    |
| `GET`      | `favours`            | `/favours`                    | Render `favours` view                                                                                  |                                                     |
| `GET`     | `favours`            | `/favours/:id`           | Render details of the favour.   | {req.params.id}                                     |
| `DELETE`     | `favours`            | `/favours/:id`           | Deletes favour from database.   | {req.params.id}                                     |
| `GET`     | `myList`            | `/favours/myList/:userId`     | Render all accepted / requested favours of user              | {req.params.userId}                                     |
| `GET`     | `chat`            | `/chat/:receiverId`                  | Render chat page between current user and the specified receiver | {req.params.receiverID}                                |
| `POST`      | `chat`          | `/chat/:receiverId`                       | Sends new message to server   | {req.params.receiverId}      |
| `GET`     | `create`          | `/favours/create`       | Render create new favour page |        |
| `POST`     | `create`          | `/favours/create`      | Sends the new favour data to server. Then redirect to `myFavours/:userId`     | {location, description, token}    |
| `GET`     | `profile`          | `/profile/:id`          | Renders current specified profile user   |        |
| `PUT`     | `profile`          | `/profile/:id` | Sends new user data to server, then redirect to `/profile/:id`    | {profileImg, age, aboutMe}                                                         |
| `GET`      | `verify`          | `/auth/verify`                       | Verifies existing token and sends user data back to the front   |                                                       |



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

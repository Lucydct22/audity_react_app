# Frontend Project Music | Audity

This is the frontend project for a music streaming app similar to Spotify. The user can listen to music for free, but also has the option to subscribe to premium features. Also user can listen to music without logging in, but to create playlists and like songs, they must log in.

## Technologies Used

- React with Vite,
- JSON-server for API simulation,
- Auth0 for registration,
- React reducer for music playback,
- Sass for design,
- TypeScript,
- Figma for design project

## Setup Instructions

1. Clone the repository to your local machine,
2. Install dependencies by running npm install,
3. In the root directory, create a .env file with the following contents:
```
REACT_APP_AUTH0_DOMAIN=<your Auth0 domain>
REACT_APP_AUTH0_CLIENT_ID=<your Auth0 client ID>
REACT_APP_API_URL=http://localhost:5100
```

4. Start the JSON server by running npm run server (in out case **NPM RUN JSON SERVER** --> see package.json)
5. Start the React app by running npm start (in out case **NPM RUN DEV** --> see package.json)
6. Navigate to http://localhost:5100 in your web browser to view the app.

## Usage
+ As an unauthenticated user, you can browse and play songs from the home page or search for songs using the search bar,
+ To create a playlist or like songs, you must register or log in using the Auth0 authentication,
+ As a logged-in user, you can create playlists, like songs, albums, artists o playlists, and view/modify your profile,
+ Premium features are not yet available, but the option to subscribe will be added in future updates.

## Authors 

[David Pizarro Frick](https://github.com/DTPF), 
[Iuliia Shikhanova](https://github.com/IuliiaNova), 
[Joe Joy](https://github.com/joejoyjoy), 
[Javier Pascual Tunez](https://github.com/Javier-jpt), 
[Lucia Tena](https://github.com/Lucydct22), 




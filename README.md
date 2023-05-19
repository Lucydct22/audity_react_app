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

## Authors ✨

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/DTPF">
          <img src="https://avatars.githubusercontent.com/u/60478224" width="100px" alt="David T. Pizarro Frick"/>
          <br />
          <sub>
          <b>David T. Pizarro Frick</b>
          </sub>
        </a>
        <br />
        <a href="#tools-dtpf" title="code-tools-maintenance-design">💻🔧🚧🎨</a>
      </td>
      <td align="center">
        <a href="https://github.com/joejoyjoy">
          <img src="https://avatars.githubusercontent.com/u/73751755" width="100px" alt="Joe Alt"/>
          <br />
          <sub>
          <b>Joe Alt</b>
          </sub>
        </a>
        <br />
        <a href="#tools-joealt" title="code-tools-maintenance-design">💻🔧🚧🎨</a>
      </td>
      <td align="center">
        <a href="https://github.com/IuliiaNova">
          <img src="https://avatars.githubusercontent.com/u/115942758" width="100px" alt="Iuliia Shikhanova"/>
          <br />
          <sub>
          <b>Iuliia Shikhanova</b>
          </sub>
        </a>
        <br />
        <a href="#code-luliianova" title="code-tools-maintenance-design">💻🔧🚧🎨</a>
      </td>
      <td align="center">
        <a href="https://github.com/Lucydct22">
          <img src="https://avatars.githubusercontent.com/u/119544531" width="100px" alt="lucia del cacho"/>
          <br />
          <sub>
          <b>lucia del cacho</b>
          </sub>
        </a>
        <br />
        <a href="#code-lucydct22" title="code-tools-maintenance-design">💻🔧🚧🎨</a>
      </td>
      <td align="center">
        <a href="https://github.com/Javier-jpt">
          <img src="https://avatars.githubusercontent.com/u/119037601" width="100px" alt="Javier Pascual Tunez"/>
          <br />
          <sub>
          <b>Javier Pascual Tunez</b>
          </sub>
        </a>
        <br />
        <a href="#code-javier-jpt" title="code-tools-maintenance-design">💻🔧🚧🎨</a>
      </td>
    </tr>
  </tbody>
</table>

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!


Project structure
<pre>
├───node_modules
├───public
├───resources
└───src
    ├───api
    │   ├───music
    │   └───utils
    ├───assets
    │   ├───img
    │   │   ├───albums
    │   │   ├───gif
    │   │   ├───gradients
    │   │   ├───png
    │   │   └───webp
    │   └───locale
    ├───context
    │   ├───admin
    │   │   ├───album.context
    │   │   ├───artist.context
    │   │   ├───genre.context
    │   │   ├───playlist.context
    │   │   ├───track.context
    │   │   └───user.context
    │   ├───currentTrack
    │   ├───currentTracklist
    │   ├───language
    │   ├───myLibrary
    │   ├───theme
    │   └───user
    ├───hooks
    ├───interfaces
    ├───reducers
    │   ├───admin
    │   │   ├───albumAdmin
    │   │   ├───artistAdmin
    │   │   ├───genreAdmin
    │   │   ├───playlistAdmin
    │   │   ├───trackAdmin
    │   │   └───userAdmin
    │   ├───currentTrack
    │   ├───currentTracklist
    │   ├───myLibrary
    │   └───user
    ├───router
    ├───sass
    ├───utils
    │   └───tracks
    └───views
        ├───components
        │   ├───admin
        │   │   ├───albumsAdminComponent
        │   │   ├───artistsAdminComponent
        │   │   ├───forms
        │   │   │   ├───albumForm
        │   │   │   ├───artistForm
        │   │   │   ├───genreForm
        │   │   │   ├───playlistForm
        │   │   │   └───trackForm
        │   │   ├───genresAdminComponent
        │   │   ├───homeAdminComponent
        │   │   ├───playlistsAdminComponent
        │   │   ├───tracksAdminComponent
        │   │   └───usersAdminComponent
        │   ├───basic
        │   │   ├───albumBComponent
        │   │   ├───albumsBComponent
        │   │   ├───artistBComponent
        │   │   ├───artistsBComponent
        │   │   ├───desktop
        │   │   │   ├───playerBComponentDesktop
        │   │   │   │   └───progressBar
        │   │   │   ├───sidebarBComponentDesktop
        │   │   │   ├───topBarBComponentDesktop
        │   │   │   └───trackListComponentDesktop
        │   │   ├───errorBComponent
        │   │   ├───genreBComponent
        │   │   ├───genresBComponent
        │   │   ├───libraryBComponent
        │   │   │   ├───libraryBComponentFavTracks
        │   │   │   ├───LibraryBComponentHighlights
        │   │   │   ├───LibraryBComponentUpload
        │   │   │   │   └───UserSongUploaderModal
        │   │   │   └───libraryHeader
        │   │   ├───mobile
        │   │   │   ├───artistBComponentMobile
        │   │   │   ├───exploreBComponent
        │   │   │   ├───playerBComponentMobile
        │   │   │   ├───playerTrackDetailsComponentMobile
        │   │   │   ├───popupAddPlaylistBComponent
        │   │   │   ├───searchBComponentMobile
        │   │   │   ├───searchResultMobileBComponent
        │   │   │   ├───sidebarBComponentMobile
        │   │   │   ├───topBarBComponentMobile
        │   │   │   └───tracklistComponentMobile
        │   │   │       └───TrackSidebarMobile
        │   │   ├───musicPageComponent
        │   │   ├───playlistBComponent
        │   │   ├───playlistsBComponent
        │   │   ├───profileComponent
        │   │   ├───renders
        │   │   │   ├───genresRender
        │   │   │   ├───renderAlbum
        │   │   │   ├───renderArtist
        │   │   │   ├───renderPlaylist
        │   │   │   └───renderTrack
        │   │   ├───searchResultDesktopBComponent
        │   │   └───trackListBComponent
        │   └───SwiperCarousel
        │       ├───carouselLibraryPage
        │       │   └───renderLibraryItem
        │       ├───carouselMusicPage
        │       │   └───renderMusicItem
        │       └───carouselTracks
        ├───layouts
        │   ├───adminLayout
        │   ├───basicLayout
        │   └───libraryLayout
        ├───pages
        │   ├───admin
        │   │   ├───albumsAdminPage
        │   │   ├───artistsAdminPage
        │   │   ├───genresAdminPage
        │   │   ├───homeAdminPage
        │   │   ├───playlistsAdminPage
        │   │   ├───tracksAdminPage
        │   │   └───usersAdminPage
        │   ├───apiTestPage
        │   ├───basic
        │   │   ├───albumPage
        │   │   ├───albumsPage
        │   │   ├───artistPage
        │   │   ├───artistsPage
        │   │   ├───explorePage
        │   │   ├───genrePage
        │   │   ├───genresPage
        │   │   ├───libraryPages
        │   │   │   ├───favoritePage
        │   │   │   ├───highlightPage
        │   │   │   └───uploadPage
        │   │   ├───musicPage
        │   │   ├───playlistPage
        │   │   ├───playlistsPage
        │   │   ├───profilePage
        │   │   └───searchPage
        │   └───errors
        ├───UI
        │   ├───commingSoon
        │   ├───copyUrl
        │   ├───language
        │   ├───ModalAntdPlaylistCreate
        │   │   └───ModalAntdPlaylistCreateMobile
        │   ├───spinner
        │   ├───swiperSettings
        │   │   ├───swiperDesktop
        │   │   └───swiperMobile
        │   └───theme
        └───utils
            └───HelmetSEO
</pre>
## License <!-- omit in toc -->

This project is licensed under the MIT License

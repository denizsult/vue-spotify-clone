import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();
spotify.setAccessToken(localStorage.getItem("token"));
export default spotify;
const cookie = require("cookie");
const Photos = require("googlephotos");

export default async function handler(req, res) {
  const browserCookies = req.headers.cookie;

  if (!browserCookies) return null;

  const cookies = cookie.parse(browserCookies);
  const googlePhotosToken = cookies.googlePhotosToken;
  const photos = new Photos(googlePhotosToken);
  const albums = await photos.albums.list(10);

  res.status(200).json(albums);
}

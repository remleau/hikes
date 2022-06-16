const path = require("path");
const withSass = require("@zeit/next-sass");
const { i18n } = require("./next-i18next.config");

module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
  cssModules: true,
});

module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = {
  i18n,
  env: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    googleMapsKey: process.env.googleMapsKey,
  },
};

const path = require('path')
const withSass = require('@zeit/next-sass');
const { i18n } = require('./next-i18next.config');

module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
  cssModules: true
});

module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = {
  i18n,
  env: {
    apiKey: "AIzaSyAAkH9epxJqRA_DAZSDoRebXLLmmrsn1AE",
    authDomain: "mountains-app-dev.firebaseapp.com",
    projectId: "mountains-app-dev",
    storageBucket: "mountains-app-dev.appspot.com",
    messagingSenderId: "371191343534",
    appId: "1:371191343534:web:d4e0c1e258d7abfe45003f"
  },
}
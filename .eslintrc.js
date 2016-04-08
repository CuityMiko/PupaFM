module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "react"
    ],
    "settings": {
      "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "0.14.7" // React version, default to the latest React stable release
    }
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
};

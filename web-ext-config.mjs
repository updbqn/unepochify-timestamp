export default {
  ignoreFiles: [
    "context/",
    "node_modules/",
    "web-ext-artifacts/",
    ".env",
    ".git/",
    ".gitignore",
    "Makefile",
    "README.md",
    "web-ext-config.mjs"
  ],
  build: {
    overwriteDest: true
  },
  sign: {
    channel: "unlisted"
  }
};

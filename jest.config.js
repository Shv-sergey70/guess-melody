module.exports = {
  "transform": {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  "testRegex": `.test.(js?|jsx?|tsx?)$`,
  "moduleFileExtensions": [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],
  "snapshotSerializers": [`enzyme-to-json/serializer`] // important to locate it here, not in package.json
};

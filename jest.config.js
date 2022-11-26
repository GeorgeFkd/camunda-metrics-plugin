module.exports = {
    //setupFilesAfterEnv: ["<rootDir>/setUpTests.js"],
    preset: "ts-jest",
    transform: {
        ".(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/mocks/file-mock.ts",
        ".(css|less)$": "<rootDir>/mocks/style-mock.ts",
        "^.+\\.[t|j]sx?$": "babel-jest",
    },
    testEnvironment: "node",
};

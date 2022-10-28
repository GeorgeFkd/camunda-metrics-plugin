// import tailwindcss from "tailwindcss";
// export default {
//     plugins: {
//         "postcss-import": {},
//         tailwindcss: {},
//     },
// };

const tailwindcss = require("tailwindcss");
module.exports = {
    plugins: {
        tailwindcss: { config: "./tailwind.config.js" },
    },
};

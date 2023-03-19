# Code Documentation

## Contents

- [Tools Used](#tools-used)
- [High-level-overview](#code-overview)
- [Contributing](#contributing-guide)
- [Current Issues](#issues)

### Tools Used 
This plugin is developed using react with typescript. 

[Webpack](https://webpack.js.org/) is used for bundling, [babel](https://babeljs.io/) for transpiling and [jest](https://jestjs.io/) for testing. 

For state management in react, the [zustand](https://docs.pmnd.rs/zustand/recipes/recipes) library is used.

For styling, vanilla css modules are used(there is an intention to move to tailwindcss).
For the calculations of metrics [xpath.js](https://www.npmjs.com/package/xpath.js) and [@xmldom/xmldom](https://www.npmjs.com/package/@xmldom/xmldom) are used.
Soon the metrics calculations will be done solely from the library [bpmn-metrics](https://www.npmjs.com/package/bpmn-metrics) currently being developed.
If you are interested in contributing new BPMN metrics calculations contribute to that project, 
there is an [analytical guide](https://github.com/GeorgeFkd/bpmn-metrics/blob/master/Docs.md) on how to do so. 

### Code Overview

### Contributing Guide

### Issues
- The webpack config is problematic as to run the plugin, a production build is needed which lowers productivity significantly.
- React-Dom is needed as a dependency but should somehow be provided by the modeler.
- Most tests are written for metrics not for other features(and no tests on frontend)

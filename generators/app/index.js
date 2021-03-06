module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

class GeneratorTeamTabOptions {
}
exports.GeneratorTeamTabOptions = GeneratorTeamTabOptions;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

let path = __webpack_require__(0);
class Yotilities {
    static validateUrl(url) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }
    static fixFileNames(filename, options) {
        if (filename !== undefined) {
            var basename = path.basename(filename);
            if (basename[0] === '_') {
                var filename = '.' + basename.substr(1);
                var dirname = path.dirname(filename);
                filename = path.join(dirname, filename);
            }
            for (var prop in options) {
                if (options.hasOwnProperty(prop) && typeof options[prop] === 'string') {
                    filename = filename.replace(new RegExp("{" + prop + "}", 'g'), options[prop]);
                }
            }
        }
        return filename;
    }
}
exports.Yotilities = Yotilities;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const GeneratorTeamsTab_1 = __webpack_require__(9);
module.exports = GeneratorTeamsTab_1.GeneratorTeamsTab;


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Generator = __webpack_require__(1);
const lodash = __webpack_require__(5);
const chalk = __webpack_require__(12);
const GeneratorTeamTabOptions_1 = __webpack_require__(3);
const Yotilities_1 = __webpack_require__(4);
let yosay = __webpack_require__(2);
let path = __webpack_require__(0);
class GeneratorTeamsTab extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.options = new GeneratorTeamTabOptions_1.GeneratorTeamTabOptions();
        opts.force = true;
        this.desc('Generate a Microsoft Teams Tab solution.');
        this.argument('solutionName', {
            description: 'Solution name, as well as folder name',
            required: false
        });
    }
    initializing() {
        this.log(yosay('Welcome to the ' + chalk.yellow(`Microsoft Teams Tab generator (0.4.10)`)));
        this.composeWith('teams-tab:tab', { 'options': this.options });
        this.composeWith('teams-tab:bot', { 'options': this.options });
    }
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'solutionName',
                default: lodash.kebabCase(this.appname),
                when: () => !this.options.solutionName,
                message: 'What is your solution name?'
            },
            {
                type: 'list',
                name: 'whichFolder',
                default: 'current',
                when: () => !this.options.solutionName,
                message: 'Where do you want to place the files?',
                choices: [
                    {
                        name: 'Use the current folder',
                        value: 'current'
                    },
                    {
                        name: 'Create a subfolder with solution name',
                        value: 'subdir'
                    }
                ]
            },
            {
                type: 'input',
                name: 'name',
                message: 'Name of your Microsoft Teams Tab project',
                default: this.appname
            },
            {
                type: 'input',
                name: 'developer',
                message: 'Your (company) name',
                default: this.user.git.name,
                validate: (input) => {
                    return input.length > 0;
                }
            },
            {
                type: 'input',
                name: 'host',
                message: 'The Url where you will host this tab:',
                default: (answers) => {
                    return `https://${answers.name}.azurewebsites.net`;
                },
                validate: Yotilities_1.Yotilities.validateUrl
            },
            {
                type: 'checkbox',
                message: 'What do you want to add to your project?',
                name: 'parts',
                choices: [
                    {
                        name: 'A tab',
                        value: 'tab',
                        checked: true
                    },
                    {
                        name: 'A bot',
                        value: 'bot'
                    }
                ]
            },
            {
                type: 'confirm',
                name: 'express',
                message: 'Would you like to use Express to host your Tabs?'
            },
            {
                type: 'confirm',
                name: 'azure',
                message: 'Would you like to include settings for Azure deployment?'
            }
        ]).then((answers) => {
            this.options.title = answers.name;
            this.options.description = this.description;
            this.options.solutionName = this.options.solutionName || answers.solutionName;
            this.options.shouldUseSubDir = answers.whichFolder === 'subdir';
            this.options.shouldUseAzure = (answers.azure);
            this.options.shouldUseExpress = (answers.express);
            this.options.libraryName = lodash.camelCase(this.options.solutionName);
            this.options.developer = answers.developer;
            this.options.host = answers.host;
            var tmp = this.options.host.substring(this.options.host.indexOf('://') + 3);
            var arr = tmp.split('.');
            this.options.namespace = lodash.reverse(arr).join('.');
            this.options.tou = answers.host + '/tou.html';
            this.options.privacy = answers.host + '/privacy.html';
            this.options.bot = answers.parts.indexOf('bot') != -1;
            this.options.tab = answers.parts.indexOf('tab') != -1;
            if (this.options.shouldUseSubDir) {
                this.destinationRoot(this.destinationPath(this.options.solutionName));
            }
        });
    }
    configuring() {
    }
    default() {
    }
    writing() {
        let staticFiles = [
            "_gitignore",
            "tsconfig.json",
            "src/app/web/assets/tab-44.png",
            "src/app/web/assets/tab-88.png",
            "src/app/scripts/theme.ts"
        ];
        let templateFiles = [
            "README.md",
            "gulpfile.js",
            "package.json",
            "src/manifest/manifest.json",
            "webpack.config.js",
            "src/app/scripts/client.ts",
            "src/app/web/index.html",
            "src/app/web/tou.html",
            "src/app/web/privacy.html"
        ];
        if (this.options.shouldUseAzure) {
            staticFiles.push('deploy.cmd', '_deployment');
        }
        if (this.options.shouldUseExpress) {
            staticFiles.push('src/app/server.ts');
        }
        this.sourceRoot();
        templateFiles.forEach(t => {
            this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
        });
        staticFiles.forEach(t => {
            this.fs.copy(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options));
        });
    }
    conflicts() {
    }
    install() {
        let packages = [
            'gulp',
            'webpack',
            'typescript',
            'ts-loader',
            'gulp-zip',
            'gulp-util',
            'gulp-inject',
            'run-sequence'
        ];
        if (this.options.shouldUseExpress) {
            packages.push('express', 'express-session', 'body-parser', 'morgan', '@types/express', '@types/express-session', '@types/body-parser', '@types/morgan');
        }
        this.npmInstall(packages, { 'save': true });
    }
    end() {
        this.log(chalk.yellow('Thanks for using the generator'));
        this.log(chalk.yellow('Wictor Wilén, @wictor'));
        this.log(chalk.yellow('Have fun and make great Tabs...'));
    }
}
exports.GeneratorTeamsTab = GeneratorTeamsTab;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ })
/******/ ]);
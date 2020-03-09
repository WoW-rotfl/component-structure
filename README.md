# Component Structure

Component Structure is a component creation CLI tool. It created directory with all defined structure(files).

## How it works

1. Define component destination relative path e.g. `./src/components`
2. Define component structure separated by space e.g. `index.js .js .scss __tests__/.test.js. Files with component name must start with dot e.g.  .js -> ComponentName.js, .test.js -> ComponentName.test.js`

## Usage

1. Install the package

```sh
npm install component-structure --save-dev
```

2. Two ways, direct shell:

```sh
./node_modules/.bin/component-structure Button --path ./src/components --structure index.js .js __tests__/.test.js __tests__/.e2e.js
```

or set in package.json

```javascript
{
  "scripts": {
    "start": ...,
    "test":  ...,
    "cs": "./node_modules/.bin/component-structure -p ./src/components -s index.js .js __tests__/.test.js __tests__/.e2e.js --"
    "cs:ui": "./node_modules/.bin/component-structure -p ./src/components/ui -s index.js .js __tests__/.test.js __tests__/.e2e.js --"
  }
}
```
**Note** 
Two dashes at the end of the line required(due to yargs api) - for the separating component names from structure. 

and run:
```sh
npm run cs Accordion Button Link Panel
```


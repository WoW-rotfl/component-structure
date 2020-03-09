# Create Component

Create Component is a component structure creation CLI tool. It created directory with all defined structure(files).

## How it works

1. Define component destination relative path e.g. ./src/components 
2. Define component structure separated by space e.g. index.js .js .scss __tests__/.test.js. Files with component name must start with dot e.g. .js -> ComponentName.js, .test.js -> ComponentName.test.js

## Usage

1. Install the package

```sh
npm install create-component --save-dev
```

2. Two ways, direct shell:

```sh
./node_modules/.bin/create-component Button --path ./src/components --structure index.js .js __tests__/.test.js __tests__/.e2e.js
```

or set in package.json

```javascript
{
  "scripts": {
    "start": ...,
    "test":  ...,
    "cc": "./node_modules/.bin/create-component -p ./src/components -s index.js .js __tests__/.test.js __tests__/.e2e.js --"
    "cc:ui": "./node_modules/.bin/create-component -p ./src/components/ui -s index.js .js __tests__/.test.js __tests__/.e2e.js --"
  }
}
```
and run:
```sh
npm run cc Accordion Button Link Panel
```


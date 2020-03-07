const yargs = require('yargs');
const chalk = require('chalk');
const { createInterface } = require('readline');
const rl = createInterface(process.stdin, process.stdout);
const createComponents = require('./create-components');


function printResult(result, componentsPath) {
  result.sort((a, b) => Number(a[1]) - Number(b[1]));
  console.log('\n');
  result.forEach(([name, isCreated]) => {
    if (isCreated) {
      console.log(chalk.green(`SUCCESS>>> Component ${name} created in ${componentsPath}`));
    } else {
      console.log(chalk.magenta(`FAIL>>>>>> Component ${name} already exists in ${componentsPath}`));
    }
  });
  console.log('\n');
}

module.exports = () => {
  const argv = yargs
    .option('structure', {
      'alias': 's',
      'describe': 'Define component structure e.g.\n.js .stories.js __tests__/.test.js ->\ncomponent-name/component-name.js, component-name/component-name.stories.js, component-name/__tests__/component-name.test.js',
      'type': 'array',
      'demandOption': 'Provide component structure',
    })
    .option('path', {
      'alias': 'p',
      'describe': 'Set component destination path',
      'type': 'string',
      'requiresArg': true,
      'demandOption': 'Provide component destination relative path'
    })
    .argv;

  function getPath() {
    return argv.path;
  }

  function getStructure() {
    return argv.structure;
  }

  function lineToArray(line) {
    if (!line) {
      console.log('Provide one component name at least');
      process.exit(1);
    }
    return line.trim().split(/\s+/);
  }

  const componentsNms = argv._;
  if (!argv.structure.length) {
    yargs.showHelp();
    console.log('Not enough arguments following: structure');
    process.exit(1);
  }
  if (!componentsNms.length) {
    rl.setPrompt('Component name(s) separated by spaces: ');
    rl.prompt();
    
    rl.on('line', line => {
      try {
        const result = createComponents(lineToArray(line), getPath(), getStructure());
        rl.close();
        printResult(result, getPath());
        process.exit(0);
      } catch(error) {
        console.log(error);
        rl.close();
        process.exit(1);
      }
    });
    return;
  }
  try {
    const result = createComponents(componentsNms, getPath(), getStructure())
    printResult(result, getPath());
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
};

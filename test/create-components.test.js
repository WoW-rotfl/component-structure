const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const createComponents = require('../create-components');

const componentsPath = './test/components';

afterAll(() => {
  rimraf.sync(path.resolve(componentsPath));
});

test('return array of arrays with [name, isCreated]', async () => {
  const componentsNms = ['Accordion', 'Link'];
  const structure = ['index.js', '.js', '__tests__/.test.js'];
  const result = createComponents(componentsNms, componentsPath, structure);
  result.forEach(([name, isCreated]) => {
    const isExists = fs.existsSync(path.resolve(componentsPath, name));
    expect(isExists).not.toBeFalsy();
    expect(isCreated).toBeTruthy();
  });
});
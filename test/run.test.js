const { promisify } = require('util');
const mkdirp = require('mkdirp');
const exec = promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const componentsPath = path.resolve('./test/components');

beforeAll(() => {
  const LinkPath = path.join(componentsPath, 'Link');
  mkdirp.sync(LinkPath);
  fs.writeFile(path.join(LinkPath, 'index.js'));
});

afterAll(() => {
  rimraf.sync(componentsPath);
});

it('shows an error on define structure', async () => {
  await exec('./index.js -p test').catch(result => {
    expect(result.stderr).toMatchSnapshot();
  });

  await exec('./index.js -p test --structure').catch(result => {
    expect(result.stderr).toMatchSnapshot();
  });
});

it('shows an error on define destination path', async () => {
  await exec('./index.js -s test').catch(result => {
    expect(result.stderr).toMatchSnapshot();
  });

  await exec('./index.js -s test --path').catch(result => {
    expect(result.stderr).toMatchSnapshot(); 
  });
});

it('should create Button component', async () => {
  const { stdout } = await exec('./index.js Button -p ./test/components -s index.js .js __tests__/.test.js');

  expect(stdout).toMatchSnapshot();
  expect(fs.existsSync(path.join(componentsPath, 'Button'))).toBeTruthy();

});

it('should fail create Link component', async () => {
  const { stdout } = await exec('./index.js Link -p ./test/components -s index.js');

  expect(stdout).toMatchSnapshot();
});

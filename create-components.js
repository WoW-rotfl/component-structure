const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp2');

function isFile(file) {
  return !~file.indexOf('/') && ~file.indexOf('.');
}

function destFileName(filePart, componentName) {
  return filePart.startsWith('.')
  ? componentName + filePart
  : filePart;
}

module.exports = (names, componentsPath, structure) => {
  
  async function create(componentName) {
    const componentPath = path.resolve(componentsPath, componentName);

    if (fs.existsSync(componentPath)) {
      return [componentName, false];
    }

    await mkdirp.promise(componentPath).catch(error => {
      console.log(error);
      process.exit(1);
    });


    structure.forEach(async file => {
      try {
        if (isFile(file)) {
          fs.writeFileSync(path.join(componentPath, destFileName(file, componentName)), '');
        } else {
          // /test/.test.js
          const componentDirs = file.split('/').filter(el => el && !isFile(el)).join('/');
          const filename = file.split('/').pop();
          const destDirsPath = path.join(componentPath, componentDirs);
          const filePath = path.join(destDirsPath, destFileName(filename, componentName));
          await mkdirp.promise(destDirsPath);
          fs.writeFileSync(filePath)
        }
      } catch(error) {
        console.log(error);
        process.exit(1);
      }
    });
    return [componentName, true];
  }
  // console.error(names, componentsPath, structure);
  return Promise.all(names.map(name => create(name)));
}
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

function isFile(file) {
  return !~file.indexOf('/') && ~file.indexOf('.');
}

function destFileName(filePart, componentName) {
  return filePart.startsWith('.')
  ? componentName + filePart
  : filePart;
}

module.exports = (names, componentsPath, structure) => {
  
  function create(componentName) {
    const componentPath = path.resolve(componentsPath, componentName);

    if (fs.existsSync(componentPath)) {
      return [componentName, false];
    }

    mkdirp.sync(componentPath);


    structure.forEach(file => {
      if (isFile(file)) {
        fs.writeFileSync(path.join(componentPath, destFileName(file, componentName)), '');
      } else {
        // /test/.test.js
        const componentDirs = file.split('/').filter(el => el && !isFile(el)).join('/');
        const filename = file.split('/').pop();
        const destDirsPath = path.join(componentPath, componentDirs);
        const filePath = path.join(destDirsPath, destFileName(filename, componentName));
        mkdirp.sync(destDirsPath);
        fs.writeFileSync(filePath);
      }
    });
    return [componentName, true];
  }
  return names.map(name => create(name));
}
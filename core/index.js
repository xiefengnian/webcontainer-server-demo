const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const console = require('console');

const getProjectFiles = async (projectPath) => {
  const fileSystemTree = {};

  const appendToFileSystemTree = (_pathArr, filename, fileContent) => {
    const isDir = !filename;

    const directory = _pathArr.length
      ? _pathArr
          .reduce((prev, current, index) => {
            if (index) {
              return [...prev, 'directory', current];
            } else {
              return [...prev, current];
            }
          }, [])
          .concat('directory')
      : [];

    if (!_.has(fileSystemTree, directory)) {
      _.set(fileSystemTree, directory, {});
    }
    if (!isDir) {
      _.set(fileSystemTree, directory.concat(filename), {
        file: {
          contents: fileContent,
        },
      });
    }
  };

  (await glob(`${projectPath}/**/*`, { dot: true })).map((currentPath) => {
    const pathArr = currentPath.replace(`${projectPath}/`, '').split('/');

    if (fs.statSync(currentPath).isFile()) {
      const filename = _.last(pathArr);
      const _pathArr = pathArr.slice(0, -1);
      appendToFileSystemTree(
        _pathArr,
        filename,
        fs.readFileSync(currentPath, 'utf-8')
      );
    } else {
      appendToFileSystemTree(pathArr, undefined, undefined);
    }
  });

  return fileSystemTree;
};

module.exports = {
  getProjectFiles,
};

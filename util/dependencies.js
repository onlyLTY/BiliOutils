const fs = require('fs');
const path = require('path');

fs.writeFileSync(
  path.resolve(process.cwd(), './dist/package.json'),
  JSON.stringify({
    dependencies: require(path.resolve(process.cwd(), 'package.json'))
      .dependencies,
  })
);

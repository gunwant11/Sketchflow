

cd node_modules/fabric
npm i uglifyjs -g
node build.js modules=ALL requirejs exclude=gestures,accessors

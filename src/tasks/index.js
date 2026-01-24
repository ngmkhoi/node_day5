const fs = require('fs');
const path = require('path');

const tasks = {};

const taskFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.task.js'));
taskFiles.forEach(file => {
    const taskName = file.replace('.task.js', '');
    tasks[taskName] = require(path.join(__dirname, file));
    console.log(`Loaded task: ${taskName}`);
})

module.exports = tasks;
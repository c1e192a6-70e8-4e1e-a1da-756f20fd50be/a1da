const path = require('path')
function renderIndex(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}
module.exports = renderIndex;
let notAllowed = ['fart', 'crap', 'shut up'];

module.exports = function (req, res, next) {
    while (notAllowed.find(word => req.body.text.toLowerCase().includes(word))) {
        const badWord = notAllowed.find(word => req.body.text.toLowerCase().includes(word));
        req.body.text = req.body.text.replace(badWord, '*'.repeat(badWord.length));
    }
    next();
}

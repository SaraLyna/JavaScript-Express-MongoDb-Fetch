module.exports.home =
    (req, res) => res.render('index', { title: 'Express' });

module.exports.first =
    (req, res) => res.sendFile("first.html", { root: "public/html" });

module.exports.second =
    (req, res) => res.sendFile("second.html", { root: "public/html" });

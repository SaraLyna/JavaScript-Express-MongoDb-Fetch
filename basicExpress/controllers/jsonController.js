const randint = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

module.exports.json =
    (req, res) => {
        const query = req.query;
        const value = query["value"] ? query["value"] : null;
        const color = query["color"] ? query["color"] : null;

        res.json({ value: value, blue: color, date: new Date()})
    };

module.exports.random =
    (req, res) => res.json({ randomValue: randint(0, 100) });
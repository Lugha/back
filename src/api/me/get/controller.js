export default (req, res) => {
    res.send({
        username: req.username
    });
};
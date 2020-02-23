export default (req, res) => {
    res.send({
        username: req.user.username
    });
};
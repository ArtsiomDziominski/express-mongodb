const User = require("../models/user");
module.exports = async function (id) {
    let userName;
    await User.findById({_id: id})
        .then(user => userName = user.login)
    return userName;
}
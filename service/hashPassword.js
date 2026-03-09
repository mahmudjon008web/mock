const bcrypt = require('bcryptjs')
const hashPassword = async (password, salt) =>{
    return await bcrypt.hash(password, await bcrypt.genSalt(salt))
}
module.exports = hashPassword;
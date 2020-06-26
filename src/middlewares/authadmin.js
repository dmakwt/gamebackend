
const Employee = require('../models/employee')
const authAdmin = async (req, res, next) => {
    try {

        const userReq = req.user
        const admin = await Employee.findById(userReq._id)
        if (!admin) {
            return res.status(401).send()
        }
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
    }


}

module.exports = authAdmin
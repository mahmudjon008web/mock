const db = require("./models/index");
const { ServerError } = require("../service/validation");
const { registerAdmin } = require("./controllers/admin/admin.controller") 

const syncDatabase = async (req, res) => {
    try {
        const isForce = req.body.force === true;

        await db.sequelize.sync({ force: isForce });

        // Agar baza tozalangan bo'lsa, adminni qayta yaratish kerak
        if (isForce) {
            await registerAdmin();
        }

        return res.status(200).json({
            success: true,
            message: isForce ? "Baza tozalandi va Admin qayta yaratildi." : "Baza sinxronizatsiya qilindi."
        });
    } catch (error) {
        return ServerError(res, error);
    }
};

module.exports = {
    syncDatabase
}
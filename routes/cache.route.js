const { syncDatabase } = require("../middleware/clearcache")
const { isAdmin } = require("../middleware/isAdmin")
const { protect } = require("../middleware/protected")

const router = require("express").Router()
/**
 * @swagger
 * /api/cache/clearAll:
 *   post:
 *     summary: Ma'lumotlar bazasini sinxronizatsiya qilish (ixtiyoriy tozalash bilan)
 *     tags: [Admin]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               force:
 *                 type: boolean
 *                 example: true
 *                 description: Agar true bo'lsa, barcha jadval o'chirilib qayta yaratiladi
 *     responses:
 *       200:
 *         description: Baza muvaffaqiyatli sinxronizatsiya qilindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Baza tozalandi va Admin qayta yaratildi.
 *       500:
 *         description: Server xatoligi
 */
router.post("/clearAll", protect, isAdmin, syncDatabase)

module.exports = router
const router = require("express").Router()
const { deleteUser, getAllUsers, getOneUser } = require("../controllers/admin/admin.controller")
const {isAdmin} = require("../middleware/isAdmin")
const { protect } = require("../middleware/protected")

/**
 * @swagger
 * api/users/all:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: ali
 *                   phone:
 *                     type: string
 *                     example: "+998901234567"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-03-14T10:00:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-03-14T10:00:00.000Z
 *       500:
 *         description: Server xatoligi
 */
router.get("/all", protect, isAdmin, getAllUsers)


/**
 * @swagger
 * all/users/{id}:
 *   get:
 *     summary: Bitta foydalanuvchini olish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchi ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumoti
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: ali
 *                 phone:
 *                   type: string
 *                   example: "+998901234567"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-14T10:00:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-14T10:00:00.000Z
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.get("/:id", protect, isAdmin, getOneUser)

/**
 * @swagger
 * api/users/delete/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchi ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.delete("/delete/:id", protect, isAdmin, deleteUser)

module.exports = router
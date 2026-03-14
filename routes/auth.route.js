const { register, login, logout } = require("../controllers/auth/auth.controller")
const { protect } = require("../middleware/protected")
const router = require("express").Router()


/**
 * @swagger
 * api/auth/register:
 *   post:
 *     summary: Yangi foydalanuvchi ro'yxatdan o'tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - phone
 *             properties:
 *               username:
 *                 type: string
 *                 example: ali
 *               password:
 *                 type: string
 *                 example: 12345678
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli yaratildi
 *       401:
 *         description: Bunday foydalanuvchi oldindan mavjud
 *       500:
 *         description: Server xatoligi
 */
router.post("/register", register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish (Login)
 *     description: Telefon raqam va parol orqali login qiladi va JWT token qaytaradi.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login bo‘ldi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Akauntga kirildi!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Parol noto‘g‘ri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parol yoki Foydalanuvchi xato!
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parol yoki Foydalanuvchi xato!
 *       500:
 *         description: Server xatosi
 */
router.post("/login", login)


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Foydalanuvchini tizimdan chiqish
 *     description: Avtorizatsiyadan o‘tgan foydalanuvchi tizimdan chiqadi va `isLogged` maydoni false qilib yangilanadi.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli chiqildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Muvaffaqiyatli chiqildi!
 *       401:
 *         description: Avtorizatsiya xatosi (token yo‘q yoki noto‘g‘ri)
 *       500:
 *         description: Server xatosi
 */
router.post("/logout", protect, logout)



module.exports = router
const { getTasks, postTasks, updateTask, deleteTask, getTaskById } = require("../controllers/writing/writing.controller")
const { isAdmin } = require("../middleware/isAdmin")
const { protect } = require("../middleware/protected")
const upload = require("../utils/fileUpload")

const router = require("express").Router()

/**
 * @swagger
 * api/writing/all:
 *   get:
 *     summary: Barcha writing olish
 *     tags: [Writing]
 *     responses:
 *       200:
 *         description: Writing ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   task1_img:
 *                     type: string
 *                     example: /uploads/image.png
 *                   task1_text:
 *                     type: string
 *                   task2_text:
 *                     type: string
 */
router.get("/all", protect, isAdmin, getTasks)

/**
 * @swagger
 * api/writing/{id}:
 *   get:
 *     summary: Writingni ID orqali olish
 *     tags: [Writing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Writing id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Writing topildi
 *       404:
 *         description: Ma'lumot topilmadi
 */
router.get("/:id", protect, isAdmin, getTaskById)

/**
 * @swagger
 * api/writing/post:
 *   post:
 *     summary: Yangi writing  qo'shish
 *     tags: [Writing]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - task1_img
 *               - task1_text
 *               - task2_text
 *             properties:
 *               task1_img:
 *                 type: string
 *                 format: binary
 *               task1_text:
 *                 type: string
 *               task2_text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Writing muvaffaqiyatli qo'shildi
 *       400:
 *         description: Xato request
 */
router.post("/post", protect, isAdmin, upload.single("task1_img"), postTasks)

/**
 * @swagger
 * api/writing/update/{id}:
 *   patch:
 *     summary: Writing yangilash
 *     tags: [Writing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Writing ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               task1_img:
 *                 type: string
 *                 format: binary
 *               task1_text:
 *                 type: string
 *               task2_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Writing muvaffaqiyatli yangilandi
 *       404:
 *         description: Writing topilmadi
 */
router.patch("/update/:id", protect, isAdmin, upload.single("task1_img"), updateTask)

/**
 * @swagger
 * api/writing/delete/{id}:
 *   delete:
 *     summary: Writingni o'chirish
 *     tags: [Writing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Writing muvaffaqiyatli o'chirildi
 *       404:
 *         description: Ma'lumot topilmadi
 */
router.delete("/delete/:id", protect, isAdmin, deleteTask)

module.exports = router
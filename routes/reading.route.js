const router = require("express").Router()
const { getAllReadings, postReading, deleteReadingByReadingId, updateReadingById, getReadingById } = require("../controllers/reading/reading.controller")
const {isAdmin} = require("../middleware/isAdmin")
const {protect} = require("../middleware/protected")


/**
 * @swagger
 * api/reading/all:
 *   get:
 *     summary: Barcha readinglarni olish
 *     tags: [Reading]
 *     responses:
 *       200:
 *         description: Barcha readinglar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   parts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         part_name:
 *                           type: string
 *                         part_texts:
 *                           type: string
 *                         part_number:
 *                           type: integer
 *                         questions:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               question_text:
 *                                 type: string
 *                               question_type:
 *                                 type: string
 *                               options:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                     variant:
 *                                       type: string
 *                                     variant_text:
 *                                       type: string
 */
router.get("/all", protect, isAdmin, getAllReadings)

/**
 * @swagger
 * api/reading/{id}:
 *   get:
 *     summary: Readingni ID orqali olish
 *     tags: [Reading]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reading ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reading topildi
 *       404:
 *         description: Reading topilmadi
 */
router.get("/:id", protect, isAdmin, getReadingById)

/**
 * @swagger
 * api/reading/post:
 *   post:
 *     summary: Yangi reading qo'shish
 *     tags: [Reading]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - parts
 *             properties:
 *               title:
 *                 type: string
 *               parts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     part_name:
 *                       type: string
 *                     part_texts:
 *                       type: string
 *                     part_number:
 *                       type: integer
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question_text:
 *                             type: string
 *                           question_type:
 *                             type: string
 *                           answers:
 *                             type: string
 *                           question_range:
 *                             type: string
 *                           extra_data:
 *                             type: object
 *                           options:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 variant:
 *                                   type: string
 *                                 variant_text:
 *                                   type: string
 *     responses:
 *       201:
 *         description: Reading muvaffaqiyatli qo'shildi
 *       400:
 *         description: Xato request
 */
router.post("/post", protect, isAdmin, postReading)

/**
 * @swagger
 * api/reading/update/{id}:
 *   patch:
 *     summary: Readingni yangilash
 *     tags: [Reading]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reading ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               parts:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Reading muvaffaqiyatli yangilandi
 *       404:
 *         description: Reading topilmadi
 */
router.patch("/update/:id", protect, isAdmin, updateReadingById)

/**
 * @swagger
 * api/reading/delete/{id}:
 *   delete:
 *     summary: Readingni o'chirish
 *     tags: [Reading]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reading ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reading muvaffaqiyatli o'chirildi
 *       404:
 *         description: Reading topilmadi
 */
router.delete("/delete/:id", protect, isAdmin, deleteReadingByReadingId)

module.exports = router
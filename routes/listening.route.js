const { getAllListening, getOneListening, postListening, updateListening, deleteListening } = require("../controllers/listening/listening.controller")
const { isAdmin } = require("../middleware/isAdmin")
const { protect } = require("../middleware/protected")
const uploadAudio = require("../utils/audioUpload")

const router = require("express").Router()

/**
 * @swagger
 * /api/listening/all:
 *   get:
 *     summary: Barcha listeninglarni olish
 *     tags: [Listening]
 *     responses:
 *       200:
 *         description: Listeninglar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/all", protect, isAdmin, getAllListening)

/**
 * @swagger
 * /api/listening/{id}:
 *   get:
 *     summary: Barcha listeninglarni olish
 *     tags: [Listening]
 *     responses:
 *       200:
 *         description: Listeninglar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/:id", protect, isAdmin, getOneListening)

/**
 * @swagger
 * /api/listening/post:
 *   post:
 *     summary: Yangi listening yaratish
 *     tags: [Listening]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Listening test 1
 *               audioUrl:
 *                 type: string
 *                 format: binary
 *               parts:
 *                 type: string
 *                 example: '[{"part_name":"Part 1","part_number":1,"part_range":"1-5","questions":[{"question_type":"multiple_choice","question_text":{"text":"Where is the man going?"},"answers":{"correct_answer":"B"},"question_range":"1","extra_data":{},"options":[{"variant":"A","variant_text":"Library"},{"variant":"B","variant_text":"Station"},{"variant":"C","variant_text":"Market"}]}]}]'
 *     responses:
 *       201:
 *         description: Listening muvaffaqiyatli yaratildi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 *       500:
 *         description: Server xatosi
 */
router.post("/post", protect, isAdmin, uploadAudio.single("audioUrl"), postListening)

/**
 * @swagger
 * /api/listening/{id}:
 *   patch:
 *     summary: Listeningni yangilash
 *     tags: [Listening]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Listening Test
 *               audioUrl:
 *                 type: string
 *                 format: binary
 *               parts:
 *                 type: string
 *                 example: '[{"part_name":"Part 1","part_number":1,"part_range":"1-5","questions":[{"question_type":"multiple_choice","question_text":{"text":"What is the woman looking for?"},"answers":{"correct_answer":"A"},"question_range":"1","extra_data":{},"options":[{"variant":"A","variant_text":"Hotel"},{"variant":"B","variant_text":"Bank"},{"variant":"C","variant_text":"Station"}]}]}]'
 *     responses:
 *       200:
 *         description: Listening yangilandi
 *       404:
 *         description: Listening topilmadi
 *       500:
 *         description: Server xatosi
 */
router.patch("/update/:id", protect, isAdmin, uploadAudio.single("audioUrl"), updateListening)

/**
 * @swagger
 * /api/listening/{id}:
 *   delete:
 *     summary: Listeningni o‘chirish
 *     tags: [Listening]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Listening o‘chirildi
 *       404:
 *         description: Listening topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/delete/:id", protect, isAdmin, deleteListening)

module.exports = router
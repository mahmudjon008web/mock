const router = require("express").Router()
const { getAllExams, getExamById } = require("../controllers/exam.controller")
const {isAdmin} = require("../middleware/isAdmin")
const {protect} = require("../middleware/protected")

/**
 * @swagger
 * /api/exam/all:
 *   get:
 *     summary: Barcha exam (listening, reading, writing) ma'lumotlarini olish
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: Barcha exam ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listening:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       parts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             part_number:
 *                               type: integer
 *                             questions:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   question_text:
 *                                     type: string
 *                                   options:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         variant:
 *                                           type: string
 *                                         variant_text:
 *                                           type: string
 *                 reading:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       parts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             part_number:
 *                               type: integer
 *                             questions:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   question_text:
 *                                     type: string
 *                                   options:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         variant:
 *                                           type: string
 *                                         variant_text:
 *                                           type: string
 *                 writing:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       task1_img:
 *                         type: string
 *                       task1_text:
 *                         type: string
 *                       task2_text:
 *                         type: string
 *       500:
 *         description: Server xatoligi
 */
router.get("/all", protect, isAdmin, getAllExams)

/**
 * @swagger
 * /api/exam/{id}:
 *   get:
 *     summary: Bitta examni ID orqali olish (listening, reading, writing)
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Exam ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exam ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listening:
 *                   type: object
 *                   nullable: true
 *                 reading:
 *                   type: object
 *                   nullable: true
 *                 writing:
 *                   type: object
 *                   nullable: true
 *       404:
 *         description: Ma'lumot topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.get("/:id", protect, isAdmin, getExamById)

module.exports = router
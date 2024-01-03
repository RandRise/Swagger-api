const express = require("express");
const apicache = require("apicache");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");


const router = express.Router();

const cache = apicache.middleware;

//custom made middlewares

//const authenticate = require("../../middlewares/authenticate");

//const authorize = require("../../middlewares/authorize");

//router.post("/", authenticate, authorize, workoutController.createNewWorkout);

/**
 * @swagger
 * /api/v1/workouts:
 *   get:
 *     summary: Get all workouts
 *     description: Retrieve a list of all workouts.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { workouts: [...] }
 */

router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

/**
 * @swagger
 * /api/v1/workouts/{workoutId}:
 *   get:
 *     summary: Get one workout
 *     description: Retrieve details of a specific workout.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         description: ID of the workout to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { workout: { id: "...", name: "...", ... } }
 */
router.get("/:workoutId", workoutController.getOneWorkout);

/**
 * @swagger
 * /api/v1/workouts/{workoutId}/records:
 *   get:
 *     summary: Get records for a workout
 *     description: Retrieve records associated with a specific workout.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         description: ID of the workout to retrieve records for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { records: [...] }
 */
router.get("/:workoutId/records", recordController.getRecordForWorkout);

/**
 * @swagger
 * /api/v1/workouts:
 *   post:
 *     summary: Create a new workout
 *     description: Create a new workout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { name: "...", mode: "...", ... }
 *     responses:
 *       201:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             example: { workout: { id: "...", name: "...", ... } }
 */
router.post("/", workoutController.createNewWorkout);
/**
 * @swagger
 * /api/v1/workouts/{workoutId}:
 *   patch:
 *     summary: Update a workout
 *     description: Update details of a specific workout.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         description: ID of the workout to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { name: "...", mode: "...", ... }
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *         content:
 *           application/json:
 *             example: { workout: { id: "...", name: "...", ... } }
 */

router.patch("/:workoutId", workoutController.updateOneWorkout);
/**
 * @swagger
 * /api/v1/workouts/{workoutId}:
 *   delete:
 *     summary: Delete a workout
 *     description: Delete a specific workout.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         description: ID of the workout to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Workout deleted successfully
 */
router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
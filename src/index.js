const express = require('express');
const bodyParser = require("body-parser");
const apicache = require("apicache");
const cache = apicache.middleware;
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const swaggerDocs = require("./v1/swagger");


const app = express();
const PORT = process.env.PORT || 3000;


app.use("/api/v1/workouts", v1WorkoutRouter);
app.use(bodyParser.json());
app.use(cache("2 minutes"));

swaggerDocs(app, PORT);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`); 
});
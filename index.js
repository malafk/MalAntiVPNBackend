import express from 'express';
let app = new express();

import apiRouter from './routes/api.js';
import config from './config.js'

app.use('/api', apiRouter);

app.listen(config.port, () => {
    console.log("Listening on port " + config.port);
})

app.get('/', (req,res) => {
    res.json({
        success: true,
        message: "MalAntiVPN is working"
    })
})

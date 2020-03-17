const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const clinicSchedules = express();

clinicSchedules.use(cors());

mongoose.connect("mongodb://wroc:r0ch4!#@localhost:27017/Clinic_schedules", {useNewUrlParser: true})

clinicSchedules.use(bodyParser.urlencoded({extended: true}));
clinicSchedules.use(bodyParser.json());

clinicSchedules.use(routes);

clinicSchedules.get('/', (req, res) => {
    return res.json( {Status: 'Success'} )
});

clinicSchedules.listen(4200);
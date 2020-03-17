const express = require('express');
const routes = express.Router();

const atendanceRulesController = require('./controllers/attendanceRulesController');

routes.get('/atendenceRules', atendanceRulesController.store);
routes.post('/atendenceRulesRegister', atendanceRulesController.create);
routes.get('/getAtendenceRules', atendanceRulesController.showRules);
routes.get('/getAtendenceSchedules', atendanceRulesController.showSchedules);
routes.delete('/removeAtendenceRules/:id', atendanceRulesController.deleteRules);

module.exports = routes
const attendanceRulesModel = require('../models/attendanceRules');

module.exports = {
    async store(req, res) {
        res.json({Status: 'Success', Message: 'Communication with the backend carried out'})
    },

    create: function(req, res, next) {
        if(req.body.type === 'day') {
            if(req.body.day) {
                attendanceRulesModel.create(
                    req.body,
                    function(err, rules){
                        if(err){
                            next(err);
                            return res.json({Status: 'Error', Message: err});
                        }
                        else{
                            return res.json({Status: 'Success', Message: 'Attendance rules register sucess'});
                        }
                    }
                )
            }
            else {
                return res.json({Status: 'Error', Message: 'The day was not selected'});
            }
        }
        
        else if (req.body.type === 'daily') {
            attendanceRulesModel.create(
                req.body,
                function(err, rules){
                    if(err){
                        next(err);
                        return res.json({Status: 'Error', Message: err});
                    }
                    else{
                        return res.json({Status: 'Success', Message: 'Attendance rules register sucess'});
                    }
                }
            )
        }

        else if(req.body.type === 'weekly') {
            if(req.body.days) {
                attendanceRulesModel.create(
                    req.body,
                    function(err, rules){
                        if(err){
                            next(err);
                            return res.json({Status: 'Error', Message: err});
                        }
                        else{
                            return res.json({Status: 'Success', Message: 'Attendance rules register sucess'});
                        }
                    }
                )
            }
            else {
                return res.json({Status: 'Error', Message: 'Days were not selected'});
            }
        }
        
        else {
            return res.json({Status: 'Error', Message: 'Type record incorrect'})
        }
    },
    
    async deleteRules(req, res, next) {
        if(req.body.type === 'day') {
            attendanceRulesModel.findByIdAndDelete(req.params.id, function(err, response) {
                    if(err) {
                        return res.json({Status: 'Error', Message: err})
                    }
                    else if (response) {
                        return res.json({day: response.day, Status: 'Removed'})
                    }
                    else {
                        return res.json({Status: 'Error', Message: 'Operaton error!'})
                    }
                }
            )
        }
        
        else if(req.body.type === 'daily') {
            attendanceRulesModel.findByIdAndDelete(req.params.id, function(err, response) {
                    if(err) {
                        return res.json({Status: 'Error', Message: err})
                    }
                    else if (response) {
                        return res.json({daily: response.day, intervals: response.intervals, Status: 'Removed'})
                    }
                    else {
                        return res.json({Status: 'Error', Message: 'Operaton error!'})
                    }
                }
            )
        }
        
        else if(req.body.type === 'weekly') {
            attendanceRulesModel.findByIdAndDelete(req.params.id, function(err, response) {
                    if(err) {
                        return res.json({Status: 'Error', Message: err})
                    }
                    else if (response) {
                        return res.json({day: response.day, Status: 'Removed'})
                    }
                    else {
                        return res.json({Status: 'Error', Message: 'Operaton error!'})
                    }
                }
            )
        }

        else {
            return res.json({Status: 'Error', Message: 'Type incorrect'})
        }
    },

    async showRules(req, res, next) {
        if(req.body.type === 'day') {
            attendanceRulesModel.findOne(
                {
                    day: req.body.day
                }, 
                function(err, response) {
                    if(err) {
                        return res.json({Status: 'Error', Message: err})
                    }
                    else if(response) {
                        return res.json({day: response.day, intervals: response.intervals})
                    }
                    else {
                        return res.json({Status: 'Error', Message: 'There are no registered times!!'})
                    }
                }
            )
        }
        
        else if(req.body.type === 'daily') {
            attendanceRulesModel.findOne(
                {
                    type: req.body.type
                }, 
                function(err, response) {  
                    if(err) {
                        return res.json({Status: 'Error', Message: err})
                    }
                    else if(response) {
                        return res.json({ day: 'Daily in', intervals: response.intervals})
                    }
                    else {
                        return res.json({Status: 'Error', Message: 'There are no registered times!!'})
                    }
                }
            )
        }
        
        else if(req.body.type === 'weekly') {
            attendanceRulesModel.findOne(
                {
                    type: req.body.type
                }, 
                function(err, response) {  
                    if(err) {
                        return res.json({Status: 'Error', Message: err})
                    }
                    else if(response) {
                        return res.json({ Days: response.days, intervals: response.intervals})
                    }
                    else {
                        return res.json({Status: 'Error', Message: 'There are no registered times!!'})
                    }
                }
            )
        }
        
        else{
            return res.json({Status: 'Error', Message: 'Type incorrect'})
        }
    },

    async showSchedules(req, res, next) {
        attendanceRulesModel.find(
            {   
                day: {$lte: req.body.day2, $gte: req.body.day1}
            }, 
            function(err, response) {
                if(err) {
                    return res.json({Status: 'Error', Message: err})
                }
                if(response) {
                    let schedules = []
                    response.map(result => {
                        schedules.push({day: result.day, intervals: result.intervals})
                    })
                    return res.json(schedules)
                }
            }
        )
    }
}
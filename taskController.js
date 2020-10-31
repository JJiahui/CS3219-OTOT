// Import task model
Task = require('./taskModel');
// Handle index actions
exports.index = function (req, res) {
    Task.get(function (err, tasks) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks
        });
    });
};
// Handle create task actions
exports.new = function (req, res) {
    var task = new Task();
    console.log(req.body);
    task.title = req.body.title ? req.body.title : task.title;
    task.description = req.body.description;
    task.due_date = req.body.due_date;
    // save the task and check for errors
    task.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New task updated',
            data: task
        });
    });
};
// Handle view task info
exports.view = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
        res.json({
            message: 'Task details loading..',
            data: task
        });
    });
};
// Handle update task info
exports.update = function (req, res) {Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);task.name = req.body.name ? req.body.name : task.name;
        task.gender = req.body.gender;
        task.email = req.body.email;
        task.phone = req.body.phone;
        // save the task and check for errors
        task.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Task Info updated',
                data: task
            });
        });
    });
};
// Handle delete task
exports.delete = function (req, res) {
    Task.remove({
        _id: req.params.task_id
    }, function (err, task) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'Task deleted'
        });
    });
};

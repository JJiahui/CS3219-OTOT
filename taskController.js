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
    task.title = req.body.title ? req.body.title : task.title;
    task.description = req.body.description;
    task.due_date = req.body.due_date;
    // save the task and check for errors
    task.save(function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: 'New task added',
                data: task
            });
        }
    });
};
// Handle view task info
exports.view = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Task details loading..',
                data: task
            });
        }
    });
};
// Handle update task info
exports.update = function (req, res) {Task.findById(req.params.task_id, function (err, task) {
        if (err) { res.send(err); return; }
        task.title = req.body.title ? req.body.title : task.title;
        task.description = req.body.description ? req.body.description : task.description;
        task.is_done = req.body.is_done ? req.body.is_done : task.is_done;
        // save the task and check for errors
        task.save(function (err) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    message: 'Task Info updated',
                    data: task
                });
            }
        });
    });
};
// Handle delete task
exports.delete = function (req, res) {
    Task.remove({
        _id: req.params.task_id
    }, function (err, task) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    status: "success",
                    message: 'Task deleted'
                });
            }
    });
};

// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'You are accessing the api'
    });
});

// Import task controller
var taskController = require('./taskController');// Task routes
router.route('/tasks')
    .get(taskController.index)
    .post(taskController.new);
router.route('/tasks/:task_id')
    .get(taskController.view)
    .patch(taskController.update)
    .put(taskController.update)
    .delete(taskController.delete);

// Export API routes
module.exports = router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = (function () {
    function Task(_id, title, description, date, priority, userId, thematicId) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.userId = userId;
        this.thematicId = thematicId;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=taskModel.js.map
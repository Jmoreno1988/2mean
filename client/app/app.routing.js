"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var task_list_component_1 = require("./components/task-list.component");
var appRoutes = [
    { path: "", component: task_list_component_1.TaskListComponent },
    { path: "**", component: task_list_component_1.TaskListComponent }
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
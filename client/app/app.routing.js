"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("./components/login.component");
var task_list_component_1 = require("./components/task-list.component");
var appRoutes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "taskList", component: task_list_component_1.TaskListComponent },
    { path: "**", component: login_component_1.LoginComponent }
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
declare var toastr: any;

import { Component } from "@angular/core";

@Component({
    selector: "log",
    template: ""
})

export class Log {

    public static toastr: any = toastr;
    public static options: any = toastr.options;

    constructor() {}

    public static error(msg:string) {
        toastr.options.positionClass = "toast-bottom-full-width";
		toastr.options.preventDuplicates = true;
        toastr.error(msg);
    }

    public static warning(msg:string) {
        toastr.options.positionClass = "toast-bottom-full-width";
		toastr.options.preventDuplicates = true;
        toastr.warning(msg);
    }

    public static info(msg:string) {
        toastr.options.positionClass = "toast-bottom-full-width";
		toastr.options.preventDuplicates = true;
        toastr.info(msg);
    }
}
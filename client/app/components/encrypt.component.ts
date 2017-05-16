declare var CryptoJS: any;

import { Component } from "@angular/core";

@Component({
    selector: "encrypt",
    template: ""
})

export class Encrypt {

    public static generateHash(hash:string) {
        return CryptoJS.SHA3(hash).toString();
    }
}
import { Injectable } from "@angular/core"

@Injectable({
	providedIn: "root",
})
export class KeyControllerService {
	code: string = ""

	constructor() {}

	getCode() {
		return this.code
	}
	setCode(code: string) {
		this.code = this.code + code
	}
	deleteLastValue() {
		this.code = this.code.substring(0, this.code.length - 1)
	}
}

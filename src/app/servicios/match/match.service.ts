import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { PuenteDatosService } from "../comunicacio_componentes/puente-datos.service"

@Injectable({
	providedIn: "root",
})
export class MatchService {
	constructor(private http: HttpClient, private puente: PuenteDatosService) {}

	url = this.puente.geturl()

	postMatch(data: any) {
		return this.http.post(this.url + "api/match/", data)
	}
	getMatchFilter(filter: string) {
		return this.http.get(this.url + "api/matchfilter/" + filter)
	}
	getAllMatch() {
		return this.http.get(this.url + "api/match/")
	}
	getMatchFilterClientHistory(filter: string) {
		return this.http.get(this.url + "api/matchfilterhistory/" + filter)
	}
	changeDelivered(id: string, form: FormData) {
		return this.http.post(this.url + "api/match/" + id + "/award_delivered/", form)
	}
}

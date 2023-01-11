import { AwardsService } from "src/app/servicios/awards/awards.service"
import { AwardsConditionService } from "src/app/servicios/awards-condition/awards-condition.service"
import { Injectable } from "@angular/core"
import { TicketService } from "../../../../servicios/ticket/ticket.service"
import { Ticket } from "../../../../interfaces/ticket/Ticket"
import { MatchService } from "src/app/servicios/match/match.service"
import { defaultIfEmpty, lastValueFrom } from "rxjs"
import { GameDateService } from "src/app/servicios/game-date/game-date.service"
import { GameService } from "src/app/servicios/game/game.service"
import { ProbabilityService } from "src/app/servicios/probability/probability/probability.service"

@Injectable({
	providedIn: "root",
})
export class GameLogicService {
	ticket: any
	match: any = {}

	constructor(
		private ticketService: TicketService,
		private matchService: MatchService,
		private gameDataSrv: GameDateService,
		private awardConditionSrv: AwardsConditionService,
		private awardSrv: AwardsService,
		private game: GameService,

		// Added for getPrize()
		private probabilityService: ProbabilityService
	) {}

	/**
	 * valida que el ticket existe, este disponible y que el ticket
	 * pertenezaca a la fecha correcta al juego en el que debe ser usado
	 * @public
	 */
	public async verifyTicket(qrCodeDigits: string) {
		const promise = await lastValueFrom(this.ticketService.getFilter("?&state=Disponible&qr_code_digits=" + qrCodeDigits))
		if (promise.length > 0) {
			this.ticket = promise[0]
			let ticket_created
			let start_game
			let end_game

			const res: any = await lastValueFrom(this.game.getById(1))

			// let [dc, mc, yc] = this.ticket.date_created.split(' ')[0].split('/')
			// let [hc, minc, sc] = this.ticket.date_created.split(' ')[1].split(':')

			ticket_created = new Date(this.ticket.date_created_nf) //nf -> no format, represents date when ticket was created
			// parseInt(yc),
			// parseInt(mc) - 1,
			// parseInt(dc),
			// parseInt(hc),
			// parseInt(minc),
			// parseInt(sc),
			// );
			console.log(ticket_created)
			start_game = new Date(res.start_date_nf)
			end_game = new Date(res.end_date_nf)

			if (start_game <= ticket_created && end_game >= ticket_created) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}
	/**
	 * template method with all the logic to follow step by step and return the category of the
	 * award winned or string lose in case the client lose
	 * @public
	 */
	async playGame() {
		//First Check for awards who not came in the time they supouse to appear, restock them
		await this.deleteAwardConditionPast()

		//Second check if there's any award conditioned if true then the client must win
		let awards: any = this.getAwardConditionToday()
		if (awards && awards.length > 0) {
			let awardConditioned = awards[0]
			let award: any = this.winnedAward(awardConditioned)
			this.createMatch(true, true, this.ticket.id, award.id)
			this.wonAwardCondition(award.id, awardConditioned.id)
		} else {
			//Third Run the Probabilities and check if the client win or lose, and if win get the award category he won
			let result = await this.getPrize()

			//Fourth check if theres any award available in the category
		}
	}

	/**
	 * return list of condition awards suposue to be given
	 * in the current day
	 * @public
	 */
	async getAwardConditionToday() {
		let today = new Date()
		let current_day = this.gameDataSrv.DateFormat(today)
		// let current_day = '2023-01-08 11:00:00'
		let filter_today = "?is_approved=false&start_date__lte=" + current_day + "&end_date__gte=" + current_day
		let promise: any = await lastValueFrom(this.awardConditionSrv.getAwardConditionFilter(filter_today))
		return promise
	}

	/**
	 * function that returns the award that wins for a conditioned award
	 * @private
	 */
	async winnedAward(conditionedAward: any) {}

	/**
	 * call backend to minus stock of the award and awards plus 1
	 * @public
	 */
	async wonAward(id: number) {
		let formData: FormData = new FormData()
		formData.append("won_award", "true")
		await lastValueFrom(this.awardSrv.winAward(id, formData))
	}

	async wonAwardCondition(id_award: number, id_condition: number) {
		let formData: FormData = new FormData()
		formData.append("won_award", "true")
		await lastValueFrom(this.awardSrv.winAwardCondition(id_award, formData))
		let formData2: FormData = new FormData()
		formData2.append("state", "true")
		await lastValueFrom(this.awardConditionSrv.changeState(id_condition, formData2))
	}
	/**
	 * make sure the ticket was already used
	 * dont care if the client won or lose
	 * @public
	 */
	async changeStateTicket(id: number) {
		let formData: FormData = new FormData()
		formData.append("state", "true")
		await lastValueFrom(this.ticketService.changeStateTicket(id, formData))
	}
	/**
	 * void function that eliminate the condition awards in case it never came out
	 * by eliminate, the award came back as stock in the noraml awards
	 * @public
	 */

	async deleteAwardConditionPast() {
		let filter_today = "?is_approved=false"
		let promise: any = await lastValueFrom(this.awardConditionSrv.getAwardConditionFilter(filter_today))
		let today = new Date()
		for (let clave in promise) {
			let end_date = new Date(promise[clave].end_date_nf)
			if (end_date < today) {
				await lastValueFrom(this.awardConditionSrv.deleteAwardCondition(promise[clave].id))
			}
		}
	}

	/**
	 * retorna un string en caso que el usuario haya ganado, el string que devuelve es la categoria del
	 * premio que gano, en caso de perder retorna el string lose
	 * @public
	 */
	async getPrize(): Promise<string> {
		let min: number = 0
		let max: number = 100
		let rd_number = Math.floor(Math.random() * (max - min + 1)) + min
		let win_prob: number
		let result: string = "lose"

		this.probabilityService.getProbabilites().subscribe((data) => {
			win_prob = data

			if (rd_number <= win_prob) {
				// Winner
				rd_number = Math.floor(Math.random() * (max - min + 1)) + min

				if (rd_number <= 60) {
					//console.log("Common prize");
					result = "Common prize"
					return result
				} else if (rd_number <= 85) {
					//console.log("Rare prize");
					result = "Rare prize"
					return result
				} else if (rd_number <= 95) {
					//console.log("Epic prize");
					result = "Epic prize"
					return result
				} else if (rd_number <= 100) {
					//console.log("Lengendary prize");
					result = "Lengendary prize"
					return result
				} else {
					return result
				}
			} else {
				return result
			}

			// Loser
		})

		return result
	}
	/**
	 * void function who post a new match
	 * @private
	 */
	private createMatch(winMatch: boolean, awardDelivered: boolean, idTicket: string, idAward: string) {
		let body = {
			ticket: idTicket,
			award: idAward,
			win_match: winMatch,
			delivered: awardDelivered,
		}
		this.match = body
		this.matchService.postMatch(body)
	}
}

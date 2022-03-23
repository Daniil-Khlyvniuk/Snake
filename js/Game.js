export class Game {
	static rootElem = document.getElementById("root")
	static canvas = document.getElementById("game")
	static ctx = this.canvas.getContext("2d")
	static gridSize = 25

	static clearScreen() {
		this.ctx.fillStile = "black"
		this.ctx.fillRect(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		)
	}

	static setGame() {
		const gameSize = this.getGameAriaSize()

		this.rootElem.style.height = window.innerHeight + "px"
		this.rootElem.style.padding = `${ gameSize.h / 2 }px ${ gameSize.w / 2 }px`
		this.rootElem.style.height = window.innerHeight + "px"

		this.canvas.setAttribute("height", gameSize.height)
		this.canvas.setAttribute("width", gameSize.width)

		window.addEventListener("resize", this.setGame)
	}

	static getGameAriaSize() {
		let h = window.innerHeight % this.gridSize
		let w = window.innerWidth % this.gridSize

		return {
			height: (window.innerHeight - h).toString(),
			width: (window.innerWidth - w).toString(),
			h,
			w
		}
	}
}


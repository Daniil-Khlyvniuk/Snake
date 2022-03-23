import { Game } from "./Game.js"


export class Pixel {
	constructor(color, x, y) {
		this.color = color
		this.X = x
		this.Y = y
	}

	draw(x = this.X, y = this.Y) {
		Game.ctx.strokeStyle = this.color
		Game.ctx.strokeRect(x, y, Game.gridSize, Game.gridSize)
	}
}
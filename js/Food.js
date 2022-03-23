import { Game } from "./Game.js"
import { Pixel } from "./Pixel.js"


export class Food {
	constructor(snakePosition) {
		this.snakePosition = snakePosition
		this.pos = this.getFoodPosition()
	}

	getValidPosition(pos) {
		if (pos % Game.gridSize !== 0 && pos !== 0) {
			return pos - (pos % Game.gridSize)
		} else {
			return pos
		}
	}

	isPositionFree(x, y) {
		return !this.snakePosition.some((el) => {
			return el[0] === x && el[1] === y
		})
	}

	getFoodPosition() {
		const ariaSize = Game.getGameAriaSize()
		const min = 0
		const maxH = ariaSize.height
		const maxW = ariaSize.width
		const posX = Math.floor(Math.random() * (maxW - min + 1)) + min
		const posY = Math.floor(Math.random() * (maxH - min + 1)) + min

		const x = this.getValidPosition(posX)
		const y = this.getValidPosition(posY)
		const isFree = this.isPositionFree(x, y)

		return isFree ? { x, y } : this.getFoodPosition()
	}

	draw() {
		new Pixel(
			"crimson",
			this.pos.x,
			this.pos.y
		).draw()
	}
}
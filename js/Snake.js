import { Game } from "./Game.js"
import { Pixel } from "./Pixel.js"


export class Snake {
	moveSnake = this.move.bind(this)
	direction = ""
	headX = 5 * Game.gridSize
	headY = Game.canvas.width / Game.gridSize + 100
	length = 2

	constructor(bodyColor, headColor) {
		this.bodyColor = bodyColor
		this.headColor = headColor
		this.head = new Pixel(this.headColor, this.headX, this.headY)
		this.body = this.getBody()
	}

	getBody() {
		const body = []

		for (let i = 1; i <= this.length; i++) {
			body.push(
				new Pixel(
					this.bodyColor,
					this.getBodyPosition(i).x,
					this.getBodyPosition(i).y
				)
			)
		}
		return body
	}

	getSnakePosition() {
		const res = this.body.map(el => [ el.X, el.Y ])
		res.push([ this.headX, this.headY ])

		return res
	}

	grow() {
		this.length += 1
		this.body.push(new Pixel())
	}

	getBodyPosition(delta = 1) {
		return {
			x: this.headX - ((this.gridSize + 3) * delta),
			y: this.headY
		}

	}

	drawSnake(x = this.headX, y = this.headY) {
		this.head.draw(x, y)
		this.body.forEach(el => el.draw())
	}

	bodyMove() {
		this.body.pop()
		this.body.unshift(
			new Pixel(
				this.bodyColor,
				this.headX,
				this.headY
			)
		)
	}

	setDirection(newDirection) {
		this.direction = newDirection
	}

	getDirection() {
		return this.direction
	}

	setHEadPosition(x, y) {
		this.headX = x
		this.headY = y
	}


	move() {
		this.bodyMove()

		switch (this.direction) {
			case "right":
				this.setHEadPosition(
					this.headX += Game.gridSize,
					this.headY
				)
				break
			case "down":
				this.setHEadPosition(
					this.headX,
					this.headY += Game.gridSize
				)
				break
			case "left":
				this.setHEadPosition(
					this.headX -= Game.gridSize,
					this.headY
				)
				break
			case "top":
				this.setHEadPosition(
					this.headX,
					this.headY -= Game.gridSize
				)
				break
		}
		this.drawSnake()
	}
}
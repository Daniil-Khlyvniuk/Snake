import { Food } from "./Food.js"
import { Game } from "./Game.js"
import { Snake } from "./Snake.js"


export class GamePlay {
	snake = new Snake("green", "gold")
	snakePosition = this.snake.getSnakePosition()
	food = new Food(this.snakePosition)
	startGame = this.start.bind(this)
	controlSnakeMove = this.controlSnake.bind(this)


	isEaten() {
		const { x: foodX, y: foodY } = this.food.pos
		const { headX, headY } = this.snake


		if (foodX === headX && foodY === headY) {
			this.snake.grow()
			this.food = new Food(this.snake.getSnakePosition())
		}
	}

	start() {
		Game.setGame()
		Game.clearScreen()

		this.isEaten()
		this.snake.moveSnake()
		this.crossBorders()

		this.food.draw()
		this.eatTail()

		window.addEventListener(
			"keydown",
			this.controlSnakeMove,
			{ once: true }
		)

		setTimeout(() => {
			window.requestAnimationFrame(this.startGame)
		}, 100)
	}

	controlSnake(ev) {
		const currentDirection = this.snake.getDirection()

		switch (ev.key.toLowerCase()) {
			case "w":
			case "arrowup":
				if (currentDirection !== "down") {
					this.snake.setDirection("top")
				}
				break
			case "s":
			case "arrowdown":
				if (currentDirection !== "top") {
					this.snake.setDirection("down")
				}
				break
			case "d":
			case "arrowright":
				if (currentDirection !== "left") {
					this.snake.setDirection("right")
				}
				break
			case "a":
			case "arrowleft":
				if (currentDirection !== "right") {
					this.snake.setDirection("left")
				}
				break
		}
	}

	crossBorders() {
		const { headX, headY } = this.snake
		const ariaMinX = 0
		const ariaMinY = 0
		const ariaMaxX = Game.getGameAriaSize().width - Game.gridSize
		const ariaMaxY = Game.getGameAriaSize().height - Game.gridSize

		if (headX < ariaMinX) {
			this.snake.setHEadPosition(ariaMaxX, headY)
		} else if (headX > ariaMaxX) {
			this.snake.setHEadPosition(ariaMinX, headY)
		} else if (headY < ariaMinY) {
			this.snake.setHEadPosition(headX, ariaMaxY)
		} else if (headY > ariaMaxY) {
			this.snake.setHEadPosition(headX, ariaMinY)
		}
	}

	eatTail() {
		const { headX, headY } = this.snake
		const indexOfEatenBodyItem = this.snake.body.findIndex(
			el => el.X === headX && el.Y === headY
		)

		if (indexOfEatenBodyItem > 0) {
			this.snake.body.splice(indexOfEatenBodyItem)
		}
	}
}

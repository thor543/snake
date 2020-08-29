var gameInterval
var block_size = 20
var block_count = 20

var snake
var food
var score

function updateScore(newScore) {
    score = newScore
    document.getElementById('score_id').innerHTML = score

}


window.onload = onPageLoaded

function onPageLoaded() {
    document.addEventListener('keydown', handleKeyDown)



    document.getElementById('left').addEventListener('click', left)
    document.getElementById('right').addEventListener('click', right)
}
function left(event) {
    var originX = snake.direction.x
    var originY = snake.direction.y

    snake.direction.x = originY
    snake.direction.y = -originX


}
function right(event) {
    var originX = snake.direction.x
    var originY = snake.direction.y

    snake.direction.x = -originY
    snake.direction.y = originX


}




function handleKeyDown(event) {
    var originX = snake.direction.x
    var originY = snake.direction.y

    if (event.keyCode === 37) { //左
        snake.direction.x = originY
        snake.direction.y = -originX

    } else if (event.keyCode === 39) { //右
        snake.direction.x = -originY
        snake.direction.y = originX
    }

}


function gameStart() {

    snake = {
        body: [
            { x: block_count / 2, y: block_count / 2 }
        ],

        size: 5,
        direction: { x: 0, y: -1 }
    }
    putFood()
    updateScore(0)
    gameInterval = setInterval(gameRoutine, 300)

}

function updateScore(newScore) {
    score = newScore
    document.getElementById('score_id').innerHTML = score

}

function putFood() {
    food = {
        x: Math.floor(Math.random() * block_count), //floor亂數取整數
        y: Math.floor(Math.random() * block_count)
    }

    for (var i = 0; i < snake.body.length; i++) {
        if (snake.body[i].x === food.x &&
            snake.body[i].y === food.y) {
            putFood()
            break
        }

    }
}




function gameRoutine() {
    moveSnake()

    if (snakeIsDead()) {
        gg()
        return
    }

    if (snake.body[0].x === food.x &&
        snake.body[0].y === food.y) {
        eatFood()
    }

    updateCanvas()

}

function eatFood() {
    snake.size += 1
    putFood()
    updateScore(score + 1)

}


function snakeIsDead() {
    //撞牆
    if (snake.body[0].x < 0) {
        return true
    } else if (snake.body[0].x >= block_count) {
        return true
    } else if (snake.body[0].y < 0) {
        return true
    } else if (snake.body[0].y >= block_count) {
        return true
    }

    //撞身體
    for (var i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x === snake.body[i].x &&
            snake.body[0].y === snake.body[i].y) {
            return true
        }
    }
    return false
}

function gg() {
    clearInterval(gameInterval)
}

function moveSnake() {
    var newBlock = {
        x: snake.body[0].x + snake.direction.x,
        y: snake.body[0].y + snake.direction.y
    }
    snake.body.unshift(newBlock)

    while (snake.body.length > snake.size) {
        snake.body.pop()
    }
}

function updateCanvas() {

    var canvas = document.getElementById('canvas_id')
    var context = canvas.getContext('2d')

    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = 'lime'
    for (var i = 0; i < snake.body.length; i++) {
        context.fillRect(
            snake.body[i].x * block_size + 1, // 20X20座標
            snake.body[i].y * block_size + 1,
            block_size - 1,
            block_size - 1
        )
    }

    context.fillStyle = 'red'
    context.fillRect(
        food.x * block_size + 1,
        food.y * block_size + 1,
        block_size - 1,
        block_size - 1
    )




}


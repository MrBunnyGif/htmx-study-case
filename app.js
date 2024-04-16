const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const toDos = require("./data.json")


app.use(cors())


app.get('/', (req, res) => {
    const toDosRows = toDos.map(todo => `
    <tr id=${todo.id}>
        <td>${todo.userId}</td><td hx-get="http://localhost:3000/edit-title/${todo.id}" hx-trigger="click">${todo.title}</td><td><input type="checkbox" name=${todo.title} value=${todo.id} ${todo.completed ? "checked" : ""}>
        </td>
    </tr >`).join("")
    res.send(toDosRows)
})

app.get('/edit-title/:id', (req, res) => {
    console.log("🚀 ~ app.get ~ found:", toDos)
    console.log("🚀 ~ app.get ~ req:", req.params)
    const found = toDos.find(todo => todo.id == req.params.id)
    res.send(
        `
    <tr id=${found.id}>
        <td>${found.userId}</td><td> <input value=${found.title} /></td><td><input type="checkbox" name=${found.title} value=${found.id} ${found.completed ? "checked" : ""}>
        </td>
    </tr >`
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
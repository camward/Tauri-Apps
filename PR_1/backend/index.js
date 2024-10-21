const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = []; // массив для хранения заметок

// метод получения всех заметок
app.get('/todos', (req, res) => {
    res.json(todos);
});

// метод создания новой заметки
app.post('/todos', (req, res) => {
    const { id, title, content } = req.body;
    const newTodo = { id, title, content };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// метод обновления существующей заметки
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex] = { id, title, content };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ error: 'Заметка не найдена' });
    }
});

// метод удаления заметки
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
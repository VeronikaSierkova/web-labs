const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    // Перевіряємо поточне значення атрибута data-theme на body
    const isDark = document.body.getAttribute('data-theme') === 'dark';

    if (isDark) {
        // Якщо тема темна — видаляємо атрибут (повертається світла тема)
        document.body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙 Темна тема';
    } else {
        // Якщо тема світла — встановлюємо data-theme="dark"
        document.body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Світла тема';
    }
});



const ROWS = 6;
const COLS = 7;

function createBoard(rows, cols) {
    const board = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push(0); 
        }
        board.push(row);
    }
    return board;
}

const state = {
    rows: ROWS,
    cols: COLS,
    board: createBoard(ROWS, COLS), // Створена порожня дошка
    current: 1,                    // Чий хід (1 — Гравець 1, 2 — Гравець 2)
    status: "playing"              // Статус партії ("playing", "won", "draw")
};

// Перевірка в консолі браузера 
console.log("Об'єкт стану гри:", state);
console.log(`Кількість рядів у масиві: ${state.board.length} (має бути 6)`);
console.log(`Кількість колонок у масиві: ${state.board[0].length} (має бути 7)`);

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

function statusText() {
    if (state.status === "playing") {
        const colorName = state.current === 1 ? "Червоні" : "Жовті"; 
        return `Хід: Гравець ${state.current} (${colorName})`;
    }
    return "Вільних клітинок немає";
}

function render() {
    boardEl.textContent = "";
    for (let r = 0; r < state.rows; r++) {
        for (let c = 0; c < state.cols; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        const value = state.board[r][c];
                if (value === 1) {
                    cell.classList.add("player-1");
                } else if (value === 2) {
                    cell.classList.add("player-2");
                }
        cell.dataset.row = r;            // координати лишаються на самому елементі —
        cell.dataset.col = c;            // потім обробник прочитає їх звідси
        boardEl.append(cell);
        }
    }

    if (statusEl) {
        statusEl.textContent = statusText();
    }
}

render()
// 1. Об'єкт стану гри
let state = {
    size: 3,
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    current: 1, // 1 — хрестик (×), 2 — нулик (○)
    status: "playing"
};

const MARK = ["", "×", "○"];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

// Функція генерації тексту статусу
function statusText() {
    if (state.status === "playing") {
        return `Хід: Гравець ${state.current} (${MARK[state.current]})`;
    }
    return "Вільних клітинок немає";
}

// 2. Функція render — малює дошку заново з масиву стану
function render() {
    boardEl.textContent = "";

    for (let r = 0; r < state.size; r++) {
        for (let c = 0; c < state.size; c++) {
            const cell = document.createElement("button");
            cell.className = "cell";
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.textContent = MARK[state.board[r][c]];
            boardEl.append(cell);
        }
    }

    if (statusEl) {
        statusEl.textContent = statusText();
    }
}

// 3. Обробник кліку через делегування на контейнері дошки
boardEl.addEventListener("click", function (event) {
    if (state.status !== "playing") return;

    const cell = event.target.closest(".cell");
    if (!cell) return;

    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);

    // Зайнята клітинка не перезаписується
    if (state.board[r][c] !== 0) return;

    // Ставимо позначку поточного гравця
    state.board[r][c] = state.current;

    // Перехід ходу до іншого гравця
    state.current = state.current === 1 ? 2 : 1;

    // Перевірка на вільні клітинки (чи є ще нулі в масиві)
    let hasEmpty = false;
    for (let row = 0; row < state.size; row++) {
        for (let col = 0; col < state.size; col++) {
            if (state.board[row][col] === 0) hasEmpty = true;
        }
    }
    if (!hasEmpty) {
        state.status = "finished";
    }

    render();
});

// Кнопка "Нова гра"
if (resetBtn) {
    resetBtn.addEventListener("click", function () {
        state.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        state.current = 1;
        state.status = "playing";
        render();
    });
}

// Первинний запуск
render();
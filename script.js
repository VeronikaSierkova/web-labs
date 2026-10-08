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
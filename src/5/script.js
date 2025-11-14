// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    // Получение элементов DOM
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', function () {
        const productPrice = parseInt(productSelect.value, 10);
        const quantity = parseInt(quantityInput.value.trim(), 10);
        const totalCost = productPrice * quantity;
        resultDiv.textContent = `${totalCost} ₽`;
    });
});
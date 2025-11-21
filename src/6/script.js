const goodsValue = {
	smartphone: 1500,
	headphones: 800,
	tablet: 2500
};
const colorsValue = {
	black: 300,
	pink: 0
}
const warrantyValue = 100;

let selectedOption = "";
let selectedColor = "";
let checkbox = "";

function updateView() {
	const colorSelect = document.getElementById('color');
	const warranty = document.getElementById('property');

	colorSelect.style.display = (selectedOption == "headphones" ? 'block' : 'none');
	warranty.style.display = (selectedOption == "tablet" ? 'block' : 'none');
}

function updatePrice() {
	const resultDiv = document.getElementById('result');
	const quantityInput = document.getElementById('quantity');

	let totalPrice = 0;
	totalPrice += (selectedOption == "headphones" ? colorsValue[selectedColor] : 0);
	totalPrice += (selectedOption == "tablet" && checkbox ? warrantyValue : 0);

	const productPrice = goodsValue[selectedOption];
	if (productPrice != undefined) {
		const quantity = parseInt(quantityInput.value.trim(), 10);
		if (Number.isInteger(quantity) && quantity >= 0) {
			totalPrice += productPrice;
			totalPrice *= quantity;
			resultDiv.textContent = `${totalPrice} ₽`;
		} else resultDiv.textContent = "Недопустимое значение количества";
	} else resultDiv.textContent = "Недопустимый выбор товара";
}

document.addEventListener('DOMContentLoaded', function (event) {
	const productSelect = document.getElementsByName('goods');
	const inputField = document.getElementsByName('quantity');
	const colorSelect = document.getElementById('color');
	const warrantyCheck = document.getElementById('checkbox');

	selectedOption = productSelect[0].value;
	productSelect.forEach(function (radio) {
		radio.addEventListener("change", function (event) {
			selectedOption = event.target.value;
			updateView();
			updatePrice();
		})
	});

	quantity.addEventListener("change", function (event) {
		console.log("Input");
		updatePrice();
	})
	quantity.addEventListener("keydown", function (event) {
		if (event.key == "Enter") updatePrice();
	})

	selectedColor = colorSelect.value;
	colorSelect.addEventListener("change", function (event) {
		selectedColor = colorSelect.value;
		updatePrice();
	});

	checkbox = warrantyCheck.value;
	warrantyCheck.addEventListener("change", function (event) {
		checkbox = warrantyCheck.checked;
		console.log(checkbox);
		updatePrice();
	});

	updateView();
});
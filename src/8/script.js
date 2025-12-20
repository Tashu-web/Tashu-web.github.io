const STORAGE_KEY = 'feedbackFormData';
const FORM_SUBMIT_URL = 'https://api.slapform.com/gameflametest@gmail.com';
let isPopupOpen = false;

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('openFormButton').addEventListener('click', function () {
		openForm();
	});

	document.getElementById('closeFormButton').addEventListener('click', function () {
		closeForm();
	});

	document.getElementById('popupOverlay').addEventListener('click', function (e) {
		if (e.target === popupOverlay) {
			closeForm();
		}
	});

	const feedbackForm = document.getElementById('feedbackForm');
	feedbackForm.addEventListener('submit', function (e) {
		e.preventDefault();
		submitForm();
	});
	feedbackForm.addEventListener('input', function () {
		saveFormData();
	});

	loadFormData();

	if (window.location.hash === '#feedback-form') {
		openForm();
	} else {
		document.getElementById('popupOverlay').style.display = 'none';
	}
});

window.addEventListener('popstate', function (e) {
	if (isPopupOpen) {
		closeForm();
	}
});

function openForm() {
	document.getElementById('popupOverlay').style.display = 'flex';
	isPopupOpen = true;

	if (window.location.hash != '#feedback-form') {
		const currentUrl = window.location.href.split('#')[0];
		const newUrl = currentUrl + '#feedback-form';
		history.pushState({ formOpen: true }, '', newUrl);
	}
}

function closeForm() {
	document.getElementById('popupOverlay').style.display = 'none';
	isPopupOpen = false;

	if (window.location.hash === '#feedback-form') {
		history.back();
	}
}

function saveFormData() {
	const formData = {
		fullName: document.getElementById('fullName').value,
		email: document.getElementById('email').value,
		phone: document.getElementById('phone').value,
		organization: document.getElementById('organization').value,
		message: document.getElementById('message').value,
		privacyPolicy: document.getElementById('privacyPolicy').checked
	};

	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
	const savedData = localStorage.getItem(STORAGE_KEY);

	if (savedData) {
		try {
			const formData = JSON.parse(savedData);

			document.getElementById('fullName').value = formData.fullName || '';
			document.getElementById('email').value = formData.email || '';
			document.getElementById('phone').value = formData.phone || '';
			document.getElementById('organization').value = formData.organization || '';
			document.getElementById('message').value = formData.message || '';
			document.getElementById('privacyPolicy').checked = formData.privacyPolicy || false;
		} catch (e) {
			console.error('Ошибка при загрузке данных из LocalStorage:', e);
		}
	}
}

function clearFormData() {
	localStorage.removeItem(STORAGE_KEY);

	document.getElementById('fullName').value = '';
	document.getElementById('email').value = '';
	document.getElementById('phone').value = '';
	document.getElementById('organization').value = '';
	document.getElementById('message').value = '';
	document.getElementById('privacyPolicy').checked = false;
}

function submitForm() {
	const feedbackForm = document.getElementById('feedbackForm');
	if (!feedbackForm.checkValidity()) {
		feedbackForm.reportValidity();
		return;
	}

	const formData = {
		fullName: document.getElementById('fullName').value,
		email: document.getElementById('email').value,
		phone: document.getElementById('phone').value,
		organization: document.getElementById('organization').value,
		message: document.getElementById('message').value,
		privacyPolicy: document.getElementById('privacyPolicy').checked
	};

	const submitButton = document.getElementById('submitButton');
	submitButton.disabled = true;
	submitButton.innerHTML = 'Отправка...';

	const successMessage = document.getElementById('successMessage');
	const errorMessage = document.getElementById('errorMessage');
	successMessage.style.display = 'none';
	errorMessage.style.display = 'none';

	// Отправляем данные на сервер
	fetch(FORM_SUBMIT_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Ошибка сети');
			}
		})
		.then(data => {
			successMessage.style.display = 'block';
			errorMessage.style.display = 'none';

			clearFormData();
			closeForm();
		})
		.catch(error => {
			// Показываем сообщение об ошибке
			successMessage.style.display = 'none';
			errorMessage.style.display = 'block';

			console.error('Ошибка при отправке формы:', error);
		})
		.finally(() => {
			submitButton.disabled = false;
			submitButton.innerHTML = 'Отправить сообщение';
		});
}
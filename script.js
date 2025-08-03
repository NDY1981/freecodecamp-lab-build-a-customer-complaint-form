const form = document.getElementById("form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNumber = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");
const complaintsGroup = document.getElementById("complaints-group");
const damagedProduct = document.getElementById("damaged-product");
const nonConformingProduct = document.getElementById("nonconforming-product");
const delayedDispatch = document.getElementById("delayed-dispatch");
const otherComplaint = document.getElementById("other-complaint");
const complaintDescriptionContainer = document.getElementById("complaint-description");
const complaintDescription = document.getElementById("complaint-description");
const solutionsGroup = document.getElementById("solutions-group");
const refund = document.getElementById("refund");
const exchange = document.getElementById("exchange");
const otherSolution = document.getElementById("other-solution");
const solutionDescriptionContainer = document.getElementById("solution-description-container");
const solutionDescription = document.getElementById("solution-description");
const submitButton = document.getElementById("submit-btn");
const messageBox = document.getElementById("message-box");

complaintDescriptionContainer.style.display = "none";
solutionDescriptionContainer.style.display = "none";

function validateFullName() {
	if (fullName.value === "") {
		fullName.style.borderColor = "red";
		return false;
	} else {
		fullName.style.borderColor = "green";
		return true;
	}
}

function validateEmail() {
	const emailRegex = /.+@.+\.com/;
	if (emailRegex.test(email.value)) {
		email.style.borderColor = "green";
		return true;
	} else {
		email.style.borderColor = "red";
		return false;
	}
}

function validateOrderNumber() {
	const orderNumberRegex = /^2024\d{6}$/;
	if (orderNumberRegex.test(orderNumber.value)) {
		orderNumber.style.borderColor = "green";
		return true;
	} else {
		orderNumber.style.borderColor = "red";
		return false;
	}
}

function validateProductCode() {
	const productCodeRegex = /[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d/;
	if (productCodeRegex.test(productCode.value)) {
		productCode.style.borderColor = "green";
		return true;
	} else {
		productCode.style.borderColor = "red";
		return false;
	}
}

function validateQuantity() {
	if (Number(quantity.value) > 0) {
		quantity.style.borderColor = "green";
		return true;
	} else {
		quantity.style.borderColor = "red";
		return false;
	}
}

function validateComplaintsGroup() {
	if (damagedProduct.checked || nonConformingProduct.checked || delayedDispatch.checked || otherComplaint.checked) {
		complaintsGroup.style.borderColor = "green";
		return true;
	} else {
		complaintsGroup.style.borderColor = "red";
		return false;
	}
}

function validateComplaintDescription() {
	if (otherComplaint.checked) {
		if (complaintDescription.value.length >= 20) {
			complaintDescription.style.borderColor = "green";
			return true;
		} else {
			complaintDescription.style.borderColor = "red";
			return false;
		}
	} else {
		return true;
	}
}

function validateSolutionsGroup() {
	if (refund.checked || exchange.checked || otherSolution.checked) {
		solutionsGroup.style.borderColor = "green";
		return true;
	} else {
		solutionsGroup.style.borderColor = "red";
		return false;
	}
}

function otherSolutionChecked() {
	if (otherSolution.checked) {
		solutionDescriptionContainer.style.display = "block";
	} else {
		solutionDescriptionContainer.style.display = "none";
	}
}

function validateSolutionDescription() {
	if (otherSolution.checked) {
		if (solutionDescription.value.length >= 20) {
			solutionDescription.style.borderColor = "green";
			return true;
		} else {
			solutionDescription.style.borderColor = "red";
			return false;
		}
	} else {
		return true;
	}
}

fullName.addEventListener("change", validateFullName);
email.addEventListener("change", validateEmail);
orderNumber.addEventListener("change", validateOrderNumber);
productCode.addEventListener("change", validateProductCode);
quantity.addEventListener("change", validateQuantity);
damagedProduct.addEventListener("change", validateComplaintsGroup);
nonConformingProduct.addEventListener("change", validateComplaintsGroup);
delayedDispatch.addEventListener("change", validateComplaintsGroup);
otherComplaint.addEventListener("change", () => {
	if (otherComplaint.checked) {
		complaintDescriptionContainer.style.display = "block";
	} else {
		complaintDescriptionContainer.style.display = "none";
	}
	validateComplaintsGroup();
});
complaintDescription.addEventListener("change", validateComplaintDescription);
refund.addEventListener("change", () => {
	otherSolutionChecked();
	validateSolutionsGroup();
});
exchange.addEventListener("change", () => {
	otherSolutionChecked();
	validateSolutionsGroup();
});
otherSolution.addEventListener("change", () => {
	otherSolutionChecked();
	validateSolutionsGroup();
});
solutionDescription.addEventListener("change", validateSolutionDescription);

function validateForm() {
	const formObj = {};

	formObj["full-name"] = validateFullName();
	formObj["email"] = validateEmail();
	formObj["order-no"] = validateOrderNumber();
	formObj["product-code"] = validateProductCode();
	formObj["quantity"] = validateQuantity();
	formObj["complaints-group"] = validateComplaintsGroup();
	formObj["complaint-description"] = validateComplaintDescription();
	formObj["solutions-group"] = validateSolutionsGroup();
	formObj["solution-description"] = validateSolutionDescription();

	return formObj;
};

function isValid(formObj) {
	const allPropertiesTrue = Object.values(formObj).every(element => element === true);
	if (allPropertiesTrue) {
		return true;
	} else {
		return false;
	}
};

submitButton.addEventListener("click", (e) => {
	e.preventDefault();
	const isFormValid = isValid(validateForm());
	if (isFormValid) {
		form.submit();
	} else {
		messageBox.textContent = "Please fill out the form correctly and completely."
	}
});
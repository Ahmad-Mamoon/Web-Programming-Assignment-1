
function submitForm() {

    const form = document.getElementById('jobApplicationForm');
    resetValidationStyles(form);

    // Check if all required fields are entered
    const emptyFieldName = checkEmptyFields();
    if (emptyFieldName) {
        showToast(`Please fill in "${emptyFieldName}".`);
        markInvalidField(form.elements[emptyFieldName]);
        return;
    }

    if (validateForm()) {
        const formData = collectFormData();
        console.log('Submitted Data:', formData);

        document.getElementById('viewTableBtn').style.display = 'inline-block';

        showToast('Form submitted successfully!');
        // clearForm();
    }


}

function collectFormData() {
    const form = document.getElementById('jobApplicationForm');
    const formData = {};

    for (const element of form.elements) {
        if (element.type === 'checkbox') {
            formData[element.name] = element.checked ? 'Yes' : 'No';
        } else if (element.name) {
            formData[element.name] = element.value;
        }
    }

    return formData;
}


function validateForm() {
    const form = document.getElementById('jobApplicationForm');

    // resetValidationStyles(form);

    let isValid = true;

    const firstName = form.elements['firstName'].value.trim();
    if (firstName === '') {
        isValid = false;
        markInvalidField(form.elements['firstName']);
        console.log('name fail Data:');   
    }

    const email = form.elements['emailAddress'].value.trim();
    if (!isValidEmail(email)) {
        isValid = false;
        markInvalidField(form.elements['emailAddress']);
        console.log('email fail Data:');   

    }

    const phoneNumber = form.elements['phoneNumber'].value.trim();
    if (!isValidPhoneNumber(phoneNumber)) {
        isValid = false;
        markInvalidField(form.elements['phoneNumber']);
        console.log('phone fail Data:');   
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    // const phoneRegex = /^\d{11}$/;
    // return phoneRegex.test(phoneNumber);
    return phoneNumber;
}

function markInvalidField(field) {
    field.style.border = '2px solid red';
}

function resetValidationStyles(form) {
    const fields = form.elements;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].type !== 'checkbox') {
            fields[i].style.border = '';
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


function viewApplications() {
    const formData = collectFormData();
    const tableBody = document.getElementById('tableBody');

    // Append a new row for each submitted application
    const newRow = tableBody.insertRow();

    for (const key in formData) {
        const cell = newRow.insertCell();
        cell.appendChild(document.createTextNode(formData[key]));
    }

    // Display the table
    const table = document.getElementById('applicationsTable');
    table.style.display = 'table';
}


function clearForm() {
    const form = document.getElementById('jobApplicationForm');
    form.reset();
}

function checkEmptyFields() {
    const form = document.getElementById('jobApplicationForm');
    const requiredFields = form.querySelectorAll('[required]');

    for (const field of requiredFields) {
        if (field.value.trim() === '') {
            console.log('Empty field:', field.name);
            return field.name;
        }
    }

    return null;
}
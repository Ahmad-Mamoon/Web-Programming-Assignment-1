let formSubmitted = false;
function submitForm() {

    const form = document.getElementById('jobApplicationForm');
    resetValidationStyles(form);

    const emptyFieldName = checkEmptyFields();
    if (emptyFieldName) {
        showToast(`Please fill in "${emptyFieldName}".`);
        markInvalidField(form.elements[emptyFieldName]);
        return;
    }

    if (validateForm()) {

        const termsConditionsCheckbox = form.elements['termsConditions'];
        const privacyPolicyCheckbox = form.elements['privacyPolicy'];

        if (!termsConditionsCheckbox.checked || !privacyPolicyCheckbox.checked) {
            showToast('Please check the last two checkboxes before submitting.');
            return;
        }

        const formData = collectFormData();
        console.log('Submitted Data:', formData);

        document.getElementById('viewTableBtn').style.display = 'inline-block';
        formSubmitted = true;
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

    resetValidationStyles(form);

    let isValid = true;


    const nameFields = ['firstName', 'lastName' , "referenceName"];
    for (const fieldName of nameFields) {
        const fieldValue = form.elements[fieldName].value.trim();
        if (fieldValue === '') {
            isValid = false;
            markInvalidField(form.elements[fieldName]);
            showToast(`Invalid Format for "${fieldName}".`);

            console.log(`${fieldName} field is empty.`);
        }
    }

    const emailFields = ['emailAddress' , 'EmailAddress'];
    for (const fieldName of emailFields) {
        const fieldValue = form.elements[fieldName].value.trim();
        if (!isValidEmail(fieldValue)) {
            isValid = false;
            markInvalidField(form.elements[fieldName]);
            showToast(`Invalid Format for "${fieldName}".`);

            console.log(`${fieldName} field is not a valid email.`);
        }
    }

    
    const phoneFields = ['phoneNumber' , 'PhoneNumber'];
    for (const fieldName of phoneFields) {
        const fieldValue = form.elements[fieldName].value.trim();
        if (!isValidPhoneNumber(fieldValue)) {
            isValid = false;
            markInvalidField(form.elements[fieldName]);
            showToast(`Invalid Format for "${fieldName}".`);

            console.log(`${fieldName} field is not a valid phone number.`);
        }
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
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
        toast.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 2500);
}


function viewApplications() {

    if (!formSubmitted) {
        showToast('Please submit the form first.'); 
        return;
    }


    const formData = collectFormData();
    const tableBody = document.getElementById('tableBody');

    const newRow = tableBody.insertRow();

    for (const key in formData) {
        const cell = newRow.insertCell();
        cell.appendChild(document.createTextNode(formData[key]));
    }

    // Display the table
    const table = document.getElementById('applicationsTable');
    table.style.display = 'table';
    formSubmitted = false;

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
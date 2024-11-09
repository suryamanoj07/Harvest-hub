
const user_auth_token = localStorage.getItem('user_auth_token');
const authFormData = new FormData();
authFormData.append('user_auth_token', user_auth_token);

let first_name = '';
let last_name = '';
let personal_email = '';
let personal_contact_number = '';
let personal_address = '';



fetch('http://localhost:3000/api/user/get-user-profile', {
    method: 'POST',
    body: authFormData,
})
    .then(response => response.json())
    .then(data => {
        console.log(user_auth_token);
        console.log("user-details: " + data.user_details);

        const user_details = data.user_details;
        const business_info = data.business_info;

        first_name = user_details.first_name;
        last_name = user_details.last_name;
        personal_email = user_details.personal_email;
        personal_contact_number = user_details.personal_contact_number;
        personal_address = user_details.personal_address;

        business_name = business_info.business_name;
        business_email = business_info.business_email;
        business_contact_number = business_info.business_contact_number;
        business_address = business_info.business_address;
        business_account_number = business_info.business_account_number;
        business_gstin = business_info.business_gstin;
        business_about = business_info.business_about;

        document.getElementById('intro-first-name').innerHTML = first_name;
        document.getElementById('intro-last-name').innerHTML = last_name;
        document.getElementById('first_name').value = first_name;
        document.getElementById('last_name').value = last_name;
        document.getElementById('personal-email').value = personal_email;
        document.getElementById('personal-contact-number').value = personal_contact_number;
        document.getElementById('personal-address').value = personal_address;

        document.getElementById('business-name').value = business_name;
        document.getElementById('business-email').value = business_email;
        document.getElementById('business-contact-number').value = business_contact_number;
        document.getElementById('business-address').value = business_address;
        document.getElementById('business-about').value = business_about;
        document.getElementById('business-account-number').value = business_account_number;
        document.getElementById('business-gstin').value = business_gstin;


    })
    .catch((error) => {
        console.error('Error:', error);
    });


const imgElement = document.getElementById('profile-image');


fetch('http://localhost:3000/api/user/profile-image', {
    method: 'POST',
    body: authFormData,
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching profile image');
        }
        return response.blob();
    })
    .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        imgElement.src = imgUrl;
    })
    .catch(error => {
        console.error('Error fetching profile image:', error);
    });



document.getElementById('submit-button').addEventListener('click', (event) => {
    event.preventDefault();

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const personal_email = document.getElementById('personal-email').value;
    const personal_contact_number = document.getElementById('personal-contact-number').value;
    const personal_address = document.getElementById('personal-address').value;

    const business_name = document.getElementById('business-name').value;
    const business_email = document.getElementById('business-email').value;
    const business_contact_number = document.getElementById('business-contact-number').value;
    const business_address = document.getElementById('business-address').value;
    const business_about = document.getElementById('business-about').value;
    const business_account_number = document.getElementById('business-account-number').value;
    const business_gstin = document.getElementById('business-gstin').value;

    const formData = new FormData();

    formData.append('user_auth_token', user_auth_token);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('personal_email', personal_email);
    formData.append('personal_contact_number', personal_contact_number);
    formData.append('personal_address', personal_address);

    formData.append('business_name', business_name);
    formData.append('business_email', business_email);
    formData.append('business_contact_number', business_contact_number);
    formData.append('business_address', business_address);
    formData.append('business_account_number', business_account_number);
    formData.append('business_gstin', business_gstin);
    formData.append('business_about', business_about);


    fetch('http://localhost:3000/api/user/update-profile', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status == 'ok') {
                location.reload();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('dropzone-file').addEventListener('change', function (event) {
    var fileInput = event.target;
    var label = fileInput.parentElement;
    var fileInfo = label.querySelector('#file-info');
    var fileName = fileInput.files[0].name;
    var fileNameElement = fileInfo.querySelector('#file-name');
    var removeButton = fileInfo.querySelector('#remove-button');
    var uploadpara = fileInfo.querySelector('#upload-para');

    fileNameElement.textContent = fileName;
    uploadpara.classList.add('hidden');
    fileNameElement.classList.remove('hidden');
    removeButton.classList.remove('hidden');

});

document.getElementById('remove-button').addEventListener('click', function () {
    var fileInput = document.getElementById('dropzone-file');
    var label = fileInput.parentElement;
    var fileInfo = label.querySelector('#file-info');
    var fileNameElement = fileInfo.querySelector('#file-name');
    var removeButton = fileInfo.querySelector('#remove-button');
    var uploadpara = fileInfo.querySelector('#upload-para');

    fileInput.value = ''; // Clear the file input
    fileNameElement.textContent = ''; // Clear the file name display
    uploadpara.classList.remove('hidden'); // reveal the upload
    fileNameElement.classList.add('hidden'); // Hide the file name display
    removeButton.classList.add('hidden'); // Hide the remove button

});


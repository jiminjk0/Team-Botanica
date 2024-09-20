
// contact.js

// Event listener for contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;

    // Send contact info to a server or save to localStorage
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({ name, email, phone, message });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    alert('Thank you for contacting us!');
    document.getElementById('contact-form').reset();
});

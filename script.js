document.querySelector('.container').addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        const selectedRadio = e.target;
        const nextContainerId = selectedRadio.getAttribute('data-next');
        let currentContainer = selectedRadio.closest('.content-container'); // Get the current container

        // Hide all subsequent containers
        let nextElement = currentContainer.nextElementSibling;
        while (nextElement) {
            if (!nextElement.classList.contains("fixed")) {
                nextElement.style.display = 'none';
                nextElement.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
            }
            nextElement = nextElement.nextElementSibling;
        }

        // Show the desired container
        document.getElementById(nextContainerId).style.display = 'block';

        updateProgressText();
        updatePhoneContainerState();
        scrollToBottom();
    }
});


function updatePhoneContainerState() {
    const preExistingAccount = document.querySelector('input[name="investment-option"][value="nej"]').checked;
    const lysaCreatedAccount = document.querySelector('#lysa-account-yes').checked;
    const optiCreatedAccount = document.querySelector('#opti-account-yes').checked;

    if (preExistingAccount || lysaCreatedAccount || optiCreatedAccount) {
        document.getElementById("phone-container").style.display = "block";
        document.querySelector(".finish-button").style.display = "block";
    } else {
        document.getElementById("phone-container").style.display = "none";
        document.querySelector(".finish-button").style.display = "none";
    }
}

function updateProgressText() {
    let visibleRadioButtons = document.querySelectorAll('.content-container:not([style*="display: none"])' + ' input[type="radio"]');
    let progressText = document.querySelector('.progress-text');
    let selectedCount = Math.ceil(visibleRadioButtons.length / 2);
    const phoneContainerDisplayed = document.getElementById("phone-container").style.display !== "none";
    if(phoneContainerDisplayed) {
        selectedCount = 4;
    }
    progressText.textContent = "Del " + selectedCount + " av 4";
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
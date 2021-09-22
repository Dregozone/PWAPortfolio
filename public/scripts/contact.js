function handleForm(form) {
    alert("Form submission disabled!");

    return false;
}

function resetForm() {

    // Reset select
    document.getElementById("reason").options.selectedIndex = 0;

    // Reset radio buttons
    document.getElementById("titleMr").checked = false;
    document.getElementById("titleMrs").checked = false;
    document.getElementById("titleOther").checked = false;

    // Reset text fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

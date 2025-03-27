
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("close-btn")[0];

    if (btn) {
        btn.onclick = function() {
            modal.style.display = modal.style.display === "block" ? "none" : "block";
        };
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        };
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

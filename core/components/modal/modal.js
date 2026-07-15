document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal-container").forEach((el) =>
        el.addEventListener("click", (e) => {
            if (e.target.classList.contains("close-btn")) {
                e.currentTarget.remove();
            }
        }),
    );
});

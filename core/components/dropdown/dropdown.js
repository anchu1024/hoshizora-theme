document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const toggle = e.target.closest(".dropdown-toggle");
        const item = e.target.closest(".dropdown-item");

        // 1. toggle がクリックされた場合
        if (toggle) {
            const dropdown = toggle.closest(".dropdown");

            // 他の dropdown を全部閉じる
            document.querySelectorAll(".dropdown.open").forEach((d) => {
                if (d !== dropdown) d.classList.remove("open");
            });

            // 自分を開閉
            dropdown.classList.toggle("open");
            return;
        }

        // 2. item がクリックされた場合
        if (item) {
            const dropdown = item.closest(".dropdown");
            const content = dropdown.querySelector(".dropdown-toggle .content");

            content.textContent = item.textContent;
            dropdown.classList.remove("open");
            return;
        }

        // 3. それ以外 → 全 dropdown を閉じる
        document.querySelectorAll(".dropdown.open").forEach((d) => {
            d.classList.remove("open");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const toggle = e.target.closest(".dropdown-toggle");
        const item = e.target.closest(".dropdown-item");

        // 1. toggle がクリックされた場合
        if (toggle) {
            const dropdown = toggle.closest(".dropdown");

            // 他の dropdown を全部閉じる
            document.querySelectorAll(".dropdown.open").forEach((d) => {
                if (d !== dropdown) {
                    d.classList.remove("open");
                    d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
                }
            });

            // 自分を開閉
            const isOpen = dropdown.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            return;
        }

        // 2. item がクリックされた場合
        if (item) {
            const dropdown = item.closest(".dropdown");
            const content = dropdown.querySelector(".dropdown-toggle .content");

            content.textContent = item.textContent;

            // aria-selected を更新
            dropdown.querySelectorAll(".dropdown-item").forEach((i) => {
                i.setAttribute("aria-selected", i === item ? "true" : "false");
            });

            dropdown.classList.remove("open");
            dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
            return;
        }

        // 3. それ以外 → 全 dropdown を閉じる
        document.querySelectorAll(".dropdown.open").forEach((d) => {
            d.classList.remove("open");
            d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
        });
    });
});

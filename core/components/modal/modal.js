const modal = {
    defaults: {
        title: "",
        content: "",
        className: "",
        containerClassName: "",
        attrs: {},
        containerAttrs: {},
        closeLabel: "Close",
        hideCloseButton: false,
        closeOnBackdrop: true,
    },

    open(content, options = {}) {
        const config = this.normalizeOptions(content, options);
        const container = document.createElement("div");
        const containerClassNames = ["modal-container", config.containerClassName].filter(Boolean);
        container.className = containerClassNames.join(" ");

        Object.entries(config.containerAttrs || {}).forEach(([name, value]) => {
            if (value === false || value == null) return;
            container.setAttribute(name, value === true ? "" : String(value));
        });

        const modalEl = document.createElement("div");
        const modalClassNames = ["modal", config.className].filter(Boolean);
        modalEl.className = modalClassNames.join(" ");
        modalEl.setAttribute("role", "dialog");
        modalEl.setAttribute("aria-modal", "true");
        if (config.title) {
            modalEl.setAttribute("aria-label", config.title);
        }

        Object.entries(config.attrs || {}).forEach(([name, value]) => {
            if (value === false || value == null) return;
            modalEl.setAttribute(name, value === true ? "" : String(value));
        });

        const header = document.createElement("div");
        header.className = "header";

        const titleEl = document.createElement("span");
        titleEl.className = "title";
        titleEl.id = "modal-title";
        titleEl.textContent = config.title;

        header.appendChild(titleEl);

        if (!config.hideCloseButton) {
            const closeBtn = document.createElement("button");
            closeBtn.className = "close-btn";
            closeBtn.type = "button";
            closeBtn.setAttribute("aria-label", config.closeLabel);
            closeBtn.addEventListener("click", () => this.close(container));
            header.appendChild(closeBtn);
        }

        const body = document.createElement("div");
        body.className = "content";

        if (config.content instanceof Node) {
            body.appendChild(config.content);
        } else {
            body.textContent = String(config.content ?? "");
        }

        modalEl.appendChild(header);
        modalEl.appendChild(body);
        this.appendDecorations(modalEl);

        container.appendChild(modalEl);
        container.addEventListener("click", (event) => {
            if (config.closeOnBackdrop && event.target === container) {
                this.close(container);
            }
        });

        document.body.appendChild(container);
        return container;
    },

    normalizeOptions(content, options) {
        if (content && typeof content === "object" && !(content instanceof Node) && !Array.isArray(content)) {
            return { ...this.defaults, ...content, ...options };
        }

        return { ...this.defaults, ...options, content };
    },

    appendDecorations(modalEl) {
        ["top", "left", "bottom", "right"].forEach((position) => {
            const span = document.createElement("span");
            span.className = `border-${position}`;
            modalEl.appendChild(span);
        });
    },

    close(target) {
        target?.remove();
    },
};

window.hoshizora = window.hoshizora || {};
window.hoshizora.modal = modal;

function initModals() {
    document.querySelectorAll(".modal-container").forEach((container) => {
        container.querySelector(".close-btn")?.addEventListener("click", () => modal.close(container));
        container.addEventListener("click", (event) => {
            if (event.target === container) {
                modal.close(container);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initModals);

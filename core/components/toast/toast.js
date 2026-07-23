const toast = {
    stack: [],
    defaults: {
        variant: "info",
        className: "",
        attrs: {},
        duration: 4000,
        pauseOnHover: true,
    },

    info(content, options = {}) {
        return this.create(content, { ...options, variant: "info" });
    },

    warn(content, options = {}) {
        return this.create(content, { ...options, variant: "warn" });
    },

    error(content, options = {}) {
        return this.create(content, { ...options, variant: "danger" });
    },

    success(content, options = {}) {
        return this.create(content, { ...options, variant: "success" });
    },

    create(content, options = {}) {
        const config = { ...this.defaults, ...options };
        const el = document.createElement("div");
        const classNames = ["toast", config.variant];

        if (config.className) {
            classNames.push(config.className);
        }

        el.className = classNames.join(" ");

        Object.entries(config.attrs || {}).forEach(([name, value]) => {
            if (value === false || value == null) return;
            el.setAttribute(name, value === true ? "" : String(value));
        });

        const body = document.createElement("div");
        body.className = "content";

        if (content instanceof Node) {
            body.appendChild(content);
        } else {
            body.textContent = String(content ?? "");
        }

        el.appendChild(body);
        this.appendDecorations(el);

        document.body.appendChild(el);
        this.stack.unshift(el);
        this.updatePositions();

        el.offsetHeight;
        el.style.left = "10px";
        el.style.opacity = 1;

        let timer = window.setTimeout(() => {
            this.remove(el);
        }, config.duration);

        if (config.pauseOnHover) {
            el.addEventListener("mouseenter", () => {
                window.clearTimeout(timer);
            });

            el.addEventListener("mouseleave", () => {
                timer = window.setTimeout(() => {
                    this.remove(el);
                }, 2000);
            });
        }

        if (this.stack.length > 5) {
            this.remove(this.stack[this.stack.length - 1]);
        }

        return el;
    },

    appendDecorations(el) {
        ["top", "left", "bottom", "right"].forEach((position) => {
            const span = document.createElement("span");
            span.className = `border-${position}`;
            el.appendChild(span);
        });
    },

    updatePositions() {
        let bottom = 20;
        this.stack.forEach((el) => {
            el.style.bottom = `${bottom}px`;
            bottom += el.offsetHeight + 20;
        });
    },

    remove(el) {
        const idx = this.stack.indexOf(el);
        if (idx !== -1) {
            this.stack.splice(idx, 1);
        }

        el.style.left = "-100px";
        el.style.opacity = 0;
        window.setTimeout(() => {
            el.remove();
        }, 200);
    },
};

window.hoshizora = window.hoshizora || {};
window.hoshizora.toast = toast;

const toast = {
    stack: [],

    info(ctx) {
        return this.create(ctx, "info");
    },

    warn(ctx) {
        return this.create(ctx, "warn");
    },

    error(ctx) {
        return this.create(ctx, "danger");
    },

    success(ctx) {
        return this.create(ctx, "success");
    },

    create(ctx, cls) {
        const html = `
        <div class="toast ${cls}">
            <div class="content">${ctx}</div>
            <span class="border-top"></span>
            <span class="border-left"></span>
            <span class="border-bottom"></span>
            <span class="border-right"></span>
        </div>
        `;

        const tmp = document.createElement("template");
        tmp.innerHTML = html.trim();
        const el = tmp.content.firstElementChild;

        document.body.appendChild(el);

        this.stack.unshift(el);

        this.updatePositions();

        el.offsetHeight;

        el.style.left = "10px";
        el.style.opacity = 1;

        let timer = setTimeout(() => {
            this.remove(el);
        }, 4000);

        el.addEventListener("mouseenter", () => {
            clearTimeout(timer);
        });

        el.addEventListener("mouseleave", () => {
            timer = setTimeout(() => {
                this.remove(el);
            }, 2000);
        });

        if (this.stack.length > 5) {
            this.remove(this.stack[this.stack.length - 1]);
        }
        return el;
    },

    updatePositions() {
        let bottom = 20;
        this.stack.forEach((el) => {
            el.style.bottom = bottom + "px";
            bottom += el.offsetHeight + 20;
        });
    },

    remove(el) {
        const idx = this.stack.indexOf(el);
        if (idx != -1) this.stack.splice(idx, 1);
        el.style.left = "-100px";
        el.style.opacity = 0;
        setTimeout(() => {
            el.remove();
        }, 200);
    },
};

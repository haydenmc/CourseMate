var Component = (function () {
    function Component(app) {
        // We start hidden...
        this._isHidden = true;

        // Make sure we're associated with an application instance...
        if (app != null) {
            this._app = app;
        } else {
            this._app = App.instance; // Default instance if undefined
        }

        // Set default parent if none is set ...
        if (typeof this._parentElement === 'undefined') {
            this._parentElement = document.body;
        }

        // Get the component ID, grab the HTML
        this._baseElement = document.getElementById("component_" + this.componentId).cloneNode(true);
        this._baseElement.classList.remove("COMPONENT");
        this._baseElement.id = '';
    }
    Object.defineProperty(Component.prototype, "Application", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Component.prototype, "baseElement", {
        get: function () {
            return this._baseElement;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Component.prototype, "parentElement", {
        get: function () {
            return this._parentElement;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Component.prototype, "isHidden", {
        get: function () {
            return this._isHidden;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Component.prototype, "Title", {
        get: function () {
            if (typeof this._title !== 'undefined') {
                return this._title;
            }
            return "component";
        },
        enumerable: true,
        configurable: true
    });

    Component.prototype.show = function () {
        if (!this.isHidden) {
            return;
        }
        this._isHidden = false;
        this._baseElement = this.parentElement.appendChild(this._baseElement);
        Animator.animate(this, "in");
    };

    Component.prototype.hide = function () {
        var _this = this;
        if (this.isHidden) {
            return;
        }
        this._isHidden = true;
        Animator.animate(this, "out").then(function () {
            _this._baseElement = _this.parentElement.removeChild(_this._baseElement);
        });
    };
    return Component;
})();
//# sourceMappingURL=Component.js.map

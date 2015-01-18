var Util = (function () {
    function Util() {
    }
    Util.escapeStringHtml = function (str) {
        var tagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };
        return str.replace(/[&<>]/g, function (tag) {
            return tagsToReplace[tag] || tag;
        });
    };
    Object.defineProperty(Util, "whichTransitionEvent", {
        get: function () {
            if (typeof Util._transitionEvent !== 'undefined') {
                return Util._transitionEvent;
            }
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    Util._transitionEvent = transitions[t];
                    return transitions[t];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Util, "whichAnimationEvent", {
        get: function () {
            if (typeof Util._animationEvent !== 'undefined') {
                return Util._animationEvent;
            }
            var t;
            var el = document.createElement('fakeelement');
            var animations = {
                "animation": "animationend",
                "OAnimation": "oAnimationEnd",
                "MozAnimation": "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            };
            for (t in animations) {
                if (el.style[t] !== undefined) {
                    Util._transitionEvent = animations[t];
                    return animations[t];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return Util;
})();
//# sourceMappingURL=Util.js.map
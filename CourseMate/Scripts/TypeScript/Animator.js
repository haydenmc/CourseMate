/**
* This class is used to trigger animations on components.
*/
var Animator = (function () {
    function Animator() {
    }
    /**
    * Used to trigger animation events on a component.
    * event_name: a string that determines which animations are triggered.
    * Returns a promise that is resolved when all animations have completed.
    */
    Animator.animate = function (component, event_name) {
        return new Promise(function (resolve, reject) {
            var componentElement = component.baseElement;
            var animatedElements = componentElement.getElementsByClassName("animated");
            var attr = "data-animate-" + event_name;

            // Is the component container itself animated?
            var animatedElementCount = 0;
            var animatedElementsCompleted = 0;
            if (typeof componentElement.attributes[attr] !== 'undefined') {
                animatedElementCount++;
                Animator.animateElement(componentElement, componentElement.attributes[attr].value).then(function () {
                    animatedElementsCompleted++;
                    if (animatedElementsCompleted == animatedElementCount) {
                        resolve();
                    }
                });
            }
            for (var i = 0; i < animatedElements.length; i++) {
                var el = animatedElements.item(i);
                if (typeof el.attributes[attr] !== 'undefined') {
                    animatedElementCount++;
                    Animator.animateElement(el, el.attributes[attr].value).then(function () {
                        animatedElementsCompleted++;
                        if (animatedElementsCompleted == animatedElementCount) {
                            resolve();
                        }
                    });
                }
            }
        });
    };

    /**
    * Runs an animation on a specified element, returning a Promise that is
    * fulfilled upon animation completion.
    */
    Animator.animateElement = function (element, animationName) {
        return new Promise(function (resolve, reject) {
            element.classList.add(animationName);
            element.addEventListener("animationend", function () {
                resolve();
            });
        });
    };
    return Animator;
})();
//# sourceMappingURL=Animator.js.map

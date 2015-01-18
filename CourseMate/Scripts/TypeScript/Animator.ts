/**
 * This class is used to trigger animations on components.
 */
class Animator {
	/**
	 * Used to trigger animation events on a component.
	 * event_name: a string that determines which animations are triggered.
	 * Returns a promise that is resolved when all animations have completed.
	 */
	public static animate(component: Component, event_name: string): Promise<any> {
		return new Promise((resolve: () => void, reject: () => void) => {
			var componentElement = component.baseElement;
			var animatedElements = componentElement.getElementsByClassName("animated");
			var attr: string = "data-animate-" + event_name;

			// Is the component container itself animated?
			var animatedElementCount = 0;
			var animatedElementsCompleted = 0;
			if (typeof componentElement.attributes[attr] !== 'undefined') {
				animatedElementCount++;
				Animator.animateElement(componentElement, componentElement.attributes[attr].value).then(() => {
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
					Animator.animateElement(<HTMLElement>el, el.attributes[attr].value).then(() => {
						animatedElementsCompleted++;
						if (animatedElementsCompleted == animatedElementCount) {
							resolve();
						}
					});
				}
			}
		});
	}

	/**
	 * Runs an animation on a specified element, returning a Promise that is
	 * fulfilled upon animation completion.
	 */
	public static animateElement(element: HTMLElement, animationName: string): Promise<any> {
		return new Promise((resolve: () => void, reject: () => void) => {
			// Strip all other animations
			for (var i = element.classList.length - 1; i >= 0; i--) {
				if (element.classList[i].indexOf("anim-") == 0) {
					element.classList.remove(element.classList[i]);
				}
			}
			element.classList.add(animationName);
			element.addEventListener(Util.whichAnimationEvent,() => {
				resolve();
			});
		});
	}
}  
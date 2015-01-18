class Util {
	public static escapeStringHtml(str: string): string {
		var tagsToReplace = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;'
		};
		return str.replace(/[&<>]/g, function (tag) {
			return tagsToReplace[tag] || tag;
		});
	}

	private static _transitionEvent: string;
	public static get whichTransitionEvent(): string {
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
		}

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				Util._transitionEvent = transitions[t];
				return transitions[t];
			}
		}
	}

	private static _animationEvent: string;
	public static get whichAnimationEvent(): string {
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
		}

		for (t in animations) {
			if (el.style[t] !== undefined) {
				Util._transitionEvent = animations[t];
				return animations[t];
			}
		}
	}
}
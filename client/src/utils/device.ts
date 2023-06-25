// export function isMobile(): boolean {
// 	const ua: string = window.navigator.userAgent;
// 	return /Android|iPhone|iPod|iPad|IEMobile|Opera Mini/i.test(ua) && !/Tablet/i.test(ua);
// }

export function isMobile(): boolean {
	if (typeof window === 'undefined') {
		return false; // Server-side rendering, not mobile
	}

	const ua: string = window.navigator.userAgent;
	return /Android|iPhone|iPod|iPad|IEMobile|Opera Mini/i.test(ua) && !/Tablet/i.test(ua);
}

export function isTouchDevice(): boolean {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isIE(): boolean {
	const ua = window.navigator.userAgent;
	return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}

export function isSafari(): boolean {
	const ua = window.navigator.userAgent;
	return ua.indexOf('Safari/') > -1 && ua.indexOf('Chrome/') === -1;
}

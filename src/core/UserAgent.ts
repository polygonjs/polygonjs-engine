export class CoreUserAgent {
	// user agent on linux with chrome
	// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
	// user agent on linux with firefox
	// "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0"
	static isChrome(): boolean {
		return navigator && navigator.userAgent != null && navigator.userAgent.indexOf('Chrome') != -1;
	}
	static isMobile(): boolean {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	static isiOS(): boolean {
		return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	}
	static isAndroid(): boolean {
		return /(Android)/g.test(navigator.userAgent);
	}
	static isTouchDevice(): boolean {
		// https://stackoverflow.com/questions/6262584/how-to-determine-if-the-client-is-a-touch-device
		var el = document.createElement('div');
		el.setAttribute('ongesturestart', 'return;'); // or try "ontouchstart"
		return typeof (el as any).ongesturestart === 'function';
	}
}

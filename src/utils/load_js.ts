export function loadScript(src: string, callback: () => void): void {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
        //@ts-ignore
    } else if (script.attachEvent) {
        //@ts-ignore
        script.attachEvent('onreadystatechange', function () {
            //@ts-ignore
            var target = window.event.srcElement;
            //@ts-ignore
            if (target.readyState == 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}
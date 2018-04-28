// ==UserScript==
// @name         {{name}}
// @namespace    https://github.com/Notuom
// @version      {{version}}
// @license      {{license}}
// @description  {{description}}
// @author       {{author}}
// @match        https://www.netflix.com/viewingactivity
// @grant        GM_registerMenuCommand
// ==/UserScript==

{{script}}

(function() {
    "use strict";
    GM_registerMenuCommand('Start', netflix_activity_extract__run);
    GM_registerMenuCommand('Stop', netflix_activity_extract__stop);
})();

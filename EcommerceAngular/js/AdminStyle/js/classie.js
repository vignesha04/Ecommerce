!function(t){"use strict";function i(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function e(t,i){var e=s(t,i)?o:n;e(t,i)}var s,n,o;"classList"in document.documentElement?(s=function(t,i){return t.classList.contains(i)},n=function(t,i){t.classList.add(i)},o=function(t,i){t.classList.remove(i)}):(s=function(t,e){return i(e).test(t.className)},n=function(t,i){s(t,i)||(t.className=t.className+" "+i)},o=function(t,e){t.className=t.className.replace(i(e)," ")}),t.classie={hasClass:s,addClass:n,removeClass:o,toggleClass:e,has:s,add:n,remove:o,toggle:e}}(window);
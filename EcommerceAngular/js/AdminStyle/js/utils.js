"use strict";window.chartColors={red:"rgb(255, 99, 132)",orange:"rgb(255, 159, 64)",yellow:"rgb(255, 205, 86)",green:"rgb(75, 192, 192)",blue:"rgb(54, 162, 235)",purple:"rgb(153, 102, 255)",grey:"rgb(201, 203, 207)"},function(t){var e=["January","February","March","April","May","June","July","August","September","October","November","December"],i=["#4dc9f6","#f67019","#f53794","#537bc4","#acc236","#166a8f","#00a950","#58595b","#8549ba"],n=t.Samples||(t.Samples={}),o=t.Color;n.utils={srand:function(t){this._seed=t},rand:function(t,e){var i=this._seed;return t=void 0===t?0:t,e=void 0===e?1:e,this._seed=(9301*i+49297)%233280,t+this._seed/233280*(e-t)},numbers:function(t){var e,i,n=t||{},o=n.min||0,a=n.max||1,s=n.from||[],r=n.count||8,l=n.decimals||8,h=n.continuity||1,c=Math.pow(10,l)||0,u=[];for(e=0;r>e;++e)i=(s[e]||0)+this.rand(o,a),this.rand()<=h?u.push(Math.round(c*i)/c):u.push(null);return u},labels:function(t){var e,i=t||{},n=i.min||0,o=i.max||100,a=i.count||8,s=(o-n)/a,r=i.decimals||8,l=Math.pow(10,r)||0,h=i.prefix||"",c=[];for(e=n;o>e;e+=s)c.push(h+Math.round(l*e)/l);return c},months:function(t){var i,n,o=t||{},a=o.count||12,s=o.section,r=[];for(i=0;a>i;++i)n=e[Math.ceil(i)%12],r.push(n.substring(0,s));return r},color:function(t){return i[t%i.length]},transparentize:function(t,e){var i=void 0===e?.5:1-e;return o(t).alpha(i).rgbString()}},window.randomScalingFactor=function(){return Math.round(n.utils.rand(-100,100))},n.utils.srand(Date.now()),document.location.hostname.match(/^(www\.)?chartjs\.org$/)&&(!function(t,e,i,n,o,a,s){t.GoogleAnalyticsObject=o,t[o]=t[o]||function(){(t[o].q=t[o].q||[]).push(arguments)},t[o].l=1*new Date,a=e.createElement(i),s=e.getElementsByTagName(i)[0],a.async=1,a.src=n,s.parentNode.insertBefore(a,s)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-28909194-3","auto"),ga("send","pageview"))}(this);
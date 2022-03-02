// ==UserScript==
// @name         AWS Console Colored Menu Bar
// @description  Sets the AWS Console menu bar based on which AWS region is selected.
// @author       Michael Stathers
// @match        https://console.aws.amazon.com/*
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// @version      1.0
// ==/UserScript==

(function() {
    'use strict';

    // HSL saturation and luminosity of the background color
    var s = 100, l = 25;

    function stringToHsl(str) {
        var hash = str.length;

        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)+5)*(char*i)+3;
            hash = hash & hash
        }
//        console.log(hash);
        var h = Math.abs(hash) % 360;
//        console.log(h);

        return 'hsl('+h+', '+s+'%, '+l+'%)';
    }

    var regionElems = document.querySelectorAll('[data-testid=awsc-nav-regions-menu-button]');
    if (regionElems.length == 1) {
        var region = regionElems[0].innerText;
        var newBgColor = stringToHsl(region);
        var navSelector = '#awsc-nav-header';
        var menuBarElems = document.querySelectorAll(navSelector);
        for (var i = 0; i < menuBarElems.length; i++) {
//            menuBarElems[i].style.backgroundColor = newBgColor;
            for (var j = 0; j < menuBarElems[i].children.length; j++) {
                menuBarElems[i].children[j].style.backgroundColor = newBgColor;
            }
        }
    }
})();
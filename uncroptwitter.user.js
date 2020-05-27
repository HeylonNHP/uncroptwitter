// ==UserScript==
// @name         Twitter uncrop
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/home
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function processImages() {
        var paddedTweetImageElements = document.getElementsByClassName("r-1adg3ll r-13qz1uu");

        var elementsString = "";

        alert(paddedTweetImageElements.length);

        for(var i =0; i < paddedTweetImageElements.length; ++i){
            var element = paddedTweetImageElements[i];
            elementsString = elementsString + element + "<--\n";
            //alert("hi" + i);
            element.style.paddingBottom = '100%';

            var w = element.clientWidth;
            var h = element.clientHeight;

            var maxDimension = -1;
            if(w>h){maxDimension = w;}else if(h>w){maxDimension = h;}else {maxDimension = w;}
            //alert(maxDimension + "w " + w + "h " + h);

            //part 2
            var imageContainingElement = element.parentElement;
            var layer1 = imageContainingElement.getElementsByTagName("div")[1];
            var layer2 = layer1.firstChild;

            if(layer2 == null){
                continue;
            }

            var bgImageElement = layer2.firstChild;
            var imageElement = layer2.lastChild;

            var setSize = "n";

            var scaleFactorW = element.clientWidth/imageElement.naturalWidth;
            var scaleFactorH = element.clientHeight/imageElement.naturalHeight;
            var scaleFactor = 0;

            if(scaleFactorW<scaleFactorH){
                scaleFactor = scaleFactorW;
            }else{
                scaleFactor = scaleFactorH;
            }

            bgImageElement.style.backgroundSize = (imageElement.naturalWidth*scaleFactor) + 'px ' +
                    (imageElement.naturalHeight*scaleFactor) + 'px';

            alert(imageElement.naturalWidth + " " + imageElement.naturalHeight + "\n" +
                element.clientWidth + " " + element.clientHeight + "\n" + setSize);

            //bgImageElement.style.backgroundSize = maxDimension + 'px';

            layer2.style.marginTop = '0%';
            layer2.style.marginBottom = '0%';
            layer2.style.marginLeft = '0%';
            layer2.style.marginRight = '0%';


            //alert("done");
        }
        alert(elementsString);
    }

    // Your code here...
    setInterval(processImages,1000);
})();
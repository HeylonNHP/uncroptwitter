// ==UserScript==
// @name         Twitter uncrop
// @namespace    http://tampermonkey.net/
// @version      0.2.1
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
                //multi image
                alert("trying multi-image");
                var bgImageContainers = element.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-61z16t r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");

                for(var j = 0; j<bgImageContainers.length;++j){
                    var bgImageContainer = bgImageContainers[j];

                    //Remove padding so image is centred
                    bgImageContainer.style.marginTop = '0%';
                    bgImageContainer.style.marginBottom = '0%';
                    bgImageContainer.style.marginLeft = '0%';
                    bgImageContainer.style.marginRight = '0%';

                    //Get width/height of container (requires sourcing the parent element)
                    var bgImageContainerParent = bgImageContainer.parentElement;
                    var containerW = bgImageContainerParent.clientWidth;
                    var containerH = bgImageContainerParent.clientHeight;

                    //Get image div and its dimensions
                    var imageDiv = bgImageContainer.firstChild;
                    var imageW = imageDiv.naturalWidth;
                    var imageH = imageDiv.naturalHeight;

                    //Generate scaling factors for either
                    //Fitting the image by its width
                    //Or fitting the image by its height
                    //Within the container
                    var scaleFactorW = containerW/imageW;
                    var scaleFactorH = containerH/imageH;

                    //Find which scaling factor to use to scale the image
                    var scaleFactor = -1;

                    if(scaleFactorW<scaleFactorH){
                        scaleFactor = scaleFactorW;
                    }else {
                        scaleFactor = scaleFactorH;
                    }

                    //Scale the image
                    imageDiv.style.backgroundSize = (imageW*scaleFactor) + 'px ' +
                        (imageH*scaleFactor) + 'px';
                }
                alert("multi-image done");

            }else {
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

                /*alert(imageElement.naturalWidth + " " + imageElement.naturalHeight + "\n" +
                    element.clientWidth + " " + element.clientHeight + "\n" + setSize);*/

                layer2.style.marginTop = '0%';
                layer2.style.marginBottom = '0%';
                layer2.style.marginLeft = '0%';
                layer2.style.marginRight = '0%';


                //alert("done");
            }
        }
        alert(elementsString);
    }

    // Your code here...
    setInterval(processImages,1000);
})();
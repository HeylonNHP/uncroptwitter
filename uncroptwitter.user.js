// ==UserScript==
// @name         Twitter uncrop
// @namespace    http://tampermonkey.net/
// @version      0.3.4
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/home
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function processBgImageContainers(bgImageContainers) {
        //alert(bgImageContainers.length + " BG");

        for(var j = 0; j<bgImageContainers.length;++j){
            var bgImageContainer = bgImageContainers[j];

            //Increase the image container size
            var paddedContainer = bgImageContainer;

            try{
                while (paddedContainer.firstChild.style.paddingBottom != '56.25%'){
                    if (null == paddedContainer.parentElement){
                        break;
                    }else {
                        paddedContainer = paddedContainer.parentElement;
                    }
                }
                paddedContainer.firstChild.style.paddingBottom = '100%';
            }catch (e) {

            }

            /*alert("MI - " + bgImageContainer.innerHTML +
                "\n mTop" + bgImageContainer.style.marginTop +
                "\n mLeft" + bgImageContainer.style.marginLeft +
                "\n mBottom" + bgImageContainer.style.marginBottom);*/

            //Remove padding so image is centred
            bgImageContainer.style.marginTop = '0%';
            bgImageContainer.style.marginBottom = '0%';
            bgImageContainer.style.marginLeft = '0%';
            bgImageContainer.style.marginRight = '0%';
            bgImageContainer.style.margin = '0px';

            //Get width/height of container (requires sourcing the parent element)
            var bgImageContainerParent = bgImageContainer.parentElement;
            var containerW = bgImageContainerParent.offsetWidth;
            var containerH = bgImageContainerParent.offsetHeight;

            //Get image div and its dimensions
            var imageDiv = bgImageContainer.firstChild;
            var imageDiv2 = bgImageContainer.lastChild;
            var imageW = imageDiv2.naturalWidth;
            var imageH = imageDiv2.naturalHeight;

            imageDiv.style.backgroundSize = "50px";
            /*alert("img " + containerW + " " + containerH + "\n"+
                imageW + " " + imageH + "\n" +
                bgImageContainerParent.innerHTML);*/

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

            //Aesthetics
            //Set the container height to the image height
            alert(imageDiv.clientHeight + " " + bgImageContainer.clientHeight + "\n"
            + paddedContainer.firstChild.style.paddingBottom);
            if(imageDiv.clientHeight<bgImageContainer.clientHeight){
                var scaleFactorContainer = (imageH/imageW);
                paddedContainer.firstChild.style.paddingBottom = scaleFactorContainer + '%';
            }
        }
        //alert("multi-image done");
    }

    function processImages() {

        //add any background image container class signatures here
        var bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-11wrixw r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-61z16t r-1mnahxq r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-61z16t r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        return;
    }

    // Your code here...
    alert("starting twitter uncrop");
    setInterval(processImages,1000);
})();
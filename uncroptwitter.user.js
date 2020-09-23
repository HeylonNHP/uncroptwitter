// ==UserScript==
// @name         Twitter uncrop
// @namespace    http://tampermonkey.net/
// @version      0.4.2.1
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function processBgImageContainers(bgImageContainers) {

        for(var j = 0; j<bgImageContainers.length;++j){
            var bgImageContainer = bgImageContainers[j];

            //Increase the image container size
            let newSize = 100;
            let paddedContainer = bgImageContainer;
            try{
                while (paddedContainer.firstChild.style.paddingBottom != '56.25%'){
                    if (null == paddedContainer.parentElement){
                        break;
                    }else {
                        paddedContainer = paddedContainer.parentElement;
                    }
                }
                paddedContainer.firstChild.style.paddingBottom = newSize + '%';
            }catch (e) {

            }

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

            paddedContainer = bgImageContainer;
            try{
                //Must re-find the padded container for the second time
                //Because for some reason if i don't, accessing the paddedContainer
                //variable returns an undefined exception
                //But only sometimes
                //Why? I don't know, JavaScript is retarded.
                while (paddedContainer.firstChild.style.paddingBottom != newSize + '%'){
                    if (null == paddedContainer.parentElement){
                        break;
                    }else {
                        paddedContainer = paddedContainer.parentElement;
                    }
                }


                var scaleFactorContainer = ((bgImageContainer.clientWidth/imageW)*imageH)/bgImageContainer.clientHeight;
                paddedContainer.firstChild.style.paddingBottom = (scaleFactorContainer*100) + '%';
            }catch (e) {
                console.log("error with: " + imageDiv.style.backgroundImage + " error message: " + e.message);
            }
        }
    }

    function processImages() {

        //add any background image container class signatures here
        var bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-11wrixw r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-61z16t r-1mnahxq r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-61z16t r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        //Background image container signature for images on user profiles
        bgImageContainers = document.getElementsByClassName("css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-11wrixw r-61z16t r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010");
        processBgImageContainers(bgImageContainers);

        return;
    }

    // Your code here...
    //alert("starting twitter uncrop");
    setInterval(processImages,1000);
})();
<html>
<head>
</head>
<body>
<img src="images/1.jpg" alt="rotating image" width="600" height="500" id="rotator">

<script type="text/javascript">
(function() {
var rotator = document.getElementById('rotator'), //get the element
   var delayInSeconds = 1,                           //delay in seconds
   var num = 0,                                      //start number
   var len = 9999;                                      //limit
setInterval(function(){                           //interval changer
    num = (num === len) ? 0 : num;                //reset if limit reached
    rotator.src = num + '.jpg';                     //change picture
    num++;                                        //increment counter
}, delayInSeconds * 1000);
}());-
</script>
</body>
</html>


var imlocation = "images/";
 var currentdate = 0;
 var image_number = 0;
 function ImageArray (n) {
   this.length = n;
   for (var i =1; i <= n; i++) {
     this[i] = ' ';
   }
 }
 var image = new ImageArray(2);
 var image[0] = 'beerbottle.png';
 var image[1] = 'paper.png';
 //image[2] = 'image3.gif'
 var rand = 60/image.length;
 function randomimage() {
 	currentdate = new Date();
 	image_number = currentdate.getSeconds();
 	image_number = Math.floor(image_number/rand);
 	return(image[image_number]);
 }
 document.write("<img src='" + imlocation + randomimage()+ "'>");


//var trashReady = false;
/*var trash = ["images/beerbottle.png", "images/paper.png"];
trash.onload = function () {
var num = Math.floor(Math.random() * trash.length);
//};
 document.canvas.src = trash[num];
	//trashReady = true;
};*/

var randtrash = trashArray[Math.floor(Math.random()*2)];
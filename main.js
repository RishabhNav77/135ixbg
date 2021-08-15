status = "";
objects = [];

function preload(){
 song = loadSound("chicken_wing.mp3")
}

function setup() {
    canvas = createCanvas(330,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    object_detector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("babydetectedornot").innerHTML = "Status : Detecting Objects";

}

function draw() {
    image(video,0,0,330,380);
   
            if(status != "") {
                object_detector.detect(video,GotResult);
                r = random(255);
                g = random(255);
                b = random(255);
                for(i = 0; i < objects.length; i++) {
                    document.getElementById("babydetectedornot").innerHTML = "Baby Detected";
                    document.getElementById("numberofobjectsdetected").innerHTML = "Number of objects detected are" + objects.length;
                    fill(r,g,b);
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
                    noFill()
                    stroke(r,g,b);
                    rect(objects[i].x , objects[i].y , objects[i].height , objects[i].width);
                    if(objects[i].label != "person") {
                        document.getElementById("babydetectedornot").innerHTML = "Baby Not Detected";
                        song.play()
                    }

                    else{
                    song.stop();
                    console.log("stop");
                    
                    }

                }
            }
           
            else{
                document.getElementById("babydetectedornot").innerHTML = "Baby Not Detected";
                song.play();
            }

        if(objects.length < 0 ) {
            document.getElementById("babydetectedornot").innerHTML = "Baby Not Detected";
            song.play();
        }
            
        

        
    }

function modelloaded() {
    console.log("Model is loaded");
    status = true;
}    

function GotResult(error,results) {
    if(error) {
        console.error(error);

       
    }

    else{
        console.log(results);
        objects = results;

        
    }
}
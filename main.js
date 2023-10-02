
var left_wrist_x=0;
var right_wrist_x=0;

var left_wrist_y=0;
var right_wrist_y=0;

score_left_wrist=0;

song="";

function preload(){
    song=loadSound("music.mp3");
}


function setup(){
    canvas=createCanvas(600,500);
    canvas.center();


    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("poses",gotPoses);


}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(score_left_wrist>0.2){
    circle(left_wrist_x,left_wrist_y,20);
    number_left_y=Number(left_wrist_y);
    number_left_wrist_y=floor(number_left_y);
    volume=number_left_wrist_y/500;
    document.getElementById("volume_id").innerHTML="VOLUME ="+volume;
    song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("THE POSENET IS INTIALIZED");
}

function gotPoses(results){
    console.log("Got poses is working")
    if(results.length>0){
        console.log(results);
        left_wrist_x=results[0].pose.leftWrist.x;
        right_wrist_x=results[0].pose.rightWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
         right_wrist_y=results[0].pose.rightWrist.y;

         score_left_wrist=results[0].pose.keypoints[9].score;
         console.log("LEFT WRIST SCORE = "+score_left_wrist);

         console.log(" Left Wrist X : "+left_wrist_x+" , Left Wrist Y : "+left_wrist_y);
         console.log(" Right Wrist X : "+right_wrist_x+" , Right Wrist Y : "+right_wrist_y);
    }



}
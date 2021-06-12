nose_x = 0;
nose_y = 0;
left_eye_x = 0;
left_eye_y = 0;

function preload() {

   Mustache_img = loadImage("https://i.postimg.cc/fTVnGWrX/Mustache-img.png");

   Cowboy_Hat_img = loadImage("https://i.postimg.cc/CMD6kZXc/Cowboy-Hat.png");
   
}
function setup() {
    canvas = createCanvas(350, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350, 300);
    video.hide();
    tint_color = "";
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is loaded");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        left_eye_x = results[0].pose.leftEye.x;
        left_eye_y = results[0].pose.leftEye.y;
        console.log("left Eye x = " + left_eye_x);
        console.log("Left Eye y = " + left_eye_y);

        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("nose x = " + nose_x);
        console.log("nose y = " + nose_y);
    }
}

function draw() {
    image(video, 0, 0, 350, 300);
    tint(tint_color);
    
    image(Mustache_img, nose_x - 45, nose_y - 16, 90, 75);

    image(Cowboy_Hat_img, left_eye_x - 125, left_eye_y - 150, 200, 120);

}

function take_snapshot() {
    save("myFilterImage.png");
}

function filter_tint() {
    tint_color = document.getElementById("color_name").value;
}
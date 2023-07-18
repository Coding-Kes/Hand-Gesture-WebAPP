
prediction_1 = ""

Webcam.set({
    height:300,
    width:350,
    image_format:"png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5.version: ', ml5.version);

classifer =
ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_3H7m0wLg//model.json",modelLoaded);

function modelLoaded()
{
    console.log("modelLoaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " +prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

 function predict_gesture()
 {
    img = document.getElementById('captured_image');
    classifer.classify(img, gotResult);
 }

 function gotResult(error, results)
 {
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);

        document.getElementById("result_gesture_name1").innerHTML = results[0].label;

        prediction_1 = results[0].label;

        speak();

        if(results[0].label == "Nice")
        {
            document.getElementById("update_gesture").innerHTML = "&#128522;";
        }
        if(results[0].label == "Peace")
        {
            document.getElementById("update_gesture").innerHTML = "&#128528;";
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128532;";
        }
    }
 }



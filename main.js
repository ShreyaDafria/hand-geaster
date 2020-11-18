var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

Webcam.set({
    width:345,
    height:258,
    ImageFormat: 'jpeg' ,
    jpeg_quality: '90' 

});

camera = document.getElementById("camera");

Webcam.attach(' #camera ');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="capture_image" src="'+data_uri+'"> ';
    });
}
console.log('ml5 version',ml5.version );

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NSdZNC_S2/model.json', modelLoaded );

function modelLoaded()
{
    console.log('Model Loaded !');
}

function check()
{
    img = document.getElementById("capture_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results)
{
    if(error)
    {
        console.error(error);
    }

    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        if(results[0].label == "best" ){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
            speechSynthesis.speak(new SpeechSynthesisUtterance("All The Best or i say best of luck"));
        }


        if(results[0].label == "Victory" ){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            speechSynthesis.speak(new SpeechSynthesisUtterance("That was the marvelous victory"));
        }



        if(results[0].label == "amazing" ){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
            speechSynthesis.speak(new SpeechSynthesisUtterance("This is looking amazing"));
        }
    }
}
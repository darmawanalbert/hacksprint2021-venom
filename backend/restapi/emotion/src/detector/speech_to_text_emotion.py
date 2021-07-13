import azure.cognitiveservices.speech as speechsdk
import paralleldots
from django.conf import settings

def create_speech_recognizer(speech_file):
    """
    
    Return the speech recognizer object based on key and region
    
    """
    speech_config = speechsdk.SpeechConfig(settings.KEY_COG, settings.REGION_COG)
    audio_input = speechsdk.AudioConfig(filename=speech_file)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)
    return speech_recognizer

def get_text_from_speech(speech_file):
    """
    
    Get the text from speech using azure API
    
    """
    speech_recognizer = create_speech_recognizer(settings.KEY_COG, settings.REGION_COG,speech_file)
    result = speech_recognizer.recognize_once_async().get()
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        return result.text
    elif result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized: {}".format(result.no_match_details))
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))
            
def analyze_text(text):
    """
    
    Analyze the emotion of a text using paralleldots, e.g:
        data = get_text_from_speech("test.wav")
        analyze_text(data)
    return: dictionary of a probability value {Excited, Bored, Fear, Sad, Angry, Happy}

    """
    paralleldots.set_api_key(settings.KEY_PARALLELDOTS)
    paralleldots.get_api_key()
    emotions = paralleldots.emotion(text)["emotion"]
    return emotions

def map_to_standard_emotion(probability):
    """
        Map the speech to text to 4 standarized emotion and return them as dictionary
    """
    standard_result = {"anger": 0, "fear":0, "happiness":0, "sadness":0}
    standard_result["sadness"] = probability["Sad"] + probability["Bored"]
    standard_result["anger"] = probability["Angry"] 
    standard_result["fear"] = probability["Fear"]
    standard_result["happiness"] = probability["Happy"] + probability["Excited"]
    return standard_result
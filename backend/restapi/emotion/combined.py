from src.detector.speech import SpeechEmotionDetection
from src.detector.util import convert_normalize, convert_base64_to_file

SPEECH_MODEL = "model/classifier.pickle"


def get_emotion(base_image,base_sound):
    temp_sound_file = "data/processed/sound_file.m4a" # dangerous
    convert_base64_to_file(base_sound,temp_sound_file)
    temp_converted_file = "data/processed/converted.wav"
    convert_normalize(temp_sound_file,temp_converted_file)
    sed = SpeechEmotionDetection(SPEECH_MODEL, predict_proba=True)
    prediction_sound = sed.predict(temp_converted_file)
    return max(prediction_sound, key=prediction_sound.get)
from src.detector.speech import SpeechEmotionDetection
from src.detector.util import convert_normalize, convert_base64_to_file, resize_image
from src.detector.face import extract_emotion

SPEECH_MODEL = "model/classifier.pickle"


def get_emotion(base_image,base_sound, platform='android'):
    #speech
    temp_sound_file = "data/processed/sound_file.m4a" # dangerous
    convert_base64_to_file(base_sound,temp_sound_file)
    temp_converted_file = "data/processed/converted.wav"
    convert_normalize(temp_sound_file,temp_converted_file)
    sed = SpeechEmotionDetection(SPEECH_MODEL, predict_proba=True)
    prediction_sound = sed.predict(temp_converted_file)
    prediction_sound = sed.map_to_standard_emotion(prediction_sound)
    # images
    temp_image_file = "data/processed/image_file.jpeg"
    convert_base64_to_file(base_image,temp_image_file)
    resize_image(temp_image_file)
    prediction_image = extract_emotion(temp_image_file)
    return prediction_sound
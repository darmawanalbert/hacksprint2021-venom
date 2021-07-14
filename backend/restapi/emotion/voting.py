import restapi.emotion.src.detector.speech_to_text_emotion as stte
import collections, functools, operator
import os
from scipy.stats import entropy
from restapi.emotion.src.detector.speech import SpeechEmotionDetection
from restapi.emotion.src.detector.util import convert_normalize, convert_base64_to_file, resize_image
from restapi.emotion.src.detector.face import extract_emotion, map_to_standard_emotion
from pathlib import Path

PATH = str(Path(__file__).parent.resolve())

SPEECH_MODEL = PATH + "/model/classifier.pickle"

def get_emotion(base_image,base_sound,platform="android",id="temp", cleanup=False):

    temp_sound_file = PATH + f"/data/processed/{id}" # dangerous
    temp_converted_file = PATH + f"/data/processed/{id}.wav"
    temp_image_file = PATH + f"/data/processed/{id}.jpeg"

    if platform == "ios":
        temp_sound_file += ".caf"
    else:
        temp_sound_file += ".m4a"
        
    #speech
    convert_base64_to_file(base_sound,temp_sound_file)
    convert_normalize(temp_sound_file,temp_converted_file)
    sed = SpeechEmotionDetection(SPEECH_MODEL, predict_proba=True)
    prediction_sound = sed.predict(temp_converted_file)
    prediction_sound = sed.map_to_standard_emotion(prediction_sound)
    
    text = stte.get_text_from_speech(temp_converted_file)
    prediction_text = stte.analyze_text(text)
    prediction_text = stte.map_to_standard_emotion(prediction_text)

    # images
    convert_base64_to_file(base_image,temp_image_file)
    resize_image(temp_image_file)
    prediction_image = extract_emotion(temp_image_file)
    prediction_image = map_to_standard_emotion(prediction_image)
    
    print(prediction_sound,prediction_image, prediction_text)

    #cleanup
    if cleanup:
        os.remove(temp_sound_file)
        os.remove(temp_converted_file)
        os.remove(temp_image_file)

    return mood_aggregation(prediction_image,prediction_sound, prediction_text)

def mood_voting(face_mood, tone_mood, text_mood):
    MOOD_MODEL = [face_mood, tone_mood, text_mood]
    mood_entropy = []

    # Adding entropy for each model
    mood_entropy.append(entropy(list(face_mood.values())))
    mood_entropy.append(entropy(list(tone_mood.values())))
    mood_entropy.append(entropy(list(text_mood.values())))

    # Return model with lowest entropy
    best_model = MOOD_MODEL[mood_entropy.index(min(mood_entropy))]
    mood_result = max(best_model, key=best_model.get)

    return mood_result

def mood_aggregation(face_mood, tone_mood, text_mood):
    MOOD_MODEL = [face_mood, tone_mood, text_mood]

    result = dict(functools.reduce(operator.add,map(collections.Counter, MOOD_MODEL)))

    output = dict(zip(result, map(lambda x: x/3, result.values())))
    mood_result = max(output, key=output.get)
    
    #print(output)
    return mood_result
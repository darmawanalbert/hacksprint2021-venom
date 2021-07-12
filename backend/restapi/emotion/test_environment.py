import sys
from src.detector.speech import SpeechEmotionDetection
from src.detector.util import convert_to_wav,convert_normalize

REQUIRED_PYTHON = "python3"


def main():
    system_major = sys.version_info.major
    if REQUIRED_PYTHON == "python":
        required_major = 2
    elif REQUIRED_PYTHON == "python3":
        required_major = 3
    else:
        raise ValueError("Unrecognized python interpreter: {}".format(
            REQUIRED_PYTHON))

    if system_major != required_major:
        raise TypeError(
            "This project requires Python {}. Found: Python {}".format(
                required_major, sys.version))
    else:
        print(">>> Development environment passes all tests!")

def test_speech():
    data_loc = "data/raw/test.wav"
    classifier_loc = "model/classifier.pickle"
    sed = SpeechEmotionDetection(classifier_loc, predict_proba=True)
    prediction = sed.predict(data_loc)
    assert prediction == {'angry': 0.92, 'fear': 0.02, 'happy': 0.06, 'sad': 0.0}

def test_speech_with_raw_files():
    data_loc = "data/raw/angry.aac"
    output = "data/processed/converted.wav"
    convert_normalize(data_loc,output)
    classifier_loc = "model/classifier.pickle"
    sed = SpeechEmotionDetection(classifier_loc, predict_proba=True)
    prediction = sed.predict(output)
    #print(prediction)
    assert prediction == {'angry': 0.5, 'fear': 0.2, 'happy': 0.28, 'sad': 0.02}

if __name__ == '__main__':
    test_speech_with_raw_files()
    test_speech()
    main()

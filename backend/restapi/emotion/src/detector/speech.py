import pickle
import soundfile
import numpy as np
import librosa

class SpeechEmotionDetection:

    def __init__(self, model_path, **kwargs):
        self.model_path = model_path
        self.proba = kwargs.get("predict_proba", True)

        try:
            self.classifier = pickle.load(open(model_path, "rb"))
        except (OSError, IOError) as e:
            print(e)

    def extract_feature(self, file_name):
        """
        Extract feature from audio file `file_name`
            e.g:
            `features = extract_feature("test.wav")`
        """
        with soundfile.SoundFile(file_name) as sound_file:
            X = sound_file.read(dtype="float32")
            sample_rate = sound_file.samplerate
            stft = np.abs(librosa.stft(X))
            result = np.array([])
            mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
            chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T,axis=0)
            mel = np.mean(librosa.feature.melspectrogram(X, sr=sample_rate).T,axis=0)
            result = np.hstack((result, mfccs, chroma, mel))
        return result

    def predict(self, file_name):
        """
        Predict a wav file `file_name`
        """
        feature = self.extract_feature(file_name).reshape(1, -1)
        if self.proba:
            proba = self.classifier.predict_proba(feature)[0]
            result = {}
            for emotion, prob in zip(self.classifier.classes_, proba):
                result[emotion] = prob
            return result
        else:
            self.classifier.predict(feature)[0]
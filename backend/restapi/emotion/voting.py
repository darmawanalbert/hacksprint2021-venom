# Venom Hacksprint 2021
from scipy.stats import entropy

face_mood_preds = {'happy': 0.8, 'sad': 0.1, 'angry': 0.05, 'fear': 0.05}
tone_mood_preds = {'happy': 0.3, 'sad': 0.2, 'angry': 0.3, 'fear': 0.2}
text_mood_preds = {'happy': 0.75, 'sad': 0.2, 'angry': 0.02, 'fear': 0.03}
music_pref = 'pop'
movie_pref = 'fantasy'

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
# Venom Hacksprint 2021
from scipy.stats import entropy

face_mood_preds = {'happy': 0.8, 'sad': 0.1, 'angry': 0.05, 'fear': 0.05}
tone_mood_preds = {'happy': 0.3, 'sad': 0.2, 'angry': 0.3, 'fear': 0.2}
text_mood_preds = {'happy': 0.75, 'sad': 0.2, 'angry': 0.02, 'fear': 0.03}
music_pref = 'pop'
movie_pref = 'fantasy'

print(face_mood_preds.keys())

def mood_voting(face_mood, tone_mood, text_mood):
    mood_key = face_mood.keys()

    # Adding entropy for each mood
    mood_list.append(entropy([face_mood['happy'], tone_mood['happy'], text_mood['happy']]))
    mood_list.append(entropy([face_mood['sad'], tone_mood['sad'], text_mood['sad']]))
    mood_list.append(entropy([face_mood['angry'], tone_mood['angry'], text_mood['angry']]))
    mood_list.append(entropy([face_mood['fear'], tone_mood['fear'], text_mood['fear']]))

    return
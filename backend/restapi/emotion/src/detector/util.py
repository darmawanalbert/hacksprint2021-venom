import os
import subprocess
import base64
from pydub import AudioSegment, effects
from scipy.signal.filter_design import normalize  


TARGET_LOUDNESS = -30 #db

def convert_to_wav(file_name, output_name, remove=False):
    subprocess.call(['ffmpeg', '-i', file_name,'-ac','1','-ar','16000','-y',output_name],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    # os.system(f"ffmpeg -i {file_name} -ac 1 -ar 16000 {output_name} -y") #pretty hackish
    # os.system(f"ffmpeg -i {audio_path} -ac 1 {target_path}")
    if remove:
        os.remove(file_name)

def match_target_amplitude(sound, target_dBFS):
    change_in_dBFS = target_dBFS - sound.dBFS
    return sound.apply_gain(change_in_dBFS)


def convert_normalize(file_name, output_name, remove=False):
    _,ext = os.path.splitext(file_name)
    raw = AudioSegment.from_file(file_name, ext[1:])  
    #change_in_dBFS = TARGET_LOUDNESS - raw.dBFS
    #normalized = raw.apply_gain(change_in_dBFS)
    normalized = effects.normalize(raw)
    normalized = normalized.set_channels(1)
    normalized = normalized.set_frame_rate(16000)
    normalized.export(output_name, format="wav")

def convert_base64_to_file(base_string, filename):
    with open(filename, "wb") as fh:
        fh.write(base64.decodebytes(base_string))
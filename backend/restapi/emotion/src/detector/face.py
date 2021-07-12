from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials

# key and endpoint
KEY = '72dafe0b8d69431e8e8457c9443cecf9'
ENDPOINT = 'https://hack-sprint-faceapi.cognitiveservices.azure.com/' 

def create_face_detection_client(key_api,endpoint_api):
    """
    return the face client object based on the key and endpoint
    """
    return FaceClient(endpoint_api, CognitiveServicesCredentials(key_api))

def get_image(image_path):
    """
    get image stream from the image_path
    """
    image_stream = open(image_path,"rb")
    return image_stream

def extract_emotion(image_path):
    """
    Extract emotion features from the image path
        e.g:
        emotion_feature = extract_emotion("image.jpg")
    """
    attributes = ['emotion']
    face_client = create_face_detection_client(KEY,ENDPOINT)
    detected_faces = face_client.face.detect_with_stream(image=get_image(image_path), return_face_attributes=attributes)
    for face_result in detected_faces:
        emotion_result = face_result.face_attributes.as_dict()
    return emotion_result['emotion']


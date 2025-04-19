from flask import Flask, request, jsonify
from flask_cors import CORS
import random
app = Flask(__name__)
CORS(app)
@app.route('/fact-check', methods=['POST'])
def fact_check():
    data = request.get_json()
    text = data.get('text', '')    
    confidence_score = random.randint(0, 100)
    citations = [
        "MIT reserach paper (2025)",
        "Expert analysis by Dr. Jon Doe (2025)",
        "Peer-reviewed journal article (2025)",
        "Harvard University study (2025)",
        "Official government statistics (2025)"
    ]  
    random.shuffle(citations)
    return jsonify({
        'confidence_score': confidence_score,
        'citations': citations[:random.randint(2, 3)]  
    })
if __name__ == '__main__':
    app.run(debug=True)
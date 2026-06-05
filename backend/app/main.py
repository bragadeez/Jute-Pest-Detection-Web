import os
import shutil
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .predictor import JutePestPredictor

app = FastAPI(
    title="Jute Pest Detection API",
    description="API for detecting pests on jute plants using a VGG19 model and explaining outputs with LIME.",
    version="1.0.0"
)

# Enable CORS for frontend Vite application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; configure properly for production deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resolve model path dynamically relative to the backend base folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "best_model_VGG_92.h5")

# Initialize the predictor
predictor = JutePestPredictor(MODEL_PATH)

@app.on_event("startup")
def startup_event():
    """Load model on startup to cache it and avoid latency on first request."""
    try:
        predictor.load()
        print(f"Success: Model loaded from {MODEL_PATH}")
    except Exception as e:
        print(f"Warning: Could not pre-load model on startup: {e}")

@app.post("/api/predict")
async def predict_pest(file: UploadFile = File(...)):
    """
    Accepts an uploaded image of a jute plant, runs VGG19 model inference,
    computes LIME superpixel boundaries, and returns results.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")
    
    try:
        # Create a temporary file to save the uploaded image
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_path = temp_file.name

        try:
            # Perform prediction using predictor
            pest_name, confidence = predictor.predict(temp_path)
            
            # Generate LIME explanation (Base64 data URL)
            explanation_b64 = predictor.explain(temp_path)
            
            return {
                "pest": pest_name,
                "confidence": confidence,
                "explanation": explanation_b64,
                "status": "success"
            }
        finally:
            # Ensure the temp file is deleted
            if os.path.exists(temp_path):
                os.remove(temp_path)

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/api/health")
def health_check():
    """Verify backend and model status."""
    return {"status": "ok", "model_loaded": predictor.model is not None}

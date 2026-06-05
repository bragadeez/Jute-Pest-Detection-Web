import os
import numpy as np
import io
import base64
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.applications.vgg19 import preprocess_input
from tensorflow.keras.models import load_model
from PIL import Image

class JutePestPredictor:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None
        self.ref = {
            0: 'Beet Armyworm',
            1: 'Black Hairy',
            2: 'Cutworm',
            3: 'Field Cricket',
            4: 'Jute Aphid',
            5: 'Jute Hairy',
            6: 'Jute Leafhopper',
            7: 'Jute Red Mite',
            8: 'Jute Semilooper',
            9: 'Jute Stem Girdler',
            10: 'Jute Stem Weevil',
            11: 'Leaf Beetle',
            12: 'Mealybug',
            13: 'Pod Borer',
            14: 'Scopula Emissaria',
            15: 'Termite',
            16: 'Termite odontotermes (Rambur)',
            17: 'Yellow Mite'
        }

    def load(self):
        """Load the VGG19 Keras model if it is not already loaded."""
        if self.model is None:
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model file not found at {self.model_path}")
            self.model = load_model(self.model_path)

    def predict(self, image_path: str):
        """
        Run inference on the provided image path and return predicted class and confidence.
        """
        self.load()
        
        # Load and resize image to the target size expected by the model (256x256)
        img = load_img(image_path, target_size=(256, 256))
        img_array = img_to_array(img)
        img_preprocessed = preprocess_input(img_array.copy())
        img_expanded = np.expand_dims(img_preprocessed, axis=0)
        
        # Run prediction
        predictions = self.model.predict(img_expanded)
        pred_class_idx = int(np.argmax(predictions))
        confidence = float(np.max(predictions) * 100)
        
        pest_name = self.ref.get(pred_class_idx, "Unknown Pest")
        return pest_name, confidence

    def explain(self, image_path: str) -> str:
        """
        Runs LIME (Local Interpretable Model-agnostic Explanations) on the image path
        using the exact parameters from the paper:
        - num_samples = 1000
        - positive_only = False
        - num_features = 12
        - hide_rest = False
        Returns a base64 encoded string of the explanation image with a green mask overlay.
        """
        self.load()
        
        # Lazy imports to avoid startup delays
        from lime import lime_image
        from skimage.segmentation import mark_boundaries
        
        # Load and resize image to the target size expected by the model (256x256)
        img = load_img(image_path, target_size=(256, 256))
        img_array = img_to_array(img)  # Shape: (256, 256, 3), range [0, 255]
        
        # Define prediction wrapper for LIME
        def lime_predict(images):
            # LIME passes a batch of raw perturbated image arrays in range [0, 255]
            # We must apply VGG19 preprocessing to the copies before calling predict
            preprocessed = preprocess_input(images.copy())
            return self.model.predict(preprocessed)
            
        explainer = lime_image.LimeImageExplainer(random_state=42)
        
        # Run local perturbation explanation with 1000 samples
        explanation = explainer.explain_instance(
            img_array.astype('double'), 
            lime_predict, 
            top_labels=1, 
            hide_color=0, 
            num_samples=1000
        )
        
        # Get image and mask for top predicted label using user's exact parameters
        top_label = explanation.top_labels[0]
        temp, mask = explanation.get_image_and_mask(
            top_label, 
            positive_only=False, 
            num_features=12, 
            hide_rest=False
        )
        
        # Create explanation image with a green mask overlay (alpha blending)
        img_explanation = temp.copy()
        
        # Vibrant light green tint color [100, 240, 100] (R, G, B)
        # Apply 50% green tint blend where mask is 1 (positive/selected superpixels)
        green_tint = np.array([100, 240, 100], dtype=np.float32)
        mask_indices = (mask == 1)
        img_explanation[mask_indices] = (
            img_explanation[mask_indices] * 0.5 + green_tint * 0.5
        ).astype(np.uint8)
        
        # Scale back to [0, 1] to mark boundaries with a yellow-green line
        img_explanation_scaled = img_explanation / 255.0
        img_boundary = mark_boundaries(img_explanation_scaled, mask, color=(0.9, 0.9, 0.4), mode='outer')
        
        # Convert back to uint8 [0, 255]
        img_final = (img_boundary * 255).astype(np.uint8)
        
        # Write to PIL and encode to base64
        pil_img = Image.fromarray(img_final)
        buffered = io.BytesIO()
        pil_img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return f"data:image/png;base64,{img_str}"



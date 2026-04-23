import torch
import cv2
import os
import tempfile
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from torchvision import transforms
from torchvision.models import efficientnet_b0

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# === Match Gradio Model Loading ===
def load_model():
    # Exactly wahi structure jo web-app.py mein hai
    model = efficientnet_b0()
    model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, 2)
    
    # Load weights
    model.load_state_dict(torch.load("models/best_model-v3.pt", map_location="cpu"))
    model.eval()
    return model

print("🔄 Syncing with Gradio Logic...")
detector = load_model()
print("✅ Engine Matched!")

# === Preprocessing (Exact Match) ===
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        ext = os.path.splitext(file.filename)[1].lower()
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        # Video/Image Handling exactly like Gradio
        if ext in ['.mp4', '.avi', '.mov', '.mkv']:
            cap = cv2.VideoCapture(tmp_path)
            ret, frame = cap.read()
            cap.release()
            if not ret: return {"error": "Video capture failed"}
            
            # CRITICAL: BGR to RGB conversion
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img = Image.fromarray(frame)
            mode = "Video (1st Frame Scan)"
        else:
            img = Image.open(tmp_path).convert("RGB")
            mode = "Image Static Scan"

        os.unlink(tmp_path)

        # Inference
        tensor = preprocess(img).unsqueeze(0)
        with torch.no_grad():
            out = detector(tensor)
            probs = torch.softmax(out, dim=1)[0]
            conf, pred = torch.max(probs, dim=0)

        return {
            "prediction": "REAL" if pred.item() == 0 else "DEEPFAKE",
            "confidence": float(conf.item()), # decimal mein bhejo, React * 100 kar lega
            "analysis_mode": mode
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
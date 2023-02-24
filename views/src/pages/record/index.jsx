import React, { useRef, useState } from "react";

function Record() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [imageUrl, setImageUrl] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.log("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log(canvas.toDataURL(), Date.now());
    setImageUrl(canvas.toDataURL());
  };

  return (
    <div>
      <h1>Parking OCR - New Record</h1>
      <video ref={videoRef} width={640} height={480} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      {imageUrl && <img src={imageUrl} alt="Captured Image" />}
    </div>
  );
}

export default Record;

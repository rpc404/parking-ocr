import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const handleNavigate = (path) => {
        navigate(path)
    }
  return (
    <div>
      <h1>Parking OCR</h1>
      <button onClick={() => handleNavigate("record")}>Record</button>
      <button onClick={() => handleNavigate("checkout")}>Checkout</button>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import Quagga from "@ericblade/quagga2";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [scanResult, setScanResult] = useState("");
  const domain = localStorage.getItem("selectedDomain");
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (scanning) {
      setResponseMsg(" Initializing scanner...");

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              facingMode: "environment"
              // Removed width, height, and aspectRatio for better compatibility
            },
            target: videoRef.current,
          },
          decoder: {
            readers: ["code_128_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error("Quagga init error:", err);
            setResponseMsg(" Failed to start scanner.");
            setScanning(false);
            return;
          }
          Quagga.start();
          setResponseMsg("🔍 Scanning...");
        }
      );

      Quagga.onDetected(handleDetected);
    }

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, [scanning]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    navigate("/");
  };

  const handleDetected = async (result) => {
    if (result?.codeResult?.code) {
      const code = result.codeResult.code;
      setScanResult(code);
      setResponseMsg(` Detected: ${code}`);
      setScanning(false);
      Quagga.stop();

      try {

        const res = await fetch(`${apiUrl}/api/form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: code, domain: domain }),
        });

        const data = await res.json();

        if (data.success) {
          setResponseMsg(" Scan and upload successful!");
        } else {
          setResponseMsg(" Server responded with failure.");
        }
      } catch (err) {
        console.error("POST error:", err);
        setResponseMsg(" Failed to send to server.");
      }
    }
  };

  const startScanning = () => {
    setScanResult("");
    setResponseMsg("⌛ Starting scanner...");
    setScanning(true);
  };

  return (
    <div className="app-container-wrapper">
      <div className="app-container">
        <h1 className="title"> Barcode Attendance Scanner</h1>

        <button
          onClick={startScanning}
          className={`scan-button ${scanning ? "scanning" : ""}`}
          disabled={scanning}
        >
          {scanning ? "🔍 Scanning..." : "▶️ Start Scanning"}
        </button>

        <div className="status">
          <strong>Status:</strong> <span>{responseMsg}</span>
        </div>

        {scanResult && (
          <div className="scanned-text">
             <strong>Scanned Code:</strong> <span className="code-box">{scanResult}</span>
          </div>
        )}

        <div
          ref={videoRef}
          id="camera"
          className="video-preview"
        />
      </div>

      <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            backgroundColor: "#e74c3c",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            zIndex:"10",
            position:"relative"
          }}
        >
          🚪 Logout
        </button>
    </div>
  );
}

export default Scanner;

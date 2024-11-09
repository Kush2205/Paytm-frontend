import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";


export const Appbar = () => {
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleQRClick = () => {
    setShowQRPopup(true);
    setIsCameraActive(true);
  };

  const handleQRClose = () => {
    setShowQRPopup(false);
    setIsCameraActive(false);
  };

  const handleScan = (result, error) => {
    if (!!result) {
      setScannedData(result?.text);
      navigate(`/send?userId=${result?.text}`);
    }

    if (!!error) {
      console.error(error);
    }
  };

  const qrdata = JSON.stringify({ id: localStorage.getItem("id") , name: localStorage.getItem("name") });

  return (
    <div className="shadow h-14 flex justify-between items-center px-4">
      <div className="text-lg font-bold">PayTM App</div>
      <div className="flex items-center space-x-4">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl">
          {localStorage.getItem("name")[0].toUpperCase()}
        </div>
        <button
          onClick={handleQRClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          QR Code
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {showQRPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your QR Code</h2>
              <button onClick={handleQRClose} className="text-red-500 hover:text-red-700 transition">
                Close
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <QRCode value={qrdata} size={128} />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Scan QR Code</h2>
              <div className="border rounded-lg overflow-hidden">
                {isCameraActive && (
                  <QrReader
                    delay={300}
                    onResult={handleScan}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              {scannedData && (
                <div className="mt-2 text-center text-green-500">
                  Scanned Data: {scannedData}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
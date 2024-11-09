import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import QrScanner from "react-qr-scanner";
import { FiMenu, FiX } from "react-icons/fi"

export const Appbar = () => {
  const [showQRPopup, setShowQRPopup] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleScan = (result) => {
    if (result) {
       const userdata = JSON.parse(result.text);
      navigate("/send?id="+userdata.id+"&name="+userdata.name);}
    }

  
 

  const qrdata = JSON.stringify({ id: localStorage.getItem("id") , name: localStorage.getItem("name") });

 
  return (
    <div className="shadow h-14 flex justify-between items-center px-4 sm:px-6 lg:px-8">
      <div className="text-lg sm:text-xl font-bold">PayTM App</div>
      <div className="flex items-center space-x-4 sm:hidden">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-lg">
          {localStorage.getItem("name")[0].toUpperCase()}
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="hidden sm:flex items-center space-x-4">
        <div className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-slate-200 flex justify-center items-center text-lg sm:text-xl">
          {localStorage.getItem("name")[0].toUpperCase()}
        </div>
        <button
          onClick={handleQRClick}
          className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
        >
          QR Code
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
        >
          Logout
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-lg rounded-lg w-48 z-50 flex flex-col space-y-2 py-2">
          <button
            onClick={handleQRClick}
            className="text-left px-4 py-2 hover:bg-blue-100 transition"
          >
            Scan QR Code
          </button>
          <button
            onClick={handleLogout}
            className="text-left px-4 py-2 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      )}

      {showQRPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-md sm:max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Your QR Code</h2>
              <button
                onClick={handleQRClose}
                className="text-red-500 hover:text-red-700 transition"
              >
                Close
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <QRCode value={qrdata} size={128} />
            </div>
            <div className="mt-4">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Scan QR Code</h2>
              <div className="border rounded-lg overflow-hidden">
                {isCameraActive && (
                  <QrScanner
                    delay={300}
                    onScan={handleScan}
                    onError={(err) => console.error(err)}
                    style={{ width: "100%" }}
                    constraints={{ video: { facingMode: "environment" } }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
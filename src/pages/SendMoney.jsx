import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState();
    const navigate = useNavigate();
  
    const handleTransfer = async () => {
        if (amount <= 0) {
          setError("Amount should be greater than 0");
          return;
        }
        setLoading(true); // Set loading to true when the transaction starts
        setError(""); // Clear any previous error messages
        setSuccess(false); // Clear any previous success messages
        try {
          await axios.post("https://paytm-backend-0jb0.onrender.com/api/v1/account/transfer", {
            to: id,
            amount
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          });
          setSuccess(true); // Set success to true when the transaction is successful
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000); // Redirect to dashboard after 2 seconds
        } catch (e) {
          console.error("Transfer error:", e);
          setError("Transaction failed: " + e.response.data.error); // Set error message
        } finally {
          setLoading(false); // Set loading to false when the transaction ends
        }
      };
    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={handleTransfer} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-4">
              {error}
            </div>
          )}
        {success && (
                <div className="text-green-500 mt-4">
                  Transaction Successful!
                </div>
              )}
                </div>
                </div>
        </div>
      </div>
    </div>
}
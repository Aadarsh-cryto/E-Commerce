import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [status, setStatus] = useState("Verifying your email...");

    useEffect(() => {

        const verifyEmail = async () => {

            try {

                const res = await axios.post(
                    "http://localhost:5000/api/v1/user/verify-email",
                    {},
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                setStatus(res.data.message);

                setTimeout(()=>{
                    navigate("/login");
                },2000);

            } catch (error) {

                setStatus(
                    error.response?.data?.message || "Verification Failed"
                );

            }

        };

        if(token){
            verifyEmail();
        }else{
            setStatus("Token Missing");
        }

    },[]);

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-900">

            <div className="bg-white p-10 rounded-xl shadow-xl">

                <h2 className="text-2xl font-bold text-center">

                    {status}

                </h2>

            </div>

        </div>

    );

};

export default VerifyEmail;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleEmpolyeeDetail = () => {
  const { id } = useParams();
  const [singleEmp, setSingleEmp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const singleEmpDetail = async () => {
        const res = await axios.get(`http://localhost:3000/singleEmp/${id}`);
        setSingleEmp(res.data.data);
      };
      singleEmpDetail();
    } catch (error) {
      console.log("error : ", error);
    }
  }, [id]);
  console.log(singleEmp);

  return (
    <div className="bg-gray-600 h-screen p-5">
      <h1 className="text-center text-3xl text-white font-serif">
        Employee Detaill
      </h1>
      <button
        className="p-2 rounded-md bg-purple-600 text-white"
        onClick={() => navigate("/")}
      >
        {" "}
        back
      </button>
      <div className="container mx-auto w-[690px] p-5 border border-black mt-5">
        <div className="flex gap-5">
          {singleEmp.profileImage ? (
            <img
              src={singleEmp.profileImage}
              alt="Profile"
              className="w-[300px] h-[300px] object-cover"
            />
          ) : (
            <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-400 text-white text-xl">
              Image Not Available
            </div>
          )}

          <div>
            <div className="flex">
              <label className="text-white text-xl">Name : </label>
              <p className="text-xl text-white font-serif capitalize">
                {" "}
                {singleEmp.firstname} {singleEmp.lastname}{" "}
              </p>
            </div>

            <div className="flex">
              <label className="text-white text-xl">Email :</label>
              <p className="text-xl text-white">{singleEmp.email}</p>
            </div>

            <div className="flex">
              <label className="text-white text-xl">phone :</label>
              <p className="text-xl text-white">{singleEmp.phone}</p>
            </div>

            <div className="flex">
              <label className="text-white text-xl">Department :</label>
              <p className="text-xl text-white">{singleEmp.department}</p>
            </div>

            <div className="flex">
              <label className="text-white text-xl">Salary : </label>
              <p className="text-xl text-white"> {singleEmp.salary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmpolyeeDetail;

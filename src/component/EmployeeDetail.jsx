import React, { useEffect, useState } from "react";
import { TfiPencilAlt } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-hot-toast";

const EmployeeDetail = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch employees
  useEffect(() => {
    const getEmp = async () => {
      const res = await axios.get("http://localhost:3000/allEmp");
      setEmployees(res.data.data);
    };
    getEmp();
  }, []);

  // Navigate to Add Employee page
  const handleAddEmp = () => {
    navigate("/add");
  };

  // Navigate to Update Employee page
  const handleUpdateEmp = (empId) => {
    navigate(`/update/${empId}`);
  };

  // Delete an employee
  const deleteEmp = async (empId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/deleteEmp/${empId}`
      );
      if (res.status === 200) {
        // If deletion is successful, update the UI
        setEmployees((prev) =>
          prev.filter((employee) => employee._id !== empId)
        );
        toast.success("empolyee deleted sucessfully", {
          position: "top-right",
        });
      } else {
        toast.success("empolyee failed delete ", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Filter employees based on the search query
  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstname} ${emp.lastname}  || ${emp.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-600 h-screen p-5">
      <div className="container mx-auto p-5">
        {/* Employee detail */}
        <div className="bg-white p-2 rounded">
          <div className="flex justify-between items-center">
            <button
              className="bg-purple-500 md:w-[120px] p-2 rounded-md"
              onClick={handleAddEmp}
            >
              Add Employee
            </button>
            <h1 className="text-black text-center text-2xl font-serif">
              Employee Management System
            </h1>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employee"
                className="md:w-[300px] border p-1 pl-5 rounded-md border-black"
              />
              <IoSearch className="text-xl absolute right-5 top-2" />
            </div>
          </div>

          <table className="w-full mt-2 border border-collapse border-black rounded-md">
            <thead className="bg-blue-600">
              <tr className="text-left ">
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Sr.No
                </th>
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Name
                </th>
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Email
                </th>
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Phone
                </th>
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Department
                </th>
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Salary
                </th>
                <th className="px-4 py-2 text-center text-md border border-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td className="p-1 font-sans text-md text-center" colSpan={7}>
                    No Employee
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp, index) => {
                  return (
                    <tr key={emp._id}>
                      <td className="px-4 text-center py-2 border border-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-4 text-center py-2 border border-gray-500">
                        <Link to={`/singleEmp/${emp._id}`}>
                          {emp.firstname} {emp.lastname}
                        </Link>
                      </td>
                      <td className="px-4 text-center py-2 border border-gray-500">
                        <Link to={`/singleEmp/${emp._id}`}> {emp.email} </Link>
                      </td>
                      <td className="px-4 text-center py-2 border border-gray-500">
                        {emp.phone}
                      </td>
                      <td className="px-4 text-center py-2 border border-gray-500">
                        {emp.department}
                      </td>
                      <td className="px-4 text-center py-2 border border-gray-500">
                        {emp.salary}
                      </td>
                      <td className="px-4 flex gap-5 items-center justify-center py-2 border border-gray-500">
                        <TfiPencilAlt
                          className="text-2xl bg-green-600 p-2 rounded-md cursor-pointer"
                          onClick={() => handleUpdateEmp(emp._id)}
                        />
                        <MdDelete
                          className="text-2xl bg-red-600 p-2 rounded-md cursor-pointer"
                          onClick={() => deleteEmp(emp._id)}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (const key in formData) {
      if (!formData[key] && key !== "profileImage") {
        alert(`Please fill the ${key} field.`);
        return;
      }
    }

    // Create FormData object to send with file
    const form = new FormData();
    form.append("firstname", formData.firstname);
    form.append("lastname", formData.lastname);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("department", formData.department);
    form.append("salary", formData.salary);
    if (formData.profileImage) {
      form.append("profileImage", formData.profileImage);
    }

    try {
      // Send request to server
      const res = await axios.post("http://localhost:3000/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Employee added successfully!", {
        position: "top-right",
      });

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="bg-gray-200 p-5 h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <h2 className="text-center text-2xl font-semibold mb-4">
          Add Employee
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border mb-3 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

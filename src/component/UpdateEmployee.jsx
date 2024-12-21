import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Get the employee ID from the URL

  // Fetch employee data on mount to pre-fill the form
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/singleEmp/${id}`
        );
        const data = response.data.data;
        setFormData({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          department: data.department,
          salary: data.salary,
          profileImage: null, // Profile image should not be pre-filled unless you want to handle that too
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert("Failed to fetch employee data.");
      }
    };

    fetchEmployeeData();
  }, [id]);

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

    // Set loading state to true
    setLoading(true);

    try {
      // Send request to server to update employee
      await axios.put(`http://localhost:3000/updateEmp/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("empolyee updated successfully", {
        position: "top-right",
      });

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 p-5 h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <h2 className="text-center text-2xl font-semibold mb-4">
          Update Employee
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
            disabled={loading} // Disable button when loading
          >
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;

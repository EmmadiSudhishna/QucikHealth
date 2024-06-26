import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddSchedule() {
  const [doctor, setDoctor] = useState({ doctorId: null });
  const [schedules, setSchedules] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const doctorData = JSON.parse(sessionStorage.getItem('doctorId'));
    if (doctorData) {
      setDoctor({ doctorId: doctorData });
    }
  }, []);

  const handleChange = (index, name, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][name] = value;
    setSchedules(updatedSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: "", startTime: "", endTime: "", startMeridian: "AM", endMeridian: "AM", status: "" }]);
  };

  const handleDelete = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const submitSchedule = async () => {
    try {
      const formattedSchedules = schedules.map(schedule => ({
        doctorId: doctor.doctorId,
        day: schedule.day,
        timings: `${schedule.startTime} ${schedule.startMeridian} - ${schedule.endTime} ${schedule.endMeridian}`,
        status: schedule.status === 'Active'
      }));

      const response = await axios.post('http://localhost:8091/api/v1/addSchedule', formattedSchedules, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      toast.success('Schedules added successfully!');
      setSchedules([]); // Clear the schedules after submission
    } catch (error) {
      console.error("Schedule submission error:", error);
      if (error.response) {
        setErrorMessage(`Schedule submission failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setErrorMessage("Schedule submission failed: No response from server.");
      } else {
        setErrorMessage(`Schedule submission failed: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitSchedule();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Schedule</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="doctorId" className="form-label">Doctor ID:</label>
          <input type="text" className="form-control" id="doctorId" value={doctor.doctorId} readOnly />
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="text-center" style={{ backgroundColor: "#007bff", color: "white" }}>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>
                  <button type="button" className="btn btn-success btn-sm" onClick={addSchedule}>+</button>
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>
                    <select className="form-select" value={schedule.day} onChange={(e) => handleChange(index, "day", e.target.value)}>
                      <option>Select Day</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </td>
                  <td>
                    <div className="d-flex">
                      <input
                        type="time"
                        className="form-control"
                        value={schedule.startTime}
                        onChange={(e) => handleChange(index, "startTime", e.target.value)}
                      />
                      <select className="form-select ms-2" value={schedule.startMeridian} onChange={(e) => handleChange(index, "startMeridian", e.target.value)}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <input
                        type="time"
                        className="form-control"
                        value={schedule.endTime}
                        onChange={(e) => handleChange(index, "endTime", e.target.value)}
                      />
                      <select className="form-select ms-2" value={schedule.endMeridian} onChange={(e) => handleChange(index, "endMeridian", e.target.value)}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <select className="form-select" value={schedule.status} onChange={(e) => handleChange(index, "status", e.target.value)}>
                      <option>Select Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>−</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {errorMessage && (
          <div className="alert alert-danger text-center" style={{ marginTop: '20px' }}>
            {errorMessage}
          </div>
        )}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

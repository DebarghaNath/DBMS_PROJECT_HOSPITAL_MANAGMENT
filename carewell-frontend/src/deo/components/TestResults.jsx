import { useState, useEffect } from "react";
import PreviousTestResults from "./PreviousTestResults";
import { BASE_URL } from "../../config";

// 1️⃣ Define your parameter templates
const testParameters = {
  "Blood Test": [
    { name: "Hemoglobin", unit: "g/dL" },
    { name: "WBC Count", unit: "cells/mcL" },
    { name: "RBC Count", unit: "million cells/mcL" },
    { name: "Platelet Count", unit: "lac/mcL" },
    { name: "Glucose (Fasting)", unit: "mg/dL" },
    { name: "Cholesterol", unit: "mg/dL" },
    { name: "Urea", unit: "mg/dL" },
    { name: "Creatinine", unit: "mg/dL" },
  ],
  "X-Ray": [
    { name: "Impression", unit: "" },
    { name: "Radiologist Notes", unit: "" },
    { name: "Region", unit: "" },
    { name: "Findings", unit: "" },
  ],
  "MRI Scan": [
    { name: "Region Scanned", unit: "" },
    { name: "Findings", unit: "" },
    { name: "Radiologist Comments", unit: "" },
    { name: "Sequence Used", unit: "" },
  ],
  "CT Scan": [
    { name: "Region Scanned", unit: "" },
    { name: "Contrast Used", unit: "yes/no" },
    { name: "Findings", unit: "" },
    { name: "Radiologist Notes", unit: "" },
  ],
  ECG: [
    { name: "Heart Rate", unit: "bpm" },
    { name: "PR Interval", unit: "ms" },
    { name: "QRS Duration", unit: "ms" },
    { name: "QT Interval", unit: "ms" },
    { name: "Rhythm", unit: "" },
  ],
  Ultrasound: [
    { name: "Organ Examined", unit: "" },
    { name: "Findings", unit: "" },
    { name: "Size", unit: "cm" },
    { name: "Impression", unit: "" },
  ],
  "Urine Test": [
    { name: "pH", unit: "" },
    { name: "Specific Gravity", unit: "" },
    { name: "Protein", unit: "mg/dL" },
    { name: "Glucose", unit: "mg/dL" },
    { name: "Ketones", unit: "mg/dL" },
    { name: "Color", unit: "" },
    { name: "Appearance", unit: "" },
  ],
};

const TestResults = ({ tests, doctorid, patientid, setTests }) => {
  const [newTest, setNewTest] = useState({
    patientid,
    doctorid,
    type: "",
    testdate: "",
    notes: "",
    parameters: "",
    status: "",
  });

  // 2️⃣ When patient/doctor change
  useEffect(() => {
    setNewTest((p) => ({ ...p, patientid:patientid, doctorid:doctorid }));
  }, [patientid, doctorid]);

  // 3️⃣ Our editable parameters: only values, names & units come from template
  const [parameters, setParameters] = useState([]);

  // 4️⃣ When test type changes, load the template
  useEffect(() => {
    if (newTest.type && testParameters[newTest.type]) {
      setParameters(
        testParameters[newTest.type].map((p) => ({
          name: p.name,
          unit: p.unit,
          value: "",
        }))
      );
    } else {
      setParameters([]);
    }
  }, [newTest.type]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewTest((p) => ({ ...p, [id]: value }));
  };

  const handleParameterValueChange = (idx, val) => {
    const copy = [...parameters];
    copy[idx].value = val;
    setParameters(copy);
  };

  const handleAddTest = async () => {
    const parametersText = parameters
      .filter((p) => p.value !== "")
      .map((p) => `${p.name}: ${p.value} ${p.unit}`.trim())
      .join("\n");

    try {
      const res = await fetch(`${BASE_URL}/api/test/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("deo$token")}`,
        },
        body: JSON.stringify({ ...newTest, parameters: parametersText }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Add failed");
      const data = await res.json();
      setTests((t) => [...t, data.data]);
      alert("Test result added!");
    } catch (err) {
      console.error(err);
      alert("Error adding test.");
    }
  };

  return (
    <div id="testResultsSection" className="tab-content fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Test Results
          </h2>
          <button
            className="flex items-center text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
            onClick={handleAddTest}
          >
            <i className="fas fa-plus mr-2"></i>Add Test
          </button>
        </div>

        {/* Test Type & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Test Type
            </label>
            <select
              id="type"
              value={newTest.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            >
              <option value="">Select a test</option>
              {Object.keys(testParameters).map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="testdate" className="block text-sm font-medium mb-1">
              Test Date
            </label>
            <input
              type="date"
              id="testdate"
              value={newTest.testdate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={newTest.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            placeholder="Enter any notes..."
          />
        </div>

        {/* Parameters (name & unit fixed) */}
        {parameters.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Parameters</p>
            <div className="space-y-3">
              {parameters.map((p, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-4 items-center"
                >
                  {/* Name */}
                  <div className="col-span-2 px-3 py-2 bg-gray-50 rounded-md text-gray-700">
                    {p.name}
                  </div>
                  {/* Value */}
                  <input
                    type="text"
                    value={p.value}
                    onChange={(e) =>
                      handleParameterValueChange(idx, e.target.value)
                    }
                    placeholder="Value"
                    className="px-3 py-2 border rounded-md focus:ring-indigo-500"
                  />
                  {/* Unit */}
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-500">
                    {p.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <input
            type="text"
            id="status"
            value={newTest.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            placeholder="e.g. Normal / Abnormal"
          />
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
            onClick={handleAddTest}
          >
            Save Test Results
          </button>
        </div>
      </div>

      <PreviousTestResults tests={tests} />
    </div>
  );
};

export default TestResults;

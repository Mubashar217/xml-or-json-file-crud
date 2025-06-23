"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "" });
  const [dataList, setDataList] = useState([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [viewFormat, setViewFormat] = useState<"json" | "xml">("json");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!formData.name.trim()) return;

    if (editIndex !== null) {
      const updated = [...dataList];
      updated[editIndex] = formData;
      setDataList(updated);
      setEditIndex(null);
    } else {
      setDataList([...dataList, formData]);
    }

    setFormData({ name: "" });
  };

  const handleEdit = (index: number) => {
    setFormData(dataList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = dataList.filter((_, i) => i !== index);
    setDataList(updated);
  };

  const convertToXML = () => {
    return `<data>\n${dataList
      .map((item) => `  <entry><name>${item.name}</name></entry>`)
      .join("\n")}\n</data>`;
  };

  return (
    <div className="main flex flex-col md:flex-row p-4 gap-6">
      
      <div className="form bg-white shadow p-4 rounded w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Form</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="border px-3 py-2 mb-2 w-full rounded"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <ul className="mt-4">
          {dataList.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

     
      <div className="view bg-gray-100 p-4 rounded w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">View ({viewFormat.toUpperCase()})</h2>
        <div className="mb-4">
          <button
            onClick={() => setViewFormat("json")}
            className={`px-3 py-1 mr-2 rounded ${viewFormat === "json" ? "bg-blue-500 text-white" : "bg-white border"}`}
          >
            JSON
          </button>
          <button
            onClick={() => setViewFormat("xml")}
            className={`px-3 py-1 rounded ${viewFormat === "xml" ? "bg-blue-500 text-white" : "bg-white border"}`}
          >
            XML
          </button>
        </div>

        <pre className="bg-white p-3 rounded overflow-auto text-sm">
          {viewFormat === "json"
            ? JSON.stringify(dataList, null, 2)
            : convertToXML()}
        </pre>
      </div>
    </div>
  );
}

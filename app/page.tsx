"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<{ name: string }>({ name: "" });
  const [dataList, setDataList] = useSdtate<{ name: string }[]>([]);
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
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">Add Entry</h2>
          <input
            type="text"
            name="name"
            placeholder="Type name..."
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={handleAddOrUpdate}
            className="w-full py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition mb-6"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>

          <ul className="space-y-3">
            {dataList.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-xl hover:shadow-md transition"
              >
                <span className="text-gray-800">{item.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* View Section */}
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">
            View ({viewFormat.toUpperCase()})
          </h2>
          <div className="flex mb-4 space-x-2">
            <button
              onClick={() => setViewFormat("json")}
              className={`px-4 py-2 rounded-xl font-medium ${
                viewFormat === "json"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              JSON
            </button>
            <button
              onClick={() => setViewFormat("xml")}
              className={`px-4 py-2 rounded-xl font-medium ${
                viewFormat === "xml"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              XML
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-xl text-sm overflow-auto max-h-80 border border-gray-200">
            {viewFormat === "json"
              ? JSON.stringify(dataList, null, 2)
              : convertToXML()}
          </pre>
        </div>
      </div>
    </div>
  );
}

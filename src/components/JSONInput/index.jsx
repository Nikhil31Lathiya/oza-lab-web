import React, { useState } from "react";

function JsonEditor({ data }) {
  const [jsonData, setJsonData] = useState(data);

  const handleSubmit = (index, key, value) => {
    const newData = [...jsonData];
    newData[index]['key'] = key; 
    newData[index]['value'] = value; 
    setJsonData(newData);
  };

  const handleAddItem = () => {
    const newData = [...jsonData];
    newData.push({});
    setJsonData(newData);
  };

  const handleDeleteItem = (index) => {
    const newData = [...jsonData];
    newData.splice(index, 1);
    setJsonData(newData);
  };

  function convertToObject(array) {
    const result = {};
    for (const obj of array) {
      if (obj.key && obj.value !== undefined && obj.value !== '') {
        result[obj.key] = obj.value;
      }
    }
    return Object.entries(result).map(([key, values]) => ({ [key]: values }));
  }

  return (
    <div>
      <pre>{JSON.stringify(convertToObject(jsonData), null, 2)}</pre>
      <button onClick={handleAddItem}>Add Item</button>
      {jsonData.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item.key || ""}
            onChange={(e) => handleSubmit(index, e.target.value, item.value)}
          />
          <input
            type="text"
            value={item.value || ""}
            onChange={(e) => handleSubmit(index, item.key, e.target.value)}
          />
          <button onClick={() => handleDeleteItem(index)}>Delete</button>
          
        </div>
      ))}
    </div>
  );
}

export default JsonEditor;
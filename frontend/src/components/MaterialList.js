// MaterialList.js

import React from 'react';

const MaterialList = ({ materials, selectedMaterial, onMaterialClick, onMaterialCompletion }) => {

  return (
    <div className="material-list text-light">
      <h5>Materials</h5>
      {materials.length > 0 ? (
        <ul>
          {materials.map((material, index) => (
            <li key={index}>
              <div
                className={`material-item ${selectedMaterial === material ? 'selected' : ''}`}
                onClick={() => onMaterialClick(material)}
              >
                <input
                  type="checkbox"
                  checked={material.completed}
                  onChange={() => onMaterialCompletion(material)}
                />
                {material.title}
              </div>
              <hr></hr>
            </li>
          ))}
        </ul>
      ) : (
        <p>No materials available</p>
      )}
    </div>
  );
};

export default MaterialList;

// MaterialList.js

import React from 'react';
import '../pages/CreateLearningPathPage/CreateLearningPathPage.css'

const MaterialList = ({ courseTitle, materials, selectedMaterial, onMaterialClick, onMaterialCompletion }) => {
  const whiteText = {
    color : "white"
  }
  return (
    <div className="material-list">
      <div className='heading' style={whiteText}>
        <div>{courseTitle}</div>
      </div>
      {materials.length > 0 ? (
        <div className='tiles' style={{backgroundColor: "rgba(33,37,41,0.9)"}}>
          {materials.map((material, index) => (
              <>
              <div className='tile' key={index}>
              <div className='content' style={{...whiteText, cursor: "pointer"}} onClick={() => onMaterialClick(material)}>
                <div>{material.title}</div>
                <div className='subTitle'>{material.url}</div>
              </div>
            </div>
            </>
          ))}
        </div>
      ) : (
        <p>No materials available</p>
      )}
    </div>
  );
};

export default MaterialList;

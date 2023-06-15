import React, { useEffect, useRef, useState } from 'react';
import EmbeddedVideo from '../../components/EmbeddedVideo';
import MaterialList from '../../components/MaterialList';
import Swiper from 'swiper';
import './LearningPathConsumptionPage.css';

const ConsumptionPage = () => {
  // Replace with actual learning path data
  const learningPath = {
    title: 'Data Structure and Algorithm',
    courses: [
      {
        title: 'Array',
        materials: [
          { title: 'Material 1', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 2', url: 'https://www.youtube.com/embed/hGeL_vm3pX4', completed: false },
          { title: 'Material 3', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 4', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 5', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 6', url: 'https://www.youtube.com/embed/hGeL_vm3pX4', completed: false },
          { title: 'Material 7', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 8', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 9', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 10', url: 'https://www.youtube.com/embed/hGeL_vm3pX4', completed: false },
          { title: 'Material 11', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 12', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
        ],
      },
      {
        title: 'LinkedList',
        materials: [
          { title: 'Material 3', url: 'https://www.youtube.com/embed/video3', completed: false },
          { title: 'Material 4', url: 'https://www.youtube.com/embed/video4', completed: false },
        ],
      },
      {
        title: 'Graph',
        materials: [
          { title: 'Material 3', url: 'https://www.youtube.com/embed/video3', completed: false },
          { title: 'Material 4', url: 'https://www.youtube.com/embed/video4', completed: false },
        ],
      },
      {
        title: 'Array',
        materials: [
          { title: 'Material 1', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 2', url: 'https://www.youtube.com/embed/hGeL_vm3pX4', completed: false },
          { title: 'Material 3', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
          { title: 'Material 4', url: 'https://www.youtube.com/embed/pSB3WIzAUAA', completed: false },
        ],
      },
    ],
  };

  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(learningPath.courses[0].materials[0]);
  const [materials, setMaterials] = useState(learningPath.courses[0].materials);

  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(selectedCourse);

  useEffect(() => {
    const initSwiper = () => {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        autoHeight: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        loop: false,
        effect: 'slide',
        spaceBetween: 30,
        speed: 230,
        on: {
          init: function () {
            setActiveIndex(selectedCourse);
          },
          slideChangeTransitionStart: function () {
            setActiveIndex(this.realIndex);
          }
        }
      });
    };

    initSwiper();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, [selectedCourse]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(selectedCourse);
    }
  }, [selectedCourse]);

  const handleCourseChange = (index) => {
    setActiveIndex(index);
    setSelectedCourse(index);
    setMaterials(learningPath.courses[index].materials);
    setSelectedMaterial(learningPath.courses[index].materials[0]);
  };

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
  };

  const handleMaterialCompletion = (material) => {
    const completed = window.confirm('Did you complete this material?');
    if (completed) {
      const updatedMaterials = materials.map((m) => {
        if (m === material) {
          return { ...m, completed: true };
        }
        return m;
      });
      setMaterials(updatedMaterials);
    }
  };

  return (
    <div className="learning-path-consumption-page">
      <h2 className='text-light'>{learningPath.title}</h2>
      <div className="container">
        <div className="swiper-container-wrapper swiper-container-wrapper--timeline">
          {/* Timeline */}
          <ul className="swiper-pagination-custom">
            {learningPath.courses.map((course, index) => (
              <li
                key={index}
                className={`swiper-pagination-switch ${index === activeIndex ? 'active' : ''} ${index === 0 ? 'first' : ''} ${index === learningPath.courses.length - 1 ? 'last' : ''}`}
                onClick={() => handleCourseChange(index)}
                data-tip={course.title}
              >
                <span className="switch-title">{index + 1}</span>
                <div className="tooltip">{course.title}</div>
              </li>
            ))}
          </ul>
          {/* Progressbar */}
          <div className="swiper-pagination-progressbar">
            <div
              className="swiper-pagination-progressbar-fill"
              style={{ width: `${((activeIndex + 1) / learningPath.courses.length) * 100}%` }}
            ></div>
          </div>

          {/* Swiper */}
          <div className="swiper-container swiper-container--timeline" ref={swiperContainerRef}>
            {/* Slides */}
            <div className="swiper-wrapper">
              {learningPath.courses.map((course, index) => (
                <div className="swiper-slide" key={index}>
                  <div className='panels'>
                    <div className='vdo-player'>
                      <EmbeddedVideo url={selectedMaterial.url} />
                    </div>
                    <MaterialList
                      materials={materials}
                      selectedMaterial={selectedMaterial}
                      onMaterialClick={handleMaterialClick}
                      onMaterialCompletion={handleMaterialCompletion}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionPage;

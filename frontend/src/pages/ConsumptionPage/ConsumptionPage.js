import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmbeddedVideo from '../../components/EmbeddedVideo';
import MaterialList from '../../components/MaterialList';
import Swiper, { EffectFade } from 'swiper';
import './ConsumptionPage.css';
import { Spinner } from 'react-bootstrap';

const ConsumptionPage = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [learningPath, setLearningPath] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState(null);

  const swiperRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(selectedCourse);

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/learning-paths/${id}`);
        const data = await response.json();
        const learningPath = {
          _id: data._id,
          title: data.title,
          description: data.description,
          creator: data.creator,
          firstCourse: data.firstCourse,
          courses: data.courses.map((course) => {
            const courseItems = course.courseItems.map((item) => ({
              _id: item._id,
              itemType: item.itemType,
              title: item.title,
              url: item.url,
              nextItem: item.nextItem
            }));
            return {
              _id: course._id,
              title: course.title,
              description: course.description,
              courseItems
            };
          })
        };
        setLearningPath(learningPath);
        setSelectedMaterial(learningPath.courses[0].courseItems[0]);
        setMaterials(learningPath.courses[0].courseItems);
      } catch (error) {
        console.error('Failed to fetch learning path:', error);
      }
    };

    fetchLearningPath();
    Swiper.use([EffectFade]);
    const initSwiper = () => {
      if (learningPath) {
        swiperContainerRef.current = document.querySelector('.swiper-container');
  
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
          effect: 'fade',
          spaceBetween: 30,
          speed: 230,
          on: {
            init: function () {
              setActiveIndex(selectedCourse);
            },
            slideChangeTransitionStart: function () {
              setActiveIndex(this.realIndex);
            },
            slideChange: function () {
              swiperRef.current.update();
  
              const slides = swiperContainerRef.current.querySelectorAll('.swiper-slide');
              if (slides.length > 0) {
                const currentSlide = slides[swiperRef.current.realIndex];
                const material = currentSlide.querySelector('.material');
                if (material) {
                  setSelectedMaterial(material);
                }
              }
            }
          }
        });
  
        swiperRef.current.update();
      }
    };
  
    initSwiper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (swiperRef.current && learningPath && selectedCourse >= 0 && selectedCourse < learningPath.courses.length) {
    swiperRef.current.slideTo(selectedCourse);
  }

  const handleCourseChange = (index) => {
    setActiveIndex(index);
    setSelectedCourse(index);
    setMaterials(learningPath.courses[index].courseItems); // Update materials to courseItems
    setSelectedMaterial(learningPath.courses[index].courseItems[0]); // Select the first course item
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

  if (!learningPath) {
    return <div className='spinner'><Spinner animation="grow" variant="light" /></div>
  }

  console.log(learningPath);
  return (
    <div className="learning-path-consumption-page">
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
                  {selectedMaterial && (
                    <div className='vdo-player'>
                      <EmbeddedVideo url={selectedMaterial.url} />
                      <br></br>
                      <h5 className='text-light'>{learningPath.title}</h5>
                      <p style={{color:"#fff"}}>{learningPath.description}</p>
                    </div>
                  )}
                    {materials && (
                    <MaterialList
                      courseTitle={learningPath.courses[selectedCourse].title}
                      materials={materials}
                      selectedMaterial={selectedMaterial}
                      onMaterialClick={handleMaterialClick}
                      onMaterialCompletion={handleMaterialCompletion}
                    />
                    )}
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

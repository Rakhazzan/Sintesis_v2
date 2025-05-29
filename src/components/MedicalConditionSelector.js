import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MEDICAL_CATEGORIES } from '../utils/medicalConditionUtils';
import './MedicalConditionSelector.css';

const MedicalConditionSelector = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredConditions, setFilteredConditions] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Inicializar categorías filtradas
  useEffect(() => {
    setFilteredCategories(Object.keys(MEDICAL_CATEGORIES));
  }, []);

  // Actualizar filtros al cambiar la búsqueda
  useEffect(() => {
    if (searchValue) {
      // Filtrar categorías que coinciden con la búsqueda
      const categoriesFiltered = Object.keys(MEDICAL_CATEGORIES).filter(
        category => 
          MEDICAL_CATEGORIES[category].description.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      setFilteredCategories(categoriesFiltered);
      
      // Filtrar condiciones que coinciden con la búsqueda
      const conditionsFiltered = [];
      
      Object.keys(MEDICAL_CATEGORIES).forEach(category => {
        const matchingConditions = MEDICAL_CATEGORIES[category].conditions.filter(
          condition => condition.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        if (matchingConditions.length > 0) {
          conditionsFiltered.push(...matchingConditions);
        }
      });
      
      setFilteredConditions(conditionsFiltered);
    } else if (selectedCategory) {
      // Si hay una categoría seleccionada pero no hay búsqueda, mostrar todas las condiciones de esa categoría
      setFilteredConditions(MEDICAL_CATEGORIES[selectedCategory].conditions);
    } else {
      // Si no hay búsqueda ni categoría seleccionada, mostrar todas las categorías
      setFilteredCategories(Object.keys(MEDICAL_CATEGORIES));
      setFilteredConditions([]);
    }
  }, [searchValue, selectedCategory]);

  // Manejar clic fuera del componente para cerrar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animaciones con GSAP
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.medical-dropdown-content',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen, selectedCategory]);

  const openDropdown = () => {
    setIsOpen(true);
    // Animar el placeholder cuando se abre
    gsap.to(inputRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(inputRef.current, {
          scale: 1,
          duration: 0.1
        });
      }
    });
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilteredConditions(MEDICAL_CATEGORIES[category].conditions);
    
    // Animar cambio de categoría a condiciones
    gsap.fromTo(
      '.condition-item',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, stagger: 0.03, duration: 0.3, ease: 'power1.out' }
    );
  };

  const handleConditionSelect = (condition) => {
    onChange(condition);
    setSearchValue(condition);
    closeDropdown();
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    // Animar regreso a categorías
    gsap.fromTo(
      '.category-item',
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, stagger: 0.03, duration: 0.3, ease: 'power1.out' }
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onChange(value);
    
    if (value && !isOpen) {
      openDropdown();
    }
  };

  const handleInputFocus = () => {
    openDropdown();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      CARDIOVASCULAR: '❤️',
      RESPIRATORY: '🫁',
      ENDOCRINE: '🧪',
      DIGESTIVE: '🍽️',
      MUSCULOSKELETAL: '🦴',
      NEUROLOGICAL: '🧠',
      MENTAL_HEALTH: '🧘',
      INFECTIOUS: '🦠',
      DERMATOLOGICAL: '🧴',
      ALLERGIC: '🌻',
      PREGNANCY: '🤰',
      PEDIATRIC: '👶',
      OPHTHALMOLOGICAL: '👁️',
      UROLOGICAL: '🚽',
      OTHER: '📋'
    };
    
    return icons[category] || '🩺';
  };

  const getCategoryName = (category) => {
    const names = {
      CARDIOVASCULAR: 'Cardiovascular',
      RESPIRATORY: 'Respiratorio',
      ENDOCRINE: 'Endocrino',
      DIGESTIVE: 'Digestivo',
      MUSCULOSKELETAL: 'Musculoesquelético',
      NEUROLOGICAL: 'Neurológico',
      MENTAL_HEALTH: 'Salud Mental',
      INFECTIOUS: 'Infeccioso',
      DERMATOLOGICAL: 'Dermatológico',
      ALLERGIC: 'Alérgico',
      PREGNANCY: 'Embarazo',
      PEDIATRIC: 'Pediátrico',
      OPHTHALMOLOGICAL: 'Oftalmológico',
      UROLOGICAL: 'Urológico',
      OTHER: 'Otros'
    };
    
    return names[category] || category;
  };

  return (
    <div className="medical-condition-selector" ref={dropdownRef}>
      <div className="selector-input-container">
        <input
          ref={inputRef}
          type="text"
          className="selector-input"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder || "Seleccionar condición médica"}
        />
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="medical-dropdown-content">
          {selectedCategory ? (
            <>
              <div className="dropdown-header">
                <button 
                  className="back-button" 
                  onClick={handleBackToCategories}
                >
                  ← Volver a categorías
                </button>
                <span className="selected-category">
                  {getCategoryIcon(selectedCategory)} {getCategoryName(selectedCategory)}
                </span>
              </div>
              <div className="conditions-list">
                {filteredConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="condition-item"
                    onClick={() => handleConditionSelect(condition)}
                    style={{
                      backgroundColor: `${MEDICAL_CATEGORIES[selectedCategory].color}22`
                    }}
                  >
                    <span className="condition-name">{condition}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {searchValue && filteredConditions.length > 0 ? (
                <>
                  <div className="dropdown-header">
                    <span className="header-title">Resultados de búsqueda</span>
                  </div>
                  <div className="conditions-list search-results">
                    {filteredConditions.map((condition, index) => {
                      // Encontrar la categoría a la que pertenece esta condición
                      let categoryKey = 'OTHER';
                      Object.keys(MEDICAL_CATEGORIES).forEach(key => {
                        if (MEDICAL_CATEGORIES[key].conditions.includes(condition)) {
                          categoryKey = key;
                        }
                      });
                      
                      return (
                        <div
                          key={index}
                          className="condition-item"
                          onClick={() => handleConditionSelect(condition)}
                          style={{
                            backgroundColor: `${MEDICAL_CATEGORIES[categoryKey].color}22`
                          }}
                        >
                          <span className="condition-icon">{getCategoryIcon(categoryKey)}</span>
                          <span className="condition-name">{condition}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown-header">
                    <span className="header-title">Categorías médicas</span>
                  </div>
                  <div className="categories-list">
                    {filteredCategories.map((category, index) => (
                      <div
                        key={index}
                        className="category-item"
                        onClick={() => handleCategorySelect(category)}
                        style={{
                          backgroundColor: `${MEDICAL_CATEGORIES[category].color}22`
                        }}
                      >
                        <span className="category-icon">{getCategoryIcon(category)}</span>
                        <div className="category-details">
                          <span className="category-name">{getCategoryName(category)}</span>
                          <span className="category-description">
                            {MEDICAL_CATEGORIES[category].description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalConditionSelector;

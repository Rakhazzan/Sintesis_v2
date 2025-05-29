/**
 * Utilidades para la clasificación y gestión de condiciones médicas
 */

// Clasificación de condiciones médicas por categorías
export const MEDICAL_CATEGORIES = {
  CARDIOVASCULAR: {
    conditions: [
      'Hipertensión', 'Cardiopatía', 'Arritmia', 'Infarto', 'Fibrilación auricular',
      'Insuficiencia cardíaca', 'Angina de pecho', 'Trombosis', 'Embolia', 'Arterioesclerosis'
    ],
    color: '#FF8A80', // Rojo claro
    severity: 'high',
    description: 'Afecciones relacionadas con el corazón y el sistema circulatorio'
  },
  RESPIRATORY: {
    conditions: [
      'Asma', 'EPOC', 'Bronquitis', 'Neumonía', 'Fibrosis pulmonar',
      'Apnea del sueño', 'Tuberculosis', 'Enfisema', 'Pleuresía', 'Rinitis'
    ],
    color: '#84FFFF', // Celeste
    severity: 'medium',
    description: 'Afecciones relacionadas con el sistema respiratorio'
  },
  ENDOCRINE: {
    conditions: [
      'Diabetes', 'Hipotiroidismo', 'Hipertiroidismo', 'Obesidad', 'Cushing',
      'Addison', 'Hipogonadismo', 'Acromegalia', 'Hipercalcemia', 'Hipoglucemia'
    ],
    color: '#FFD180', // Naranja claro
    severity: 'medium',
    description: 'Afecciones relacionadas con el sistema endocrino y hormonal'
  },
  DIGESTIVE: {
    conditions: [
      'Gastritis', 'Colon irritable', 'Enfermedad de Crohn', 'Colitis ulcerosa', 'Reflujo',
      'Úlcera péptica', 'Cirrosis', 'Hepatitis', 'Diverticulitis', 'Pancreatitis'
    ],
    color: '#B9F6CA', // Verde claro
    severity: 'medium',
    description: 'Afecciones relacionadas con el sistema digestivo'
  },
  MUSCULOSKELETAL: {
    conditions: [
      'Artritis', 'Artrosis', 'Osteoporosis', 'Fibromialgia', 'Hernia discal',
      'Lumbalgia', 'Escoliosis', 'Tendinitis', 'Bursitis', 'Gota'
    ],
    color: '#E1BEE7', // Lila claro
    severity: 'medium',
    description: 'Afecciones relacionadas con huesos, músculos y articulaciones'
  },
  NEUROLOGICAL: {
    conditions: [
      'Migraña', 'Epilepsia', 'Parkinson', 'Alzheimer', 'Esclerosis múltiple',
      'Neuralgia', 'Meningitis', 'Encefalitis', 'Neuropatía', 'ACV'
    ],
    color: '#BBDEFB', // Azul claro
    severity: 'high',
    description: 'Afecciones relacionadas con el sistema nervioso'
  },
  MENTAL_HEALTH: {
    conditions: [
      'Ansiedad', 'Depresión', 'Trastorno bipolar', 'Esquizofrenia', 'TOC',
      'TDAH', 'Trastorno de estrés', 'Fobia', 'Insomnio', 'Trastorno alimentario'
    ],
    color: '#D7CCC8', // Marrón claro
    severity: 'medium',
    description: 'Afecciones relacionadas con la salud mental'
  },
  INFECTIOUS: {
    conditions: [
      'COVID-19', 'Gripe', 'Mononucleosis', 'VIH', 'Herpes',
      'Lyme', 'Malaria', 'Salmonella', 'Varicela', 'Sarampión'
    ],
    color: '#FFCCBC', // Salmón claro
    severity: 'variable',
    description: 'Enfermedades causadas por agentes infecciosos'
  },
  DERMATOLOGICAL: {
    conditions: [
      'Psoriasis', 'Eczema', 'Dermatitis', 'Acné', 'Rosácea',
      'Vitiligo', 'Urticaria', 'Melanoma', 'Alopecia', 'Queratosis'
    ],
    color: '#F8BBD0', // Rosa claro
    severity: 'low',
    description: 'Afecciones relacionadas con la piel'
  },
  ALLERGIC: {
    conditions: [
      'Alergia alimentaria', 'Alergia medicamentosa', 'Alergia al látex', 'Alergia a insectos', 'Rinitis alérgica',
      'Alergia al polen', 'Alergia a ácaros', 'Alergia a animales', 'Dermatitis alérgica', 'Anafilaxia'
    ],
    color: '#C5E1A5', // Verde limón claro
    severity: 'variable',
    description: 'Reacciones alérgicas a diversas sustancias'
  },
  PREGNANCY: {
    conditions: [
      'Embarazo', 'Preeclampsia', 'Diabetes gestacional', 'Placenta previa', 'Hiperémesis gravídica',
      'Eclampsia', 'Embarazo múltiple', 'Amenaza de aborto', 'Incompatibilidad Rh', 'Corioamnionitis'
    ],
    color: '#E6D6FF', // Lila claro
    severity: 'special',
    description: 'Condiciones relacionadas con el embarazo'
  },
  PEDIATRIC: {
    conditions: [
      'Otitis media', 'Crup', 'Bronquiolitis', 'Escarlatina', 'Pie plano',
      'Escoliosis juvenil', 'Reflujo infantil', 'Amigdalitis', 'Adenoiditis', 'Hidrocefalia'
    ],
    color: '#B3E5FC', // Azul celeste claro
    severity: 'variable',
    description: 'Afecciones pediátricas'
  },
  OPHTHALMOLOGICAL: {
    conditions: [
      'Cataratas', 'Glaucoma', 'Conjuntivitis', 'Degeneración macular', 'Retinopatía',
      'Ojo seco', 'Astigmatismo', 'Miopía', 'Hipermetropía', 'Estrabismo'
    ],
    color: '#DCEDC8', // Verde muy claro
    severity: 'medium',
    description: 'Afecciones relacionadas con los ojos'
  },
  UROLOGICAL: {
    conditions: [
      'Infección urinaria', 'Litiasis renal', 'Incontinencia', 'Cistitis', 'Prostatitis',
      'Hipertrofia prostática', 'Nefritis', 'Insuficiencia renal', 'Cistocele', 'Fimosis'
    ],
    color: '#B2DFDB', // Turquesa claro
    severity: 'medium',
    description: 'Afecciones del sistema urinario'
  },
  OTHER: {
    conditions: [
      'Cáncer', 'Enfermedad autoinmune', 'Fatiga crónica', 'Anemia', 'Enfermedad rara',
      'Lupus', 'Síndrome de Sjögren', 'Sarcoidosis', 'Hemofilia', 'Púrpura'
    ],
    color: '#CFD8DC', // Gris claro
    severity: 'variable',
    description: 'Otras condiciones médicas'
  }
};

/**
 * Clasifica una condición médica y devuelve información sobre su categoría
 * @param {string} condition - La condición médica a clasificar
 * @returns {Object} - Objeto con la categoría, color y severidad
 */
export const classifyMedicalCondition = (condition) => {
  // Si no hay condición, devolver null
  if (!condition || condition.trim() === '') {
    return null;
  }
  
  // Normalizar el texto para la búsqueda (minúsculas, sin acentos)
  const normalizedCondition = condition.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  // Buscar en todas las categorías
  for (const [categoryKey, categoryData] of Object.entries(MEDICAL_CATEGORIES)) {
    // Buscar coincidencias aproximadas
    const foundCondition = categoryData.conditions.find(c => {
      const normalizedCategory = c.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      
      // Comprobar si la condición dada está contenida en alguna de las condiciones conocidas
      // o si alguna condición conocida está contenida en la condición dada
      return normalizedCondition.includes(normalizedCategory) || 
             normalizedCategory.includes(normalizedCondition);
    });
    
    if (foundCondition) {
      return {
        category: categoryKey,
        color: categoryData.color,
        severity: categoryData.severity,
        description: categoryData.description
      };
    }
  }
  
  // Si no se encuentra ninguna coincidencia, asignar a "OTROS"
  return {
    category: 'OTHER',
    color: MEDICAL_CATEGORIES.OTHER.color,
    severity: 'unknown',
    description: 'Condición médica no clasificada'
  };
};

/**
 * Determina si un color de fondo requiere texto claro u oscuro para maximizar el contraste
 * @param {string} backgroundColor - Color de fondo en formato hexadecimal (#RRGGBB)
 * @returns {string} - Color de texto recomendado ('white' o 'black')
 */
export const getContrastTextColor = (backgroundColor) => {
  // Eliminar el # si existe
  const hex = backgroundColor.replace('#', '');
  
  // Convertir a RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calcular la luminancia (percepción humana del brillo)
  // Fórmula de luminancia relativa: 0.2126*R + 0.7152*G + 0.0722*B
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  
  // Si la luminancia es mayor a 0.5, el fondo es claro y necesitamos texto oscuro
  return luminance > 0.5 ? 'black' : 'white';
};

/**
 * Aclara u oscurece un color hexadecimal
 * @param {string} color - Color en formato hexadecimal (#RRGGBB)
 * @param {number} percent - Porcentaje de cambio (-100 a 100)
 * @returns {string} - Color modificado en formato hexadecimal
 */
export const adjustColor = (color, percent) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Ajustar cada componente
  const adjustComponent = (component) => {
    const newValue = Math.round(component * (100 + percent) / 100);
    return Math.min(255, Math.max(0, newValue));
  };
  
  const newR = adjustComponent(r);
  const newG = adjustComponent(g);
  const newB = adjustComponent(b);
  
  // Convertir de nuevo a hexadecimal
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

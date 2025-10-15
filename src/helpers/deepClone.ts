export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj; // примитивы возвращаем как есть
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)); // клонируем массив
  }

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]); // рекурсивно клонируем каждое поле
    }
  }
  return cloned;
}

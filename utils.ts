export function arrayAddKey<T> (data: T, initIndex?: string, childrenKey = 'items'): any {
  if (!data || !Array.isArray(data)) return data;
  
  return data.map((item, index) => {
    const curKey = initIndex ? `${initIndex}-${index}`: `${index}`;
    return {
      ...item,
      key: curKey,
      [childrenKey]: item[childrenKey] ? arrayAddKey(item[childrenKey], curKey) : null
    }
  })
};
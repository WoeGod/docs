export function arrayAddKeyAndOpenItems<T> (data: T, initIndex?: string, openItems: string[] = [], childrenKey = 'items'): any {
  if (!data || !Array.isArray(data)) return data;
  
  return data.map((item, index) => {
    const curKey = initIndex ? `${initIndex}-${index}`: `${index}`;
    const curOpenItems = [...openItems, curKey]
    return {
      ...item,
      key: curKey,
      openItems: curOpenItems,
      [childrenKey]: item[childrenKey] ? arrayAddKeyAndOpenItems(item[childrenKey], curKey, curOpenItems) : null
    }
  })
};
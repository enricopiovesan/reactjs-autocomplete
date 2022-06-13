import { useEffect, useState } from 'react';

const useDebaunce = (value: string, offset: number = 200): string => {
  const [debauncedValue, setDebauncedValue] = useState<string>(value);

  useEffect(() => {
    if (!value) return;
    const timeoutRef = setTimeout(() => {
      setDebauncedValue(value);
    }, offset);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [value]);

  return debauncedValue;
};

export default useDebaunce;

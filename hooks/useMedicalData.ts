"use client";

import { useState, useEffect } from 'react';

export function useMedicalData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Simulating network delay for premium realistic feel
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('/data/data.json');
        if (!response.ok) {
          throw new Error('فشل جلب البيانات الطبية');
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message || 'حدث خطأ غير معروف');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

'use client';
import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import Footer from './components/footer';

function Page() {
  const [name, setName] = useState('beef');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [name]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Search setName={setName} setData={setData} />
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-wrap justify-center items-center gap-5 max-w-screen-lg">
          {loading && <h1 className="text-2xl font-semibold text-center mx-4 text-gray-500">Loading...</h1>}
          {!loading && data?.meals?.map((meal) => (
            <Card key={meal.idMeal} meal={meal} />
          ))}
        </div>
        
      </div>
      <Footer />
    </div>
    
  );
}

export default Page;

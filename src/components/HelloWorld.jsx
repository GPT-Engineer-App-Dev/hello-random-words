import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';

const fetchRandomText = async () => {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  return data.content;
};

const HelloWorld = () => {
  const { data: randomText, refetch, isLoading, isError } = useQuery({
    queryKey: ['randomText'],
    queryFn: fetchRandomText,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Hello, World!</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching random text</p>
        ) : (
          <p className="text-gray-800 text-lg mb-4">{randomText}</p>
        )}
        <Button 
          onClick={() => refetch()} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Get New Random Text
        </Button>
      </div>
    </div>
  );
};

export default HelloWorld;
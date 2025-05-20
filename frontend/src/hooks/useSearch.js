import { useState } from 'react';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchIpAssets = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real application, this would be an API call to your blockchain service
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - replace with actual API call in production
      const mockResults = [
        {
          id: '0x1234567890abcdef',
          title: 'Digital Artwork Collection',
          creator: 'CreativeArtist',
          type: 'Digital Art',
          timestamp: 'May 10, 2025',
          previewUrl: 'https://images.pexels.com/photos/2849534/pexels-photo-2849534.jpeg'
        },
        {
          id: '0xabcdef1234567890',
          title: 'Novel Manuscript: Future World',
          creator: 'FuturistWriter',
          type: 'Literature',
          timestamp: 'May 8, 2025',
          previewUrl: 'https://images.pexels.com/photos/1485107/pexels-photo-1485107.jpeg'
        }
      ];

      // Filter results based on search query
      const filteredResults = mockResults.filter(
        result => 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filteredResults);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search IP assets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    searchIpAssets
  };
};

export default useSearch;

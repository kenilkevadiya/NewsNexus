import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard'; // Import the ArticleCard component
import { useNavigate } from 'react-router-dom';

const HomePage = ({ email }) => {
  const [articles, setArticles] = useState([]); // Initialize articles as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://us-central1-labactivity2-442004.cloudfunctions.net/all-articles");
        setArticles(response.data || []); // Use empty array if no articles
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to fetch articles.');
        setLoading(false); // Set loading to false
      }
    };

    fetchArticles();
  }, []);

  const handleAddArticleClick = () => {
    navigate('/add-article'); // Redirect to the Add Article page
  };

  const onLogout = () => {
    navigate('/login');
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>; // Loading state
  if (error) return <p className="text-center text-red-600">{error}</p>; // Error state

  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <header className="flex justify-between items-center mb-8 bg-navy-blue text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={() => window.location.href = '/'}>NewsNexus</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onLogout} className="bg-white text-navy-blue border-2 border-navy-blue hover:bg-blue-100 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 transition"><strong>Logout</strong></button>
          <button onClick={handleAddArticleClick} className="bg-white text-navy-blue border-2 border-navy-blue hover:bg-blue-100 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 transition"><strong>Add Article</strong></button>

          <div className="w-10 h-10 bg-white border-2 border-navy-blue flex items-center justify-center rounded-full">
            <span className="text-navy-blue text-xl font-bold">{firstLetter}</span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.articleID} article={article} />
          ))
        ) : (
          <p>No articles available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

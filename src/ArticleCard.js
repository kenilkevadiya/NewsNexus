import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    if (article.articleID) {
      navigate(`/article/${article.articleID}`);
    } else {
      console.error('articleID is missing');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-black mb-2">{article.title || 'No Title'}</h2>
        <p className="text-gray-600 mb-2"><strong>By {article.author}</strong></p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleMoreDetails}
            className="bg-navy-blue text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-md px-4 py-2 transition"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;








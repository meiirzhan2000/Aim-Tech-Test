import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// Get design news
export const getDesignNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Example of integrating with a news API (using NewsAPI as an example)
    // Note: You would need to register for an API key
    const apiKey = process.env.NEWS_API_KEY;
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: 'web design OR ui design OR ux design',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey
      }
    });
    
    // Transform the data to match our expected format
    const newsItems = response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt
    }));
    
    res.status(200).json({
      status: 'success',
      results: newsItems.length,
      news: newsItems
    });
  } catch (error) {
    // If API call fails, return sample data
    console.error('Error fetching news from API:', error);
    
    // Sample data
    const sampleNews = [
      {
        title: 'The Future of UI Design: Trends to Watch in 2025',
        description: 'Explore the upcoming trends in UI design that will shape the digital landscape in 2025 and beyond.',
        url: 'https://example.com/ui-design-trends-2025',
        imageUrl: 'https://example.com/images/ui-trends.jpg',
        publishedAt: '2025-03-25T10:30:00Z'
      },
      {
        title: 'How AI is Transforming the Design Industry',
        description: 'Artificial intelligence tools are revolutionizing how designers work, enabling new levels of creativity and efficiency.',
        url: 'https://example.com/ai-design-transformation',
        imageUrl: 'https://example.com/images/ai-design.jpg',
        publishedAt: '2025-03-20T14:15:00Z'
      },
      {
        title: 'Sustainable Design Practices for Digital Products',
        description: 'Learn how designers are incorporating sustainability principles into digital product design to reduce environmental impact.',
        url: 'https://example.com/sustainable-design',
        imageUrl: 'https://example.com/images/sustainable-design.jpg',
        publishedAt: '2025-03-15T09:45:00Z'
      }
    ];
    
    res.status(200).json({
      status: 'success',
      results: sampleNews.length,
      news: sampleNews
    });
  }
};
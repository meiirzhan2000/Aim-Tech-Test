import { ref, onMounted } from 'vue';
import axios from 'axios';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
}

export function useLanding() {
  const loading = ref(false);
  const newsItems = ref<NewsItem[]>([]);

  const fetchNews = async () => {
    loading.value = true;

    try {
      const response = await axios.get('https://aim-test-assignment.onrender.com/api/news');

      if (response.data && response.data.status === 'success' && response.data.news) {
        newsItems.value = response.data.news.slice(0, 3); // Just display the first 3 news items
      } else {
        console.error('Invalid API response format');
        useSampleNewsData(); // Fallback to sample data
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      useSampleNewsData(); // Fallback to sample data
    } finally {
      loading.value = false;
    }
  };

  const useSampleNewsData = () => {
    newsItems.value = [
      {
        title: 'The Future of UI Design: Trends to Watch in 2025',
        description: 'Explore the upcoming trends in UI design that will shape the digital landscape in 2025 and beyond.',
        url: 'https://example.com/design-trends',
        imageUrl: 'https://via.placeholder.com/400x200?text=Design+Trends',
        publishedAt: '2025-03-25T10:30:00Z'
      },
      {
        title: 'How AI is Transforming the Design Industry',
        description: 'Artificial intelligence tools are revolutionizing how designers work, enabling new levels of creativity and efficiency.',
        url: 'https://example.com/ai-design',
        imageUrl: 'https://via.placeholder.com/400x200?text=AI+Design',
        publishedAt: '2025-03-20T14:15:00Z'
      },
      {
        title: 'Sustainable Design Practices for Digital Products',
        description: 'Learn how designers are incorporating sustainability principles into digital product design to reduce environmental impact.',
        url: 'https://example.com/sustainable-design',
        imageUrl: 'https://via.placeholder.com/400x200?text=Sustainable+Design',
        publishedAt: '2025-03-15T09:45:00Z'
      }
    ];
  };

  const formatNewsDate = (dateString: string) => {
    try {
      if (!dateString) return 'No date';

      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date error';
    }
  };

  onMounted(() => {
    fetchNews();
  });

  return {
    loading,
    newsItems,
    formatNewsDate
  };
}
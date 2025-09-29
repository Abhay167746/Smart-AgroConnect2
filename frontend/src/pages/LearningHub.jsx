import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LearningImage from "../assets/learning3.jpg";
import ExpertForm from "../components/LearningHub/ExpertForm";
import HeroBanner from "../components/LearningHub/HeroBanner";
import NewsGrid from "../components/LearningHub/NewsGrid";
import VideosGrid from "../components/LearningHub/VideosGrid";

export default function LearningHub() {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=farming OR agriculture OR crops OR "farmer news" OR irrigation OR "crop prices"&language=en&pageSize=6&sortBy=publishedAt&apiKey=a54786939b9a462f97355f7dc7600993`
        );
        const data = await res.json();
        if (data.status === "ok") setNews(data.articles || []);
        else toast.error("Failed to fetch news");
      } catch (err) {
        console.error(err);
        toast.error("Error fetching news");
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50">
      <HeroBanner
        backgroundUrl={LearningImage}
        title="🌾 Farmer Learning Hub"
        subtitle="Empowering farmers with knowledge, tools, and expert guidance to grow better and earn more."
      />

      <div className="mx-auto max-w-6xl space-y-12 p-6">
        <section>
          <h2 className="mb-6 text-2xl font-bold text-emerald-900">
            📰 Latest Agriculture News
          </h2>
          <NewsGrid loading={loadingNews} articles={news} />
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-emerald-900">
            🎥 Learning Videos
          </h2>
          <VideosGrid />
        </section>
        <ExpertForm />
      </div>
    </div>
  );
}

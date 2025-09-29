import ArticleCard from "./ArticleCard";

function ArticleSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200/30 bg-white p-4 shadow animate-pulse">
      <div className="h-36 w-full rounded-lg bg-gray-200" />
      <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-5/6 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-4/6 rounded bg-gray-200" />
      <div className="mt-4 h-3 w-24 rounded bg-gray-200" />
    </div>
  );
}

export default function NewsGrid({ loading, articles }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200/30 bg-white p-10 text-center shadow">
        <img
          src="https://illustrations.popsy.co/green/leaf.svg"
          alt="No news"
          className="mb-4 h-28 w-28"
          loading="lazy"
        />
        <h3 className="text-lg font-semibold text-emerald-800">
          No news found
        </h3>
        <p className="mt-1 max-w-md text-sm text-emerald-800/80">
          Try again later or adjust the query keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          description={article.description}
          url={article.url}
          source={article.source?.name || "Unknown"}
          image={article.urlToImage}
        />
      ))}
    </div>
  );
}

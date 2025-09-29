import ResponsiveVideo from "./ResponsiveVideo";

export default function VideosGrid() {
  const videos = [
    {
      title: "Best Irrigation Practices",
      src: "https://www.youtube.com/embed/Z9HAy9EYKKs",
    },
    {
      title: "Organic Fertilizer Guide",
      src: "https://www.youtube.com/embed/MM1MVa4kLwc",
    },
    {
      title: "Crop Protection Tips",
      src: "https://www.youtube.com/embed/nb2EvdW9Kes",
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <ResponsiveVideo key={i} title={v.title} src={v.src} />
      ))}
    </div>
  );
}

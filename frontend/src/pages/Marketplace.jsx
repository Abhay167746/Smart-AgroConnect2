import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProduceCard from "../components/ProduceCard";
import { getProduceList } from "../services/ProduceService";
const Marketplace = () => {
  const [produceList, setProduceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduceList();
        setProduceList(data);
      } catch (err) {
        console.error("Error fetching produce", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Marketplace</h1>
        <Link
          to="/marketplace/list"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          + List Your Produce
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produceList.length === 0 ? (
          <p className="text-gray-500">No produce listed yet.</p>
        ) : (
          produceList.map((item, idx) => <ProduceCard key={idx} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Marketplace;

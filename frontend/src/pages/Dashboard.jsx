import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProduce } from "../services/ProduceService";
import ProduceCard from "../components/ProduceCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [produceList, setProduceList] = useState([]);

  useEffect(() => {
    const fetchUserProduce = async () => {
      if (!user?.uid) return;
      try {
        const data = await getUserProduce(user.uid);
        setProduceList(data);
      } catch (err) {
        console.error("Error loading user produce", err);
      }
    };

    fetchUserProduce();
  }, [user]);

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Welcome, {user?.displayName || user?.email}
      </h2>
      <h3 className="text-xl mb-4">Your Listed Produce:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produceList.length === 0 ? (
          <p className="text-gray-500">You haven't listed anything yet.</p>
        ) : (
          produceList.map((item, idx) => <ProduceCard key={idx} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;

const ProduceCard = ({ item }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg">
        <h3 className="text-xl font-semibold text-green-700">{item.crop}</h3>
        <p className="text-sm text-gray-500">Location: {item.location}</p>
        <p className="mt-2 font-medium">Quantity: {item.quantity} kg</p>
        <p className="text-green-600 font-bold">₹ {item.price} / kg</p>
      </div>
    );
  };
  
  export default ProduceCard;
  
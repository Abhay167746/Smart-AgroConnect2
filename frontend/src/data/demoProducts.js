// src/data/demoProducts.js
import cabbageImg from "../assets/cabbage.jpg";
import carrotImg from "../assets/carrot.jpg";
import onionImg from "../assets/onion.jpg";
import potatoImg from "../assets/potato.jpg";
import spinachImg from "../assets/spinach.jpg";
import tomatoImg from "../assets/tomato.jpg";

// Demo products shaped for ProduceCard and Marketplace filters
const demoProducts = [
  {
    id: "DEMO-001",
    crop: "Cabbage",
    variety: "Green",
    location: "Akola, MH",
    quantity: 300,
    unit: "kg",
    price: 18,
    quality: "Verified",
    harvestDate: "2025-09-18",
    rating: 4.7,
    imageUrl: cabbageImg,
  },
  {
    id: "DEMO-002",
    crop: "Carrot",
    variety: "Nantes",
    location: "Pune, MH",
    quantity: 250,
    unit: "kg",
    price: 26,
    quality: "Verified",
    harvestDate: "2025-09-20",
    rating: 4.6,
    imageUrl: carrotImg,
  },
  {
    id: "DEMO-003",
    crop: "Onion",
    variety: "Red",
    location: "Nashik, MH",
    quantity: 500,
    unit: "kg",
    price: 22,
    quality: "Pending",
    harvestDate: "2025-09-19",
    rating: 4.2,
    imageUrl: onionImg,
  },
  {
    id: "DEMO-004",
    crop: "Potato",
    variety: "Chipsona",
    location: "Indore, MP",
    quantity: 600,
    unit: "kg",
    price: 20,
    quality: "Verified",
    harvestDate: "2025-09-17",
    rating: 4.5,
    imageUrl: potatoImg,
  },
  {
    id: "DEMO-005",
    crop: "Spinach",
    variety: "Bloomsdale",
    location: "Nagpur, MH",
    quantity: 120,
    unit: "kg",
    price: 35,
    quality: "Verified",
    harvestDate: "2025-09-21",
    rating: 4.8,
    imageUrl: spinachImg,
  },
  {
    id: "DEMO-006",
    crop: "Tomato",
    variety: "Roma",
    location: "Surat, GJ",
    quantity: 400,
    unit: "kg",
    price: 28,
    quality: "Verified",
    harvestDate: "2025-09-16",
    rating: 4.6,
    imageUrl: tomatoImg,
  },
];

export default demoProducts;

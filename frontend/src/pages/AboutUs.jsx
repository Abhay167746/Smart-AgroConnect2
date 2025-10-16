
import React from "react";
import Founders from "../assets/founders.jpg";

const AboutUs = () => {
  // Scroll to footer function
  const scrollToFooter = () => {
    const footer = document.getElementById("contact-us-footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 px-4">
      <div className="mx-auto max-w-7xl bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-700 text-center mb-6">
          About SmartAgroConnect
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center mb-10">
          At{" "}
          <span className="font-semibold text-emerald-700">SmartAgroConnect</span>,
          we are building the future of agriculture using{" "}
          <span className="text-blue-600 font-semibold">Blockchain, AI, and IoT</span>.
          Our platform connects farmers, suppliers, and consumers directly — ensuring transparency, trust, and fair trade for everyone in the food ecosystem.
        </p>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-200 rounded-2xl p-6 shadow-lg border border-gray-100 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <h2 className="text-2xl font-semibold mb-3">🌍 Our Vision</h2>
            <p>
              To create a sustainable and transparent food supply chain where
              farmers earn fair prices, food waste is reduced, and consumers get
              quality products with complete trust.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-blue-200 rounded-2xl p-6 shadow-lg border border-gray-100 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <h2 className="text-2xl font-semibold mb-3">🎯 Our Mission</h2>
            <p>
              Empower farmers with technology, eliminate middlemen, and provide
              consumers with high-quality, verified food products through a
              secure blockchain-powered platform.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            👩‍💻 Our Team
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-7xl mx-auto">
            <div className="md:w-1/2">
              <img
                src={Founders}
                alt="Smart AgroConnect Team"
                className="rounded-2xl shadow-lg w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
                We are a passionate group of engineers and innovators, committed
                to solving real-world agricultural challenges. Our diverse skills in{" "}
                <span className="font-semibold">Web Development, AI, IoT, and Blockchain</span>{" "}
                help us bring modern solutions to age-old problems in the food
                industry. Our team constantly researches emerging technologies
                to integrate into our platform. We focus on creating smart
                solutions that reduce food wastage, increase efficiency in
                distribution, and provide real-time insights to farmers and
                consumers. By combining innovation with practicality, we strive
                to make agriculture smarter, safer, and more rewarding for
                everyone involved.
              </p>
              <p className="mt-5 text-gray-800 font-bold">
                Aman Gupt, Omkumar Rath, Abhay Tiwari, Sumit Gupta (Co-founders)
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-center text-white shadow-md">
          <h2 className="text-2xl font-bold mb-3">Join Our Journey 🚀</h2>
          <p className="mb-4">
            We’re on a mission to transform agriculture and empower millions of
            farmers. Together, we can build a transparent, fair, and sustainable
            future for food.
          </p>
          {/* Button scrolls to footer */}
          <button
            onClick={scrollToFooter}
            className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

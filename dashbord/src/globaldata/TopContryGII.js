import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TopCountriesDisplay = ({ selectedContinent }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (selectedContinent) {
      fetch("http://localhost:5000/api/data")
        .then((response) => response.json())
        .then((data) => {
          const filteredCountries = data
            .filter(
              (item) =>
                item.CONTINENT === selectedContinent &&
                item["Gender Inequality Index"] > 5.5
            )
            .sort((a, b) => b["Gender Inequality Index"] - a["Gender Inequality Index"])
            .slice(0, 5); 
          setCountries(filteredCountries);
        });
    }
  }, [selectedContinent]);

  return (
    <div className="mt-8">
      {countries.length > 0 ? (
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="text-xl font-semibold text-gray-600 mb-6">
            Top 5 Countries in {selectedContinent} with Highest Gender Inequality Index (Threshold = 5.5 on a 10 scale)
          </h2>
          {countries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-blue-100 w-[300px] h-[90px] p-3 w-full rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-bold text-blue-600">{country.COUNTRY}</h3>
              <p className="mt-2 text-gray-600">
                Gender Inequality Index: {country["Gender Inequality Index"]}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No data available for the selected continent.</p>
      )}
    </div>
  );
};

export default TopCountriesDisplay;

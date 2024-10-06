import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import TopCountriesDisplay from '../globaldata/TopContryGII';
import GiniGenderScatterPlot from '../globaldata/GiniIndexGII';
import ScatterPlot3D from '../globaldata/Scatter3D';
import MettricDisaster from '../globaldata/ScatterMetrics';

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [selectedSocioEconomic, setSelectedSocioEconomic] = useState('');
  const [socialIndices, setSocialIndices] = useState([]);
  const [nationalDisasterMetrics, setNationalDisasterMetrics] = useState([]);
  const [selectedNationalDisasterMetric, setSelectedNationalDisasterMetric] = useState('');


  // Fetch data from the API and extract unique continents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const data = response.data;
        const uniqueContinents = [...new Set(data.map(item => item.CONTINENT))];
        setContinents(uniqueContinents);
        
         const indices = [
          { key: "Human Development Index", label: "Human Development Index" },
          { key: "Multidimensional Poverty Index", label: "Multidimensional Poverty Index" },
          { key: "Aid Dependency Index", label: "Aid Dependency Index" },
          { key: "Socio-Economic Vulnerability", label: "Socio-Economic Vulnerability" },
          { key: "Health Conditions_y", label: "Health Conditions" },
          { key: "Child Mortality", label: "Child Mortality" },
          { key: "Malnutrition in children under 5", label: "Child Malnutrition" },
          { key: "Food Security_y", label: "Food Security" },
          { key: "Estimated number of people living with HIV - Adult (>15) rate", label: "HIV Prevalence Rate" },
          { key: "Tuberculosis prevalence", label: "Tuberculosis Prevalence" },
          { key: "Access to health care", label: "Access to Health Care" },
          { key: "Governance", label: "Governance" },
          { key: "Infrastructure", label: "Infrastructure" },
        ];
        setSocialIndices(indices);

         const disasterMetrics = [
          "Physical exposure to earthquake MMI VI (absolute)",
          "Physical exposure to earthquake MMI VIII (absolute)",
          "Physical exposure to earthquake (absolute)",
          "Annual Expected Exposed People to Floods",
          "Annual Expected Exposed People to Tsunamis",
          "Annual Expected Exposed People to Cyclone's Wind SS1",
          "Annual Expected Exposed People to Cyclone's Wind SS3",
          "Annual Expected Exposed People to Cyclone's Wind (absolute)",
          "Physical exposure to surge from tropical cyclone (absolute)",
          "Annual Expected Exposed People to Cyclone (absolute)",
          "People affected by droughts (absolute)",
          "Physical exposure to earthquake MMI VI (relative)",
          "Physical exposure to earthquake MMI VIII (relative)",
          "Physical exposure to flood (relative)",
          "Physical exposure to tsunami (relative)",
          "Physical exposure to tropical cyclone of Saffir-Simpson category 1 (relative)",
          "Physical exposure to tropical cyclone of Saffir-Simpson category 3 (relative)",
          "Physical exposure to surge from tropical cyclone (relative)",
          "People affected by droughts (relative)",
          "Physical exposure to earthquake (relative)",
          "Physical exposure to tropical cyclone wind (relative)",
          "Physical exposure to tropical cyclone (relative)",
          "Frequency of Drought events",
          "Physical exposure to earthquake MMI VI",
          "Physical exposure to earthquake MMI VIII",
          "Physical exposure to tropical cyclone of Saffir-Simpson category 1",
          "Physical exposure to tropical cyclone of Saffir-Simpson category 3",
          "Physical exposure to tropical cyclone wind",
          "Physical exposure to surge from tropical cyclone",
          "People affected by droughts",
          "Physical exposure to earthquake",
          "Physical exposure to flood",
          "Physical exposure to tsunami",
          "Physical exposure to tropical cyclone",
          "People affected by droughts and Frequency of events",
          "Agriculture Droughts probability",
        ];
        setNationalDisasterMetrics(disasterMetrics);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleFilterBox = () => {
    setIsOpen(!isOpen);
  };

    const handleSocioEconomicChange = (e) => {
    setSelectedSocioEconomic(e.target.value);
    };
  
    const handleNationalDisasterChange = (e) => {
    setSelectedNationalDisasterMetric(e.target.value);
  };

  return (
    <div>
        <header className="bg-gray-900 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-white">InfoBridge</div>
          <nav className="space-x-4">
            <a href="/global-data" className="text-white hover:text-green-600">Global Data</a>
            <a href="#local-cases" className="text-white hover:text-green-600">Local Case Studies</a>
            <a href="#proposed-solutions" className="text-white hover:text-green-600">Proposed Solutions</a>
            <a href="#interactive-maps" className="text-white hover:text-green-600">3D Interactive Maps</a>
            <a href="#ai-chatbot" className="text-white hover:text-green-600">AI Chatbot</a>
          </nav>
        </div>
      </header>
    <div className="flex h-screen w-full bg-gray-900 text-white">
 
      {/* Sidebar for Filters */}
      <motion.div
        className={`bg-gray-800 p-6 w-1/5 h-full shadow-lg transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-lg font-bold mb-4 text-white">InfoBridge Dashboard: Gender Inequality-Climate Change</h1>
        <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>
        <div className="space-y-4">
          {/* Continent Filter */}
          <div>
            <label htmlFor="continent" className="block text-sm font-medium text-gray-300">
              Continent:
            </label>
            <select
              id="continent"
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
            >
              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          {/* Disaster Type Filter */}
          <div>
            <label htmlFor="disaster" className="block text-sm font-medium text-gray-300">
              Disaster Type:
            </label>
            <select
              id="disaster"
              value={selectedDisaster}
              onChange={(e) => setSelectedDisaster(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
            >
              <option value="Earthquake">Earthquake</option>
              <option value="Flood">Flood</option>
              <option value="Tsunami">Tsunami</option>
              <option value="Tropical Cyclone">Tropical Cyclone</option>
              <option value="Drought">Drought</option>
            </select>
          </div>

          {/* National Disaster Metric */}
          <div>
            <label htmlFor="national-disaster" className="block text-sm font-medium text-gray-300">
              National Disaster Metric:
            </label>
            <select
              id="national-disaster"
              value={selectedNationalDisasterMetric}
              onChange={handleNationalDisasterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
            >
              {nationalDisasterMetrics.map((metric) => (
                <option key={metric} value={metric}>
                  {metric}
                </option>
              ))}
            </select>
          </div>

          {/* Social Index Filter */}
          <div>
            <label htmlFor="social-index" className="block text-sm font-medium text-gray-300">
              Social Index:
            </label>
            <select
              id="social-index"
              value={selectedSocioEconomic}
              onChange={handleSocioEconomicChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
            >
              {socialIndices.map((index) => (
                <option key={index.key} value={index.key}>
                  {index.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-900">
        <div className="mb-6">
          <TopCountriesDisplay selectedContinent={selectedContinent} />
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 h-96 rounded-lg shadow-md">
            <GiniGenderScatterPlot selectedContinent={selectedContinent} selectedMetricDesaster={selectedNationalDisasterMetric} selectedSocialIndex={selectedSocioEconomic} />
          </div>
          <div className="bg-gray-800 h-96 rounded-lg shadow-md">
            <MettricDisaster selectedContinent={selectedContinent} selectedMetricDesaster={selectedNationalDisasterMetric} />
          </div>
          
        </div>
        
      
      </div>
       
      </div>
       <ScatterPlot3D 
          selectedContinent={selectedContinent} 
          selectedSocialIndex={selectedSocioEconomic}  
          selectedDisasterType={selectedNationalDisasterMetric} 
        />
      </div>
  );
};

export default DashboardHeader;

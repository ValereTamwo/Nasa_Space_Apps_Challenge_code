import React from 'react';
import WorldMap from '../globaldata/Worldmap';
import EmploymentBarChart from '../globaldata/EmploymentBarChart';
import WomenImpactLineChart from '../globaldata/WomenImpactLineChart';

const GlobalDataPage = () => {
  return (
    <>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-bold">Women at Risk of Climate Disasters</h3>
            <p className="text-4xl font-bold text-blue-600">42%</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-bold">Female Employment Disrupted by Climate</h3>
            <p className="text-4xl font-bold text-blue-600">29%</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-bold">Regions with High Vulnerability</h3>
            <p className="text-4xl font-bold text-blue-600">15 Countries</p>
          </div>
          </div>
          

          </section>
          <section className="bg-white py-6">
  <div className="container mx-auto flex space-x-4">
    <select className="p-2 border rounded">
      <option value="">Select Region</option>
      <option value="africa">Africa</option>
      <option value="asia">Asia</option>
      <option value="americas">Americas</option>
    </select>
    <select className="p-2 border rounded">
      <option value="">Select Year</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
    </select>
    <select className="p-2 border rounded">
      <option value="">Select Disaster Type</option>
      <option value="flood">Flood</option>
      <option value="drought">Drought</option>
      <option value="wildfire">Wildfire</option>
    </select>
  </div>
</section></>
          );
};

export default GlobalDataPage;

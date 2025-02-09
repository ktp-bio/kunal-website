import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';

const HealthAndHiking = () => {
  const [timeRange, setTimeRange] = useState('W');

  // Expanded sample data
  const hikes = [
    {
      id: 1,
      title: "Mount Tamalpais Loop",
      date: "2024-02-01",
      description: "Beautiful 7-mile loop with ocean views",
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400"]
    },
    {
      id: 2,
      title: "Muir Woods Trail",
      date: "2024-02-05",
      description: "Peaceful redwood forest trail with plenty of shade",
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"]
    },
  ];

  // Simplified step data for better visualization
  const allStepData = {
    D: [
      { name: '12AM', steps: 500 },
      { name: '4AM', steps: 1200 },
      { name: '8AM', steps: 3400 },
      { name: '12PM', steps: 5600 },
      { name: '4PM', steps: 7800 },
      { name: '8PM', steps: 9200 },
      { name: '11PM', steps: 10000 },
    ],
    W: [
      { name: 'Mon', steps: 8432 },
      { name: 'Tue', steps: 10251 },
      { name: 'Wed', steps: 7654 },
      { name: 'Thu', steps: 12543 },
      { name: 'Fri', steps: 9876 },
      { name: 'Sat', steps: 11234 },
      { name: 'Sun', steps: 8765 },
    ],
    M: [
      { name: 'Week 1', steps: 9500 },
      { name: 'Week 2', steps: 10200 },
      { name: 'Week 3', steps: 8900 },
      { name: 'Week 4', steps: 11300 },
    ],
    '6M': [
      { name: 'Sep', steps: 9200 },
      { name: 'Oct', steps: 8900 },
      { name: 'Nov', steps: 7800 },
      { name: 'Dec', steps: 8200 },
      { name: 'Jan', steps: 9100 },
      { name: 'Feb', steps: 10200 },
    ],
    Y: [
      { name: 'Q1', steps: 8800 },
      { name: 'Q2', steps: 9200 },
      { name: 'Q3', steps: 9800 },
      { name: 'Q4', steps: 8900 },
    ],
  };

  // State for tracking current image for each hike
  const [currentImageIndices, setCurrentImageIndices] = useState(
    Object.fromEntries(hikes.map(hike => [hike.id, 0]))
  );

  const navigateImages = (hikeId, direction) => {
    const currentIndex = currentImageIndices[hikeId];
    const hikeImages = hikes.find(h => h.id === hikeId).images;
    
    setCurrentImageIndices(prev => ({
      ...prev,
      [hikeId]: direction === 'next'
        ? (currentIndex + 1) % hikeImages.length
        : (currentIndex - 1 + hikeImages.length) % hikeImages.length
    }));
  };

  // Calculate average steps for current time range
  const { currentStepData, averageSteps } = useMemo(() => {
    const data = allStepData[timeRange] || [];
    const avg = data.reduce((sum, day) => sum + day.steps, 0) / data.length;
    return {
      currentStepData: data,
      averageSteps: Math.round(avg)
    };
  }, [timeRange]);

  // Updated color scheme
  const colors = {
    feather: '#77C9D4',
    marine: '#57BC90',
    forest: '#015249',
    white: '#FFFFFF',
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${colors.feather} 0%, ${colors.marine} 100%)` }}>
      {/* Navigation */}
      <nav className="p-6" style={{ borderBottom: `1px solid ${colors.forest}30` }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" 
               style={{ background: colors.forest }}>
            KP
          </div>
          <div className="flex gap-8">
            <a href="/" className="text-lg hover:opacity-80 transition-colors" 
               style={{ color: colors.forest }}>Home</a>
            <a href="#health" className="text-lg" 
               style={{ color: colors.forest, fontWeight: 'bold' }}>Health+Hiking</a>
            <a href="#photos" className="text-lg hover:opacity-80 transition-colors" 
               style={{ color: colors.forest }}>Photos</a>
            <a href="#blog" className="text-lg hover:opacity-80 transition-colors" 
               style={{ color: colors.forest }}>Blog</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hikes Grid Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: colors.forest }}>
            Recent Adventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hikes.map((hike) => (
              <div key={hike.id} className="rounded-lg p-4" 
                   style={{ background: `${colors.white}10`, backdropFilter: 'blur(8px)' }}>
                <div className="relative aspect-square">
                  <img
                    src={hike.images[currentImageIndices[hike.id]]}
                    alt={`${hike.title}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => navigateImages(hike.id, 'prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:opacity-80 transition-opacity"
                    style={{ background: colors.forest }}
                  >
                    <ChevronLeft className="text-white" />
                  </button>
                  <button
                    onClick={() => navigateImages(hike.id, 'next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:opacity-80 transition-opacity"
                    style={{ background: colors.forest }}
                  >
                    <ChevronRight className="text-white" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {hike.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors`}
                        style={{ 
                          background: idx === currentImageIndices[hike.id] ? colors.forest : colors.white,
                          opacity: idx === currentImageIndices[hike.id] ? 1 : 0.5
                        }}
                        onClick={() => setCurrentImageIndices(prev => ({ ...prev, [hike.id]: idx }))}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold" style={{ color: colors.forest }}>
                    {hike.title}
                  </h3>
                  <p className="mt-2" style={{ color: colors.white }}>
                    {hike.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step Tracker Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold" style={{ color: colors.forest }}>
                Step Tracker
              </h2>
              <p className="mt-2" style={{ color: colors.white }}>
                Average: {averageSteps.toLocaleString()} steps
              </p>
            </div>
            <div className="flex gap-2 rounded-lg p-1" style={{ background: `${colors.white}10`, backdropFilter: 'blur(8px)' }}>
              {['D', 'W', 'M', '6M', 'Y'].map((range) => (
                <button
                  key={range}
                  className={`px-4 py-2 rounded-md transition-colors`}
                  style={{
                    background: timeRange === range ? colors.forest : 'transparent',
                    color: timeRange === range ? colors.white : colors.forest
                  }}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg p-6" style={{ background: `${colors.white}10`, backdropFilter: 'blur(8px)' }}>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentStepData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke={colors.white}
                  />
                  <YAxis 
                    stroke={colors.white}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.forest,
                      border: 'none',
                      borderRadius: '8px',
                      color: colors.white
                    }}
                    formatter={(value) => [`${value.toLocaleString()} steps`]}
                  />
                  <ReferenceLine 
                    y={averageSteps} 
                    stroke={colors.white} 
                    strokeDasharray="3 3"
                    label={{ 
                      value: 'Average',
                      position: 'right',
                      fill: colors.white
                    }}
                  />
                  <Bar 
                    dataKey="steps" 
                    fill={colors.forest}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HealthAndHiking;
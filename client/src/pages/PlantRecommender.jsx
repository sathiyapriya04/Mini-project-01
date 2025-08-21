import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

// Custom icon components to replace lucide-react
const Camera = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <circle cx={12} cy={13} r={3} />
  </svg>
);

const Upload = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const MapPin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Thermometer = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a6 6 0 0012 0v-3" />
  </svg>
);

const Leaf = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
  </svg>
);

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SOIL_TYPES = [
  { name: "Sandy", emoji: "🏖️", color: "from-yellow-400 to-amber-500" },
  { name: "Clay", emoji: "🧱", color: "from-orange-400 to-red-500" },
  { name: "Silty", emoji: "🌊", color: "from-blue-400 to-indigo-500" },
  { name: "Peaty", emoji: "🌿", color: "from-green-400 to-emerald-500" },
  { name: "Chalky", emoji: "⚪", color: "from-gray-400 to-slate-500" },
  { name: "Loamy", emoji: "🌱", color: "from-emerald-400 to-green-600" },
  { name: "Red Soil", emoji: "🔴", color: "from-red-400 to-rose-500" },
  { name: "Black Soil", emoji: "⚫", color: "from-gray-600 to-black" },
  { name: "Alluvial Soil", emoji: "🏞️", color: "from-teal-400 to-cyan-500" },
  { name: "Laterite Soil", emoji: "🟠", color: "from-orange-500 to-red-600" },
  { name: "Saline Soil", emoji: "🧂", color: "from-blue-300 to-blue-500" },
  { name: "Alkaline Soil", emoji: "🔵", color: "from-purple-400 to-blue-500" },
  { name: "Coastal Alluvium", emoji: "🏖️", color: "from-cyan-400 to-blue-500" },
  { name: "Deltaic Alluvium", emoji: "🏞️", color: "from-green-400 to-teal-500" },
  { name: "Mixed Red and Black Soil", emoji: "🔴⚫", color: "from-red-400 to-gray-600" },
  { name: "Forest Soil", emoji: "🌲", color: "from-green-500 to-emerald-700" },
  { name: "Calcareous Soil", emoji: "🤍", color: "from-gray-300 to-gray-500" }
];

export default function PlantRecommender() {
  const [soilType, setSoilType] = useState("");
  const [soilImage, setSoilImage] = useState(null);
  const [location, setLocation] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [fetchingTemp, setFetchingTemp] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [climateZone, setClimateZone] = useState("");
  const [analysisDetails, setAnalysisDetails] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);
  const webcamRef = useRef(null);

  // Handle soil image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPG, PNG, GIF, or WebP).");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("File size too large. Please select an image smaller than 5MB.");
      return;
    }

    // Clear any previous errors
    setError("");
    
    // Set the file and clear other inputs
    setSoilImage(file);
    setSoilType("");
    setCapturedImage(null);
    setRecommendations([]);
    setClimateZone("");
    setAnalysisDetails({});
    
    console.log("Image selected:", file.name, "Size:", (file.size / 1024 / 1024).toFixed(2), "MB");
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      // Create a fake event object to reuse handleImageChange
      const fakeEvent = { target: { files: [file] } };
      handleImageChange(fakeEvent);
    }
  };

  // Handle soil type selection
  const handleSoilTypeChange = (selectedSoil) => {
    setSoilType(selectedSoil);
    setSoilImage(null);
    setCapturedImage(null);
    setDropdownOpen(false);
    setRecommendations([]);
    setClimateZone("");
    setAnalysisDetails({});
  };

  // Handle camera capture (real webcam)
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowCamera(false);
    setSoilImage(null);
    setSoilType("");
    setRecommendations([]);
    setClimateZone("");
    setAnalysisDetails({});
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowCamera(true);
  };

  // Add geocoding helper
  const getCoordsFromLocation = async (locationName) => {
    const GEOCODE_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationName)}&limit=1&appid=${WEATHER_API_KEY}`;
    try {
      const res = await fetch(GEOCODE_API_URL);
      const data = await res.json();
      console.log('Geocoding API response:', data); // Debug log
      if (Array.isArray(data) && data.length > 0) {
        return { lat: data[0].lat, lon: data[0].lon };
      }
      return null;
    } catch (err) {
      console.error('Geocoding error:', err);
      return null;
    }
  };

  const WEATHER_API_KEY = "953cb90f15dd29262ddbf6781e3d6c2c";
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const fetchTemperature = async (customLocation) => {
    setFetchingTemp(true);
    let lat, lon;
    let usedLocation = customLocation !== undefined ? customLocation : location;
    if (usedLocation && usedLocation.trim() !== "") {
      // Use geocoding API
      const coords = await getCoordsFromLocation(usedLocation);
      if (!coords) {
        setTemperature(null);
        setFetchingTemp(false);
        setError("Location not found. Please enter a valid location name.");
        return;
      }
      lat = coords.lat;
      lon = coords.lon;
    } else if (navigator.geolocation) {
      // Use browser geolocation
      await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            resolve();
          },
          (err) => {
            setTemperature(null);
            setFetchingTemp(false);
            setError("Location permission denied or unavailable.");
            console.error('Geolocation error:', err);
            resolve();
          }
        );
      });
      if (!lat || !lon) return;
    } else {
      setTemperature(null);
      setFetchingTemp(false);
      setError("Geolocation not supported");
      console.error('Geolocation not supported');
      return;
    }
    try {
      const res = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await res.json();
      console.log('Weather API response:', data); // Debug log
      if (data && data.main && typeof data.main.temp === 'number') {
        setTemperature(Math.round(data.main.temp));
        setError("");
      } else {
        setTemperature(null);
        setError("Could not fetch temperature for this location.");
      }
    } catch (err) {
      setTemperature(null);
      setError("Weather fetch error");
      console.error('Weather fetch error:', err);
    }
    setFetchingTemp(false);
  };

  // Fetch temperature on every page load
  React.useEffect(() => {
    fetchTemperature();
    // eslint-disable-next-line
  }, []);

  // Still fetch temperature when soilType, soilImage, or capturedImage changes
  React.useEffect(() => {
    if (soilType || soilImage || capturedImage) {
      fetchTemperature();
    }
    // eslint-disable-next-line
  }, [soilType, soilImage, capturedImage]);

  // Handle form submission
  const handleSubmit = async () => {
    console.log("handleSubmit called"); // Debug log
    setLoading(true);
    setError("");
    
    // Validate that user has provided either soil type or image
    if (!soilType && !soilImage && !capturedImage) {
      setError("Please select a soil type or upload/capture a soil image first.");
      setLoading(false);
      return;
    }
    
    let detectedSoilType = soilType;
    let imageToSend = soilImage;

    // If camera image is used, convert dataURL to Blob
    if (capturedImage) {
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      imageToSend = new File([blob], "captured.jpg", { type: blob.type });
    }

    // If image is uploaded or captured, detect soil type via backend
    if (imageToSend) {
      const formData = new FormData();
      formData.append("image", imageToSend);
      try {
        const res = await fetch("http://localhost:5000/api/detect-soil", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.soil_type) {
          detectedSoilType = data.soil_type;
          console.log("Detected soil type:", detectedSoilType);
        } else {
          setError("Could not detect soil type from image.");
          setLoading(false);
          return;
        }
      } catch (err) {
        setError("Error detecting soil type.");
        setLoading(false);
        return;
      }
    }

    // Ensure we have a valid soil type
    if (!detectedSoilType) {
      setError("No soil type available. Please select a soil type or upload an image.");
      setLoading(false);
      return;
    }

    // Ensure we have temperature data
    if (temperature === null) {
      setError("Temperature data not available. Please wait for temperature to load or enter a location.");
      setLoading(false);
      return;
    }

    // Get plant recommendations
    try {
      console.log("Sending recommendation request with:", {
        soil_type: detectedSoilType,
        location: location || "Current Location",
        temperature: temperature
      });
      
      const res = await fetch("http://localhost:5000/api/recommend-plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          soil_type: detectedSoilType,
          location: location || "Current Location",
          temperature: temperature,
        }),
      });
      const data = await res.json();
      console.log("Recommendation response:", data);
      
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
        setClimateZone(data.climate_zone || "");
        setAnalysisDetails({
          soil_type: data.soil_type,
          location: data.location,
          temperature: data.temperature,
          message: data.message
        });
        setError("");
      } else {
        setError("No recommendations found for the given conditions.");
        setRecommendations([]);
        setClimateZone("");
        setAnalysisDetails({});
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Error fetching recommendations. Please try again.");
      setRecommendations([]);
    }
    setLoading(false);
  };

  const selectedSoilData = SOIL_TYPES.find(soil => soil.name === soilType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Plant Recommender AI
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Discover the perfect plants for your soil using advanced AI analysis and environmental data
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Panel */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-2 sm:gap-3">
              <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              Soil & Climate Analysis
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Location Input */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-300">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city, state, or country"
                    className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Temperature Display */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <span className="text-sm sm:text-base text-gray-300">Current Temperature</span>
                  </div>
                  <div className="text-right">
                    {fetchingTemp ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-blue-400">Fetching...</span>
                      </div>
                    ) : temperature !== null ? (
                      <span className="text-lg sm:text-xl font-bold text-blue-400">{temperature}°C</span>
                    ) : (
                      <span className="text-sm text-gray-400">Not available</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Soil Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-300">
                  Soil Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg sm:rounded-xl text-left text-white hover:bg-gray-600/50 transition-colors"
                  >
                    <span className={soilType ? "text-white" : "text-gray-400"}>
                      {soilType || "Select soil type"}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg sm:rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {SOIL_TYPES.map((soil) => (
                        <button
                          key={soil.name}
                          onClick={() => handleSoilTypeChange(soil.name)}
                          className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-700 transition-colors"
                        >
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${soil.color} rounded-full flex items-center justify-center text-lg sm:text-xl shadow-lg`}>
                            {soil.emoji}
                          </div>
                          <div>
                            <div className="text-sm sm:text-base font-medium text-white">{soil.name}</div>
                            <div className="text-xs sm:text-sm text-gray-400">{soil.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-800 px-3 sm:px-4 text-gray-400 text-sm sm:text-base font-medium">OR</span>
                </div>
              </div>

              {/* Camera/Upload Section */}
              <div className="space-y-4">
                {/* Camera Option */}
                {cameraEnabled && !capturedImage && !soilImage && !showCamera && (
                  <button
                    type="button"
                    onClick={() => setShowCamera(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 sm:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  >
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                    Use Camera to Analyze Soil
                  </button>
                )}

                {/* Camera View */}
                {cameraEnabled && showCamera && (
                  <div className="bg-gray-700/30 rounded-xl p-4 sm:p-6 text-center border border-gray-600/30">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={280}
                      height={210}
                      videoConstraints={{ facingMode: "environment" }}
                      className="rounded border mb-2 mx-auto w-full max-w-xs"
                    />
                    <button
                      type="button"
                      onClick={handleCapture}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all transform hover:scale-105 mt-3 sm:mt-4 text-sm sm:text-base"
                    >
                      Capture & Analyze
                    </button>
                  </div>
                )}

                {/* Captured Image */}
                {capturedImage && (
                  <div className="bg-gray-700/30 rounded-xl p-4 sm:p-6 border border-gray-600/30">
                    <div className="text-center mb-3 sm:mb-4">
                      <img 
                        src={capturedImage} 
                        alt="Captured soil" 
                        className="rounded-xl mx-auto border-2 border-green-400/50 shadow-lg w-full max-w-xs" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                      {cameraEnabled && (
                        <button
                          type="button"
                          onClick={handleRetake}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
                        >
                          Retake Photo
                        </button>
                      )}
                      <div className="bg-green-500/20 text-green-400 px-4 sm:px-6 py-2 rounded-lg font-medium border border-green-400/30 text-sm sm:text-base">
                        ✓ Photo Ready for Analysis
                      </div>
                    </div>
                  </div>
                )}

                {/* File Upload */}
                {!capturedImage && !showCamera && (
                  <div className="space-y-4">
                    {/* File Input with Better Styling */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={!!soilType || !!capturedImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="soil-image-upload"
                      />
                      <label
                        htmlFor="soil-image-upload"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`block w-full border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-300 cursor-pointer ${
                          soilType || capturedImage
                            ? 'border-gray-500 bg-gray-700/30 opacity-50 cursor-not-allowed'
                            : isDragOver
                            ? 'border-green-400 bg-green-400/10 scale-105'
                            : 'border-gray-600/50 hover:border-green-400/50 hover:bg-green-400/5'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <Upload className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                              isDragOver ? 'text-green-400' : 'text-gray-400'
                            }`} />
                          </div>
                          <div>
                            <p className="text-base sm:text-lg font-medium text-gray-300">
                              {isDragOver 
                                ? 'Drop your image here!' 
                                : soilImage 
                                ? 'Image Selected ✓' 
                                : 'Click to Upload or Drag & Drop'
                              }
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">
                              Supports JPG, PNG, GIF, WebP (Max 5MB)
                            </p>
                          </div>
                          {!soilImage && !isDragOver && (
                            <div className="text-xs text-pink-400">
                              📸 Camera mode recommended for best results!
                            </div>
                          )}
                          {isDragOver && (
                            <div className="text-xs text-green-400 animate-pulse">
                              ✨ Release to upload your soil image
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Selected File Display */}
                    {soilImage && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Upload className="w-5 h-5 text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-green-300 truncate">
                              {soilImage.name}
                            </p>
                            <p className="text-xs text-green-400">
                              {(soilImage.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSoilImage(null);
                              setRecommendations([]);
                              setClimateZone("");
                              setAnalysisDetails({});
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Remove file"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Alternative Upload Methods */}
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">Or use one of these methods:</p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSoilType("");
                            setSoilImage(null);
                            setCapturedImage(null);
                            setShowCamera(true);
                          }}
                          className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors text-sm"
                        >
                          📷 Use Camera
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSoilImage(null);
                            setCapturedImage(null);
                            setDropdownOpen(true);
                          }}
                          className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors text-sm"
                        >
                          🏷️ Select Soil Type
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || (!soilType && !soilImage && !capturedImage)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:opacity-50 flex items-center justify-center gap-2 sm:gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">Analyzing Soil & Climate...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base">Get Plant Recommendations</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-red-300 text-sm sm:text-base">{error}</p>
              </div>
            )}

            {recommendations.length > 0 ? (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  Recommended Plants
                </h3>
                
                {/* Analysis Details */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-3 sm:mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    Analysis Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm sm:text-base">Soil Type:</span>
                        <span className="text-white font-medium text-sm sm:text-base">{analysisDetails.soil_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm sm:text-base">Climate Zone:</span>
                        <span className="text-white font-medium capitalize text-sm sm:text-base">{climateZone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm sm:text-base">Location:</span>
                        <span className="text-white font-medium text-sm sm:text-base">{analysisDetails.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm sm:text-base">Temperature:</span>
                        <span className="text-white font-medium text-sm sm:text-base">{analysisDetails.temperature}°C</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 text-xs sm:text-sm">{analysisDetails.message}</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {recommendations.map((plant, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-3 sm:p-4 hover:from-green-500/20 hover:to-emerald-500/20 transition-all transform hover:scale-105"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <p className="text-base sm:text-lg text-green-100">{plant}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Leaf className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">Ready for Analysis</h3>
                <p className="text-gray-400 text-sm sm:text-base px-4">Select your soil type or upload an image to get personalized plant recommendations</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Soil Visualization */}
        {selectedSoilData && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${selectedSoilData.color} rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
                {selectedSoilData.emoji}
              </div>
              <div>
                <h4 className="text-lg sm:text-2xl font-bold text-white">{selectedSoilData.name} Soil</h4>
                <p className="text-gray-300 text-sm sm:text-base">Selected for analysis</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
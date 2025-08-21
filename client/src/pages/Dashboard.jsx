import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = "953cb90f15dd29262ddbf6781e3d6c2c";
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function ProfileMenuItem({ icon, label, onClick, className = "" }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm ${className}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ProfileSettingsItem(props) {
  return <ProfileMenuItem icon={<span>⚙️</span>} label="Settings" {...props} />;
}
function ProfileStatsItem(props) {
  return <ProfileMenuItem icon={<span>📊</span>} label="Farm Statistics" {...props} />;
}
function ProfileSupportItem(props) {
  return <ProfileMenuItem icon={<span>💬</span>} label="Support" {...props} />;
}
function ProfileViewItem(props) {
  return <ProfileMenuItem icon={<span>👤</span>} label="View Profile" {...props} />;
}
function ProfileLogoutItem({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 text-sm"
    >
      <span>🚪</span>
      <span>Logout</span>
    </button>
  );
}

function ProfileDropdown({ user, showProfile, setShowProfile, handleLogout, handleViewProfile, handleSettings, handleFarmStatistics, handleSupport }) {
  return (
    <div className="relative">
      <button 
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs sm:text-sm font-bold">{user.initials}</span>
        </div>
        <span className="text-white font-medium text-sm sm:text-base hidden sm:inline">{user.name}</span>
        <svg className={`w-4 h-4 text-white transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showProfile && (
        <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-50">
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">{user.initials}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">{user.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{user.email || 'Premium Farmer'}</p>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <ProfileViewItem onClick={handleViewProfile} />
              <ProfileSettingsItem onClick={handleSettings} />
              <ProfileStatsItem onClick={handleFarmStatistics} />
              <ProfileSupportItem onClick={handleSupport} />
              <hr className="border-white/20 my-2" />
              <ProfileLogoutItem onClick={handleLogout} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WeatherCard({ weather, weatherLoading, weatherError, getLocationAndFetchWeather }) {
  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>🌤️</span>
        <span className="text-center">Current Weather Conditions</span>
      </h3>
      {weatherLoading ? (
        <div className="text-center text-gray-300 py-8">Loading weather...</div>
      ) : weatherError ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-4xl mb-2">🌧️</div>
          <div className="text-red-400 font-semibold mb-2">{weatherError}</div>
          <div className="text-gray-400 text-sm mb-4">Check your internet connection, allow location access, or try again.</div>
          <button
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-bold hover:scale-105 transition-all duration-200"
            onClick={getLocationAndFetchWeather}
            disabled={weatherLoading}
          >
            Retry
          </button>
        </div>
      ) : (
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-500/20 border border-blue-400/30">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌡️</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{weather.temp !== null ? `${weather.temp}°C` : '--'}</div>
            <div className="text-gray-300 font-medium text-xs sm:text-sm">Temperature</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-500/20 border border-cyan-400/30">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💧</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{weather.humidity !== null ? `${weather.humidity}%` : '--'}</div>
            <div className="text-gray-300 font-medium text-xs sm:text-sm">Humidity</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-green-500/20 border border-green-400/30">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💨</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{weather.wind !== null ? `${weather.wind} km/h` : '--'}</div>
            <div className="text-gray-300 font-medium text-xs sm:text-sm">Wind Speed</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-yellow-500/20 border border-yellow-400/30">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">☀️</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{weather.condition || '--'}</div>
            <div className="text-gray-300 font-medium text-xs sm:text-sm">Conditions</div>
          </div>
        </div>
        {/* Weather Forecast */}
        <div className="pt-4 sm:pt-6 border-t border-white/20">
          <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 text-center">📅 7-Day Forecast</h4>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {weather.forecast.map((day, index) => {
              const date = new Date(day.dt * 1000);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              let icon = '☀️';
              if (day.main === 'Rain') icon = '🌧️';
              else if (day.main === 'Clouds') icon = '⛅';
              else if (day.main === 'Clear') icon = '☀️';
              else if (day.main === 'Snow') icon = '❄️';
              else if (day.main === 'Thunderstorm') icon = '⛈️';
              else if (day.main === 'Drizzle') icon = '🌦️';
              else if (day.main === 'Mist' || day.main === 'Fog') icon = '🌫️';
              else if (day.main === 'Sunny') icon = '☀️';
              else if (day.main === 'Partly Cloudy') icon = '🌤️';
              return (
                <div key={index} className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="text-xs text-gray-300 font-semibold mb-1">{dayName}</div>
                  <div className="text-lg sm:text-xl lg:text-2xl mb-1">{icon}</div>
                  <div className="text-xs sm:text-sm font-bold text-white">{day.temp}°C</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function ServicesGrid({ services, handleSelect, hoveredCard, setHoveredCard }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
      {services.map((service, index) => (
        <div
          key={service.id}
          onClick={() => handleSelect(service.path)}
          onMouseEnter={() => setHoveredCard(service.id)}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative cursor-pointer"
        >
          {/* Glow Effect */}
          <div 
            className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-75 transition-all duration-500`}
            style={{
              boxShadow: hoveredCard === service.id ? `0 0 50px ${service.glowColor}` : 'none'
            }}
          />
          {/* Main Card */}
          <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-2xl transform group-hover:rotate-12 transition-transform duration-500`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm sm:text-base">{service.subtitle}</p>
                </div>
              </div>
              {/* Status Indicator */}
              <div className="flex items-center gap-2 self-start">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-xs sm:text-sm font-semibold">ACTIVE</span>
              </div>
            </div>
            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              {service.description}
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              {Object.entries(service.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {value}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
            {/* Launch Button */}
            <button className={`w-full py-3 sm:py-4 bg-gradient-to-r ${service.gradient} text-white font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 group-hover:scale-105 relative overflow-hidden`}>
              <span className="relative z-10">Launch {service.title}</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FooterCTA() {
  return (
    <div className="text-center mt-12 sm:mt-16 lg:mt-20">
      <div className="bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Ready to Transform Your Farm?</h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">Join thousands of farmers already using AI to maximize their yields</p>
        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
          Get Started Today
        </button>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    name: 'Loading...',
    email: '',
    initials: 'U'
  });
  const [weather, setWeather] = useState({
    temp: null,
    humidity: null,
    wind: null,
    condition: '',
    icon: '',
    forecast: []
  });
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const navigate = useNavigate();

  // Refactored fetchWeather so it can be called on Retry
  const fetchWeather = (lat, lon) => {
    setWeatherLoading(true);
    setWeatherError(null);
    const url = `${OPENWEATHER_API_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;
    console.log('Weather API URL:', url);
    console.log('Weather API Key:', API_KEY);
    fetch(url)
      .then(async res => {
        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          setWeatherError('Failed to parse weather data.');
          setWeatherLoading(false);
          console.error('JSON parse error:', jsonErr);
          return;
        }
        console.log('Weather API response:', data);
        if (!res.ok) {
          let errorMsg = data && data.message ? data.message : 'Unknown error';
          if (res.status === 401) errorMsg = 'Invalid API key. Check your .env file.';
          if (res.status === 403) errorMsg = 'Access forbidden. Your API key may be restricted.';
          if (res.status === 404) errorMsg = 'Weather data not found for your location.';
          setWeatherError(`Weather API error (${res.status}): ${errorMsg}`);
          setWeatherLoading(false);
          return;
        }
        // New check for /weather endpoint fields
        if (!data || !data.main || !data.weather || !data.wind) {
          setWeatherError('Weather data is incomplete or malformed.');
          setWeatherLoading(false);
          return;
        }
        setWeather({
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed),
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
          forecast: [] // No forecast in /weather endpoint
        });
        setWeatherLoading(false);
      })
      .catch(err => {
        let errorMsg = 'Could not fetch weather data.';
        if (err.message && err.message.includes('Failed to fetch')) {
          errorMsg = 'Network error or CORS issue. Check your internet connection and API endpoint.';
        }
        setWeatherError(errorMsg);
        setWeatherLoading(false);
        console.error('Weather fetch error:', err);
      });
  };

  // Helper to get location and fetch weather
  const getLocationAndFetchWeather = () => {
    setWeatherLoading(true);
    setWeatherError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          setWeatherError('Location permission denied. Please allow location access and try again.');
          setWeatherLoading(false);
        }
      );
    } else {
      setWeatherError('Geolocation not supported by your browser.');
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Get user data from localStorage (using 'user' key as per your login logic)
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          // Prefer name, fallback to username, then email, then 'Farmer'
          const name = (parsedUser.name || parsedUser.username || parsedUser.email || 'Farmer').toString().trim();
          const email = (parsedUser.email || '').toString().trim();
          // Initials: from name, or username/email if no name
          const initials = getInitials(name);
          setUser({
            name,
            email,
            initials
          });
          console.log('[Dashboard] Loaded user:', { name, email, initials });
        } else {
          setUser({
            name: 'Farmer',
            email: 'farmer@example.com',
            initials: 'F'
          });
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        setUser({
          name: 'Farmer',
          email: 'farmer@example.com',
          initials: 'F'
        });
      }
    };

    getUserData();
    getLocationAndFetchWeather();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    // Clear user info from localStorage on logout
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleSelect = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const handleViewProfile = () => navigate('/profile');
  const handleSettings = () => navigate('/settings');
  const handleFarmStatistics = () => navigate('/farm-statistics');
  const handleSupport = () => navigate('/support');

  const services = [
    {
      id: 'recommender',
      title: 'Plant Recommender',
      subtitle: 'AI-Powered Crop Selection',
      description: 'Get personalized plant recommendations based on your soil type, climate conditions, and farming goals using advanced machine learning algorithms.',
      icon: '🌱',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      path: '/plant-recommender',
      stats: { users: '12.4K', accuracy: '96%', plants: '2,847' }
    },
    {
      id: 'disease',
      title: 'Disease Detection',
      subtitle: 'Computer Vision Analysis',
      description: 'Upload images of your crops and get instant disease identification with treatment recommendations powered by state-of-the-art AI technology.',
      icon: '🔬',
      gradient: 'from-rose-400 via-pink-500 to-red-600',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      path: '/disease-detection',
      stats: { scans: '8.9K', speed: '0.3s', diseases: '450+' }
    },
    {
      id: 'fertilizer',
      title: 'Fertilizer Insights',
      subtitle: 'Precision Agriculture',
      description: 'Receive data-driven fertilizer recommendations optimized for your specific crops, soil conditions, and growth stage requirements.',
      icon: '🧪',
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      path: '/fertilizer-insights',
      stats: { yield: '+35%', farms: '3.2K', saved: '$2.1M' }
    },
    {
      id: 'plant-dna',
      title: 'Plant DNA Info',
      subtitle: 'Genetic Intelligence',
      description: 'Explore comprehensive genetic profiles, growth patterns, and environmental requirements for thousands of plant species.',
      icon: '🧬',
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      path: '/plant-dna',
      stats: { genes: '15K+', species: '5.7K', research: '99.8%' }
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20"></div>
        
        {/* Moving Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Interactive Light Following Mouse */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
          }}
        />
      </div>

      {/* Glassmorphism Header */}
      <header className="relative z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Animated Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <span className="text-xl sm:text-2xl">🌾</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-2xl blur opacity-30"></div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
                  CropIQ
                </h1>
                <p className="text-gray-300 text-xs sm:text-sm">Next-Gen Farming Platform</p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-white font-semibold text-sm sm:text-base">Farmer Dashboard</p>
                <p className="text-gray-300 text-xs sm:text-sm">{new Date().toLocaleDateString()}</p>
              </div>
              
              {/* Profile Dropdown */}
              <ProfileDropdown 
                user={user} 
                showProfile={showProfile} 
                setShowProfile={setShowProfile} 
                handleLogout={handleLogout}
                handleViewProfile={handleViewProfile}
                handleSettings={handleSettings}
                handleFarmStatistics={handleFarmStatistics}
                handleSupport={handleSupport}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Farm Command
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Unleash the power of AI to revolutionize your farming operations with cutting-edge technology
          </p>

          {/* Weather Conditions */}
          <WeatherCard 
            weather={weather} 
            weatherLoading={weatherLoading} 
            weatherError={weatherError} 
            getLocationAndFetchWeather={getLocationAndFetchWeather} 
          />
        </div>

        {/* Services Grid */}
        <ServicesGrid 
          services={services} 
          handleSelect={handleSelect} 
          hoveredCard={hoveredCard} 
          setHoveredCard={setHoveredCard} 
        />

        {/* Footer CTA */}
        <FooterCTA />
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
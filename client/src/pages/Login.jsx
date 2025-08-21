import { useState } from 'react';

// Agriculture-themed SVG Icons
const EmailIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

// Agriculture-specific icons
const LeafIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SeedIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1s1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
  </svg>
);

const TractorIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const WheatIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.5 3L6 4.5L4.5 6L3 4.5L4.5 3M8.5 3L10 4.5L8.5 6L7 4.5L8.5 3M12.5 3L14 4.5L12.5 6L11 4.5L12.5 3M16.5 3L18 4.5L16.5 6L15 4.5L16.5 3M20.5 3L22 4.5L20.5 6L19 4.5L20.5 3M2 9L3.5 10.5L2 12L0.5 10.5L2 9M6 9L7.5 10.5L6 12L4.5 10.5L6 9M10 9L11.5 10.5L10 12L8.5 10.5L10 9M14 9L15.5 10.5L14 12L12.5 10.5L14 9M18 9L19.5 10.5L18 12L16.5 10.5L18 9M22 9L23.5 10.5L22 12L20.5 10.5L22 9M4 15L5.5 16.5L4 18L2.5 16.5L4 15M8 15L9.5 16.5L8 18L6.5 16.5L8 15M12 15L13.5 16.5L12 18L10.5 16.5L12 15M16 15L17.5 16.5L16 18L14.5 16.5L16 15M20 15L21.5 16.5L20 18L18.5 16.5L20 15"/>
  </svg>
);

const TreeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user info to localStorage for Dashboard
        localStorage.setItem('user', JSON.stringify({
          name: data.name || data.username || email,
          email: data.email || email
        }));
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        console.log('Login successful!', data);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          // In a real app with React Router, you would use:
          // navigate('/dashboard');
          
          // For demo purposes, we'll redirect to dashboard
          window.location.href = '/dashboard'; // This would redirect to dashboard page
        }, 2000);
        
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Agricultural Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-lime-400/10"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-green-600/5 to-yellow-400/5"></div>
      </div>

      {/* Animated Farm Elements */}
      <div className="absolute inset-0">
        {/* Sun */}
        <div className="absolute top-16 right-16">
          <SunIcon className="w-16 h-16 text-yellow-400/30 animate-pulse" style={{animationDuration: '4s'}} />
        </div>
        
        {/* Floating Agricultural Elements */}
        <div className="absolute top-32 left-20 w-64 h-64 bg-gradient-to-r from-green-500/20 to-lime-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/15 to-green-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Crops */}
        <div className="absolute top-24 left-32">
          <WheatIcon className="w-8 h-8 text-amber-400/40 animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}} />
        </div>
        <div className="absolute bottom-32 left-16">
          <LeafIcon className="w-6 h-6 text-green-400/50 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}} />
        </div>
        <div className="absolute top-1/3 right-20">
          <SeedIcon className="w-5 h-5 text-lime-400/40 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}} />
        </div>
        <div className="absolute bottom-1/3 left-24">
          <TreeIcon className="w-7 h-7 text-emerald-400/40 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1.5s'}} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              {/* Farm Logo Container */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 rounded-3xl transform rotate-12 shadow-2xl"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <TractorIcon className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                <WheatIcon className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-lime-400 to-green-400 rounded-full flex items-center justify-center">
                <LeafIcon className="w-3 h-3 text-white animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
                FarmTeam
              </span>
            </h1>
            <p className="text-green-100/90 text-lg flex items-center justify-center gap-2">
              <LeafIcon className="w-5 h-5 text-green-300" />
              Agriculture Management Portal
              <WheatIcon className="w-5 h-5 text-amber-300" />
            </p>
          </div>

          {/* Main Card */}
          <div className="relative">
            {/* Glassmorphism Card */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4"><LeafIcon className="w-8 h-8 text-green-400" /></div>
                <div className="absolute top-8 right-6"><WheatIcon className="w-6 h-6 text-amber-400" /></div>
                <div className="absolute bottom-6 left-8"><SeedIcon className="w-7 h-7 text-lime-400" /></div>
                <div className="absolute bottom-4 right-4"><TreeIcon className="w-5 h-5 text-emerald-400" /></div>
              </div>

              <div className="space-y-6 relative z-10">
                {error && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-red-200 text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {error}
                    </p>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-green-200 text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                      {successMessage}
                    </p>
                  </div>
                )}

                {/* Welcome Message */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <TractorIcon className="w-6 h-6 text-green-400" />
                    Welcome Back, CROPIQ!
                  </h2>
                  <p className="text-green-200/80">Access your agricultural dashboard</p>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-green-100 mb-3">
                    <EmailIcon className="w-4 h-4 text-green-400" />
                    Farm Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-6 py-4 pl-14 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="farmer@example.com"
                      required
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-green-500/20 rounded-xl">
                      <EmailIcon className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-green-100 mb-3">
                    <LockIcon className="w-4 h-4 text-emerald-400" />
                    Secure Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-6 py-4 pl-14 pr-14 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-emerald-500/20 rounded-xl">
                      <LockIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors duration-200 bg-white/10 rounded-xl hover:bg-white/20"
                    >
                      {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform group-hover:scale-[1.02] flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Accessing Farm Portal...
                      </>
                    ) : successMessage ? (
                      <>
                        <span className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                        Redirecting to Dashboard...
                      </>
                    ) : (
                      <>
                        <TractorIcon className="w-5 h-5 group-hover:animate-pulse" />
                        Enter Farm Dashboard
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div className="px-4 flex items-center gap-2">
                  <WheatIcon className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-white/70 text-sm font-medium">Farm Network</span>
                  <LeafIcon className="w-4 h-4 text-green-400 animate-pulse delay-500" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>

              {/* Quick Access Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 rounded-2xl text-amber-100 hover:bg-gradient-to-r hover:from-amber-500/30 hover:to-yellow-500/30 transition-all duration-300 backdrop-blur-sm group">
                  <WheatIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Crop Monitor</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500/20 to-lime-500/20 border border-green-400/30 rounded-2xl text-green-100 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-lime-500/30 transition-all duration-300 backdrop-blur-sm group">
                  <SunIcon className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Weather</span>
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <p className="text-white/80 text-sm mb-2 flex items-center justify-center gap-1">
                    <SeedIcon className="w-4 h-4 text-lime-400" />
                    New to our farm network?
                  </p>
                  <button 
                    onClick={() => window.location.href = '/register'} // This would navigate to register page
                    className="text-transparent bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text font-bold hover:from-green-300 hover:to-lime-300 transition-all duration-200 flex items-center justify-center gap-1 mx-auto"
                  >
                    Join Agriculture Team
                    <LeafIcon className="w-3 h-3 text-green-400 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm flex items-center justify-center gap-2">
                <TreeIcon className="w-4 h-4 text-green-400" />
                © 2024 FarmTeam Portal. Growing together 🌱
                <WheatIcon className="w-4 h-4 text-amber-400" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
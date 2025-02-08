import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Portfolio = () => {
  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Health+Hiking', href: '#health' },
    { name: 'Photos', href: '#photos' },
    { name: 'Blog', href: '#blog' }
  ];

  const socialLinks = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
            KP
          </div>
          <div className="flex gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-lg hover:text-red-500 transition-colors ${
                  item.name === 'Home' ? 'text-red-500' : 'text-gray-300'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-start">
          <div className="max-w-2xl">
            <div className="relative">
              <div className="w-40 h-40 bg-red-600/20 rounded-full absolute -z-10 blur-xl" />
              <h1 className="text-6xl font-serif mb-8">
                Your
                <br />
                Name
              </h1>
            </div>

            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-red-500 uppercase tracking-wider mb-4">About Me</h2>
              <h3 className="text-2xl mb-4 text-gray-100">Full-stack developer based in [Your Location].</h3>
              <p className="text-gray-400 leading-relaxed">
                I'm a developer passionate about creating elegant solutions to complex problems. 
                With a love for both the outdoors and technology, I bring a unique perspective 
                to my work. When I'm not coding, you'll find me exploring trails and capturing 
                moments through photography.
              </p>
            </div>
          </div>

          {/* Decorative Image */}
          <div className="relative">
            <div className="w-64 h-64 bg-red-600/20 rounded-full absolute -z-10 blur-xl" />
            <img
              src="/api/placeholder/400/400"
              alt="Decorative"
              className="rounded-full w-64 h-64 object-cover border-2 border-red-500/20"
            />
          </div>
        </div>

        {/* Preview Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-red-500/50 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Latest Hikes</h3>
            <p className="text-gray-400">Explore my recent adventures and trail recommendations.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-red-500/50 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Photo Gallery</h3>
            <p className="text-gray-400">A collection of moments captured through my lens.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-red-500/50 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Recent Posts</h3>
            <p className="text-gray-400">Thoughts on technology, outdoor life, and more.</p>
          </div>
        </div>

        {/* Footer with Social Links */}
        <footer className="mt-20 border-t border-gray-800 pt-8">
          <div className="flex justify-center gap-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
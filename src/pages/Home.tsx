import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Suits',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    description: 'Classic and modern suits for every occasion'
  },
  {
    name: 'Sherwani',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional wedding and ceremonial sherwanis'
  },
  {
    name: 'Kurta',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant kurtas for festive celebrations'
  },
  {
    name: 'Sadri Coat',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800',
    description: 'Sophisticated sadri coats for a royal look'
  },
  {
    name: 'Blazer',
    image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800',
    description: 'Contemporary blazers for the modern gentleman'
  },
  {
    name: 'Jodhpuri',
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800',
    description: 'Timeless Jodhpuri suits for special occasions'
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1920)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            Elegance Redefined
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover our exclusive collection of traditional and formal wear,
            crafted for the modern gentleman.
          </p>
          <Link
            to="/category/all"
            className="inline-flex items-center px-6 py-3 text-lg bg-secondary hover:bg-secondary-dark transition-colors rounded-md"
          >
            Explore Collection
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-center mb-12 text-primary dark:text-white">
            Our Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
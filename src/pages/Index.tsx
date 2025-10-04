import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Satellite, Leaf, Globe, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-earth.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              AgroVerse
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/regions">
              <Button variant="default" className="bg-gradient-earth">
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Earth from space" 
            className="w-full h-full object-cover animate-float"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-elevated">
              <Satellite className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Powered by NASA Earth Data</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Guardians of the
              <span className="block bg-gradient-earth bg-clip-text text-transparent">
                Green Planet
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              Learn sustainable agriculture through real NASA satellite data. 
              Make decisions, run simulations, and become a planetary guardian.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/regions">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white shadow-glow">
                  <Globe className="mr-2 h-5 w-5" />
                  Select Your Region
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-card/90 backdrop-blur-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-40 left-10 animate-float" style={{ animationDelay: "0s" }}>
          <Leaf className="h-12 w-12 text-secondary opacity-30" />
        </div>
        <div className="absolute top-60 right-20 animate-float" style={{ animationDelay: "2s" }}>
          <Sprout className="h-16 w-16 text-secondary opacity-30" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: "4s" }}>
          <Satellite className="h-10 w-10 text-primary opacity-30" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why AgroVerse?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-elevated hover:shadow-glow transition-all duration-300 border border-border">
              <Satellite className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Real NASA Data</h3>
              <p className="text-muted-foreground">
                Access authentic satellite imagery, soil moisture, rainfall, and vegetation health data from NASA Earth observation missions.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-elevated hover:shadow-glow transition-all duration-300 border border-border">
              <Sprout className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Make real farming decisions, run simulations, and see the environmental impact of your choices in real-time.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-elevated hover:shadow-glow transition-all duration-300 border border-border">
              <Globe className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Global Perspective</h3>
              <p className="text-muted-foreground">
                Explore agricultural challenges across different regions - from Asian rice paddies to African savannas and even Mars!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-space">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students learning sustainable agriculture through data-driven simulation.
          </p>
          <Link to="/regions">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white shadow-glow">
              Begin Your Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Data provided by NASA Earth Science. Built for educational purposes.
          </p>
          <p className="text-xs mt-2">
            <Link to="/about" className="hover:text-primary">
              Learn more about our data sources
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

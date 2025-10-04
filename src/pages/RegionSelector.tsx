import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, ArrowLeft } from "lucide-react";
import asiaImage from "@/assets/region-asia.jpg";
import africaImage from "@/assets/region-africa.jpg";
import southAmericaImage from "@/assets/region-south-america.jpg";
import northAmericaImage from "@/assets/region-north-america.jpg";
import europeImage from "@/assets/region-europe.jpg";
import marsImage from "@/assets/region-mars.jpg";

const regions = [
  {
    id: "south-asia",
    name: "South Asia",
    image: asiaImage,
    challenge: "Monsoon farming with rice paddies",
    difficulty: "Medium",
    description: "Master water management in monsoon-dependent agriculture",
  },
  {
    id: "africa",
    name: "Sub-Saharan Africa",
    image: africaImage,
    challenge: "Drought-resistant farming",
    difficulty: "Hard",
    description: "Overcome water scarcity and build soil resilience",
  },
  {
    id: "south-america",
    name: "South America",
    image: southAmericaImage,
    challenge: "Sustainable rainforest agriculture",
    difficulty: "Medium",
    description: "Balance productivity with rainforest conservation",
  },
  {
    id: "north-america",
    name: "North America",
    image: northAmericaImage,
    challenge: "Industrial-scale grain production",
    difficulty: "Easy",
    description: "Optimize large-scale farming with modern technology",
  },
  {
    id: "europe",
    name: "Europe",
    image: europeImage,
    challenge: "Precision agriculture",
    difficulty: "Easy",
    description: "Implement sustainable practices in temperate climates",
  },
  {
    id: "mars",
    name: "Mars (Bonus)",
    image: marsImage,
    challenge: "Extraterrestrial hydroponics",
    difficulty: "Expert",
    description: "Pioneer agriculture on the Red Planet",
  },
];

const RegionSelector = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              AgroVerse
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              Choose Your Region
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a region to explore its unique agricultural challenges and opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {regions.map((region, index) => (
              <Card 
                key={region.id} 
                className="overflow-hidden hover:shadow-glow transition-all duration-300 border-2 hover:border-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={region.image} 
                    alt={region.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={
                        region.difficulty === "Easy" ? "secondary" :
                        region.difficulty === "Medium" ? "default" :
                        region.difficulty === "Hard" ? "destructive" :
                        "outline"
                      }
                    >
                      {region.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{region.name}</CardTitle>
                  <CardDescription className="text-base">
                    {region.challenge}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {region.description}
                  </p>
                  <Link to={`/dashboard/${region.id}`}>
                    <Button className="w-full bg-gradient-earth">
                      Explore Region
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegionSelector;

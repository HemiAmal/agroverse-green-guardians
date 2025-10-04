import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ArrowLeft, Satellite, Database, ExternalLink } from "lucide-react";

const About = () => {
  const dataSources = [
    {
      name: "SMAP (Soil Moisture Active Passive)",
      description: "Provides global soil moisture data critical for understanding agricultural water availability",
      url: "https://smap.jpl.nasa.gov/",
      resolution: "9-36 km spatial, 2-3 day temporal",
    },
    {
      name: "MODIS (Moderate Resolution Imaging Spectroradiometer)",
      description: "Delivers NDVI (Normalized Difference Vegetation Index) for monitoring crop health and vegetation",
      url: "https://modis.gsfc.nasa.gov/",
      resolution: "250m-1km spatial, daily temporal",
    },
    {
      name: "GPM/IMERG (Global Precipitation Measurement)",
      description: "Tracks rainfall patterns essential for rain-fed agriculture and irrigation planning",
      url: "https://gpm.nasa.gov/",
      resolution: "0.1° spatial, 30-minute temporal",
    },
    {
      name: "Landsat",
      description: "Long-term land use and land cover data for tracking agricultural changes over time",
      url: "https://landsat.gsfc.nasa.gov/",
      resolution: "30m spatial, 16-day temporal",
    },
  ];

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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              About AgroVerse
            </h1>
            <p className="text-xl text-muted-foreground">
              Educational platform powered by NASA Earth Science data
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-3xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                AgroVerse: Guardians of the Green Planet is an educational platform that uses real NASA satellite
                data to teach students and youth about sustainable agriculture. By combining authentic Earth
                observation data with interactive simulation, we make complex environmental concepts accessible
                and engaging.
              </p>
              <p>
                Our platform transforms raw satellite measurements into actionable insights, helping the next
                generation understand the critical relationship between data-driven decision making and
                environmental sustainability.
              </p>
            </CardContent>
          </Card>

          {/* NASA Data Attribution */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-6 w-6 text-primary" />
                NASA Data Sources
              </CardTitle>
              <CardDescription>
                All data used in AgroVerse is derived from NASA Earth Science missions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataSources.map((source, index) => (
                  <div 
                    key={source.name}
                    className="border-l-4 border-primary pl-4 animate-fade-in"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <h3 className="text-lg font-semibold mb-1">{source.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{source.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <Database className="inline h-3 w-3 mr-1" />
                        {source.resolution}
                      </span>
                      <a 
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline flex items-center gap-1"
                      >
                        Visit Source
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Licensing */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <CardHeader>
              <CardTitle>Data Licensing & Attribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-sm">
              <p>
                All NASA Earth Science data is publicly available and distributed under open data policies.
                This platform uses processed and aggregated NASA datasets for educational purposes.
              </p>
              <p className="font-semibold">
                Citation: NASA Earth Science Division. Various datasets including SMAP, MODIS, GPM/IMERG,
                and Landsat. Accessed via NASA Earthdata portal.
              </p>
              <p>
                For demonstration purposes, this hackathon version uses sample NASA-derived data. Production
                deployment would integrate live NASA API feeds.
              </p>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <CardHeader>
              <CardTitle>How to Use AgroVerse</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Select a region to explore from the Region Selector</li>
                <li>Review the NASA satellite data for your chosen region</li>
                <li>Make farming decisions: choose crops, irrigation, fertilizer, and conservation practices</li>
                <li>Run the simulation to see the environmental and economic impact</li>
                <li>Learn from the AgroBot analysis and try different strategies</li>
                <li>Compare results across different regions and approaches</li>
              </ol>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/regions">
              <Button size="lg" className="bg-gradient-earth">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

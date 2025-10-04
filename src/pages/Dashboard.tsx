import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, ArrowLeft, Play } from "lucide-react";
import DataVisualization from "@/components/dashboard/DataVisualization";
import DecisionPanel from "@/components/dashboard/DecisionPanel";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { regionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [decisions, setDecisions] = useState({
    crop: "wheat",
    irrigation: "medium",
    fertilizer: "organic-low",
    conservation: true,
  });

  const regionNames: Record<string, string> = {
    "south-asia": "South Asia",
    "africa": "Sub-Saharan Africa",
    "south-america": "South America",
    "north-america": "North America",
    "europe": "Europe",
    "mars": "Mars",
  };

  const handleRunSimulation = () => {
    toast({
      title: "Running Simulation",
      description: "Processing your farming strategy...",
    });

    // Store decisions in sessionStorage for the results page
    sessionStorage.setItem("simulation-decisions", JSON.stringify({
      region: regionId,
      decisions,
    }));

    // Navigate to results after a brief delay
    setTimeout(() => {
      navigate("/results");
    }, 1500);
  };

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
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Region: {regionNames[regionId || ""]}
            </span>
            <Link to="/regions">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Region
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              {regionNames[regionId || ""]} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Analyze NASA data and make farming decisions for your simulation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Data Visualization - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>NASA Earth Data</CardTitle>
                  <CardDescription>
                    Real-time satellite data for your region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
                      <TabsTrigger value="soil">Soil</TabsTrigger>
                      <TabsTrigger value="vegetation">Vegetation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <DataVisualization type="overview" regionId={regionId || ""} />
                    </TabsContent>
                    <TabsContent value="rainfall">
                      <DataVisualization type="rainfall" regionId={regionId || ""} />
                    </TabsContent>
                    <TabsContent value="soil">
                      <DataVisualization type="soil" regionId={regionId || ""} />
                    </TabsContent>
                    <TabsContent value="vegetation">
                      <DataVisualization type="vegetation" regionId={regionId || ""} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Decision Panel - Takes 1 column */}
            <div className="space-y-6">
              <DecisionPanel 
                decisions={decisions}
                onDecisionsChange={setDecisions}
              />
              
              <Card className="bg-gradient-earth border-0 text-white">
                <CardHeader>
                  <CardTitle>Ready to Simulate?</CardTitle>
                  <CardDescription className="text-white/80">
                    Run your farming strategy and see the results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleRunSimulation}
                    className="w-full bg-white text-primary hover:bg-white/90"
                    size="lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Run Simulation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

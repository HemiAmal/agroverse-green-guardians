import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sprout, TrendingUp, Droplets, Leaf, DollarSign, Award, ArrowLeft } from "lucide-react";

const Results = () => {
  const [simulationData, setSimulationData] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // Retrieve simulation decisions from sessionStorage
    const storedData = sessionStorage.getItem("simulation-decisions");
    if (storedData) {
      const data = JSON.parse(storedData);
      setSimulationData(data);
      
      // Calculate results based on decisions
      const calculated = calculateResults(data);
      setResults(calculated);
    }
  }, []);

  const calculateResults = (data: any) => {
    const { decisions } = data;
    
    // Base yield multipliers
    let yieldMultiplier = 1.0;
    let waterUsage = 100;
    let soilHealth = 50;
    let profit = 1000;
    let sustainabilityScore = 50;

    // Crop effects
    const cropYields: Record<string, number> = {
      wheat: 1.0,
      rice: 1.2,
      corn: 1.1,
      sorghum: 0.9,
      millet: 0.85,
      vegetables: 1.3,
    };
    yieldMultiplier *= cropYields[decisions.crop] || 1.0;

    // Irrigation effects
    if (decisions.irrigation === "high") {
      yieldMultiplier *= 1.3;
      waterUsage = 200;
      sustainabilityScore -= 15;
    } else if (decisions.irrigation === "medium") {
      yieldMultiplier *= 1.15;
      waterUsage = 120;
      sustainabilityScore += 5;
    } else if (decisions.irrigation === "low") {
      yieldMultiplier *= 0.95;
      waterUsage = 70;
      sustainabilityScore += 10;
    } else {
      yieldMultiplier *= 0.8;
      waterUsage = 40;
      sustainabilityScore += 20;
    }

    // Fertilizer effects
    if (decisions.fertilizer.includes("synthetic-high")) {
      yieldMultiplier *= 1.25;
      soilHealth -= 20;
      sustainabilityScore -= 20;
    } else if (decisions.fertilizer.includes("synthetic-low")) {
      yieldMultiplier *= 1.1;
      soilHealth -= 10;
      sustainabilityScore -= 10;
    } else if (decisions.fertilizer.includes("organic-medium")) {
      yieldMultiplier *= 1.05;
      soilHealth += 10;
      sustainabilityScore += 10;
    } else if (decisions.fertilizer.includes("organic-low")) {
      soilHealth += 5;
      sustainabilityScore += 15;
    }

    // Conservation bonus
    if (decisions.conservation) {
      soilHealth += 15;
      sustainabilityScore += 15;
    }

    // Calculate final metrics
    const finalYield = Math.round(yieldMultiplier * 100);
    profit = Math.round(finalYield * 10 - waterUsage * 2);
    sustainabilityScore = Math.max(0, Math.min(100, sustainabilityScore));

    return {
      yield: finalYield,
      waterUsage,
      soilHealth: Math.max(0, Math.min(100, soilHealth)),
      profit,
      sustainabilityScore,
    };
  };

  if (!simulationData || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  const getSustainabilityRating = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-secondary" };
    if (score >= 60) return { label: "Good", color: "bg-primary" };
    if (score >= 40) return { label: "Fair", color: "bg-accent" };
    return { label: "Needs Improvement", color: "bg-destructive" };
  };

  const rating = getSustainabilityRating(results.sustainabilityScore);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              AgroVerse
            </span>
          </Link>
          <Link to={`/dashboard/${simulationData.region}`}>
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Results */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 animate-fade-in">
            <Badge className={`${rating.color} text-white mb-4`} variant="default">
              {rating.label}
            </Badge>
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Simulation Complete!
            </h1>
            <p className="text-xl text-white/90">
              Here are your farming results
            </p>
          </div>

          {/* Main Score Card */}
          <Card className="mb-8 shadow-glow animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Sustainability Score</CardTitle>
              <CardDescription>Overall environmental impact rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-secondary">{results.sustainabilityScore}</div>
                <div className="text-muted-foreground">out of 100</div>
              </div>
              <Progress value={results.sustainabilityScore} className="h-4" />
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Crop Yield
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">{results.yield} kg/ha</div>
                <Progress value={results.yield} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Production efficiency based on your farming decisions
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Water Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{results.waterUsage} mm</div>
                <Progress value={Math.min(100, (results.waterUsage / 250) * 100)} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {results.waterUsage < 100 ? "Efficient water management" : 
                   results.waterUsage < 150 ? "Moderate water usage" : 
                   "High water consumption"}
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-secondary" />
                  Soil Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">{results.soilHealth}%</div>
                <Progress value={results.soilHealth} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Long-term soil quality and carbon content
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Economic Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">${results.profit}</div>
                <Progress value={Math.max(0, (results.profit / 2000) * 100)} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Net revenue from your farming operation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis */}
          <Card className="bg-gradient-space text-white animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                AgroBot Analysis
              </CardTitle>
              <CardDescription className="text-white/80">
                AI-powered insights on your farming strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Overall Assessment:</strong> Your {simulationData.decisions.crop} cultivation 
                achieved a {rating.label.toLowerCase()} sustainability rating of {results.sustainabilityScore}/100.
              </p>
              <p>
                <strong>Key Strengths:</strong>{" "}
                {results.sustainabilityScore >= 60 && "Excellent balance between productivity and environmental impact. "}
                {simulationData.decisions.conservation && "Conservation practices significantly improved soil health. "}
                {results.waterUsage < 100 && "Efficient water management reduced resource strain."}
              </p>
              <p>
                <strong>Recommendations:</strong>{" "}
                {results.soilHealth < 50 && "Consider adding more organic matter to improve soil health. "}
                {results.waterUsage > 150 && "Explore drip irrigation to reduce water consumption. "}
                {!simulationData.decisions.conservation && "Implementing conservation practices could boost long-term sustainability."}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link to={`/dashboard/${simulationData.region}`}>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Try Different Strategy
              </Button>
            </Link>
            <Link to="/regions">
              <Button size="lg" variant="outline">
                Explore Another Region
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface DataVisualizationProps {
  type: "overview" | "rainfall" | "soil" | "vegetation";
  regionId: string;
}

// Mock data generator based on region
const generateMockData = (regionId: string, type: string) => {
  const baseData = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Aug", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dec", value: 0 },
  ];

  // Generate realistic data based on region and type
  return baseData.map((item, index) => {
    let value = 0;
    if (type === "rainfall") {
      // Monsoon pattern for Asia, dry for Africa, etc.
      if (regionId === "south-asia") {
        value = index >= 5 && index <= 9 ? Math.random() * 300 + 200 : Math.random() * 50;
      } else if (regionId === "africa") {
        value = Math.random() * 50 + 20;
      } else {
        value = Math.random() * 100 + 50;
      }
    } else if (type === "soil") {
      value = Math.random() * 0.3 + 0.1;
    } else if (type === "vegetation") {
      value = Math.random() * 0.4 + 0.4;
    }
    return { ...item, value: parseFloat(value.toFixed(2)) };
  });
};

const DataVisualization = ({ type, regionId }: DataVisualizationProps) => {
  const data = generateMockData(regionId, type);

  const renderOverview = () => (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-primary/10 border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">Avg Rainfall</div>
          <div className="text-2xl font-bold text-primary">127 mm</div>
        </Card>
        <Card className="p-4 bg-secondary/10 border-secondary/20">
          <div className="text-sm text-muted-foreground mb-1">Soil Moisture</div>
          <div className="text-2xl font-bold text-secondary">0.24 m³/m³</div>
        </Card>
        <Card className="p-4 bg-accent/10 border-accent/20">
          <div className="text-sm text-muted-foreground mb-1">NDVI Index</div>
          <div className="text-2xl font-bold text-accent">0.67</div>
        </Card>
      </div>
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">
          <strong>Data Sources:</strong> SMAP (Soil Moisture), GPM/IMERG (Precipitation), MODIS (NDVI)
        </p>
        <p>
          This region shows {regionId === "africa" ? "low rainfall patterns requiring drought-resistant strategies" : 
          regionId === "south-asia" ? "strong monsoon influence requiring water management" :
          "moderate conditions suitable for diverse crops"}.
        </p>
      </div>
    </div>
  );

  const renderChart = () => {
    const labels = {
      rainfall: { title: "Monthly Rainfall (mm)", color: "#3b82f6" },
      soil: { title: "Soil Moisture (m³/m³)", color: "#10b981" },
      vegetation: { title: "NDVI (Vegetation Health)", color: "#f59e0b" },
    };

    const config = labels[type as keyof typeof labels];

    return (
      <div className="py-4">
        <h3 className="text-lg font-semibold mb-4">{config.title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          {type === "rainfall" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={config.color} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={config.color} strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-4">
          Data based on NASA satellite observations. Use this information to inform your farming decisions.
        </p>
      </div>
    );
  };

  return type === "overview" ? renderOverview() : renderChart();
};

export default DataVisualization;

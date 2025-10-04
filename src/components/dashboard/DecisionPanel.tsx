import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Wheat, Droplets, Leaf, Shield } from "lucide-react";

interface DecisionPanelProps {
  decisions: {
    crop: string;
    irrigation: string;
    fertilizer: string;
    conservation: boolean;
  };
  onDecisionsChange: (decisions: any) => void;
}

const DecisionPanel = ({ decisions, onDecisionsChange }: DecisionPanelProps) => {
  const updateDecision = (key: string, value: any) => {
    onDecisionsChange({ ...decisions, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farming Decisions</CardTitle>
        <CardDescription>
          Configure your agricultural strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Crop Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Wheat className="h-4 w-4 text-secondary" />
            Crop Type
          </Label>
          <Select value={decisions.crop} onValueChange={(value) => updateDecision("crop", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="sorghum">Sorghum</SelectItem>
              <SelectItem value="millet">Millet</SelectItem>
              <SelectItem value="vegetables">Mixed Vegetables</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Irrigation */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            Irrigation Strategy
          </Label>
          <Select value={decisions.irrigation} onValueChange={(value) => updateDecision("irrigation", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Irrigation</SelectItem>
              <SelectItem value="low">Low (Rainfed)</SelectItem>
              <SelectItem value="medium">Medium (Drip)</SelectItem>
              <SelectItem value="high">High (Surface)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fertilizer */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-secondary" />
            Fertilizer Plan
          </Label>
          <Select value={decisions.fertilizer} onValueChange={(value) => updateDecision("fertilizer", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="organic-low">Organic (Low)</SelectItem>
              <SelectItem value="organic-medium">Organic (Medium)</SelectItem>
              <SelectItem value="synthetic-low">Synthetic (Low)</SelectItem>
              <SelectItem value="synthetic-high">Synthetic (High)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conservation */}
        <div className="flex items-center justify-between py-2 border-t">
          <Label htmlFor="conservation" className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            Conservation Practices
          </Label>
          <Switch 
            id="conservation"
            checked={decisions.conservation}
            onCheckedChange={(checked) => updateDecision("conservation", checked)}
          />
        </div>

        <div className="text-xs text-muted-foreground pt-2">
          <p>
            Your choices will affect yield, water usage, soil health, and sustainability score.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionPanel;

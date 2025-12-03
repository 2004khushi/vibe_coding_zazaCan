import { Separator } from "@/components/ui/separator";

interface NutritionItemProps {
  label: string;
  value: string;
  isBold?: boolean;
  isIndented?: boolean;
}

const NutritionItem = ({ label, value, isBold = false, isIndented = false }: NutritionItemProps) => (
  <div className={`flex justify-between ${isBold ? 'font-bold' : ''} ${isIndented ? 'pl-4' : ''}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default function NutritionCard() {
  return (
    <div className="border-4 border-primary bg-background text-primary font-mono p-4 sm:p-6 max-w-sm mx-auto w-full">
      <h2 className="text-4xl font-extrabold mb-1">Nutrition Facts</h2>
      <p>Serving Size 1 can (12 fl oz)</p>
      <Separator className="my-2 h-[2px] bg-primary" />
      <div className="flex justify-between font-bold">
        <span>Amount per serving</span>
      </div>
      <div className="flex justify-between items-baseline">
        <h3 className="text-5xl font-extrabold">Calories</h3>
        <span className="text-5xl font-extrabold">35</span>
      </div>
      <Separator className="my-2 h-1 bg-primary" />
      <div className="flex justify-end font-bold mb-2">% Daily Value*</div>
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Total Fat" value="0g" isBold />
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Sodium" value="0mg" isBold />
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Total Carbohydrate" value="16g" isBold />
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Dietary Fiber" value="9g" />
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Total Sugars" value="4g" />
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Includes 0g Added Sugars" value="" isIndented />
      <Separator className="my-1 h-px bg-primary" />
      <NutritionItem label="Protein" value="0g" isBold />
      <Separator className="my-2 h-[2px] bg-primary" />
      <p className="text-xs">*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</p>
    </div>
  );
}

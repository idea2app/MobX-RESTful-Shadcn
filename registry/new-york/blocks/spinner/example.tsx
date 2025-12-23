import { Spinner } from ".";

export default function SpinnerExample() {
  return (
    <div className="flex flex-col gap-8 items-center p-8">
      <div className="flex gap-4 items-center">
        <Spinner size="sm" />
        <span className="text-sm">Small Spinner</span>
      </div>
      <div className="flex gap-4 items-center">
        <Spinner size="md" />
        <span className="text-sm">Medium Spinner (Default)</span>
      </div>
      <div className="flex gap-4 items-center">
        <Spinner size="lg" />
        <span className="text-sm">Large Spinner</span>
      </div>
      <div className="flex gap-4 items-center">
        <Spinner className="text-primary" />
        <span className="text-sm">Custom Color (Primary)</span>
      </div>
      <div className="flex gap-4 items-center">
        <Spinner className="text-destructive" size="lg" />
        <span className="text-sm">Custom Color (Destructive)</span>
      </div>
    </div>
  );
}

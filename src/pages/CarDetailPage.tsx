import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarBookingForm from "@/components/CarBookingForm";
import { cars } from "@/data/cars";
import ContactFooter from "@/components/ContactFooter";

const CarDetailPage = () => {
  const { carId } = useParams();
  const car = cars.find(c => c.id === carId);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">S.U.K Perfect Cab Service</h1>
        </div>
      </div>

      <CarBookingForm car={car} />
      <ContactFooter />
    </main>
  );
};

export default CarDetailPage;
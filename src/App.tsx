import BookingForm from "./components/BookingForm";
import DailyConfiguration from "./components/DailyConfiguration";
import Summary from "./components/Summary";
import { useAppSelector } from "./redux/store";

function App() {
  const step = useAppSelector((state) => state.step.currentStep);
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-gray-500 font-bold text-3xl text-center p-4">Hotel Booking System</h1>
      <BookingForm />
      {step >= 2 && <DailyConfiguration />}
      {step === 3 && <Summary />}
    </div>
  );
}

export default App;

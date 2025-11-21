import { useEffect, useRef } from "react";
import BookingForm from "./components/BookingForm";
import DailyConfiguration from "./components/DailyConfiguration";
import Summary from "./components/Summary";
import { useAppSelector } from "./redux/store";

function App() {
  const step = useAppSelector((state) => state.step.currentStep);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [step1Ref, step2Ref, step3Ref];
    const currentRef = refs[step - 1];
    currentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-gray-500 font-bold text-3xl text-center p-4">Hotel Booking System</h1>
      <div ref={step1Ref}>
        <BookingForm />
      </div>
      <div ref={step2Ref}>{step >= 2 && <DailyConfiguration />}</div>
      <div ref={step3Ref}>{step === 3 && <Summary />}</div>
    </div>
  );
}

export default App;

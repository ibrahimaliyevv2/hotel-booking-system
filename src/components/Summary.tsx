import type React from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { hotels } from "../data/hotels";
import { meals } from "../data/meals";
import { resetBooking } from "../redux/slices/bookingSlice";
import { resetStep, setLoading } from "../redux/slices/stepSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { specificDate } from "../utils/toDateString";

const Summary: React.FC = () => {
  const { booking, dailySelections } = useAppSelector((state) => state.booking);
  const currentStep = useAppSelector((state) => state.step.currentStep);
  const isLoading = useAppSelector((state) => state.step.isLoading);
  const dispatch = useAppDispatch();

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("summary.pdf");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetButton = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(resetBooking());
      dispatch(resetStep());
      dispatch(setLoading(false));
    }, 1000);
  };

  const getHotelPrice = (hotelId: number | null) => {
    if (!hotelId || !booking.destination) return 0;
    const price = hotels[booking.destination].find((hotel) => hotel.id === hotelId)?.price || 0;
    return price;
  };

  const getMealPrice = (mealId: number | null, type: "lunch" | "dinner") => {
    if (!mealId || !booking.destination) return 0;
    const price = meals[booking.destination][type].find((meal) => meal.id === mealId)?.price || 0;
    return price;
  };

  const totalPrice = dailySelections.reduce(
    (acc, day) =>
      acc +
      getHotelPrice(Number(day.hotelId)) +
      getMealPrice(Number(day.lunchId), "lunch") +
      getMealPrice(Number(day.dinnerId), "dinner"),
    0,
  );

  return (
    <div className="p-6">
      <div ref={pdfRef}>
        <h1 className="text-xl mb-6 font-bold">Summary</h1>

        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg p-5 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuration Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Citizenship</p>
                <p className="font-medium text-gray-800">{booking.citizenship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-medium text-gray-800 flex items-center gap-1">
                  {booking.destination}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Travel duration & Start date</p>
                <p className="font-medium text-gray-800 flex items-center gap-1">
                  {booking.days} days - {specificDate(booking.startDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Board type</p>
                <p className="font-medium text-gray-800">
                  {booking?.boardTypeCode === "FB" && "Full Board"}
                  {booking?.boardTypeCode === "HB" && "Half Board"}
                  {booking?.boardTypeCode === "NB" && "No Board"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <table className="w-full mt-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Day
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Hotel
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Lunch
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Dinner
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Daily Total
                </th>
              </tr>
            </thead>
            <tbody>
              {dailySelections.map((day) => {
                const hotelPrice = getHotelPrice(Number(day.hotelId));
                const lunchPrice = getMealPrice(Number(day.lunchId), "lunch");
                const dinnerPrice = getMealPrice(Number(day.dinnerId), "dinner");
                const dailyTotal = hotelPrice + lunchPrice + dinnerPrice;
                const hotelName =
                  hotels[booking.destination].find((hotel) => hotel.id === day.hotelId)?.name ||
                  "-";
                const lunchName =
                  meals[booking.destination].lunch.find((meal) => meal.id === day.lunchId)?.name ||
                  "-";
                const dinnerName =
                  meals[booking.destination].dinner.find((meal) => meal.id === day.dinnerId)
                    ?.name || "-";

                return (
                  <tr key={day.dayIndex}>
                    <td className="px-2 py-2 md:px-4 md:py-4 border-b">{day.dayIndex + 1}</td>
                    <td className="px-2 py-2 md:px-4 md:py-4 border-b">
                      {hotelName} (${hotelPrice})
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-4 border-b">
                      {lunchName} (${lunchPrice})
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-4 border-b">
                      {dinnerName} (${dinnerPrice})
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-4 border-b">${dailyTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <p className="mt-2 font-bold">Total price: ${totalPrice}</p>
        </div>

        {currentStep === 3 && (
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl
               hover:bg-green-700 transition"
            >
              Print
            </button>
            <button
              onClick={handleExportPDF}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl
               hover:bg-red-700 transition"
            >
              Export PDF
            </button>
            <button
              onClick={handleResetButton}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-400 text-white font-medium rounded-xl
               hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;

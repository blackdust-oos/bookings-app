/* eslint-disable @typescript-eslint/no-explicit-any */
import FlightsSection from "./FlightSection";
import ReservationsSection from "./ReservationsSection";

interface ItineraryItemProps {
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  type: string,
  flightData?: any[]; 
  reservationData?: any[]; 
  backgroundColor?: string; 
}

const ItineraryItem = ({
  heading,
  buttonText,
  onButtonClick,
  flightData = [],
  reservationData = [],
  backgroundColor = "whitesmoke",
  type
}: ItineraryItemProps) => {
  const handleDelete = (type: string, id: number) => {
    alert(`${type} card with ID ${id} deleted!`);
  };

  return (
    <div
      className="p-6 shadow-none rounded-lg mb-6"
      style={{ backgroundColor }} 
    >
      <div
        className={`rounded-lg mb-6`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          className={`text-xl font-semibold flex-1 ${
            backgroundColor === "whitesmoke" ? "text-black " : "text-white"
          }`}
        >
          {heading}
        </h3>
        {
          type === 'flight' && flightData.length > 0 && 
          <button
          onClick={onButtonClick}
          className={`px-4 py-2 rounded hover:bg-blue-600  ${
            backgroundColor === "whitesmoke"
              ? "text-black bg-white"
              : "text-blue bg-white"
          }`}
        >
          {buttonText}
        </button>   
        }

{
          type === 'reserve' && reservationData.length > 0  && 
          <button
          onClick={onButtonClick}
          className={`px-4 py-2 rounded hover:bg-blue-600  ${
            backgroundColor === "whitesmoke"
              ? "text-black bg-white"
              : "text-blue bg-white"
          }`}
        >
          {buttonText}
        </button>   
        }
      </div>

      <div className="flex flex-col gap-2.5">

        {
          type === 'flight' && 
          <FlightsSection flightData={flightData} onDelete={handleDelete} />
        }



      {
        type === 'reserve' && 
        <ReservationsSection
          reservationData={reservationData}
          onDelete={handleDelete}
        />
      }

      </div>

      
    </div>
  );
};

export default ItineraryItem;

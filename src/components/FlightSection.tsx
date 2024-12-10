/* eslint-disable @typescript-eslint/no-explicit-any */
import CardComponent from "./CardComponent";

interface FlightsSectionProps {
  flightData?: any[];
  onDelete: (type: string, id: number) => void;
}

const FlightsSection = ({ flightData = [], onDelete }: FlightsSectionProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      {flightData.length > 0 ? (
        flightData.map((flight, idx) => (
          <CardComponent
            key={`flight-${idx}`}
            type="flights"
            data={flight}
            onDelete={() => onDelete("flight", idx)}
          />
        ))
      ) : (
        <div
          className="bg-white p-5 rounded grid place-items-center"
          style={{ height: "300px" }}
        >
          <p>No flights available</p>
        </div>
      )}
    </div>
  );
};

export default FlightsSection;

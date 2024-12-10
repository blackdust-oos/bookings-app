/* eslint-disable @typescript-eslint/no-explicit-any */
import CardComponent from "./CardComponent";

interface ReservationsSectionProps {
  reservationData?: any[];
  onDelete: (type: string, id: number) => void;
}

const ReservationsSection = ({ reservationData = [], onDelete }: ReservationsSectionProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      {reservationData.length > 0 ? (
        reservationData.map((reservation, idx) => (
          <CardComponent
            key={`reservation-${idx}`}
            type="reservations"
            data={reservation}
            onDelete={() => onDelete("reservation", idx)}
          />
        ))
      ) : (
        <div
          className="bg-white p-5 rounded grid place-items-center"
          style={{ height: "300px" }}
        >
          <div className="text-center">
          <p className="mb-8">No reservations available</p>
          <a href="" className="text-white bg-customBlue p-3 rounded hover:text-white">
            Add Hotel
          </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsSection;

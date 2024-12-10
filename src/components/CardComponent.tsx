/* eslint-disable @typescript-eslint/no-explicit-any */
import Group from '../assets/images/Group.png'

interface FlightCardProps {
  depatureDate:string,
  arrivalDate:string,
  airline: string;
  duration: string;
  startTime: string;
  endTime: string;
  amount: string;
  facilities: string[];
}

interface ReservationCardProps {
  property: any;
  hotel_id: number;
  name: string;
  priceBreakdown: {
    strikethroughPrice: { value: number; currency: string };
    currency: string;
    totalPrice: { value: number; currency: string };
  };
  checkin: { fromTime: string; untilTime: string };
  checkout: { fromTime: string; untilTime: string };
  reviewScore: number;
  reviewScoreWord: string;
  reviewCount: number;
  photoUrls: string[];
  accessibilityLabel: string;
}

interface CardComponentProps {
  type: "flights" | "reservations";
  data: FlightCardProps | ReservationCardProps;
  onDelete: () => void;
}

const CardComponent = ({ type, data, onDelete }: CardComponentProps) => {
  if (type === "flights") {
    const flightData = data as FlightCardProps;
    return (
      <div className="flex items-start bg-white rounded-lg p-4 relative">
        <button
          className="absolute top-0 right-0 h-full w-10 bg-red-200 text-white flex items-center justify-center"
          onClick={onDelete}
        >
          X
        </button>
        {/* Flight Card Content */}
        <div className="flex flex-col w-full mr-10">
          <div className="grid grid-cols-3 gap-4 border-b pb-4 mb-4">
            <div className="font-semibold text-lg flex items-center gap-2" >
              <img src={Group} alt="logo" />
              <div>
              {flightData.airline}
              <div>
              <p className="text-sm text-gray-500 mt-3">
                <span>AA-829</span>
                <span className="bg-navyBlue p-1 rounded text-white ml-4">First Class</span>
              </p>
              </div>
              </div>
            </div>
            <div className="text-center flex justify-center gap-6 items-center ">
              <div className="text-sm text-gray-500  ">
                <div style={{
                  width:'150px'
                }}>
                  <p>{flightData.startTime}</p>
                  <p>{flightData.depatureDate}</p>
                </div>
              </div>
              <div className="di">
                <div className='mb-2'>
                  
                <span >Duration: {flightData.duration}</span>
                </div>
                <div
                  className="bg-gray-100  rounded flex justify-center"
                  style={{ width: "300px" }}
                >
                  <div
                    className="bg-blue-500 p-1 rounded"
                    style={{ width: "40%", height: "100%" }}
                  ></div>
                </div>
                <div className='flex justify-between mt-2'>
                  <span>LOS</span>
                  <span>Direct</span>
                  <span>SIN</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 ">
                <div style={{
                  width:'150px'
                }}>
                  <p>{flightData.endTime}</p>
                  <p>{flightData.arrivalDate}</p>
                </div>
              </div>
            </div>
            <div className="text-right font-semibold text-lg text-md">
              {flightData.amount}
            </div>
          </div>
          {/* Additional Flight Details */}
          <div className="flex gap-2 border-b pb-4 mb-4" style={{
              color:'#647995'
            }}>
            Facilities: {
              flightData.facilities.map((facility: any, idx) => (
                <span key={idx}>{facility}</span>
              ))
            }
          </div>
          <div className="flex justify-between ">
            <div className="flex gap-4">
              <a href="" className="text-customBlue">Flight details</a>
              <a href="" className="text-customBlue">Price details</a>
            </div>
            <a href="" className="text-customBlue">Edit details</a>
          </div>
        </div>
      </div>
    );
  } else if (type === "reservations") {
    const reservationData = data as ReservationCardProps;

    const photoUrl =
      reservationData.property.photoUrls &&
        reservationData.property.photoUrls.length > 0
        ? reservationData.property.photoUrls[0]
        : null;

    const totalPrice =
      reservationData.property.priceBreakdown &&
        reservationData.property.priceBreakdown.totalPrice
        ? reservationData.property.priceBreakdown.totalPrice
        : null;

    const checkinTime =
      reservationData.property.checkin &&
        reservationData.property.checkin.fromTime
        ? reservationData.property.checkin.fromTime
        : "N/A";

    const checkoutTime =
      reservationData.property.checkout &&
        reservationData.property.checkout.fromTime
        ? reservationData.property.checkout.fromTime
        : "N/A";

    return (
      <div className="flex items-start bg-white rounded-lg p-4 relative">
        <button
          className="absolute top-0 right-0 h-full w-10 bg-red-200 text-white flex items-center justify-center"
          onClick={onDelete}
        >
          X
        </button>
        {photoUrl ? (
          <div className="w-40 h-full mr-4 rounded overflow-hidden">
            <img
              src={photoUrl}
              alt={reservationData.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-40 h-full mr-4 rounded bg-gray-200 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        {/* Reservation Details */}
        <div className="flex flex-col w-full mr-10">
          <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
            <div>
              <div className="font-semibold text-lg">
                {reservationData.property.name}
              </div>
              <div className="text-sm text-gray-500">
                {reservationData.accessibilityLabel}
              </div>
            </div>
            <div className="text-right">
              {/* Display the totalPrice if available */}
              <div className="font-semibold text-lg">
                {totalPrice
                  ? `${totalPrice.value} ${totalPrice.currency}`
                  : "Price Not Available"}
              </div>
            </div>
          </div>

          {/* Check-in and Check-out */}
          <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">
                Check-in: {checkinTime}
              </div>
              <div className="text-sm text-gray-500">
                Check-out: {checkoutTime}
              </div>
            </div>
          </div>

          {/* Review Score */}
          <div className="text-sm text-gray-500">
            Review: {reservationData.reviewScoreWord} (
            {reservationData.reviewCount} reviews)
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
              View Details
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CardComponent;

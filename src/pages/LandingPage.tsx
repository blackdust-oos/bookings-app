import { useState, useEffect } from "react"; // import hooks
import ItineraryItem from "../components/ItineryItem";
import banner from "../assets/images/banner.png";
import { BsThreeDots } from "react-icons/bs";
import { PiUserPlus } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import user from "../assets/images/user.png";
import AddCard from "../components/AddCard";

const LandingPage = () => {
  const [reservationData, setReservationData] = useState([]);

  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  useEffect(() => {
    const storedReservationData = localStorage.getItem("favorites");
    if (storedReservationData) {
      setReservationData(JSON.parse(storedReservationData)); 
    }
  }, []); 

  const flightData = [
    {
      airline: "Delta Airlines",
      duration: "3h 45m",
      startTime: "10:00 AM",
      depatureDate:'Sun, 20 Aug',
      endTime: "1:45 PM",
      arrivalDate:'Sun, 21 Aug',
      amount: "$250",
      facilities: [
        "Baggage",
        "Inflight Entertainment",
        "Inflight Meal",
        "USB Port",
      ],
    },
    {
      airline: "United Airlines",
      duration: "2h 30m",
      startTime: "12:00 PM, Dec 6",
      endTime: "2:30 PM, Dec 6",
      amount: "$300",
      facilities: ["Baggage", "USB Port"],
    },
  ];

  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-[200px_1fr] gap-6 h-full ">
        {/* Sidebar Column */}
        <div className="bg-white p-4 rounded-lg">
          <p>Sidebar Content</p>
        </div>
        <div className="bg-white p-6 flex flex-col rounded-lg">
          <div
            className="relative rounded  h-48 mb-6"
            style={{
              position: "relative",
            }}
          >
            <img
              src={banner}
              alt="Banner image"
              className="absolute top-0 left-0 w-full h-full "
            />

            <button className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-50 bg-opacity-60 text-gray- rounded hover:bg-blue-600 hover:text-white">
              Click Me
            </button>
          </div>

          <div className="flex justify-between">
            <div className="py-1 px-2 text-customBrown  text-[14px] font-medium bg-warm  inline-block max-w-max max-h-max">
              21 March 2024 - 21 April 2024
            </div>

            <div className="flex gap-2.5">
              <button className="py-3 px-12 bg-customBlue1 rounded text-customBlue font-medium text-[20px]">
                <PiUserPlus />
              </button>
              <button className="rounded text-20 p-2">
                <BsThreeDots />
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-medium">Bahamas Family Trip</h2>
              <p className="text-base">
                New York, United States of America | Solo Trip
              </p>
            </div>

            <div className="flex  items-center space-x-4 p-4 rounded-full mt-4">
              <div className="flex-shrink-0">
                <img
                  src={user}
                  alt="Your image"
                  className="h-10 w-auto rounded-full shadow-md p-px"
                />
              </div>

              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-300 focus:outline-none text-[20px]">
                <CiSettings />
              </button>
            </div>
          </div>

          <div className="flex gap-2.5">
            <AddCard
              title="Activities"
              content="We provide the best service for your needs. Start using our platform today!"
              buttonText="Get Started"
              backgroundColor="bg2"
              textColor="text-white"
            />

            <AddCard
              title="Hotels"
              content="We provide the best service for your needs. Start using our platform today!"
              buttonText="Get Started"
              backgroundColor="bg1"
              textColor="text-grey"
            />

            <AddCard
              title="Flights"
              content="We provide the best service for your needs. Start using our platform today!"
              buttonText="Get Started"
              backgroundColor="bg-customBlue"
              textColor="text-white"
              btnWhite
            />
          </div>

          <div className="container mx-auto mt-10">
            <h3 className="text-xl font-medium mt-10">Trip itineraries</h3>
            <p className="text-[14px] font-medium mb-8">
              Your trip itineraries are placed here
            </p>
            <ItineraryItem
              heading="New York Itinerary"
              buttonText="Add Flights"
              onButtonClick={handleButtonClick}
              flightData={flightData}
              type={'flight'}
              backgroundColor="whitesmoke"
            />
            <ItineraryItem
              heading="New York Itinerary"
              buttonText="Add Hotels"
              type="reserve"
              onButtonClick={handleButtonClick}
              reservationData={reservationData}
              backgroundColor="#344054"
            />
          </div>

          <div className="flex justify-between items-center bg-gray-200 p-4">
            <h3 className="text-xl">Heading</h3>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

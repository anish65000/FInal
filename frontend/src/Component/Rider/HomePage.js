import React from 'react';

import Rider1 from '../../Assest/img/Rider.jpeg';
import RiderLogo from '../../Assest/img/RiderLogo.jpeg';
import Rider3 from '../../Assest/img/Rider3.jpg';
import Rider2 from '../../Assest/img/Rider1.jpeg';
import Amb from '../../Assest/img/Amb.png'; // Import the Amb image
import DonorNavbar from './DonorNavbar';

const RiderHomePage = () => {
  return (
    <>
    <DonorNavbar/>
    <div className="bg-gradient-to-r from-red to-green min-h-screen">
      <header className="flex items-center justify-between py-6 px-4">
        <h1 className="text-3xl font-bold text-white">
          Emergency Blood Transportation
        </h1>
        <img
          src={RiderLogo}
          alt="Emergency Blood Transportation Logo"
          className="w-20 h-20 object-contain"
        />
      </header>

      

      {/* Adding Bootstrap container class */}
      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row gap-8 mb-8">

        {/* <div className="w-1/2 p-4">
                <h2 className="text-xl font-semibold mb-2">Staff Information</h2>
                <p>Staff Name: {</p>
                <p>Staff Type: </p>
              </div> */}
          <div className="w-full md:w-1/3">
            <img
              src={Rider1}
              alt="Blood Transportation Process"
              className="w-full rounded-lg shadow-md object-cover h-96"
            />
            <p className="mt-2 text-white">
              Our riders are trained to transport blood safely and efficiently.
            </p>
          </div>

          <div className="w-full md:w-1/3">
            <img
              src={Rider2}
              alt="Blood Transportation Process 2"
              className="w-full rounded-lg shadow-md object-cover h-96"
            />
            <p className="mt-2 text-white">
              We use specialized equipment to maintain the integrity of the blood.
            </p>
          </div>

          <div className="w-full md:w-1/3">
            <img
              src={Rider3}
              alt="Blood Transportation Process 3"
              className="w-full rounded-lg shadow-md object-cover h-96"
            />
            <p className="mt-2 text-white">
              Our riders are equipped with navigation tools to reach destinations quickly.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
          <p className="text-gray-300 leading-loose">
            We are dedicated to providing swift and reliable blood transportation
            services in emergency situations. We ensure that life-saving blood
            supplies reach those in need as quickly as possible.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Blood Transportation: A Vital Lifeline
          </h2>
          <p className="text-gray-300 leading-loose">
            In emergency situations, timely access to blood can mean the difference
            between life and death. Our blood transportation service plays a crucial
            role in bridging the gap between blood banks and hospitals, ensuring
            that patients receive the vital blood supplies they need without delay.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Request Assistance</h2>
          <form className="bg-white p-6 rounded shadow-md">
            {/* ... Form elements remain the same ... */}
          </form>
        </section>
        
        {/* Adding Amb image */}
        <div className="text-center">
          <img src={Amb} alt="Ambulance" className="w-64 mx-auto mb-4" />
          <p className="text-white">
            Blood transportation is essential for saving lives in emergencies.
          </p>
        </div>
      </main>
    </div>
    </>
  );
};

export default RiderHomePage;

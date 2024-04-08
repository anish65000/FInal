import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer';
import slogan1 from './../Assest/img/slogan1.png';
import slogan2 from './../Assest/img/slogan2.png';
import slogan from './../Assest/img/Slogan.jpg';
import blood1 from './../Assest/img/blood1.png';
import blood2 from './../Assest/img/blood2.png';
import blood3 from './../Assest/img/blood3.png';
import blood4 from './../Assest/img/blood4.png';

const HomePage = () => {
  const temp2 = [
    { title: 'Registration', img: blood1, description: ' Registering with a blood bank is crucial as it establishes a database of potential donors, ensuring a readily available and diverse supply of blood. In emergencies, quick access to matched blood types can be life-saving. Registration facilitates communication with donors, allowing blood banks to organize donation drives, respond to shortages, and maintain a sustainable blood inventory. It also aids in screening donors for eligibility, promoting public health by identifying potential risks. ' },
    { title: 'Observation', img: blood2, description: 'Observing the blood donation process involves carefully monitoring donors before, during, and after their contribution to ensure a safe and comfortable experience. Skilled healthcare professionals keep a watchful eye to address any concerns and maintain a secure environment' },
    { title: 'Donation', img: blood3, description: 'Blood donation is a selfless act where individuals voluntarily contribute a portion of their blood to help others in need. The donation process is quick, relatively painless, and plays a vital role in supplying hospitals with the blood required for various medical treatments and emergencies' },
    { title: 'Save Life', img: blood4, description: 'The essence of blood donation lies in its ability to save lives. By generously giving blood, donors contribute to a collective effort that can make a profound difference. Donated blood is a crucial resource in medical procedures, surgeries, and emergency situations, ultimately playing a key role in saving and improving lives' },
  ];

  return (
    <>
      <Navbar />

      <div className="flex justify-between items-center dark:text-white">

<div className="w-1/2">  
  <img src={slogan1} alt="Slogan 1"/>
</div>

<div className="w-1/2">
  <img src={slogan} alt="Slogan 2"/> 
</div>

<div className="w-1/2">
  <img src={slogan2} alt="Slogan 2"/> 
</div>

</div>

        {/* Learn About Donation Section */}
        <h1 className='font-bold text-center text-blood my-4 text-lg underline' style={{ fontSize: '40px' }}>Learn About Donation</h1>
        <div className='flex px-20'>
          <div>
          <p className='text-center' style={{  fontWeight: 'bold', fontSize: '20px' }}>
  <code>Following blood donation, the body initiates the replenishment of lost blood, promoting the production of new blood cells. This process contributes to maintaining good health, and your altruistic act of donating blood has the potential to save a life.</code>
</p>
          </div>
          <div>
            
          </div>
        </div>

        {/* Blood Donation Process Section */}
        <p className='text-xl underline font-bold text-blood text-center mt-5 mb-5'>
          Blood Donation Process
        </p>
        <div className='grid grid-cols-1 gap-4 place-items-center'>
  {temp2.map((e, i) => (
    <div key={i} className='border-metal shadow-md rounded-lg overflow-hidden max-w-[90%] select-none grid grid-cols-2'>
      <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <img src={e.img} draggable={false} width="70%" height="80px" alt={`Step ${i + 1}`} />
        {/* Set the desired width and height values */}
      </div>

      <div className='m-4' style={{ backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 className='font-bold text-lg text-midnight dark:text-white-900'>{i + 1} - {e.title}</h1>
        <p className='text-justify'>{e.description}</p>
      </div>
    </div>
  ))}
</div>



        <br />
        <div className='w-full bg-blood text-white-900 h-max text-sm text-center font-bold'>
          <Footer/>
        </div>
      
    </>
  );
};

export default HomePage;

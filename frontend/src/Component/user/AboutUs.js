// AboutUs.js

import React from 'react';
import Aboutus  from './../Assest/img/AboutUs.png';
import Aboutus1  from './../Assest/img/AboutUs1.png';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="about-us-container bg-gray-100 p-8">
  <div className="hero-section bg-green text-white py-16">
    <div className="hero-content max-w-2xl mx-auto">
      <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">Welcome to Nexus Home Care - BloodCare Nexus</h1>
      <p className="text-lg md:text-xl"><em>Empowering Lives, Saving Futures</em></p>
    </div>
  </div>



          <div className="flex justify-between items-center dark:text-white">         
<div className="w-1/2">  
<img src={Aboutus } alt="BloodCare Nexus Impact" />
</div>

<div className="w-1/2">
  
<img src={Aboutus1 } alt="BloodCare Nexus Impact" />
</div>
           </div>
      </div>
      
 
      <div className="container mx-6 py-4 text-xl">

      <section className="mission bg-red-600 text-white p-8">
  <h2 className="text-6xl my-4 text-blood underline font-bold mb-8">Mission:</h2>
  <p className="italic text-xl mb-4 font-bold">"To bridge the gap between those in need and the life-saving gift of blood, ensuring a reliable and swift supply for every patient in their time of crisis."</p>
  <p className="italic text-xl mb-4 font-bold">"Committed to saving lives, we strive to make a lasting impact on healthcare by providing a continuous and accessible supply of blood to those in need."</p>
  <p className="italic text-xl mb-4 font-bold">"Empowering communities through the gift of blood, fostering a culture of compassion and support during medical emergencies."</p>
  <p className="italic text-xl mb-4 font-bold">"Driving innovation in healthcare by leveraging technology and collaboration to ensure efficient blood management and distribution."</p>
</section>

<section class="services-section mt-2">
  <h2 class="text-5xl text-green font-bold mb-6">Our Services:</h2>
  <ul class="list-disc pl-6 text-xl">
    <li class="mb-4">
      <strong class="font-bold text-red-500 mr-2">Blood Compatibility:</strong> 
      <span class="font-bullet">Our platform assesses blood compatibility factors, providing crucial information to match donors and recipients accurately. This ensures successful transfusions and minimizes risks.</span>
    </li>
    <li class="mb-4">
      <strong class="font-bold text-red-500 mr-2">Real-Time Blood Availability:</strong> 
      <span class="font-bullet">Stay connected to the pulse of our blood banks. Users can view the current availability of various blood types in real-time, making informed decisions during emergencies.</span>
    </li>
    <li class="mb-4">
      <strong class="font-bold text-red-500 mr-2">Effortless Blood Ordering:</strong> 
      <span class="font-bullet">With a user-friendly interface, easily place orders for specific blood types according to your or your loved one's requirements. Our system streamlines the process, reducing response time in critical situations.</span>
    </li>
    <li class="mb-4">
      <strong class="font-bold text-red-500 mr-2">Emergency Contact with Administrators:</strong> 
      <span class="font-bullet">In urgent cases, our platform allows direct communication with administrators. Quick coordination ensures that blood reaches those in need promptly.</span>
    </li>
    <li class="mb-4">
      <strong class="font-bold text-red-500 mr-2">Blood Testing:</strong> 
      <span class="font-bullet">Ensure the quality and safety of donated blood through our advanced testing procedures. We prioritize accuracy to guarantee the health and well-being of both donors and recipients.</span>
    </li>
    <li class="mb-4">
      <strong class="font-bold text-red-500 mr-2">Contributing to Healthcare Quality:</strong> 
      <span class="font-bullet">Beyond addressing emergencies, we contribute to the overall improvement of medical care by facilitating safe blood transfusions, preventing blood-borne infections such as HIV/AIDS and hepatitis.</span>
    </li>
  </ul>
</section>





<section className="why-choose-section mt-8">
  <h2 className="text-5xl text-green font-bold mb-6">Why Choose BloodCare Nexus:</h2>
  <ul className="list-disc pl-6 text-xl">
    <li className="mb-4"><em>Proven Success:</em> Originating in Nepal in 2023, BloodCare Nexus has evolved into a vital tool, fulfilling over 90% of blood requests. With approximately 100,000 requests processed annually, our track record speaks for itself.</li>
    <li className="mb-4"><em>Contributing to Healthcare Quality:</em> Beyond addressing emergencies, we contribute to the overall improvement of medical care by facilitating safe blood transfusions, preventing blood-borne infections such as HIV/AIDS and hepatitis.</li>
    <li className="mb-4"><em>Cutting-edge Technology:</em> BloodCare Nexus leverages advanced technology to enhance blood management. Our digital platform ensures efficiency, accuracy, and seamless communication among blood banks, donors, and recipients.</li>
    <li className="mb-4"><em>Community Engagement:</em> We actively engage with communities to raise awareness about the importance of blood donation. Through educational programs and partnerships, we strive to build a stronger, healthier society.</li>
   
  </ul>
</section>


<section className="get-involved-section mt-8">
  <h2 className="text-5xl text-green font-bold mb-6">Get Involved - Save Lives:</h2>
  <p className="text-xl">
    Join us in making a difference. Whether you're a potential donor, a hospital, or an individual in need, BloodCare Nexus is here to serve you. Blood is a vital resource that plays a crucial role in saving lives. It is essential for various medical treatments, surgeries, and emergencies. Through your involvement, we can contribute to ensuring a steady and reliable supply of blood for those in need, preventing unnecessary suffering and loss of life.
  </p>
  <p className="text-xl">Contact us today to explore how you can be a part of this life-saving mission.</p>
</section>
<section className="testimonials-section mt-8 bg-blue-200 p-6 rounded-lg">
      <h2 className="text-5xl font-bold mb-6 text-red">What People Are Saying:</h2>
      <div className="testimonial mb-6 myQuote border-l-8 border-custom-green">
        <p className="italic text-3xl text-green">
          "BloodCare Nexus saved my life when I needed blood urgently."
        </p>
        <span className="block text-2xl text-pastel-green">- Grateful Recipient</span>
      </div>
      <div className="testimonial text-green mb-6 myQuote border-l-8 border-red-500">
        <p className="italic text-3xl text-red text-gray-800">
          "Donating through BloodCare Nexus is so easy and convenient."
        </p>
        <span className="block text-2xl">- Satisfied Donor</span>
      </div>
      <div className="testimonial mb-6 myQuote border-l-8 border-yellow">
        <p className="italic text-3xl text-green text-gray-800">
          "This platform is a game-changer for blood management in Nepal."
        </p>
        <span className="block text-2xl text-red">- Medical Professional</span>
      </div>
    </section>



</div>




    <Footer/>
    </>
  );
}

export default AboutUs;

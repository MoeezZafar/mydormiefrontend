import { useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from './ui/navbar';
import Footer from './ui/Footer';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "M. Azib Zarar",
      role: "CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      socials: { facebook: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 2,
      name: "M. Moeez Zafar",
      role: "COO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      socials: { facebook: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 3,
      name: "M. Azfar Bin Nadeem",
      role: "CFO",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      socials: { facebook: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 4,
      name: "Muahammad Sumbul",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      socials: { facebook: "#", twitter: "#", linkedin: "#" }
    }
  ];

  return (
    <div className="bg-[#fdf9e4]">
    <Navbar/>
    <div className="container mx-auto px-4 py-20 bg-[#fdf9e4]">
      <section className="mb-20" data-aos="fade-up">
        <h2 className="text-5xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
              alt="MyDormie Hostel Building"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x400?text=Image+Not+Available";
              }}
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in 2024, MyDormie emerged from a simple vision: to create a community where students could feel at home anywhere in the world. What started as a single hostel in downtown has grown into a network of accommodations that prioritize comfort, connection, and cultural exchange. Our journey has been shaped by the thousands of guests who've walked through our doors, each adding their own chapter to our story.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20 bg-[#fcf6d4] p-12 rounded-xl" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          At MyDormie, our mission is to revolutionize the hostel experience by creating spaces that foster meaningful connections, cultural understanding, and unforgettable memories. We're committed to providing affordable, high-quality accommodations while promoting sustainable tourism and supporting local communities.
        </p>
      </section>

      <section className="mb-20" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative pt-24 mt-20 bg-white rounded-xl shadow-lg overflow-visible transform transition duration-300 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={member.id * 100}
            >
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=Team+Member";
                  }}
                />
              </div>
              <div className="p-6 pt-20 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.socials.facebook} className="text-gray-400 hover:text-blue-500 transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href={member.socials.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href={member.socials.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#fcf6d4] rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Community First</h3>
            <p className="text-gray-600">We believe in creating spaces where travelers can connect, share experiences, and build lasting friendships.</p>
          </div>
          <div className="p-6 bg-[#fcf6d4] rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainability</h3>
            <p className="text-gray-600">Our commitment to eco-friendly practices ensures we minimize our environmental impact while maximizing comfort.</p>
          </div>
          <div className="p-6 bg-[#fcf6d4] rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Cultural Exchange</h3>
            <p className="text-gray-600">We promote understanding and appreciation of different cultures through shared experiences and spaces.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </div>
  );
};

export default About;

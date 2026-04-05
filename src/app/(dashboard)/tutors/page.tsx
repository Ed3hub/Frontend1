import { TutorCard } from "@/components/card/TutorCard"
import Navbar from "@/components/Navbar"
import { Container } from "@/components/ui/container"

const tutorsDetails = [
    { imageSrc: "/home/tutors/1.svg", name: "Sandra Jones", role: "Tutor", socialLinks: { whatsapp: "/icons/whatsapp.svg", facebook: "/icons/facebook.svg", twitter: "/icons/twitter.svg" } },
    { imageSrc: "/home/tutors/2.svg", name: "Tori Simone", role: "Tutor", socialLinks: { whatsapp: "/icons/whatsapp.svg", facebook: "/icons/facebook.svg", twitter: "/icons/twitter.svg" } },
    { imageSrc: "/home/tutors/3.svg", name: "Scott Daniel", role: "Tutor", socialLinks: { whatsapp: "/icons/whatsapp.svg", facebook: "/icons/facebook.svg", twitter: "/icons/twitter.svg" } },
    { imageSrc: "/home/tutors/4.svg", name: "John Doe", role: "Tutor", socialLinks: { whatsapp: "/icons/whatsapp.svg", facebook: "/icons/facebook.svg", twitter: "/icons/twitter.svg" } },
    { imageSrc: "/home/tutors/5.svg", name: "Barak Jethro", role: "Tutor", socialLinks: { whatsapp: "/icons/whatsapp.svg", facebook: "/icons/facebook.svg", twitter: "/icons/twitter.svg" } },
    { imageSrc: "/home/tutors/6.svg", name: "Tom Haniel", role: "Tutor", socialLinks: { whatsapp: "/icons/whatsapp.svg", facebook: "/icons/facebook.svg", twitter: "/icons/twitter.svg" } },
]



export default function Tutors() {
   
  
    return (
        <div>
            <Navbar/>
        <Container>
            {/* User Welcome Section */}
            <div className="space-y-1 font-poppins">
                <h1 className="text-2xl font-semibold">Find your Web3 Tutor</h1>
                <p className="text-lg">Whether you&apos;re stuck on a smart contract or just want to sharpen your skills, our expert tutors are here to help you move forward; one session at a time.</p>
            </div>

            {/* Tutors Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {tutorsDetails.map((tutor, index) => (
                    <TutorCard key={index} {...tutor}  />
                ))}
            </div>

        </Container>
        </div>
    )
}

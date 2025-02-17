
import React from "react";
import symImage from '../assets/Sym.jpg';
import stdImage from '../assets/std.jpg';
import powerImage from '../assets/power.jpg';
import newsImage from '../assets/news.jpg';
import fakeImage from '../assets/fake.jpg';
import Footer from './Footer'

const ProjectCard = ({ image, title, description, git, technologies }) => {
    return (
        <div className="max-w-sm sm:max-w-sm md:max-w-sm bg-gray-900 border border-neutral-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {title=='SymptomIQ' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={symImage} alt="" />
            </a>}
            {title=='Deep Fake Detector' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={newsImage} alt="" />
            </a>}
            {title=='Fake News Detection (NLP Project)' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={fakeImage } alt="" />
            </a>}
            {title=='Automated Power Monitoring System' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={powerImage} alt="" />
            </a>}
            {title=='Student Management System' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={stdImage} alt="" />
            </a>}
            <div className="p-4 sm:p-6">
                <a href="#">
                    <h5 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-500">{title}</h5>
                </a>
                <p className="font-normal text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-400">{description}</p>
            </div>
            <div className='m-2 sm:m-4 lg:m-6 flex justify-between'>
                <div className='flex flex-wrap gap-2 pl-2'>
                    {technologies.map((tag, index) => (
                        <p
                            key={`${index}-${tag}`}
                            className='text-[14px] text-blue-500'
                        >
                            #{tag}
                        </p>
                    ))}
                </div>
                <a href={git} className="text-red-300 border border-gray-200 rounded-lg shadow p-1 sm:p-2 lg:p-3 hover:text-green-500 duration-300">GitHub</a>
            </div>
        </div>
    );
};
  
const Projects = () => {
    return (
        <div className="bg-black">
            <div className="flex flex-wrap gap-7 justify-center items-center m-12 p-12">
                {project.map((item, index) => (
                    <ProjectCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        links={item.links}
                        git={item.git}
                        technologies={item.technologies}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    );
}


export const project = [
    {
        title:'SymptomIQ',
        description:'Developed a Flask-based web application that predicts health conditions using a TensorFlow model. The app integrates geolocation via Google Gemini API to provide personalized doctor recommendations, enhancing user experience and accessibility to healthcare advice.',
        image: {symImage},
        git:'https://github.com/shri-ram07/SymptomIQ.git',
        technologies:['Tensorflow , Flask , HTML/CSS/JS']
    },
    {
        title:'Deep Fake Detector',
        description:'Created a web-based deepfake detection tool utilizing TensorFlow and Flask. This application allows users to upload images and classify them as "REAL" or "FAKE" using an accuracy-driven machine learning model. The interface includes interactive progress bars and animations to visually display prediction probabilities.',
        image: {fakeImage},
        git:'https://github.com/shri-ram07/DeepFakeDetection.git',
        technologies:['Tensorflow , Flask , HTML/CSS/JS']
    },
    {
        title:'Fake News Detection (NLP Project)',
        description:'Designed an ML-based solution employing NLP techniques to automatically detect and classify fake news articles. The project involved text pre-processing, feature extraction, and classification algorithms, achieving high accuracy in identifying misleading information.',
        image: {newsImage},
        git:'https://github.com/shri-ram07/FakeNewsDetection.git',
        technologies:['NLTK']
    },
    {
        title:'Automated Power Monitoring System',
        description:'Developed a real-time human presence detection system using computer vision to monitor room occupancy. This project optimizes energy usage by automating appliance control based on occupancy data, showcasing innovation in energy efficiency.',
        image: {powerImage},
        git:'https://github.com/shri-ram07/AutomatedPowerMonitoringSystem.git',
        technologies:['YOLOv3 , PyQt']
    },
    {
        title:'Student Management System',
        description:'Created a comprehensive student management system featuring a user-friendly Tkinter-based interface. The system integrates MySQL for secure and efficient data storage, implementing CRUD functionality to streamline student data handling and ensure access control.',
        image: {stdImage},
        git:"https://github.com/shri-ram07/Student-Management-System.git",
        technologies:[ 'Python , Tkinter , MySql']
    }
]

export default Projects
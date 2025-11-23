import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'NeuroInsight AI – 3D Brain Tumor Segmentation',
      duration: 'Aug. – Nov. 2025',
      description: 'Designed and implemented a 3D U-Net based deep learning model for accurate brain tumor segmentation and ROI detection in volumetric MRI scans.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', '3D U-Net', 'Medical Imaging', 'Deep Learning', 'MRI Analysis'],
      features: [
        '3D volumetric MRI scan processing',
        'Accurate tumor segmentation using U-Net architecture',
        'Region of Interest (ROI) detection',
        'High-precision medical imaging analysis'
      ],
      icon: '🧠',
      color: 'neon-blue',
      links: [
        { label: 'GitHub', url: 'https://github.com/shri-ram07/NeuroInsight' }
      ]
    },
    {
      title: 'SymptomIQ',
      duration: 'Jan – Feb. 2025',
      description: 'Developed a Flask-based web application that predicts health conditions using a TensorFlow model and provides tailored advice via Google Gemini API, integrating geolocation with healthcare recommendations.',
      technologies: ['Python', 'Flask', 'TensorFlow', 'Google Gemini API', 'HTML/CSS', 'JavaScript'],
      features: [
        'Health condition prediction using TensorFlow',
        'AI-powered tailored health advice',
        'Geolocation integration for healthcare recommendations',
        'Responsive web interface'
      ],
      icon: '🏥',
      color: 'neon-green',
      links: [
        { label: 'GitHub', url: 'https://github.com/shri-ram07/SymptomIQ' }
      ]
    },
    {
      title: 'Deep Fake Detector',
      duration: 'Jan – Feb. 2025',
      description: 'Developed a web-based deepfake detection tool using TensorFlow and Flask, enabling users to upload images and classify them as "REAL" or "FAKE" with an accuracy-based confidence model.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'Computer Vision', 'Deep Learning'],
      features: [
        'Real-time deepfake detection',
        'High accuracy classification model',
        'User-friendly web interface',
        'Confidence scoring system'
      ],
      icon: '🔍',
      color: 'neon-purple',
      links: [
        { label: 'GitHub', url: 'https://github.com/shri-ram07/DeepFakeDetection' }
      ]
    },
    {
      title: 'Fake News Detection System (NLP Project)',
      duration: 'Dec. 2024',
      description: 'Developed an NLP solution using NLP techniques to automatically detect and classify fake news articles. Used Python, NLTK, and scikit-learn for text analysis and model development.',
      technologies: ['Python', 'NLTK', 'Scikit-learn', 'NLP', 'Machine Learning'],
      features: [
        'Advanced text preprocessing',
        'Multiple ML algorithms comparison',
        'Feature extraction techniques',
        'High accuracy classification'
      ],
      icon: '📰',
      color: 'neon-blue',
      links: [
        { label: 'GitHub', url: 'https://github.com/shri-ram07/FakeNewsDetection' }
      ]
    },
    {
      title: 'Automated Power Monitoring System',
      duration: 'Sept – Nov. 2024',
      description: 'Developed a real-time human presence detection system using computer vision to monitor room occupancy and optimize energy usage by automating appliance control.',
      technologies: ['Python', 'OpenCV', 'Computer Vision', 'IoT', 'Real-time Processing'],
      features: [
        'Real-time human presence detection',
        'Automated appliance control',
        'Energy optimization algorithms',
        'Computer vision-based monitoring'
      ],
      icon: '⚡',
      color: 'neon-green',
      links: [
        { label: 'GitHub', url: 'https://github.com/shri-ram07/AutomatedPowerMonitoringSystem' }
      ]
    },
    {
      title: 'Student Management System',
      duration: 'Aug – Dec. 2024',
      description: 'Developed a comprehensive student management system with a user-friendly Tkinter-based interface, integrating MySQL for secure and efficient storage of student data.',
      technologies: ['Python', 'Tkinter', 'MySQL', 'Database Design', 'GUI Development'],
      features: [
        'User-friendly GUI interface',
        'Secure data storage',
        'Student data management',
        'Database optimization'
      ],
      icon: '🎓',
      color: 'neon-purple',
      links: [
        { label: 'GitHub', url: 'https://github.com/shri-ram07/Student-Management-System' }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my work in artificial intelligence, machine learning, and software development. 
            Each project represents a unique challenge and innovative solution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="glass-morphism neon-border hover:bg-card/50 transition-all duration-300 h-full group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-4xl p-3 rounded-lg bg-${project.color}/10 border border-${project.color}/30`}>
                      {project.icon}
                    </div>
                    <Badge className="bg-muted text-muted-foreground">
                      {project.duration}
                    </Badge>
                  </div>
                  <CardTitle className={`text-2xl font-bold group-hover:text-${project.color} transition-colors duration-300`}>
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-neon-green">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className={`text-${project.color} mt-1`}>▶</span>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-neon-purple">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="neon-border text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    {project.links?.map((link, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={link.label === 'GitHub' ? 'outline' : 'default'}
                        className={link.label === 'GitHub' ? "neon-border hover:bg-neon-blue/10" : "gradient-primary hover:scale-105 transition-transform duration-300"}
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="glass-morphism neon-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 neon-text">Interested in Collaboration?</h3>
              <p className="text-muted-foreground mb-6">
                I'm always excited to work on innovative projects that push the boundaries of AI and technology. 
                Let's build something amazing together!
              </p>
              <Button 
                className="gradient-primary hover:scale-105 transition-transform duration-300 px-8 py-3"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
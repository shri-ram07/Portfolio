import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ExperienceSection = () => {
  const experience = {
    company: 'Realify Oasis',
    position: 'AI Intern',
    duration: 'Mar. 2025 – Present',
    location: 'Remote',
    description: 'Working on cutting-edge AI systems for real-time applications and autonomous workflows.',
    achievements: [
      'Built real-time action recognition systems using ST-GNN, LSTM, Transformers, and MediaPipe for multi-person tracking and gesture classification',
      'Developed autonomous n8n workflows for chatbot memory, intent classification, and task automation',
      'Created facial recognition systems for secure identity verification and access control',
      'Designed anomaly detection systems using autoencoders to flag irregular movements in surveillance and fitness datasets',
      'Engineered feedback systems using temporal enhancement and computer vision metrics for adaptive response generation',
      'Optimized models for resource-constrained environments using quantization, batch inference, and hardware-aware tuning'
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'MediaPipe', 'Computer Vision', 'NLP', 'Deep Learning']
  };

  const education = [
    {
      degree: 'B.Tech Computer Science with AIML',
      institution: 'Kalinga University, Raipur',
      duration: '2023-2027',
      cgpa: '9.46/10 (1st Year)',
      status: 'Currently pursuing specialization in AI & Machine Learning',
      highlights: ['Science Stream with Computer Science', 'Top Academic Performance']
    },
    {
      degree: 'Higher Secondary XII - CBSE',
      institution: 'Jawahar Navodaya Vidyalaya, Satna',
      duration: '2020-2022',
      score: '74.8%',
      highlights: ['Science Stream with Computer Science']
    },
    {
      degree: 'Secondary X - CBSE',
      institution: 'Jawahar Navodaya Vidyalaya, Satna',
      duration: '2020',
      score: '88.6%',
      highlights: ['School Merit Holder']
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Experience & <span className="neon-text">Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My professional journey and academic achievements in the field of artificial intelligence and computer science.
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 neon-text">Professional Experience</h3>
          <Card className="glass-morphism neon-border hover:bg-card/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-neon-blue mb-2">{experience.position}</h4>
                  <p className="text-xl text-foreground mb-2">{experience.company} | {experience.location}</p>
                  <p className="text-muted-foreground">{experience.duration}</p>
                </div>
                <Badge className="gradient-primary text-white mt-4 lg:mt-0">Current</Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">{experience.description}</p>
              
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4 text-neon-green">Key Achievements:</h5>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-neon-blue mt-1">▶</span>
                      <span className="text-muted-foreground">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold mb-4 text-neon-purple">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="neon-border">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8 neon-text">Education</h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="glass-morphism neon-border hover:bg-card/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-neon-blue mb-1">{edu.degree}</h4>
                        <p className="text-lg text-foreground mb-1">{edu.institution}</p>
                        <p className="text-muted-foreground">{edu.duration}</p>
                      </div>
                      <div className="text-right mt-4 lg:mt-0">
                        <p className="text-lg font-semibold text-neon-green">
                          {edu.cgpa || edu.score}
                        </p>
                        {edu.status && (
                          <p className="text-sm text-muted-foreground">{edu.status}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-accent/20">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-4 top-full w-0.5 h-8 bg-neon-blue/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
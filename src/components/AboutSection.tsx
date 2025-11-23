import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const stats = [
    { label: 'CGPA', value: '9.46/10', icon: '🎓' },
    { label: 'Projects', value: '16+', icon: '🚀' },
    { label: 'Certifications', value: '5+', icon: '🏆' },
    { label: 'Experience', value: '1.5+ Years', icon: '💼' }
  ];

  const highlights = [
    {
      title: 'AI Engineer at Ryze AI',
      description: 'Currently building autonomous AI agents with LLM integration and deploying on GCP',
      icon: '🚀'
    },
    {
      title: 'Medical AI Innovation',
      description: 'Developed 3D U-Net models for brain tumor segmentation and MRI analysis',
      icon: '🧠'
    },
    {
      title: 'Cloud & Backend Expert',
      description: 'Building scalable AI microservices with FastAPI on Google Cloud Platform',
      icon: '☁️'
    },
    {
      title: 'Agentic AI Specialist',
      description: 'Creating autonomous AI workflows with N8N and LLM-powered chatbots',
      icon: '🤖'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="neon-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm an AI Engineering student with a passion for creating intelligent systems that make a difference. 
            My journey in artificial intelligence is driven by curiosity and the desire to build tomorrow's technology today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-morphism p-6 rounded-xl text-center neon-border"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold neon-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-morphism neon-border hover:bg-card/50 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-neon-blue">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="glass-morphism neon-border max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 neon-text">My Journey</h3>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  My passion for artificial intelligence began during my undergraduate studies, where I discovered 
                  the incredible potential of machine learning to solve complex problems. With a strong academic 
                  foundation (CGPA: 9.46/10), I've been consistently exploring the frontiers of AI technology.
                </p>
                <p>
                  Currently working as an AI Engineer at Ryze AI, I'm engineering autonomous AI agents that integrate 
                  Google Gemini and multiple APIs for real-world applications. I build scalable microservices with 
                  FastAPI on Google Cloud Platform, specializing in LLM prompt frameworks, agentic AI pipelines, and 
                  AI-powered automation. My experience includes developing 3D medical imaging models for brain tumor 
                  segmentation and real-time action recognition systems using ST-GNN, LSTM, and Transformers.
                </p>
                <p>
                  When I'm not coding, you'll find me participating in hackathons, contributing to open-source 
                  projects, or exploring the latest research in AI. I believe in continuous learning and am 
                  always excited to take on new challenges that push the boundaries of what's possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
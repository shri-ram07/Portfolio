import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '💻',
      color: 'neon-blue',
      skills: [
        { name: 'Python', level: 95, description: 'Data Structures, Web Dev' },
        { name: 'C', level: 85, description: 'System Programming' },
        { name: 'SQL', level: 88, description: 'Database Design' },
        { name: 'JavaScript', level: 82, description: 'Web Development' },
        { name: 'HTML/CSS', level: 90, description: 'Frontend Development' }
      ]
    },
    {
      title: 'AI/ML Frameworks',
      icon: '🧠',
      color: 'neon-green',
      skills: [
        { name: 'TensorFlow', level: 92, description: 'Deep Learning' },
        { name: 'PyTorch', level: 88, description: 'Neural Networks' },
        { name: 'Scikit-Learn', level: 90, description: 'ML Algorithms' },
        { name: 'NLTK', level: 85, description: 'Natural Language Processing' },
        { name: 'OpenCV', level: 87, description: 'Computer Vision' }
      ]
    },
    {
      title: 'Development Tools',
      icon: '🛠️',
      color: 'neon-purple',
      skills: [
        { name: 'Git/GitHub', level: 90, description: 'Version Control' },
        { name: 'Docker', level: 75, description: 'Containerization' },
        { name: 'Flask', level: 88, description: 'Web Framework' },
        { name: 'MySQL', level: 85, description: 'Database Management' },
        { name: 'Jupyter', level: 92, description: 'Data Science' }
      ]
    },
    {
      title: 'Specialized Skills',
      icon: '⚡',
      color: 'neon-blue',
      skills: [
        { name: 'Machine Learning', level: 94, description: 'Model Development' },
        { name: 'Deep Learning', level: 90, description: 'Neural Networks' },
        { name: 'Computer Vision', level: 88, description: 'Image Processing' },
        { name: 'NLP', level: 86, description: 'Text Analysis' },
        { name: 'Data Analysis', level: 89, description: 'Statistical Analysis' }
      ]
    }
  ];

  const certifications = [
    {
      title: 'Advanced Python Certification',
      issuer: 'Tech Nook',
      description: 'Data structures, memory management, complex queries, and performance optimization',
      icon: '🐍'
    },
    {
      title: 'AI & ML Certification',
      issuer: 'Tech Nook',
      description: 'Supervised/unsupervised learning, neural networks, and deep learning fundamentals',
      icon: '🤖'
    },
    {
      title: 'Hackathon Participation',
      issuer: 'Various Events',
      description: 'National level 24 hours Hackathon - Kalinga Hackathon & Hackgenx Hackathon',
      icon: '🏆'
    }
  ];

  const achievements = [
    'Won the Intra-Institutional Start-up Competition for developing an Automated Power Monitoring System',
    'Participated in National level 24 hours Hackathons',
    'Completed advanced certifications in Python, C, and SQL',
    'Earned AI & ML certification mastering supervised/unsupervised learning',
    'Demonstrated expertise in rapport building, effective communication, and collaborative team leadership'
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Skills & <span className="neon-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, certifications, and professional capabilities 
            in artificial intelligence and software development.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-morphism neon-border hover:bg-card/50 transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`text-3xl p-2 rounded-lg bg-${category.color}/10 border border-${category.color}/30`}>
                      {category.icon}
                    </div>
                    <CardTitle className={`text-xl font-bold text-${category.color}`}>
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className={`bg-gradient-to-r from-${category.color} to-${category.color}/70 h-2 rounded-full`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{skill.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center neon-text">Certifications</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass-morphism neon-border p-6 rounded-xl text-center"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-neon-blue">{cert.title}</h4>
                <p className="text-sm text-neon-green mb-3">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center neon-text">Achievements</h3>
          <Card className="glass-morphism neon-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-neon-green mt-1">🏆</span>
                    <span className="text-muted-foreground">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
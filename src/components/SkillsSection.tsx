import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '💻',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', level: 95, tags: ['Data Structures', 'Web Dev', 'AI/ML'] },
        { name: 'Java', level: 83, tags: ['OOP', 'Backend Development'] },
        { name: 'C', level: 85, tags: ['System Programming', 'Memory Management'] },
        { name: 'SQL', level: 88, tags: ['Database Design', 'Complex Queries'] },
        { name: 'JavaScript', level: 82, tags: ['Web Development', 'Frontend'] },
        { name: 'HTML/CSS', level: 90, tags: ['UI Design', 'Responsive Design'] }
      ]
    },
    {
      title: 'AI/ML Frameworks',
      icon: '🧠',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'TensorFlow', level: 92, tags: ['Deep Learning', 'Model Training'] },
        { name: 'PyTorch', level: 90, tags: ['Neural Networks', '3D Models'] },
        { name: 'Transformers', level: 88, tags: ['NLP', 'LLM Integration'] },
        { name: 'MediaPipe', level: 87, tags: ['Pose Estimation', 'Gesture Recognition'] },
        { name: 'ST-GNN', level: 85, tags: ['Spatial-Temporal', 'Action Recognition'] },
        { name: 'OpenCV', level: 87, tags: ['Computer Vision', 'Image Processing'] },
        { name: 'Scikit-Learn', level: 90, tags: ['ML Algorithms', 'Data Mining'] }
      ]
    },
    {
      title: 'Backend & Cloud',
      icon: '☁️',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'FastAPI', level: 90, tags: ['RESTful APIs', 'Microservices'] },
        { name: 'Flask', level: 88, tags: ['Web Applications', 'Backend'] },
        { name: 'Google Cloud Platform', level: 85, tags: ['Cloud Run', 'VM Deployment'] },
        { name: 'N8N', level: 80, tags: ['Workflow Automation', 'Agentic AI'] },
        { name: 'MySQL', level: 85, tags: ['DBMS', 'Query Optimization'] },
        { name: 'Git/GitHub', level: 90, tags: ['Version Control', 'Collaboration'] }
      ]
    },
    {
      title: 'AI Specializations',
      icon: '⚡',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      skills: [
        { name: 'LLM Integration', level: 92, tags: ['Google Gemini', 'Prompt Engineering'] },
        { name: 'Agentic AI', level: 88, tags: ['Autonomous Systems', 'Memory Management'] },
        { name: 'Computer Vision', level: 90, tags: ['Real-time Processing', 'Object Detection'] },
        { name: '3D Medical Imaging', level: 85, tags: ['Tumor Segmentation', 'ROI Analysis'] },
        { name: 'NLP', level: 88, tags: ['Intent Classification', 'Text Analysis'] },
        { name: 'Anomaly Detection', level: 87, tags: ['Autoencoders', 'Temporal Embeddings'] }
      ]
    }
  ];

  const certifications = [
    {
      title: 'Advanced Python Certification',
      issuer: 'HackerRank',
      description: 'Data structures, memory management, complex algorithms, and performance optimization',
      icon: '🐍'
    },
    {
      title: 'C Programming Certification',
      issuer: 'HackerRank',
      description: 'System programming, memory management, and advanced C concepts',
      icon: '⚙️'
    },
    {
      title: 'SQL Certification',
      issuer: 'HackerRank',
      description: 'Complex queries, database design, and performance optimization',
      icon: '🗄️'
    },
    {
      title: 'AI & ML Certification',
      issuer: 'Teach Nook',
      description: 'Supervised/unsupervised learning, neural networks, and deep learning fundamentals',
      icon: '🤖'
    },
    {
      title: 'Hackathon Participation',
      issuer: 'National Level Events',
      description: '24 hours Hackathons - Kalinga Hackathon, Hackomania & Hackgenx Hackathon',
      icon: '🏆'
    }
  ];

  const achievements = [
    'Winner of Intra-Institutional Start-up Competition for Automated Power Monitoring System leveraging computer vision',
    'Active participant in National-level 24-hour Hackathons including Kalinga Hackathon, Hackomania, and Hackgenx',
    'HackerRank certified in Python, C, and SQL demonstrating proficiency in data structures and algorithm optimization',
    'Certified in AI & ML from Teach Nook, covering supervised/unsupervised learning, neural architectures, and deep learning frameworks',
    'Strong foundation in collaborative development, technical communication, and cross-functional team coordination'
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
            Technical <span className="neon-text">Proficiencies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technical skill set spanning AI/ML frameworks, cloud infrastructure, and production-grade development tools for building scalable intelligent systems.
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
              <Card className="glass-morphism neon-border hover:shadow-2xl transition-all duration-500 h-full group">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${category.gradient} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent">
                        {category.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-5">
                  {category.skills.map((skill, idx) => (
                    <motion.div 
                      key={idx} 
                      className="space-y-2.5 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">{skill.name}</span>
                        <Badge variant="secondary" className="text-xs font-mono">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2.5 overflow-hidden border border-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, delay: idx * 0.05, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.gradient} shadow-lg`}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {skill.tags.map((tag, tagIdx) => (
                          <Badge 
                            key={tagIdx} 
                            variant="outline" 
                            className="text-xs px-2 py-0.5 bg-background/50"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Download, Mail, MapPin, Code, Database, Globe, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TemplateProps {
  userProfile: any;
  profile: any;
}

export function DeveloperTemplate({ userProfile, profile }: TemplateProps) {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, projectsRes, experienceRes] = await Promise.all([
          fetch('/api/skills'),
          fetch('/api/projects'),
          fetch('/api/experience'),
        ]);

        const [skillsData, projectsData, experienceData] = await Promise.all([
          skillsRes.json(),
          projectsRes.json(),
          experienceRes.json(),
        ]);

        setSkills(skillsData);
        setProjects(projectsData);
        setExperiences(experienceData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Globe className="w-5 h-5" />;
      case 'backend':
        return <Database className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const skillsByCategory = skills.reduce((acc: any, skill: any) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start mb-6"
            >
              <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
                <MapPin size={16} />
                <span className="text-sm font-medium">
                  {profile?.location || 'Available for work'}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {profile?.name || 'Developer'}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl sm:text-2xl text-slate-300 mb-6"
            >
              {profile?.role || 'Full Stack Developer'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-slate-400 mb-8 max-w-2xl"
            >
              {profile?.shortBio || 'Passionate about creating amazing digital experiences with modern technologies.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 group">
                View Projects
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 group">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              
              {profile?.resumeUrl && (
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 group">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl">
                <img
                  src={profile?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                  alt={profile?.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Code Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Code className="text-2xl text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Database className="text-xl text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Technical{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {Object.entries(skillsByCategory).map(([category, categorySkills]: [string, any], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-2xl font-bold capitalize text-slate-200">{category}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categorySkills.map((skill: any, skillIndex: number) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300 mb-4">
                          <span className="text-2xl font-bold text-blue-400">
                            {skill.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-lg group-hover:text-blue-400 transition-colors mb-4 text-slate-200">
                          {skill.name}
                        </h4>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Proficiency</span>
                            <span className="font-medium text-slate-300">{skill.proficiency}%</span>
                          </div>
                          
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: skillIndex * 0.05 + 0.5 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A showcase of my recent work and technical achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project: any, index: number) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.githubUrl && (
                        <Button size="icon" variant="secondary" className="bg-slate-800/80 backdrop-blur-sm">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="icon" variant="secondary" className="bg-slate-800/80 backdrop-blur-sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors text-slate-200">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded text-xs font-medium">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        View Details
                      </Button>
                      
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-400">
                            <Github className="w-4 h-4" />
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-400">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 group">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 group">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
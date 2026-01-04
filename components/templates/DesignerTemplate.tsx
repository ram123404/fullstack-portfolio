'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, ExternalLink, Award, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TemplateProps {
  userProfile: any;
  profile: any;
}

export function DesignerTemplate({ userProfile, profile }: TemplateProps) {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/skills'),
        ]);

        const [projectsData, skillsData] = await Promise.all([
          projectsRes.json(),
          skillsRes.json(),
        ]);

        setProjects(projectsData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl mb-8">
              <img
                src={profile?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                alt={profile?.name || 'Designer'}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl font-light leading-tight mb-6 text-gray-900"
          >
            {profile?.name || 'Creative Designer'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-gray-600 mb-8 font-light"
          >
            {profile?.role || 'UI/UX Designer & Creative Director'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {profile?.shortBio || 'Crafting beautiful, intuitive experiences that delight users and drive business success through thoughtful design and creative innovation.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full group">
              <Eye className="mr-2 h-5 w-5" />
              View My Work
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </Button>
            
            <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full">
              Let's Collaborate
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-light mb-8 text-gray-900">
                Design is not just what it looks like —{' '}
                <span className="text-purple-600 font-medium">design is how it works</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {profile?.bio || 'I believe in creating designs that not only look beautiful but also solve real problems. With over 5 years of experience in UI/UX design, I\'ve helped startups and established companies create digital experiences that users love.'}
              </p>

              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Years</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg"
                  alt="Design workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Palette className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Selected{' '}
              <span className="text-purple-600 font-medium">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A curated collection of my recent design projects and case studies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 6).map((project: any, index: number) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-3">
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                          <Eye className="w-4 h-4 mr-2" />
                          View Case Study
                        </Button>
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        {project.status}
                      </Badge>
                      <span className="text-sm text-gray-500">2024</span>
                    </div>
                    
                    <h3 className="text-2xl font-light mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Design{' '}
              <span className="text-purple-600 font-medium">Tools</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The creative arsenal I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {skills.map((skill: any, index: number) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-2xl font-bold text-purple-600">
                    {skill.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  {skill.name}
                </h4>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6 text-gray-900">
              Client{' '}
              <span className="text-purple-600 font-medium">Love</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial, index) => (
              <motion.div
                key={testimonial}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-4 h-4 text-pink-500 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed italic">
                      "Working with this designer was an absolute pleasure. The attention to detail and creative vision exceeded our expectations."
                    </p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold mr-4">
                        JD
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">CEO, TechCorp</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6">
              Let's Create Something{' '}
              <span className="font-medium">Beautiful</span>
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Ready to bring your vision to life? I'd love to hear about your project and explore how we can work together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full">
                Start a Project
              </Button>
              
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full">
                View Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
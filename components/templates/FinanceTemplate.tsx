'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Shield, Users, Calculator, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TemplateProps {
  userProfile: any;
  profile: any;
}

export function FinanceTemplate({ userProfile, profile }: TemplateProps) {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experienceRes, educationRes] = await Promise.all([
          fetch('/api/experience'),
          fetch('/api/education'),
        ]);

        const [experienceData, educationData] = await Promise.all([
          experienceRes.json(),
          educationRes.json(),
        ]);

        setExperiences(experienceData);
        setEducation(educationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const services = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Tax Planning & Preparation',
      description: 'Comprehensive tax strategies to minimize liability and maximize savings',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Financial Analysis',
      description: 'In-depth financial analysis and reporting for informed decision making',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Risk Management',
      description: 'Identify and mitigate financial risks to protect your assets',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Audit & Compliance',
      description: 'Ensure regulatory compliance and prepare for audits',
    },
  ];

  const certifications = [
    'Certified Public Accountant (CPA)',
    'Chartered Financial Analyst (CFA)',
    'Certified Management Accountant (CMA)',
    'QuickBooks ProAdvisor',
  ];

  const industries = [
    'Healthcare',
    'Technology',
    'Manufacturing',
    'Real Estate',
    'Non-Profit',
    'Retail',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-blue-200 font-medium">Available for Consultation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {profile?.name || 'Financial Expert'}
              </h1>

              <h2 className="text-xl sm:text-2xl text-blue-200 mb-6 font-light">
                {profile?.role || 'Certified Public Accountant & Financial Advisor'}
              </h2>

              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl">
                {profile?.shortBio || 'Providing comprehensive financial services and strategic guidance to help individuals and businesses achieve their financial goals with confidence and clarity.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Schedule Consultation
                </Button>
                
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  View Services
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl"></div>
                
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
                  <img
                    src={profile?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                    alt={profile?.name || 'Financial Professional'}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Stats */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">15+</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-green-600 rounded-2xl p-4 shadow-xl text-white"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-xs">Clients Served</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Professional{' '}
              <span className="text-blue-600">Summary</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {profile?.bio || 'With over 15 years of experience in accounting and financial management, I provide comprehensive financial services to help clients navigate complex financial landscapes. My expertise spans tax planning, financial analysis, and strategic business consulting.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Certified Professional</h3>
                  <p className="text-gray-600 text-sm">Licensed CPA with multiple certifications</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
                  <p className="text-gray-600 text-sm">Consistent track record of client success</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Client-Focused</h3>
                  <p className="text-gray-600 text-sm">Personalized service and attention</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Professional{' '}
              <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions tailored to your specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Licenses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Certifications &{' '}
              <span className="text-blue-600">Licenses</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-6 bg-blue-50 rounded-xl"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cert}</h3>
                  <p className="text-sm text-gray-600">Active & Current</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Professional{' '}
              <span className="text-blue-600">Experience</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((experience: any, index: number) => (
              <motion.div
                key={experience._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {experience.role}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-1">
                          {experience.company}
                        </p>
                        {experience.location && (
                          <p className="text-gray-500 text-sm">{experience.location}</p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="outline" className="text-gray-600">
                          {new Date(experience.startDate).getFullYear()} - {' '}
                          {experience.current ? 'Present' : new Date(experience.endDate).getFullYear()}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {experience.description}
                    </p>
                    
                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Industries{' '}
              <span className="text-blue-600">Served</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extensive experience across diverse industry sectors
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300"
              >
                <h3 className="font-semibold text-gray-900">{industry}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Secure Your{' '}
              <span className="text-green-400">Financial Future?</span>
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto">
              Let's discuss your financial goals and create a customized strategy for success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                Schedule Free Consultation
              </Button>
              
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
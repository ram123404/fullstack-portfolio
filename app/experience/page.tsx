'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Experience {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location?: string;
  technologies: string[];
}

interface Education {
  _id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  gpa?: string;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expResponse, eduResponse] = await Promise.all([
          fetch('/api/experience'),
          fetch('/api/education'),
        ]);
        
        const expData = await expResponse.json();
        const eduData = await eduResponse.json();
        
        setExperiences(expData);
        setEducation(eduData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  const TimelineItem = ({ 
    item, 
    index, 
    type 
  }: { 
    item: Experience | Education; 
    index: number; 
    type: 'experience' | 'education';
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-2 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg"></div>
      
      {/* Content */}
      <div className="pb-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50"
        >
          {type === 'experience' ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {(item as Experience).role}
                  </h3>
                  <p className="text-primary font-semibold">
                    {(item as Experience).company}
                  </p>
                </div>
                
                <div className="flex flex-col sm:items-end text-sm text-muted-foreground mt-2 sm:mt-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(item.startDate)} - {' '}
                      {item.current ? 'Present' : item.endDate ? formatDate(item.endDate) : 'Present'}
                    </span>
                  </div>
                  
                  {(item as Experience).location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{(item as Experience).location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {item.description}
              </p>
              
              {(item as Experience).technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(item as Experience).technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {(item as Education).degree}
                  </h3>
                  <p className="text-primary font-semibold">
                    {(item as Education).school}
                  </p>
                  <p className="text-muted-foreground">
                    {(item as Education).field}
                  </p>
                </div>
                
                <div className="flex flex-col sm:items-end text-sm text-muted-foreground mt-2 sm:mt-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(item.startDate)} - {' '}
                      {item.current ? 'Present' : item.endDate ? formatDate(item.endDate) : 'Present'}
                    </span>
                  </div>
                  
                  {(item as Education).gpa && (
                    <div className="text-sm">
                      GPA: {(item as Education).gpa}
                    </div>
                  )}
                </div>
              </div>
              
              {item.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Experience &{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Education
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              My professional journey and academic background
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="experience" className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="mt-0">
              {experiences.length > 0 ? (
                <div className="relative">
                  {experiences.map((experience, index) => (
                    <TimelineItem
                      key={experience._id}
                      item={experience}
                      index={index}
                      type="experience"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No experience found</h3>
                  <p className="text-muted-foreground">Work experience will appear here once added through the admin panel.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              {education.length > 0 ? (
                <div className="relative">
                  {education.map((edu, index) => (
                    <TimelineItem
                      key={edu._id}
                      item={edu}
                      index={index}
                      type="education"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No education found</h3>
                  <p className="text-muted-foreground">Educational background will appear here once added through the admin panel.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
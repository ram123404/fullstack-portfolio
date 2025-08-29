'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Settings, Palette } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return <Globe className="w-6 h-6" />;
    case 'backend':
      return <Database className="w-6 h-6" />;
    case 'mobile':
      return <Smartphone className="w-6 h-6" />;
    case 'devops':
      return <Settings className="w-6 h-6" />;
    case 'design':
      return <Palette className="w-6 h-6" />;
    default:
      return <Code className="w-6 h-6" />;
  }
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
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

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Skills
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          {Object.keys(skillsByCategory).length > 0 ? (
            <div className="space-y-16">
              {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="space-y-8"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {getCategoryIcon(category)}
                    </div>
                    <h2 className="text-2xl font-bold capitalize">{category}</h2>
                  </div>

                  {/* Skills in Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {/* Skill Icon/Name */}
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-blue-600/30 transition-all duration-300">
                            <span className="text-2xl font-bold text-primary">
                              {skill.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                        </div>

                        {/* Proficiency Bar */}
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Proficiency</span>
                            <span className="font-medium">{skill.proficiency}%</span>
                          </div>
                          
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ 
                                duration: 1, 
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 
                              }}
                              className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Code className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No skills found</h3>
              <p className="text-muted-foreground">Skills will appear here once added through the admin panel.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
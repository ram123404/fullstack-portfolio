'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  TrendingUp,
  Calendar,
  Activity 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStats {
  profile: boolean;
  projectsCount: number;
  skillsCount: number;
  experienceCount: number;
  educationCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    profile: false,
    projectsCount: 0,
    skillsCount: 0,
    experienceCount: 0,
    educationCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [profileRes, projectsRes, skillsRes, experienceRes, educationRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/experience'),
          fetch('/api/education'),
        ]);

        const [profile, projects, skills, experience, education] = await Promise.all([
          profileRes.json(),
          projectsRes.json(),
          skillsRes.json(),
          experienceRes.json(),
          educationRes.json(),
        ]);

        setStats({
          profile: profile && profile._id,
          projectsCount: Array.isArray(projects) ? projects.length : 0,
          skillsCount: Array.isArray(skills) ? skills.length : 0,
          experienceCount: Array.isArray(experience) ? experience.length : 0,
          educationCount: Array.isArray(education) ? education.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Profile',
      value: stats.profile ? 'Complete' : 'Incomplete',
      icon: <User className="h-4 w-4" />,
      color: stats.profile ? 'text-green-600' : 'text-red-600',
      bgColor: stats.profile ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30',
    },
    {
      title: 'Projects',
      value: stats.projectsCount,
      icon: <FolderOpen className="h-4 w-4" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Skills',
      value: stats.skillsCount,
      icon: <Zap className="h-4 w-4" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      title: 'Experience',
      value: stats.experienceCount,
      icon: <Briefcase className="h-4 w-4" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Education',
      value: stats.educationCount,
      icon: <GraduationCap className="h-4 w-4" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's an overview of your portfolio content.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.title === 'Profile' 
                    ? stat.value === 'Complete' 
                      ? 'Ready to display' 
                      : 'Needs setup'
                    : `Total ${stat.title.toLowerCase()}`
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!stats.profile && (
                <motion.a
                  href="/admin/profile"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <User className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Setup Profile
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Complete your basic information
                      </p>
                    </div>
                  </div>
                </motion.a>
              )}
              
              <motion.a
                href="/admin/projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FolderOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Add Project
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Showcase your work
                    </p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a
                href="/template-selection"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Palette className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Choose Template
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select your portfolio style
                    </p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a
                href="/admin/skills"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Zap className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Add Skills
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      List your expertise
                    </p>
                  </div>
                </div>
              </motion.a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Portfolio Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${stats.profile ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium">Profile Setup</span>
                </div>
                <span className={`text-sm ${stats.profile ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.profile ? 'Complete' : 'Pending'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${stats.projectsCount > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="font-medium">Projects</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {stats.projectsCount} items
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${stats.skillsCount > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="font-medium">Skills</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {stats.skillsCount} items
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
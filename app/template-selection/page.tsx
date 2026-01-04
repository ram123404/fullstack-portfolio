'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Code, Palette, Calculator, Briefcase, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface Template {
  id: string;
  name: string;
  role: string;
  description: string;
  sections: string[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  preview: string;
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: 'developer',
    name: 'Developer Portfolio',
    role: 'Software Developer',
    description: 'Perfect for developers, engineers, and tech professionals',
    sections: ['Hero', 'Skills', 'Projects', 'Experience', 'Education', 'Blog', 'Contact'],
    colorScheme: {
      primary: '#3B82F6',
      secondary: '#1E293B',
      accent: '#10B981',
    },
    features: ['GitHub Integration', 'Code Snippets', 'Tech Stack Display', 'Project Demos'],
    preview: '/templates/developer-preview.jpg',
    icon: <Code className="w-8 h-8" />,
  },
  {
    id: 'designer',
    name: 'Designer Portfolio',
    role: 'UI/UX Designer',
    description: 'Showcase your creative work and design process',
    sections: ['Hero', 'About', 'Case Studies', 'Gallery', 'Tools', 'Testimonials', 'Contact'],
    colorScheme: {
      primary: '#8B5CF6',
      secondary: '#F3F4F6',
      accent: '#F59E0B',
    },
    features: ['Case Study Layouts', 'Image Galleries', 'Design Process', 'Tool Showcase'],
    preview: '/templates/designer-preview.jpg',
    icon: <Palette className="w-8 h-8" />,
  },
  {
    id: 'finance',
    name: 'Finance Professional',
    role: 'Accountant / Finance',
    description: 'Professional template for finance and accounting experts',
    sections: ['Summary', 'Certifications', 'Services', 'Experience', 'Industries', 'Achievements', 'Contact'],
    colorScheme: {
      primary: '#1E40AF',
      secondary: '#F8FAFC',
      accent: '#059669',
    },
    features: ['Certification Display', 'Service Listings', 'Industry Experience', 'Professional Summary'],
    preview: '/templates/finance-preview.jpg',
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    id: 'professional',
    name: 'General Professional',
    role: 'Marketing / Manager / Consultant',
    description: 'Versatile template for various professional roles',
    sections: ['Overview', 'Expertise', 'Case Studies', 'History', 'Testimonials', 'Contact'],
    colorScheme: {
      primary: '#DC2626',
      secondary: '#F9FAFB',
      accent: '#7C3AED',
    },
    features: ['Case Studies', 'Testimonials', 'Achievement Highlights', 'Professional Timeline'],
    preview: '/templates/professional-preview.jpg',
    icon: <Briefcase className="w-8 h-8" />,
  },
];

export default function TemplateSelection() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentTemplate, setCurrentTemplate] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCurrentTemplate = async () => {
      try {
        const response = await fetch('/api/user-profile');
        if (response.ok) {
          const data = await response.json();
          setCurrentTemplate(data.selectedTemplate || 'developer');
          setSelectedTemplate(data.selectedTemplate || 'developer');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (session) {
      fetchCurrentTemplate();
    }
  }, [session]);

  const handleTemplateSelect = async () => {
    if (!selectedTemplate) return;

    setSaving(true);
    try {
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTemplate,
          username: session?.user?.email?.split('@')[0] || 'user',
        }),
      });

      if (response.ok) {
        toast.success('Template selected successfully!');
        router.push('/admin');
      } else {
        throw new Error('Failed to save template');
      }
    } catch (error) {
      toast.error('Failed to save template selection');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = (templateId: string) => {
    setPreviewing(templateId);
    // In a real implementation, you would open a modal or new tab with the preview
    toast.success(`Preview for ${templates.find(t => t.id === templateId)?.name} coming soon!`);
    setTimeout(() => setPreviewing(''), 1000);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Portfolio Template
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select a template that best represents your professional role and expertise
          </p>
          {currentTemplate && (
            <Badge variant="outline" className="mt-4">
              Current: {templates.find(t => t.id === currentTemplate)?.name}
            </Badge>
          )}
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${template.colorScheme.primary}20`, color: template.colorScheme.primary }}
                      >
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{template.role}</p>
                      </div>
                    </div>
                    
                    {selectedTemplate === template.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{template.description}</p>

                  {/* Color Scheme */}
                  <div>
                    <h4 className="font-medium mb-2">Color Scheme</h4>
                    <div className="flex space-x-2">
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: template.colorScheme.primary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: template.colorScheme.secondary }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: template.colorScheme.accent }}
                      />
                    </div>
                  </div>

                  {/* Sections */}
                  <div>
                    <h4 className="font-medium mb-2">Included Sections</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section) => (
                        <Badge key={section} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {template.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(template.id);
                      }}
                      disabled={previewing === template.id}
                      className="flex-1"
                    >
                      {previewing === template.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleTemplateSelect}
            disabled={!selectedTemplate || saving}
            size="lg"
            className="group min-w-[200px]"
          >
            {saving ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <span>
                  {selectedTemplate === currentTemplate ? 'Continue with Current' : 'Select Template'}
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
            size="lg"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
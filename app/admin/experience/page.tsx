'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';

const experienceSchema = z.object({
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().optional(),
  technologies: z.string().optional(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

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

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      current: false,
    },
  });

  const current = watch('current');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ExperienceFormData) => {
    setSaving(true);
    try {
      const experienceData = {
        ...data,
        technologies: data.technologies ? data.technologies.split(',').map(tech => tech.trim()) : [],
        endDate: data.current ? undefined : data.endDate,
      };

      const url = editingExperience ? `/api/experience/${editingExperience._id}` : '/api/experience';
      const method = editingExperience ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });

      if (response.ok) {
        toast.success(editingExperience ? 'Experience updated!' : 'Experience created!');
        setIsDialogOpen(false);
        setEditingExperience(null);
        reset();
        fetchExperiences();
      } else {
        throw new Error('Failed to save experience');
      }
    } catch (error) {
      toast.error('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setValue('company', experience.company);
    setValue('role', experience.role);
    setValue('startDate', experience.startDate.split('T')[0]);
    setValue('endDate', experience.endDate ? experience.endDate.split('T')[0] : '');
    setValue('current', experience.current);
    setValue('description', experience.description);
    setValue('location', experience.location || '');
    setValue('technologies', experience.technologies.join(', '));
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Experience deleted!');
        fetchExperiences();
      } else {
        throw new Error('Failed to delete experience');
      }
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Experience Management</h1>
              <p className="text-muted-foreground">Manage your work experience and career history</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingExperience(null);
                reset();
                setIsDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      {...register('company')}
                      placeholder="Google"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">Role/Position *</Label>
                    <Input
                      id="role"
                      {...register('role')}
                      placeholder="Senior Software Engineer"
                    />
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register('startDate')}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...register('endDate')}
                      disabled={current}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={current}
                    onCheckedChange={(checked) => setValue('current', checked)}
                  />
                  <Label>Currently working here</Label>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your role, responsibilities, and achievements..."
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
                  <Input
                    id="technologies"
                    {...register('technologies')}
                    placeholder="React, Node.js, AWS, Docker"
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" disabled={saving} className="flex-1">
                    {saving ? 'Saving...' : editingExperience ? 'Update' : 'Create'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((experience) => (
            <motion.div
              key={experience._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{experience.role}</h3>
                        {experience.current && (
                          <Badge className="bg-green-500/10 text-green-500">Current</Badge>
                        )}
                      </div>
                      
                      <p className="text-primary font-medium mb-1">{experience.company}</p>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        {new Date(experience.startDate).toLocaleDateString()} - {' '}
                        {experience.current ? 'Present' : experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                        {experience.location && ` • ${experience.location}`}
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{experience.description}</p>
                      
                      {experience.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {experience.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(experience)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(experience._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No experience found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your work experience</p>
            <Button onClick={() => {
              setEditingExperience(null);
              reset();
              setIsDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';

const educationSchema = z.object({
  school: z.string().min(2, 'School name must be at least 2 characters'),
  degree: z.string().min(2, 'Degree must be at least 2 characters'),
  field: z.string().min(2, 'Field of study must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().optional(),
  gpa: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

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

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      current: false,
    },
  });

  const current = watch('current');

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch('/api/education');
      const data = await response.json();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EducationFormData) => {
    setSaving(true);
    try {
      const educationData = {
        ...data,
        endDate: data.current ? undefined : data.endDate,
      };

      const url = editingEducation ? `/api/education/${editingEducation._id}` : '/api/education';
      const method = editingEducation ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      });

      if (response.ok) {
        toast.success(editingEducation ? 'Education updated!' : 'Education created!');
        setIsDialogOpen(false);
        setEditingEducation(null);
        reset();
        fetchEducation();
      } else {
        throw new Error('Failed to save education');
      }
    } catch (error) {
      toast.error('Failed to save education');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setValue('school', edu.school);
    setValue('degree', edu.degree);
    setValue('field', edu.field);
    setValue('startDate', edu.startDate.split('T')[0]);
    setValue('endDate', edu.endDate ? edu.endDate.split('T')[0] : '');
    setValue('current', edu.current);
    setValue('description', edu.description || '');
    setValue('gpa', edu.gpa || '');
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Education deleted!');
        fetchEducation();
      } else {
        throw new Error('Failed to delete education');
      }
    } catch (error) {
      toast.error('Failed to delete education');
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
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Education Management</h1>
              <p className="text-muted-foreground">Manage your educational background</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingEducation(null);
                reset();
                setIsDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingEducation ? 'Edit Education' : 'Add New Education'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="school">School/University *</Label>
                  <Input
                    id="school"
                    {...register('school')}
                    placeholder="Stanford University"
                  />
                  {errors.school && (
                    <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">Degree *</Label>
                    <Input
                      id="degree"
                      {...register('degree')}
                      placeholder="Bachelor of Science"
                    />
                    {errors.degree && (
                      <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="field">Field of Study *</Label>
                    <Input
                      id="field"
                      {...register('field')}
                      placeholder="Computer Science"
                    />
                    {errors.field && (
                      <p className="text-red-500 text-sm mt-1">{errors.field.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>

                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      {...register('gpa')}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={current}
                    onCheckedChange={(checked) => setValue('current', checked)}
                  />
                  <Label>Currently studying here</Label>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Additional details, achievements, coursework..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" disabled={saving} className="flex-1">
                    {saving ? 'Saving...' : editingEducation ? 'Update' : 'Create'}
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

        {/* Education List */}
        <div className="space-y-4">
          {education.map((edu) => (
            <motion.div
              key={edu._id}
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
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        {edu.current && (
                          <Badge className="bg-green-500/10 text-green-500">Current</Badge>
                        )}
                      </div>
                      
                      <p className="text-primary font-medium mb-1">{edu.school}</p>
                      <p className="text-muted-foreground mb-2">{edu.field}</p>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        {new Date(edu.startDate).toLocaleDateString()} - {' '}
                        {edu.current ? 'Present' : edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </div>
                      
                      {edu.description && (
                        <p className="text-muted-foreground">{edu.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(edu)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(edu._id)}
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

        {education.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No education found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your educational background</p>
            <Button onClick={() => {
              setEditingEducation(null);
              reset();
              setIsDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Education
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
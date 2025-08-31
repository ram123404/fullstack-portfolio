'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Link as LinkIcon, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

const socialLinkSchema = z.object({
  platform: z.string().min(2, 'Platform name must be at least 2 characters'),
  url: z.string().url('Must be a valid URL'),
  icon: z.string().min(1, 'Icon is required'),
  order: z.number().min(0),
});

type SocialLinkFormData = z.infer<typeof socialLinkSchema>;

interface SocialLink {
  _id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
}

const platforms = [
  { name: 'GitHub', icon: 'github' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'Email', icon: 'mail' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Website', icon: 'globe' },
  { name: 'Other', icon: 'link' },
];

export default function AdminSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      order: 0,
    },
  });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('/api/social-links');
      const data = await response.json();
      setSocialLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SocialLinkFormData) => {
    setSaving(true);
    try {
      const url = editingSocialLink ? `/api/social-links/${editingSocialLink._id}` : '/api/social-links';
      const method = editingSocialLink ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(editingSocialLink ? 'Social link updated!' : 'Social link created!');
        setIsDialogOpen(false);
        setEditingSocialLink(null);
        reset();
        fetchSocialLinks();
      } else {
        throw new Error('Failed to save social link');
      }
    } catch (error) {
      toast.error('Failed to save social link');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (socialLink: SocialLink) => {
    setEditingSocialLink(socialLink);
    setValue('platform', socialLink.platform);
    setValue('url', socialLink.url);
    setValue('icon', socialLink.icon);
    setValue('order', socialLink.order);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;

    try {
      const response = await fetch(`/api/social-links/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Social link deleted!');
        fetchSocialLinks();
      } else {
        throw new Error('Failed to delete social link');
      }
    } catch (error) {
      toast.error('Failed to delete social link');
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'mail':
      case 'email':
        return <Mail className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
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
              <LinkIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Social Links Management</h1>
              <p className="text-muted-foreground">Manage your social media and contact links</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingSocialLink(null);
                reset();
                setIsDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingSocialLink ? 'Edit Social Link' : 'Add New Social Link'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="platform">Platform *</Label>
                  <Select onValueChange={(value) => {
                    setValue('platform', value);
                    const platformData = platforms.find(p => p.name === value);
                    if (platformData) {
                      setValue('icon', platformData.icon);
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.name} value={platform.name}>
                          {platform.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.platform && (
                    <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="url">URL *</Label>
                  <Input
                    id="url"
                    {...register('url')}
                    placeholder="https://github.com/username"
                  />
                  {errors.url && (
                    <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="icon">Icon Name *</Label>
                  <Input
                    id="icon"
                    {...register('icon')}
                    placeholder="github"
                  />
                  {errors.icon && (
                    <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    {...register('order', { valueAsNumber: true })}
                    placeholder="0"
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" disabled={saving} className="flex-1">
                    {saving ? 'Saving...' : editingSocialLink ? 'Update' : 'Create'}
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

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((link) => (
            <motion.div
              key={link._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {getIcon(link.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{link.platform}</h3>
                        <p className="text-xs text-muted-foreground">Order: {link.order}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(link)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(link._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors truncate block"
                  >
                    {link.url}
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {socialLinks.length === 0 && (
          <div className="text-center py-16">
            <LinkIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No social links found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your social media links</p>
            <Button onClick={() => {
              setEditingSocialLink(null);
              reset();
              setIsDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Social Link
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
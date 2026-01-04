'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { DeveloperTemplate } from '@/components/templates/DeveloperTemplate';
import { DesignerTemplate } from '@/components/templates/DesignerTemplate';
import { FinanceTemplate } from '@/components/templates/FinanceTemplate';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';

interface UserProfile {
  selectedTemplate: string;
  username: string;
  customizations: {
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
    };
    layout: {
      showBlog: boolean;
      showTestimonials: boolean;
      showCertifications: boolean;
    };
  };
  seoSettings: {
    title: string;
    description: string;
    keywords: string[];
  };
}

interface Profile {
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  location: string;
  profileImage: string;
  resumeUrl?: string;
}

export default function PortfolioPage() {
  const params = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [userProfileRes, profileRes] = await Promise.all([
          fetch(`/api/portfolio/${params.username}`),
          fetch('/api/profile'),
        ]);

        if (!userProfileRes.ok) {
          throw new Error('Portfolio not found');
        }

        const userProfileData = await userProfileRes.json();
        const profileData = await profileRes.json();

        setUserProfile(userProfileData);
        setProfile(profileData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    if (params.username) {
      fetchPortfolioData();
    }
  }, [params.username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-muted-foreground">{error || 'The requested portfolio does not exist.'}</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    const templateProps = {
      userProfile,
      profile,
    };

    switch (userProfile.selectedTemplate) {
      case 'developer':
        return <DeveloperTemplate {...templateProps} />;
      case 'designer':
        return <DesignerTemplate {...templateProps} />;
      case 'finance':
        return <FinanceTemplate {...templateProps} />;
      case 'professional':
        return <ProfessionalTemplate {...templateProps} />;
      default:
        return <DeveloperTemplate {...templateProps} />;
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --template-primary: ${userProfile.customizations.colorScheme.primary};
          --template-secondary: ${userProfile.customizations.colorScheme.secondary};
          --template-accent: ${userProfile.customizations.colorScheme.accent};
        }
      `}</style>
      {renderTemplate()}
    </>
  );
}
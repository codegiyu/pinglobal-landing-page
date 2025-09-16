'use client';
import { Card, CardContent } from '@/components/general/Card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Linkedin, Instagram, Facebook } from 'lucide-react';

export const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) PIN-GLOB',
      subtitle: '+1 (555) 746-4562',
      action: 'tel:+15557464562',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@pinglobal.com',
      subtitle: 'Get in touch anytime',
      action: 'mailto:hello@pinglobal.com',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Billboard Ave, Suite 500',
      subtitle: 'New York, NY 10001',
      action: 'https://maps.google.com',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      subtitle: 'Weekend consultations available',
      action: null,
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/pin-global', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/pinglobal', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/pinglobal', label: 'Facebook' },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to amplify your brand? Our billboard advertising experts are here to help you
            reach your audience and maximize your marketing impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105 border-pin-gray-light">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-foreground font-medium mb-1">{item.details}</p>
                          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                          {item.action && (
                            <Button
                              variant="link"
                              className="mt-2 p-0 h-auto text-pin-red hover:text-pin-red-dark"
                              onClick={() => window.open(item.action, '_blank')}>
                              Contact Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Social Media Links */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-6">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full border-pin-gray-light hover:bg-pin-red hover:text-white hover:border-pin-red transition-all duration-300"
                      onClick={() => window.open(social.href, '_blank')}
                      aria-label={social.label}>
                      <Icon className="w-5 h-5" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="h-96 lg:h-full">
            <Card className="h-full shadow-pin-card border-pin-gray-light overflow-hidden">
              <div className="h-full bg-pin-gray-light flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-pin-red mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Pinpoint Global Office
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    123 Billboard Ave, Suite 500
                    <br />
                    New York, NY 10001
                  </p>
                  <Button
                    variant="cta"
                    onClick={() => window.open('https://maps.google.com', '_blank')}>
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

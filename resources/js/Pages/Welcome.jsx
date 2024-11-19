import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Search, Upload, CheckCircle, MessageCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useLanguage } from '@/Contexts/LanguageContext';
import translations from '@/translations';


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Welcome({ auth }) {
    const { language } = useLanguage();
    // Add console.log for debug purposes
    console.log('Current language:', language);
    console.log('Translations:', translations);
    
    // Add null check for translations
    const t = translations[language] ?? translations['en'];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Computer Science Student",
            image: "/api/placeholder/64/64",
            content: "Eduora helped me understand complex programming concepts. The tutors are knowledgeable and patient.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Engineering Student",
            image: "/api/placeholder/64/64", 
            content: "Getting help with my calculus assignments has never been easier. The platform is intuitive and tutors are responsive.",
            rating: 5
        },
        {
            name: "Emily Parker",
            role: "Biology Major",
            image: "/api/placeholder/64/64",
            content: "I love how easy it is to find qualified tutors for any subject. The verification process ensures quality help.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-transparent">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-white">
                                eduora
                            </Link>
                            <div className="hidden md:flex items-center ml-10 space-x-8">
                                <Link href="#" className="text-gray-300 hover:text-white transition">
                                    {t?.nav?.university}
                                </Link>
                                <Link href="#" className="text-gray-300 hover:text-white transition">
                                    {t?.nav?.highSchool}
                                </Link>
                                <Link href="#" className="text-gray-300 hover:text-white transition">
                                    {t?.nav?.tutors}
                                </Link>
                            </div>
                        </div>

                        {/* Navbar navigation items */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                // User sudah login
                                <Link href="/dashboard" className="text-white">
                                    Dashboard
                                </Link>
                            ) : (
                                // User belum login
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        {t?.nav?.signIn}
                                    </Link>
                                    <Button
                                        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
                                    >
                                        <Link href="/register">
                                            {t?.nav?.getStarted}
                                        </Link>
                                    </Button>
                                </>
                            )}
                            
                            {/* Language switcher */}
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Animation */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="pt-32 pb-20 px-6"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        variants={fadeInUp}
                        className="text-6xl font-bold text-white mb-8 leading-tight"
                    >
                        {t?.hero?.title || 'Welcome to Eduora'}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                    >
                        {t?.hero?.subtitle || 'Find the best tutors to help you excel.'}
                    </motion.p>

                    {/* Search Bar with Animation */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-2xl mx-auto relative"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t?.hero?.searchPlaceholder || 'Search for subjects or tutors'}
                                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 transition"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Section with Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md py-20"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={staggerChildren}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        {[{
                            number: "35M+",
                            label: t?.stats?.students?.label || 'Students Enrolled',
                            subtext: t?.stats?.students?.subtext || 'Worldwide'
                        }, {
                            number: "115K+",
                            label: t?.stats?.tutors?.label || 'Verified Tutors',
                            subtext: t?.stats?.tutors?.subtext || 'Experienced and Qualified'
                        }, {
                            number: "60M+",
                            label: t?.stats?.users?.label || 'Happy Users',
                            subtext: t?.stats?.users?.subtext || 'Learning Efficiently'
                        }].map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="p-6"
                            >
                                <motion.div
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    className="text-4xl font-bold text-white mb-2"
                                >
                                    {stat.number}
                                </motion.div>
                                <div className="text-gray-400">
                                    {stat.label}
                                    <div className="text-sm mt-1">{stat.subtext}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* How It Works Section with Animation */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6 } }
                }}
                className="py-24 bg-white"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">{t?.howItWorks?.title || 'How It Works'}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t?.howItWorks?.subtitle || 'Four easy steps to get the help you need.'}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    >
                        {[{
                            icon: Upload,
                            color: 'bg-orange-100 text-orange-600',
                            title: t?.howItWorks?.steps?.post?.title || 'Post Your Request',
                            description: t?.howItWorks?.steps?.post?.description || 'Describe what you need help with.'
                        }, {
                            icon: Search,
                            color: 'bg-pink-100 text-pink-600',
                            title: t?.howItWorks?.steps?.review?.title || 'Review Responses',
                            description: t?.howItWorks?.steps?.review?.description || 'Browse through tutor responses.'
                            
                        }, {
                            icon: CheckCircle,
                            color: 'bg-blue-100 text-blue-600',
                            title: t?.howItWorks?.steps?.accept?.title || 'Accept the Help',
                            description: t?.howItWorks?.steps?.accept?.description || 'Choose the tutor you want.'
                        }, {
                            icon: MessageCircle,
                            color: 'bg-green-100 text-green-600',
                            title: t?.howItWorks?.steps?.getHelp?.title || 'Get Help',
                            description: t?.howItWorks?.steps?.getHelp?.description || 'Work together to solve your problems.'
                        }].map((step, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="relative text-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                                >
                                    <step.icon className="w-8 h-8" />
                                </motion.div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                                {index < 3 && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="hidden md:block absolute top-8 left-[60%] h-[2px] bg-gray-200"
                                    >
                                        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-gray-200" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Testimonials Section with Animation */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="py-24 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            {t?.testimonials?.title || 'What Our Students Say'}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t?.testimonials?.subtitle || 'Our users love the Eduora experience.'}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-xl shadow-lg p-6 transition-shadow hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <img src={testimonial.image} alt={`Profile picture of ${testimonial.name}`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{testimonial.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* CTA Section with enhanced animations */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={staggerChildren}
                viewport={{ once: true }}
                className="relative py-24 overflow-hidden mt-24"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-center bg-no-repeat bg-cover mix-blend-overlay"
                    />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        className="text-center mb-16 text-white"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            {t?.cta?.title || 'Ready to Start Your Learning Journey?'}
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto">
                            {t?.cta?.subtitle || 'Join Eduora today and accelerate your learning.'}
                        </p>
                    </motion.div>
                    
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center gap-6"
                    >
                        <Button asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                        <Link href="/register">{t?.cta?.buttons?.start || 'Get Started'}</Link>
                        </Button>
                        <Button asChild className="bg-transparent border border-white text-white rounded-full px-6 hover:bg-white hover:text-indigo-700 transition">
                            <Link href="#">{t?.cta?.buttons?.learn || 'Learn More'}</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-white font-bold mb-4">eduora</h4>
                            <p>{t?.footer?.description || 'Eduora is your one-stop platform for educational assistance.'}</p>
                        </div>
                        <div>
                            <h5 className="text-white font-semibold mb-4">{t?.footer?.quickLinks?.title || 'Quick Links'}</h5>
                            <ul className="space-y-2">
                                {(t?.footer?.quickLinks?.items || []).map((item, index) => (
                                    <li key={index} className="hover:text-white transition">
                                        <Link href="#">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-white font-semibold mb-4">{t?.footer?.support?.title || 'Support'}</h5>
                            <ul className="space-y-2">
                                {(t?.footer?.support?.items || []).map((item, index) => (
                                    <li key={index} className="hover:text-white transition">
                                        <Link href="#">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <p>{t?.footer?.rightsReserved || 'All Rights Reserved'}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

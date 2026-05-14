"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MasonryGallery } from "@/components/ui/masonry-gallery";
import { ArrowUpRight, Diamond, Scale, ShieldCheck, Mail, Phone, Plane, FileText } from "lucide-react";
import { useRef } from "react";

// --- Framer Motion variants ---
const fadeInUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] // Elegant ease out
    }
  })
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const lineReveal: any = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
  }
};

const marqueeImages = [
  "/jewellery/image 1.png",
  "/jewellery/image copy 10.png",
  "/jewellery/image copy 11.png",
  "/jewellery/image copy 12.png",
  "/jewellery/image copy 13.png",
  "/jewellery/image copy 14.png",
  "/jewellery/image copy 15.png",
  "/jewellery/image copy 16.png",
  "/jewellery/image copy 17.png",
  "/jewellery/image copy 2.png",
  "/jewellery/image copy 3.png",
  "/jewellery/image copy 4.png",
  "/jewellery/image copy 5.png",
  "/jewellery/image copy 6.png",
  "/jewellery/image copy 7.png",
  "/jewellery/image copy 8.png",
  "/jewellery/image copy 9.png",
  "/jewellery/image copy.png",
  "/jewellery/image.png"
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImageText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-paper-white relative">
      
      {/* ═══ NAVIGATION ═══ */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-navy/95 backdrop-blur-md border-b border-white/5 px-8 md:px-16 lg:px-24 py-5"
      >
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-6 group">
            <div className="w-12 h-12 flex items-center justify-center border border-gold-metallic/30 text-gold-leaf font-serif text-xl tracking-widest transition-transform group-hover:scale-105">
              JP
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-serif text-white tracking-widest leading-none mb-1">Jiten Parekh</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-gold-metallic/80">Govt. Approved Valuer</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <Link href="#about" className="text-xs font-semibold text-white/70 hover:text-gold-metallic transition-colors tracking-[0.2em] uppercase">About</Link>
            <Link href="#services" className="text-xs font-semibold text-white/70 hover:text-gold-metallic transition-colors tracking-[0.2em] uppercase">Services</Link>
            <Link href="#expertise" className="text-xs font-semibold text-white/70 hover:text-gold-metallic transition-colors tracking-[0.2em] uppercase">Expertise</Link>
            <Link href="#contact" className="ml-4 text-xs font-bold text-navy bg-gold-leaf hover:bg-gold-metallic hover:text-white px-8 py-3 uppercase tracking-widest transition-all duration-300">
              Consultation
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center pt-32 lg:pt-0 overflow-hidden bg-paper-white">
        <div className="container-wide w-full px-5 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center h-full">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-6 relative z-10 flex lg:justify-end"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="w-full max-w-2xl lg:pr-12 xl:pr-20">
              <motion.div custom={0} variants={fadeInUp} className="flex items-center gap-4 mb-10">
                <span className="w-12 h-[1px] bg-gold-metallic"></span>
                <span className="subheading text-slate">Established 1989</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeInUp} className="heading-display text-navy mb-8">
                Precision in <br />
                <span className="text-gold-metallic italic font-light tracking-tight pr-4">Every Facet</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeInUp} className="text-xl text-slate mb-12 max-w-lg leading-relaxed font-light">
                India’s premier Govt. Approved Valuer & GII Gemologist. Delivering undisputed trust and certified excellence for over 39 years.
              </motion.p>

              <motion.div custom={3} variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 mb-20">
                <Link href="#services" className="btn-primary">
                  <span>Explore Services</span>
                </Link>
                <Link href="#contact" className="btn-outline">
                  Contact Us
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div custom={4} variants={fadeInUp} className="flex flex-wrap sm:grid sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 border-t border-navy/10 pt-10">
                <div className="w-[45%] sm:w-auto">
                  <div className="text-4xl lg:text-5xl font-serif text-navy mb-2">39<span className="text-gold-metallic">+</span></div>
                  <div className="subheading text-slate text-xs sm:text-sm">Years Exp.</div>
                </div>
                <div className="w-[45%] sm:w-auto">
                  <div className="text-4xl lg:text-5xl font-serif text-navy mb-2">GII</div>
                  <div className="subheading text-slate text-xs sm:text-sm">Certified</div>
                </div>
                <div className="w-[45%] sm:w-auto">
                  <div className="text-4xl lg:text-5xl font-serif text-navy mb-2">Govt</div>
                  <div className="subheading text-slate text-xs sm:text-sm">Approved</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
            <motion.div 
              className="lg:col-span-6 h-[50vh] md:h-[60vh] lg:h-[85vh] relative image-reveal-wrapper w-full mt-12 lg:mt-0"
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <motion.div style={{ y: yImageText }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/hero-bg.png"
                  alt="High-end jewelry"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / LEGACY ═══ */}
      <section id="about" className="section-padding bg-alabaster">
        <div className="container-wide px-5 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            {/* Image Block */}
            <motion.div variants={fadeInUp} className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
               <div className="absolute inset-0 bg-navy -translate-x-6 translate-y-6"></div>
               <div className="relative w-full h-full border border-navy/20 bg-white p-4">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="/valuation.png"
                      alt="Jiten Parekh valuating jewelry"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
               </div>
            </motion.div>

            {/* Text Block */}
            <motion.div className="flex flex-col justify-center">
              <motion.div variants={lineReveal} className="h-[1px] w-24 bg-gold-metallic origin-left mb-10"></motion.div>
              
              <motion.h2 variants={fadeInUp} className="heading-section text-navy mb-12">
                A Legacy of Trust, <br />
                <span className="italic text-gold-metallic font-light">Crafted in Precision.</span>
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-8 text-xl text-slate font-light leading-relaxed max-w-2xl">
                <p>
                  <strong className="text-navy font-semibold">Mr. Jiten Parekh</strong> is an authoritative voice in gemology, holding premier certification from the <strong className="text-navy font-semibold">Gemological Institute of India (GII)</strong>.
                </p>
                <p>
                  As a Government Approved Valuer since 1989, his valuations are the bedrock of crucial financial, legal, and taxation decisions. His documents hold universally unquestioned validity.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-16">
                 <Link href="#contact" className="group inline-flex items-center gap-4 border-b border-navy pb-3 hover:border-gold-metallic transition-colors">
                    <span className="subheading text-navy group-hover:text-gold-metallic transition-colors">Book a private consultation</span>
                    <ArrowUpRight className="w-5 h-5 text-navy group-hover:text-gold-metallic transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                 </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="section-padding bg-paper-white border-y border-navy/5">
        <div className="container-wide px-5 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24"
          >
            <div className="max-w-3xl">
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-gold-metallic"></span>
                <span className="subheading text-slate">Valuation Expertise</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="heading-section text-navy">
                Comprehensive <span className="italic text-gold-metallic font-light">Services</span>
              </motion.h2>
            </div>
            
            <motion.p variants={fadeInUp} className="text-slate text-lg font-light max-w-md">
              Meticulous, legally-binding valuation documentation tailored to your specific regulatory requirements.
            </motion.p>
          </motion.div>

          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          >
            {[
              {
                title: "Taxation & Gains",
                desc: "Definitive reports for Wealth Tax, Capital Gains, and rigorous Income Tax assessments.",
                icon: <Scale className="w-10 h-10 text-gold-metallic stroke-[1]" />
              },
              {
                title: "Insurance & Loans",
                desc: "Uncontested certifications mandated by premium insurers and national banking institutions.",
                icon: <ShieldCheck className="w-10 h-10 text-gold-metallic stroke-[1]" />
              },
              {
                title: "Probate & Wills",
                desc: "Sensitive, court-admissible valuations for family settlements and property inheritance.",
                icon: <FileText className="w-10 h-10 text-gold-metallic stroke-[1]" />
              },
              {
                title: "Visa & Customs",
                desc: "Export/Import documentation protecting your assets during international transit.",
                icon: <Plane className="w-10 h-10 text-gold-metallic stroke-[1]" />
              }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative w-full">
                <div className="relative h-full rounded-2xl border border-navy/5 bg-white p-8 group flex flex-col items-center lg:items-start text-center lg:text-left shadow-sm hover:shadow-xl transition-shadow duration-500 min-h-[16rem]">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                    variant="gold"
                  />
                  <div className="relative z-10 flex flex-col h-full w-full items-center lg:items-start">
                    <div className="w-16 h-16 rounded-full bg-alabaster flex items-center justify-center mb-8 border border-navy/5 group-hover:scale-110 group-hover:bg-gold-leaf/20 transition-all duration-500">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-serif text-navy mb-4 group-hover:text-gold-metallic transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate font-light leading-relaxed text-sm lg:text-base selection:bg-gold-leaf selection:text-navy">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ EXCLUSIVE JEWELLERY COLLECTION ═══ */}
      <MasonryGallery images={marqueeImages} />

      {/* ═══ TESTIMONIALS (Integrated with original component logic) ═══ */}
      <section className="bg-alabaster overflow-hidden">
        <div className="py-24 max-w-[1600px] mx-auto text-center px-4">
           <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-gold-metallic"></span>
              <span className="subheading text-slate">Client Reputation</span>
              <span className="w-8 h-[1px] bg-gold-metallic"></span>
            </div>
            <h2 className="heading-section text-navy mb-16">
              A Legacy of <span className="italic text-gold-metallic font-light">Trust</span>
            </h2>
            <div className="scale-90 md:scale-100 origin-top">
              <StaggerTestimonials />
            </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="section-padding bg-paper-white relative">
        <div className="container-wide px-5 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-24">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-gold-metallic"></span>
                <span className="subheading text-slate">Inquiries</span>
              </div>
              <h2 className="heading-section text-navy mb-12">
                Request an <br />
                <span className="italic text-gold-metallic font-light">Evaluation.</span>
              </h2>
              <p className="text-xl text-slate font-light mb-16">
                Consult with Mr. Parekh directly regarding your extensive portfolios, antique collections, or specific certification needs.
              </p>

              <div className="space-y-12">
                <div className="group flex items-center gap-8 cursor-pointer">
                   <div className="w-16 h-16 border border-navy flex items-center justify-center rounded-full group-hover:bg-navy transition-colors">
                     <Phone className="w-6 h-6 text-navy group-hover:text-gold-leaf transition-colors" strokeWidth={1} />
                   </div>
                   <div>
                     <div className="subheading text-slate mb-2">Direct Line</div>
                     <div className="text-2xl font-serif text-navy group-hover:text-gold-metallic transition-colors">+91 93222 21692</div>
                   </div>
                </div>

                <div className="group flex items-center gap-8 cursor-pointer">
                   <div className="w-16 h-16 border border-navy flex items-center justify-center rounded-full group-hover:bg-navy transition-colors">
                     <Mail className="w-6 h-6 text-navy group-hover:text-gold-leaf transition-colors" strokeWidth={1} />
                   </div>
                   <div>
                     <div className="subheading text-slate mb-2">Private Email</div>
                     <div className="text-2xl font-serif text-navy group-hover:text-gold-metallic transition-colors">parekhjiten@hotmail.com</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Premium Form */}
            <div className="lg:col-span-7 bg-alabaster p-10 md:p-20 border border-navy/5 relative">
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gold-metallic/30"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-gold-metallic/30"></div>

              <h3 className="text-3xl font-serif text-navy mb-12 relative z-10">Confidential Inquiry</h3>
              
              <form className="space-y-12 relative z-10">
                <div className="grid md:grid-cols-2 gap-12">
                  <input type="text" placeholder="Full Name" className="input-editorial" />
                  <input type="tel" placeholder="Phone Number" className="input-editorial" />
                </div>
                <input type="email" placeholder="Email Address" className="input-editorial" />
                
                <div className="relative">
                  <select className="input-editorial text-slate appearance-none bg-transparent" defaultValue="">
                    <option value="" disabled>Nature of Valuation</option>
                    <option>Taxation & Capital Gains</option>
                    <option>Insurance or Bank Loan</option>
                    <option>Probate / Gift / Family Trust</option>
                    <option>Visa & Global Customs</option>
                    <option>Other Private Matter</option>
                  </select>
                </div>
                
                <textarea rows={3} placeholder="Brief details about your items..." className="input-editorial resize-none"></textarea>
                
                <button type="button" className="btn-primary w-full mt-8">
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#0A0D14] text-white pt-12 pb-6 border-t border-white/5 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-metallic/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container-wide px-5 md:px-16 lg:px-24 mx-auto relative z-10">
           
           <div className="flex flex-col items-center justify-center mb-12">
             
             {/* Brand & Legacy */}
             <div className="flex flex-col items-center justify-center text-center">
               <div className="text-gold-metallic text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 tracking-widest">Jiten Parekh</div>
               <div className="text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.3em] text-[#666] flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                 <span className="w-4 sm:w-8 h-[1px] bg-[#666]"></span>
                 Est. 1998
                 <span className="w-4 sm:w-8 h-[1px] bg-[#666]"></span>
               </div>
             </div>
             
           </div>

           {/* Premium Divider */}
           <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

           {/* Copyright Bar */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#666] text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-center md:text-left">
             <div className="max-w-[200px] md:max-w-none leading-relaxed md:leading-normal">
               &copy; {new Date().getFullYear()} Jiten Parekh. A Legacy of Precision.
             </div>
             <div className="flex gap-8">
               <a 
                  href="#" 
                  className="hover:text-gold-metallic transition-colors flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                 Back to Top <ArrowUpRight className="w-3 h-3" />
               </a>
             </div>
           </div>
           
        </div>
      </footer>

      {/* ═══ WHATSAPP FLOATING BUTTON ═══ */}
      <a
        href="https://wa.me/919322221692"
        target="_blank"
        className="whatsapp-fab group"
        aria-label="Private WhatsApp Consultation"
      >
        <svg className="w-8 h-8 text-white fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}

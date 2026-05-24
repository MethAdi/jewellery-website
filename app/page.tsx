"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MasonryGallery } from "@/components/ui/masonry-gallery";
import { ArrowUpRight, Scale, ShieldCheck, Mail, Phone, Plane, FileText, Menu, X } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

// --- Framer Motion variants ---
const smoothEase = [0.25, 1, 0.5, 1] as const;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: smoothEase // Elegant ease out
    }
  })
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: smoothEase }
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

type InquiryErrors = Partial<Record<"name" | "phone" | "email" | "nature" | "message", string>>;
const emailPattern =
  /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+(?:COM|IN|NET|ORG|CO|IO|AI|BIZ|INFO|EDU|GOV|DEV)$/i;
const web3FormsAccessKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "7fee0aa5-a85a-40b6-877c-ba548db66b68";

export default function Home() {
  const heroRef = useRef(null);
  const [inquiryErrors, setInquiryErrors] = useState<InquiryErrors>({});
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquirySubmitError, setInquirySubmitError] = useState("");
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImageText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const getInquiryErrorClass = (field: keyof InquiryErrors) =>
    inquiryErrors[field] ? "border-b-red-600" : "";

  const handleInquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const normalizedPhone =
      phoneDigits.length === 12 && phoneDigits.startsWith("91")
        ? phoneDigits.slice(2)
        : phoneDigits;
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const nature = String(formData.get("nature") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: InquiryErrors = {};

    if (!name) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      nextErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!nature) {
      nextErrors.nature = "Please select the nature of valuation.";
    }

    if (!message) {
      nextErrors.message = "Please add brief details about your items.";
    } else if (message.length < 10) {
      nextErrors.message = "Please add at least 10 characters of detail.";
    }

    setInquiryErrors(nextErrors);
    setInquirySubmitted(false);
    setInquirySubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsInquirySubmitting(true);

    try {
      if (!web3FormsAccessKey) {
        throw new Error("Missing Web3Forms access key.");
      }

      const submissionData = new FormData();
      submissionData.append("access_key", web3FormsAccessKey);
      submissionData.append("subject", "New Jewellery Valuation Inquiry");
      submissionData.append("from_name", name);
      submissionData.append("name", name);
      submissionData.append("phone", normalizedPhone);
      submissionData.append("email", email);
      submissionData.append("nature", nature);
      submissionData.append("message", message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit inquiry.");
      }

      form.reset();
      setInquirySubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not send your inquiry. Please try again or contact us directly.";

      setInquirySubmitError(message);
    } finally {
      setIsInquirySubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-paper-white relative">
      
      {/* ═══ NAVIGATION ═══ */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 w-full max-w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/10 px-0 md:px-16 lg:px-24 py-0 md:py-5"
      >
        <div className="max-w-[1600px] mx-auto flex justify-between items-center px-4 py-3 md:px-0 md:py-0">
          <Link href="/" className="flex items-center gap-3 sm:gap-6 group min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex shrink-0 items-center justify-center border border-navy/30 text-navy font-serif text-lg sm:text-xl tracking-widest transition-transform group-hover:scale-105">
              JP
            </div>
            <div className="block min-w-0 max-w-[58vw] sm:max-w-none">
              <div className="text-base sm:text-xl font-serif text-navy tracking-widest leading-none mb-1 truncate">Jiten Parekh</div>
              <div className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-navy/70 truncate">Govt. Approved Valuer</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <Link href="#about" className="text-xs font-semibold text-navy/75 hover:text-gold-metallic transition-colors tracking-[0.2em] uppercase">About</Link>
            <Link href="#services" className="text-xs font-semibold text-navy/75 hover:text-gold-metallic transition-colors tracking-[0.2em] uppercase">Services</Link>
            <Link href="#expertise" className="text-xs font-semibold text-navy/75 hover:text-gold-metallic transition-colors tracking-[0.2em] uppercase">Expertise</Link>
            <Link href="#contact" className="ml-4 text-xs font-bold text-navy bg-gold-leaf hover:bg-gold-metallic hover:text-white px-8 py-3 uppercase tracking-widest transition-all duration-300">
              Consultation
            </Link>
          </div>
          <button
            type="button"
            className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center border border-navy/20 text-navy"
            onClick={() => setIsMobileNavOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMobileNavOpen && (
          <div className="md:hidden border-t border-white/10 bg-navy/95 backdrop-blur-md px-4 py-4 shadow-2xl">
            <div className="grid gap-3">
              {[
                ["About", "#about"],
                ["Services", "#services"],
                ["Expertise", "#expertise"],
                ["Gallery", "#gallery"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:border-gold-metallic/50 hover:text-gold-metallic transition-colors tracking-[0.16em] uppercase"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.nav>
      <div className="h-[76px] md:hidden" aria-hidden="true" />

      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative min-h-[calc(100svh-76px)] flex items-start lg:items-center pt-8 sm:pt-10 md:pt-28 pb-16 lg:py-0 overflow-hidden bg-paper-white">
        <div className="container-wide w-full px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-8 items-center h-full">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-6 relative z-10 flex lg:justify-end"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="w-full max-w-2xl lg:pr-12 xl:pr-20">
              <motion.div custom={0} variants={fadeInUp} className="flex items-center gap-4 mb-7 sm:mb-10">
                <span className="w-8 sm:w-12 h-[1px] bg-gold-metallic"></span>
                <span className="subheading text-slate">Established 1989</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeInUp} className="heading-display text-navy mb-6 sm:mb-8">
                Precision in <br />
                <span className="text-gold-metallic italic font-light tracking-tight pr-4">Every Facet</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeInUp} className="text-base sm:text-lg lg:text-xl text-slate mb-9 sm:mb-12 max-w-lg leading-relaxed font-light">
                India’s premier Govt. Approved Valuer & GII Gemologist. Delivering undisputed trust and certified excellence for over 39 years.
              </motion.p>

              <motion.div custom={3} variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
                <Link href="#services" className="btn-primary">
                  <span>Explore Services</span>
                </Link>
                <Link href="#contact" className="btn-outline">
                  Contact Us
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div custom={4} variants={fadeInUp} className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 border-t border-navy/10 pt-7 sm:pt-10 px-1 sm:px-0">
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-navy mb-1 sm:mb-2">39<span className="text-gold-metallic">+</span></div>
                  <div className="subheading text-slate text-xs sm:text-sm">Years Exp.</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-navy mb-1 sm:mb-2">GII</div>
                  <div className="subheading text-slate text-xs sm:text-sm">Certified</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-navy mb-1 sm:mb-2">Govt</div>
                  <div className="subheading text-slate text-xs sm:text-sm">Approved</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
            <motion.div 
              className="lg:col-span-6 h-[360px] sm:h-[460px] md:h-[60vh] lg:h-[85vh] relative image-reveal-wrapper w-full mt-2 lg:mt-0 group hover:shadow-[0_30px_90px_rgba(212,175,55,0.24)] transition-shadow duration-700"
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="absolute inset-0 z-10 border border-transparent group-hover:border-gold-metallic/60 transition-colors duration-700 pointer-events-none"></div>
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-gold-metallic/0 via-white/0 to-gold-leaf/0 group-hover:from-gold-metallic/10 group-hover:via-white/5 group-hover:to-gold-leaf/20 transition-colors duration-700 pointer-events-none"></div>
              <motion.div style={{ y: yImageText }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/hero-bg.png"
                  alt="High-end jewelry"
                  fill
                  className="object-cover transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / LEGACY ═══ */}
      <section id="about" className="section-padding bg-alabaster">
        <div className="container-wide px-5 sm:px-8 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Image Block */}
            <motion.div variants={fadeInUp} className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0">
               <div className="absolute inset-0 bg-navy -translate-x-3 sm:-translate-x-6 translate-y-3 sm:translate-y-6"></div>
               <div className="relative w-full h-full border border-navy/20 bg-white p-4 group hover:border-gold-metallic/70 hover:shadow-[0_30px_80px_rgba(11,25,44,0.18)] transition-all duration-700">
                  <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute inset-0 z-10 border border-transparent group-hover:border-gold-metallic/50 transition-colors duration-700 pointer-events-none"></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-navy/0 via-white/0 to-gold-leaf/0 group-hover:from-navy/10 group-hover:via-white/5 group-hover:to-gold-leaf/20 transition-colors duration-700 pointer-events-none"></div>
                    <Image
                      src="/valuation.png"
                      alt="Jiten Parekh valuating jewelry"
                      fill
                      className="object-cover transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                    />
                  </div>
               </div>
            </motion.div>

            {/* Text Block */}
            <motion.div className="flex flex-col justify-center">
              <motion.div variants={lineReveal} className="h-[1px] w-20 sm:w-24 bg-gold-metallic origin-left mb-7 sm:mb-10"></motion.div>
              
              <motion.h2 variants={fadeInUp} className="heading-section text-navy mb-8 sm:mb-12">
                A Legacy of Trust, <br />
                <span className="italic text-gold-metallic font-light">Crafted in Precision.</span>
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-slate font-light leading-relaxed max-w-2xl">
                <p>
                  <strong className="text-navy font-semibold">Mr. Jiten Parekh</strong> is an authoritative voice in gemology, holding premier certification from the <strong className="text-navy font-semibold">Gemological Institute of India (GII)</strong>.
                </p>
                <p>
                  As a Government Approved Valuer since 1989, his valuations are the bedrock of crucial financial, legal, and taxation decisions. His documents hold universally unquestioned validity.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 sm:mt-16">
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
        <div className="container-wide px-5 sm:px-8 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-10 mb-14 sm:mb-20 lg:mb-24"
          >
            <div className="max-w-3xl">
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6 sm:mb-8">
                <span className="w-8 sm:w-12 h-[1px] bg-gold-metallic"></span>
                <span className="subheading text-slate">Valuation Expertise</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="heading-section text-navy">
                Comprehensive <span className="italic text-gold-metallic font-light">Services</span>
              </motion.h2>
            </div>
            
            <motion.p variants={fadeInUp} className="text-slate text-base sm:text-lg font-light max-w-md">
              Meticulous, legally-binding valuation documentation tailored to your specific regulatory requirements.
            </motion.p>
          </motion.div>

          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12 lg:gap-y-16"
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
                <div className="relative h-full rounded-2xl border border-navy/5 bg-white p-6 sm:p-8 group flex flex-col items-center lg:items-start text-center lg:text-left shadow-sm hover:shadow-xl transition-shadow duration-500 min-h-[14rem] sm:min-h-[16rem]">
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
        <div className="py-16 sm:py-20 lg:py-24 max-w-[1600px] mx-auto text-center px-4">
           <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-gold-metallic"></span>
              <span className="subheading text-slate">Client Reputation</span>
              <span className="w-8 h-[1px] bg-gold-metallic"></span>
            </div>
            <h2 className="heading-section text-navy mb-10 sm:mb-16">
              A Legacy of <span className="italic text-gold-metallic font-light">Trust</span>
            </h2>
            <div className="scale-[0.78] sm:scale-90 md:scale-100 origin-top -mx-8 sm:mx-0">
              <StaggerTestimonials />
            </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="section-padding bg-paper-white relative">
        <div className="container-wide px-5 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <span className="w-8 sm:w-12 h-[1px] bg-gold-metallic"></span>
                <span className="subheading text-slate">Inquiries</span>
              </div>
              <h2 className="heading-section text-navy mb-8 sm:mb-12">
                Request an <br />
                <span className="italic text-gold-metallic font-light">Evaluation.</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate font-light mb-10 sm:mb-16">
                Consult with Mr. Parekh directly regarding your extensive portfolios, antique collections, or specific certification needs.
              </p>

              <div className="space-y-8 sm:space-y-12">
                <div className="group flex items-center gap-4 sm:gap-8 cursor-pointer min-w-0">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 border border-navy flex items-center justify-center rounded-full group-hover:bg-navy transition-colors">
                     <Phone className="w-6 h-6 text-navy group-hover:text-gold-leaf transition-colors" strokeWidth={1} />
                   </div>
                   <div>
                     <div className="subheading text-slate mb-2">Direct Line</div>
                     <div className="text-xl sm:text-2xl font-serif text-navy group-hover:text-gold-metallic transition-colors">+91 93222 21692</div>
                   </div>
                </div>

                <div className="group flex items-center gap-4 sm:gap-8 cursor-pointer min-w-0">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 border border-navy flex items-center justify-center rounded-full group-hover:bg-navy transition-colors">
                     <Mail className="w-6 h-6 text-navy group-hover:text-gold-leaf transition-colors" strokeWidth={1} />
                   </div>
                   <div>
                     <div className="subheading text-slate mb-2">Private Email</div>
                     <div className="text-lg sm:text-2xl font-serif text-navy group-hover:text-gold-metallic transition-colors break-all">parekhjiten@hotmail.com</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Premium Form */}
            <div className="lg:col-span-7 bg-alabaster p-6 sm:p-10 md:p-20 border border-navy/5 relative">
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 border-t border-r border-gold-metallic/30"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 border-b border-l border-gold-metallic/30"></div>

              <h3 className="text-2xl sm:text-3xl font-serif text-navy mb-8 sm:mb-12 relative z-10">Confidential Inquiry</h3>
              
              <form className="space-y-8 sm:space-y-12 relative z-10" onSubmit={handleInquirySubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className={`input-editorial ${getInquiryErrorClass("name")}`}
                      aria-invalid={Boolean(inquiryErrors.name)}
                    />
                    {inquiryErrors.name && <p className="mt-2 text-sm text-red-600">{inquiryErrors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className={`input-editorial ${getInquiryErrorClass("phone")}`}
                      aria-invalid={Boolean(inquiryErrors.phone)}
                    />
                    {inquiryErrors.phone && <p className="mt-2 text-sm text-red-600">{inquiryErrors.phone}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className={`input-editorial ${getInquiryErrorClass("email")}`}
                    aria-invalid={Boolean(inquiryErrors.email)}
                  />
                  {inquiryErrors.email && <p className="mt-2 text-sm text-red-600">{inquiryErrors.email}</p>}
                </div>
                
                <div className="relative">
                  <select
                    name="nature"
                    className={`input-editorial text-slate appearance-none bg-transparent ${getInquiryErrorClass("nature")}`}
                    defaultValue=""
                    aria-invalid={Boolean(inquiryErrors.nature)}
                  >
                    <option value="" disabled>Nature of Valuation</option>
                    <option>Taxation & Capital Gains</option>
                    <option>Insurance or Bank Loan</option>
                    <option>Probate / Gift / Family Trust</option>
                    <option>Visa & Global Customs</option>
                    <option>Other Private Matter</option>
                  </select>
                  {inquiryErrors.nature && <p className="mt-2 text-sm text-red-600">{inquiryErrors.nature}</p>}
                </div>
                
                <div>
                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Brief details about your items..."
                    className={`input-editorial resize-none ${getInquiryErrorClass("message")}`}
                    aria-invalid={Boolean(inquiryErrors.message)}
                  ></textarea>
                  {inquiryErrors.message && <p className="mt-2 text-sm text-red-600">{inquiryErrors.message}</p>}
                </div>
                
                {inquirySubmitted && (
                  <p className="text-sm text-green-700">
                    Thank you. Your inquiry has been sent.
                  </p>
                )}

                {inquirySubmitError && (
                  <p className="text-sm text-red-600">
                    {inquirySubmitError}
                  </p>
                )}

                <button type="submit" className="btn-primary w-full mt-8" disabled={isInquirySubmitting}>
                  <span>{isInquirySubmitting ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full max-w-full overflow-hidden bg-[#0A0D14] text-white border-t border-white/5 px-4 sm:px-8 md:px-16 lg:px-24 py-5">
        <div className="container-wide max-w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex min-w-0 items-center gap-4">
            <div className="text-gold-metallic text-lg sm:text-xl font-serif tracking-widest truncate">Jiten Parekh</div>
            <div className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-[#666]">Est. 1998</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 text-[#666] text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.15em] max-w-full">
            <div>&copy; {new Date().getFullYear()} Jiten Parekh.</div>
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

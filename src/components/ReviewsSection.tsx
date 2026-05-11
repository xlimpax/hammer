"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frequent Traveler",
    initials: "AJ",
    color: "bg-blue-600",
    text: "The HAMMER travel bag is incredibly spacious yet fits perfectly in overhead compartments. The build quality is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Software Engineer",
    initials: "SW",
    color: "bg-purple-600",
    text: "I carry my laptop, gym clothes, and lunch every day. This bag handles it all without feeling bulky. Love the sleek design!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Fitness Enthusiast",
    initials: "MC",
    color: "bg-[var(--color-brand-orange)]",
    text: "Finally, a gym bag that looks professional enough to take to the office. The separate shoe compartment is a game changer.",
    rating: 4,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-[var(--color-brand-gray)] border-y border-black/5 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-orange)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[var(--color-brand-white)]">Customer Reviews</h2>
          <p className="text-[var(--color-brand-light)] max-w-xl mx-auto text-base md:text-lg">
            Don't just take our word for it. Here's what our community has to say about carrying HAMMER.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              <Quote className="text-black/5 w-12 h-12 mb-4" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < review.rating ? "fill-[var(--color-brand-orange)] text-[var(--color-brand-orange)]" : "text-gray-300"} 
                  />
                ))}
              </div>

              <p className="text-[var(--color-brand-light)] mb-8 italic">"{review.text}"</p>

              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center font-bold text-lg shadow-inner`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-white)]">{review.name}</h4>
                  <p className="text-xs text-[var(--color-brand-light)]">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

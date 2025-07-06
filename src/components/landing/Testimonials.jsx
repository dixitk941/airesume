import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "This resume builder transformed my job search. I received more calls for interviews within a week!",
    author: "Sarah Johnson",
    role: "Marketing Manager"
  },
  {
    quote: "As a recent graduate, I was struggling to create a professional resume. This tool made it so easy!",
    author: "Michael Chen",
    role: "Software Engineer"
  },
  {
    quote: "The step-by-step process was intuitive and the templates are truly ATS-friendly. Highly recommend!",
    author: "Jessica Williams",
    role: "HR Professional"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands who have successfully landed their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

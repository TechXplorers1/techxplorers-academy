import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';

// Inline SVG Icons
const PlayIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M501.9 224.2L56.7 5.1C47.2-1.3 35.7-.7 27 5.7S9.6 20.9 9.6 32v448c0 11.1 4.5 21.6 12.7 28s19.8 8.1 28.5 1.7L501.9 287.8c8.9-6.4 14.1-16.7 14.1-27.8s-5.2-21.4-14.1-27.8z" />
  </svg>
);

const UserIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 67.8L5.7 400.9C1.1 405.7 0 411.3 0 417.1V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V417.1c0-5.8-1.1-11.4-5.7-16.2L269.7 323.8c-20.9 14.7-45.6 22.2-74.9 22.2s-54-7.5-74.9-22.2z" />
  </svg>
);

const BookIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M448 40.5V471.5c0 18-17.7 33-39.7 33c-38.2 0-77.9-25.7-119.8-59.5C246.5 394.1 228.4 384 224 384c-4.4 0-22.5 10.1-64.5 41.2C85.6 479.8 45.9 505 7.7 505c-22 0-39.7-15-39.7-33V40.5C-1.8 15.3 22.3-.4 48.5 0h351C425.7-.4 448 15.3 448 40.5zM128 208c-17.7 0-32-14.3-32-32s14.3-32 32-32h192c17.7 0 32 14.3 32 32s-14.3 32-32 32H128zM96 288c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32z" />
  </svg>
);

const TrophyIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M552 64H176C78.8 64 0 142.8 0 240c0 49.6 21.4 96.1 59.8 134.4C44.3 410.1 32 458.4 32 480c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32c0-30.8 18.2-58.4 46.1-70.2c2.4-1.2 4.9-2.3 7.4-3.4c29.1-12.7 58.7-27.1 86.8-43.1c11.8-6.8 24.3-12.9 36.6-18.7c-50.5-22.4-86.6-67.4-96.8-120.3c-2.4-12.7 6.4-25.2 19.1-27.6c12.7-2.4 25.2 6.4 27.6 19.1c9.3 49.3 41.3 89.3 84.4 110.1c4.5 2.2 9.2 3.8 14 5.3c-4.4 12.8-12 24.6-22.2 34.6c-48 48-113.1 76-184.2 76H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 20.3 12.9 38.3 31.6 46.2c16 6.9 33.3 10.8 51.4 11.8c-.8 6.9-1.2 13.9-1.2 21c0 2.2 .2 4.4 .5 6.6c-49.8-16.1-85.3-64.8-85.3-121.2C176 142.8 254.8 64 352 64h200c13.3 0 24 10.7 24 24v40c0 13.3-10.7 24-24 24zM352 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-80zM352 176c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-80zM352 256c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-80z" />
  </svg>
);

const InstagramIcon = ({ size = 40, className }) => (
  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
  </svg>
);

const TwitterIcon = ({ size = 40, className }) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
  </svg>
);

const DiscordIcon = ({ size = 40, className }) => (
  <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
  </svg>
);

const NumberCounter = ({ targetNumber, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasBeenAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenAnimated.current) {
          startCount();
          hasBeenAnimated.current = true;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [targetNumber]);

  const startCount = () => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const newCount = Math.min(Math.floor((progress / duration) * targetNumber), targetNumber);
      setCount(newCount);
      if (newCount < targetNumber) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <span ref={countRef}>
      {count}
    </span>
  );
};


const ArrowUpIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const LeftArrow = ({ size = 24, className, onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} onClick={onClick}>
    <path d="m15 19l-7-7 7-7" />
  </svg>
);

const RightArrow = ({ size = 24, className, onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} onClick={onClick}>
    <path d="m9 19l7-7-7-7" />
  </svg>
);

// Custom hook for on-scroll animations
const useInView = (options) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, inView];
};

function LandingPage() {
  const [blogPosts] = useState([
    {
      id: "1",
      title: "The Future of AI in Web Development",
      author: "Alex Miller",
      date: "Oct 26, 2023",
      summary: "Explore how artificial intelligence is shaping the future of web development, from automated code generation to personalized user experiences. This post covers the latest trends and tools.",
      image: "https://placehold.co/600x400/120D25/FFFFFF?text=AI+Web+Dev",
      category: "Development"
    },
    {
      id: "2",
      title: "Getting Started with Tailwind CSS",
      author: "Sarah Chen",
      date: "Oct 24, 2023",
      summary: "A beginner's guide to the utility-first CSS framework. Learn how to build beautiful, responsive designs without writing a single line of custom CSS efficiently.",
      image: "https://placehold.co/600x400/120D25/FFFFFF?text=Tailwind+CSS",
      category: "Development"
    },
    {
      id: "3",
      title: "The Importance of Accessibility in Design",
      author: "Mark Davis",
      date: "Oct 21, 2023",
      summary: "Discover why accessible design is crucial for creating inclusive digital products and learn best practices for building websites for everyone, ensuring usability.",
      image: "https://placehold.co/600x400/120D25/FFFFFF?text=Accessibility",
      category: "Design"
    },
    {
      id: "4",
      title: "Marketing in the Digital Age",
      author: "Emily White",
      date: "Oct 18, 2023",
      summary: "A comprehensive look at modern marketing strategies, from SEO to social media, and how to build a strong online presence to reach a wider audience effectively.",
      image: "https://placehold.co/600x400/120D25/FFFFFF?text=Digital+Marketing",
      category: "Marketing"
    },
    {
      id: "5",
      title: "Mastering the Business of Tech",
      author: "Robert Brown",
      date: "Oct 15, 2023",
      summary: "Learn the fundamentals of business strategy and management tailored for the technology sector, focusing on growth, innovation, and leadership.",
      image: "https://placehold.co/600x400/120D25/FFFFFF?text=Tech+Business",
      category: "Business"
    },
    {
      id: "6",
      title: "Advanced JavaScript Concepts",
      author: "John Smith",
      date: "Oct 10, 2023",
      summary: "Dive deep into advanced topics like closures, prototypes, and asynchronous JavaScript to write more efficient and clean code for complex applications.",
      image: "https://placehold.co/600x400/120D25/FFFFFF?text=JS+Concepts",
      category: "Development"
    },
  ]);

  const [courses] = useState([
    {
      id: "1",
      title: "Full-Stack Development with React & Node",
      instructor: "John Doe",
      rating: 4.8,
      reviews: 120,
      price: 99.99,
      image: "https://placehold.co/600x400/2A1E4B/FFFFFF?text=React+%26+Node",
    },
    {
      id: "2",
      title: "Python for Data Science and Machine Learning",
      instructor: "Jane Smith",
      rating: 4.9,
      reviews: 150,
      price: 129.99,
      image: "https://placehold.co/600x400/2A1E4B/FFFFFF?text=Python+for+Data+Science",
    },
    {
      id: "3",
      title: "UI/UX Design with Figma",
      instructor: "Emily Clark",
      rating: 4.7,
      reviews: 95,
      price: 79.99,
      image: "https://placehold.co/600x400/2A1E4B/FFFFFF?text=Figma+UI/UX",
    },
    {
      id: "4",
      title: "Mobile App Development with Flutter",
      instructor: "Michael Johnson",
      rating: 4.6,
      reviews: 110,
      price: 89.99,
      image: "https://placehold.co/600x400/2A1E4B/FFFFFF?text=Flutter+Mobile",
    },
    {
      id: "5",
      title: "DevOps and Cloud Computing with AWS",
      instructor: "Sarah Williams",
      rating: 5.0,
      reviews: 190,
      price: 149.99,
      image: "https://placehold.co/600x400/2A1E4B/FFFFFF?text=DevOps+AWS",
    },
    {
      id: "6",
      title: "Cybersecurity Fundamentals",
      instructor: "David Miller",
      rating: 4.5,
      reviews: 80,
      price: 69.99,
      image: "https://placehold.co/600x400/2A1E4B/FFFFFF?text=Cybersecurity",
    },
  ]);

  const instructors = [
    {
      name: "Alex Johnson",
      title: "Senior Developer",
      image: "https://placehold.co/100x100",
    },
    {
      name: "Maria Garcia",
      title: "UI/UX Expert",
      image: "https://placehold.co/100x100",
    },
    {
      name: "Sam Lee",
      title: "Data Scientist",
      image: "https://placehold.co/100x100",
    },
    {
      name: "Ben Carter",
      title: "Cloud Architect",
      image: "https://placehold.co/100x100",
    },
    {
      name: "Chris Evans",
      title: "Mobile Dev",
      image: "https://placehold.co/100x100",
    },
  ];

  const testimonials = [
    {
      text: "The courses are phenomenal! I learned so much in such a short time. Highly recommended for anyone looking to upskill.",
      author: "Jane Doe",
      image: "https://placehold.co/100x100",
    },
    {
      text: "I was able to get a new job thanks to the skills I learned here. The instructors are top-notch and the content is very practical.",
      author: "John Smith",
      image: "https://placehold.co/100x100",
    },
    {
      text: "A truly great platform for learning. The content is well-structured and the community is very supportive. Will be back for more!",
      author: "Emily White",
      image: "https://placehold.co/100x100",
    },
    {
      text: "The instructors are incredibly knowledgeable and the courses are well-structured and easy to follow.",
      author: "Michael Lee",
      image: "https://placehold.co/100x100",
    },
    {
      text: "I've been a professional developer for years, and I still learned new things. The content is very high quality.",
      author: "Sarah Brown",
      image: "https://placehold.co/100x100",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [showGoTop, setShowGoTop] = useState(false);
  const carouselRef = useRef(null);

  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.5 });
  const [coursesRef, coursesInView] = useInView({ threshold: 0.3 });
  const [featureRef, featureInView] = useInView({ threshold: 0.3 });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.5 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.3 });
  const [instructorsRef, instructorsInView] = useInView({ threshold: 0.3 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3 });

  // State to track which course cards have been animated
  const [animatedCourses, setAnimatedCourses] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoTop(true);
      } else {
        setShowGoTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // New useEffect to handle course card animation
  useEffect(() => {
    if (coursesInView) {
      topCourses.forEach((_, index) => {
        const timer = setTimeout(() => {
          setAnimatedCourses(prev => [...prev, index]);
        }, index * 150);
        return () => clearTimeout(timer);
      });
    }
  }, [coursesInView]);


  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleManualScroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'paused';

      const currentTransform = window.getComputedStyle(carouselRef.current).getPropertyValue('transform');
      const matrix = new WebKitCSSMatrix(currentTransform);
      const currentAngle = Math.atan2(matrix.m12, matrix.m16) * (180 / Math.PI);

      const angleIncrement = 360 / filteredBlogPosts.length;
      const newAngle = currentAngle + (direction === 'left' ? angleIncrement : -angleIncrement);

      carouselRef.current.style.transform = `perspective(1000px) rotateY(${newAngle}deg)`;
    }
  };

  const filteredBlogPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-500">
        {'★'.repeat(fullStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  };

  // Get a few top courses to display on the landing page
  const topCourses = [
    coursesData.productStrategy[0],
    coursesData.productStrategy[1],
    coursesData.engineeringDevelopment[0],
    coursesData.dataAnalytics[0],
    coursesData.uxUiDesign[0],
    coursesData.freeStacks[0],
  ];

  return (
    <div className="bg-[#120D25] text-white font-inter">
      {/* Go to Top Button */}
      {showGoTop && (
        <button
          onClick={goToTop}
          className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 z-50"
          aria-label="Go to top"
        >
          <ArrowUpIcon size={24} />
        </button>
      )}

      <main>
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className={`relative overflow-hidden min-h-screen flex flex-col items-center justify-center pb-32 hero-section-container ${heroInView ? 'hero-section-visible' : ''}`}>
          <Header isLandingPage={true} />

          <div className="absolute inset-0 bg-[#120D25] opacity-90 z-0"></div>

          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg2MHY2MEgzeiIvPjwvZz48L2c+PC9zdmc+')]"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full mb-8 animate-slide-up-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">100% Satisfaction Guarantee</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up-500">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Find Your Perfect Stack
                  </span>
                </h1>

                <p className="mt-4 text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 animate-slide-up-700">
                  Discover the right skills and courses to land your dream job in tech.
                  Join thousands of students who have transformed their careers with us.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12 animate-slide-up-900">
                  <button className="relative group bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    <span className="relative z-10">Start Learning Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button className="relative group bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:bg-white hover:text-purple-600 hover:shadow-xl">
                    <span className="relative z-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Watch Demo
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-8 text-center md:text-left">
                  <div className="animate-slide-up-1100">
                    <div className="text-3xl font-bold text-purple-400">10K+</div>
                    <div className="text-sm text-gray-400">Students Enrolled</div>
                  </div>
                  <div className="animate-slide-up-1300">
                    <div className="text-3xl font-bold text-purple-400">200+</div>
                    <div className="text-sm text-gray-400">Expert Instructors</div>
                  </div>
                  <div className="animate-slide-up-1500">
                    <div className="text-3xl font-bold text-purple-400">50+</div>
                    <div className="text-sm text-gray-400">Courses Available</div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row justify-center items-center gap-12">
                {/* Social Media Card */}
                <div className="group relative z-10 w-[260px] h-[380px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 transform hero-v-card hero-v-card-left">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_107%,_#ff89cc_0%,_#9cb8ec_30%,_#00ffee_60%,_#62c2fe_100%)] opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold transition-all duration-500 group-hover:transform group-hover:scale-0 group-hover:opacity-0">
                    Connect with Us
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    <a href="#" className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                      <InstagramIcon size={32} />
                    </a>
                    <a href="#" className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                      <TwitterIcon size={32} />
                    </a>
                    <a href="#" className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                      <DiscordIcon size={32} />
                    </a>
                  </div>
                </div>

                {/* Watch Demo Card */}
                <div className="group relative z-10 w-[260px] h-[380px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 transform hero-v-card hero-v-card-right">
                  <div className="absolute inset-0 bg-gray-900 opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img
                    src="https://placehold.co/600x700/2A1E4B/FFFFFF?text=Watch+Demo"
                    alt="Student with laptop"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden flex flex-col justify-center items-center p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Demo</h3>
                    <div className="flex space-x-6 text-purple-600">
                      <a href="#" className="transition-transform duration-300 hover:scale-125">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>


                <div className="absolute top-10 -left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl z-0"></div>
                <div className="absolute bottom-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className={`py-12 bg-white text-gray-900 ${statsInView ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 animate-on-scroll animation-delay-0">
                <span className="text-5xl font-bold text-purple-600 text-glow">
                  <NumberCounter targetNumber={10} />K+
                </span>
                <p className="mt-2 text-sm text-gray-500">Online Courses</p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ribbon-animation"></div>
              </div>
              <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 animate-on-scroll animation-delay-200">
                <span className="text-5xl font-bold text-purple-600 text-glow">
                  <NumberCounter targetNumber={460} />+
                </span>
                <p className="mt-2 text-sm text-gray-500">Students</p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ribbon-animation"></div>
              </div>
              <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 animate-on-scroll animation-delay-400">
                <span className="text-5xl font-bold text-purple-600 text-glow">
                  <NumberCounter targetNumber={20} />+
                </span>
                <p className="mt-2 text-sm text-gray-500">Expert Instructors</p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ribbon-animation"></div>
              </div>
              <div className="flex flex-col items-center transform transition-all duration-300 hover:scale-110 animate-on-scroll animation-delay-600">
                <span className="text-5xl font-bold text-purple-600 text-glow">
                  <NumberCounter targetNumber={5} />+
                </span>
                <p className="mt-2 text-sm text-gray-500">Years of Experience</p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ribbon-animation"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section ref={coursesRef} className={`py-16 bg-[#120D25] text-white ${coursesInView ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">Top Popular Courses</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {topCourses.length > 0 ? (
                topCourses.map((course, index) => (
                  <Link
                    key={index}
                    to={`/course-details/${course.id}`}
                    className={`group bg-white rounded-2xl relative overflow-hidden transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl border border-white/20 hover:border-purple-600/20 w-full md:w-auto course-card ${animatedCourses.includes(index) ? 'is-visible' : ''}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="p-5 h-full flex flex-col gap-3 relative z-20">
                      <div className="w-full aspect-video rounded-xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-5px] group-hover:scale-[1.03] group-hover:shadow-lg bg-[#6D28D9] flex justify-center items-center text-white text-3xl font-bold">
                        <img src={course.image || "https://placehold.co/600x400/2A1E4B/FFFFFF?text=Course"} alt={course.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-900 text-lg font-bold m-0 transition-all duration-300 group-hover:text-purple-600 group-hover:translate-x-0.5">{course.title}</p>
                        <div className="flex items-center text-yellow-500 mb-2">
                          <StarRating rating={course.rating} />
                          <span className="text-xs text-gray-500 ml-2">({course.rating})</span>
                        </div>
                        <p className="text-gray-900 text-xs m-0 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">by {course.instructor} in {course.category}</p>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-gray-900 font-bold text-base m-0 transition-all duration-300 group-hover:text-purple-600 group-hover:translate-x-0.5">${course.price}</p>
                        <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 scale-90 group-hover:scale-100 group-hover:shadow-lg group-hover:shadow-purple-600/30">
                          <svg height={16} width={16} viewBox="0 0 24 24">
                            <path strokeWidth={2} stroke="currentColor" d="M4 12H20M12 4V20" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No courses available.
                </div>
              )}
            </div>
          </div>
        </section>


        {/* New Section: Practical & Supported Learning */}
        <section ref={featureRef} className={`py-16 bg-white text-gray-900 ${featureInView ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image and Chart section */}
              <div className="relative flex justify-center items-center w-full h-[500px] rounded-3xl overflow-hidden bg-gray-100 animate-on-scroll animation-delay-200">
                <div className="absolute inset-0 bg-white/5 opacity-40"></div>
                <div className="absolute inset-0 bg-[url('https://placehold.co/1000x1000/F3F4F6/374151?text=Learning+Experience')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gray-900/50"></div>

                {/* Inner content for mentors and chart */}
                <div className="absolute top-12 left-12 p-4 bg-white rounded-lg shadow-xl animate-on-scroll animation-delay-400">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Learning Chart</h4>
                  <div className="w-24 h-16 bg-gray-200 rounded">
                    {/* This placeholder represents the bar chart */}
                    <svg width="100%" height="100%" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                      <rect x="5" y="40" width="10" height="30" fill="currentColor" rx="2" />
                      <rect x="25" y="20" width="10" height="50" fill="currentColor" rx="2" />
                      <rect x="45" y="50" width="10" height="20" fill="currentColor" rx="2" />
                      <rect x="65" y="30" width="10" height="40" fill="currentColor" rx="2" />
                      <rect x="85" y="10" width="10" height="60" fill="currentColor" rx="2" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 p-4 bg-white rounded-lg shadow-xl animate-on-scroll animation-delay-600">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Instructor</h4>
                  <div className="flex items-center space-x-2">
                    {/* Avatars placeholder for instructors */}
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://placehold.co/100x100/A78BFA/FFFFFF?text=A" alt="Instructor 1" />
                    <img className="w-8 h-8 rounded-full -ml-2 border-2 border-white" src="https://placehold.co/100x100/8B5CF6/FFFFFF?text=B" alt="Instructor 2" />
                    <img className="w-8 h-8 rounded-full -ml-2 border-2 border-white" src="https://placehold.co/100x100/6D28D9/FFFFFF?text=C" alt="Instructor 3" />
                    <div className="flex items-center text-sm font-semibold text-gray-700 ml-2">
                      <NumberCounter targetNumber={200} />+
                    </div>
                    <p className="text-sm text-gray-500">Instructors</p>
                  </div>
                </div>
              </div>

              {/* Text content section */}
              <div className="lg:pr-12 animate-on-scroll animation-delay-800">
                <div className="text-purple-600 text-sm font-semibold flex items-center mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Get To Know Us
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-gray-900">
                  Not Sure Where To Start? We've Got You.
                </h2>
                <p className="text-gray-700 mb-8">
                  At **DigitallyBrave**, we don't just offer courses—we build **real-world learning experiences** with expert support and flexible stacks. We work with people, not just platforms. Whether you're starting fresh or switching careers, we're here to guide you—step by step.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 animate-on-scroll animation-delay-1000">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h-1a4 4 0 01-4-4V7a4 4 0 014-4h1a4 4 0 014 4v9a4 4 0 01-4 4zm-1-12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-gray-900">Skilled, Supportive Mentors</h3>
                      <p className="text-gray-700">
                        Our mentors are experienced professionals here to guide you through every sprint.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll animation-delay-1200">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13.5m0-13.5c-4.82 0-8.75 3.197-8.75 7.124 0 1.547.469 3.018 1.34 4.31a.879.879 0 001.458.077c.433-.655 1.353-.984 2.222-.894 1.13.116 2.062.632 2.73 1.488.802 1.042 1.144 2.146 1.056 3.084m-1.056-3.084c.888-1.04 1.947-1.465 3.024-1.285 1.41.229 2.508 1.258 3.18 2.536 1.232 2.378 1.446 5.166.417 7.027" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-gray-900">Practical, Project-Based Stacks</h3>
                      <p className="text-gray-700">
                        Learn by doing. Every DigitallyBrave stack builds real experience with smart systems and tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* --- */}
        {/* Blog Posts Section with 3D Carousel */}
        <section className={`py-16 text-white relative overflow-hidden blog-background-gradient`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Latest Blog Posts
              <div className="h-1 bg-purple-600 w-24 mx-auto mt-2 rounded-full"></div>
            </h2>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center z-20 px-4">
              <button
                aria-label="Previous slide"
                onClick={() => handleManualScroll('left')}
                className="bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
              >
                <LeftArrow size={24} />
              </button>
              <button
                aria-label="Next slide"
                onClick={() => handleManualScroll('right')}
                className="bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
              >
                <RightArrow size={24} />
              </button>
            </div>

            <div className="flex justify-center items-center h-[400px]">
              <div
                ref={carouselRef}
                className="card-3d"
                onMouseEnter={() => {
                  if (carouselRef.current) {
                    carouselRef.current.style.animationPlayState = 'paused';
                  }
                }}
                onMouseLeave={() => {
                  if (carouselRef.current) {
                    carouselRef.current.style.animationPlayState = 'running';
                  }
                }}
              >
                {filteredBlogPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="blog-card"
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${(index / filteredBlogPosts.length) * 360}deg) translateZ(350px)`,
                      animationDelay: `-${index * (25 / filteredBlogPosts.length)}s`,
                    }}
                  >
                    <div className="blog-card-inner bg-[#2A1E4B] rounded-xl overflow-hidden shadow-lg m-2 flex flex-col">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-base font-bold mb-1 line-clamp-2">{post.title}</h3>
                          <p className="text-xs text-gray-400">By {post.author}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-3">{post.summary}</p>
                        </div>
                        <button className="mt-2 w-full bg-purple-600 text-white py-1 px-2 rounded-full text-xs font-semibold hover:bg-purple-700 transition-colors">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section ref={howItWorksRef} className={`py-16 bg-[#120D25] text-white ${howItWorksInView ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative p-8 rounded-xl shadow-lg bg-white/10 animate-on-scroll">
                <div className="absolute inset-0 bg-[url('https://placehold.co/600x600/2A1E4B/FFFFFF?text=How+it+works')] bg-cover bg-center opacity-20 rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold">How it Works</h3>
                  <p className="mt-2 text-gray-300">
                    Follow these simple steps to start your journey.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4 animate-on-scroll animation-delay-200">
                      <div className="flex-shrink-0 bg-purple-600 text-white p-3 rounded-full">
                        <UserIcon size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">1. Create an Account</h4>
                        <p className="text-gray-400 text-sm">Sign up in seconds to get started.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 animate-on-scroll animation-delay-400">
                      <div className="flex-shrink-0 bg-purple-600 text-white p-3 rounded-full">
                        <BookIcon size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">2. Find Your Course</h4>
                        <p className="text-gray-400 text-sm">Browse our library of courses and choose your path.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 animate-on-scroll animation-delay-600">
                      <div className="flex-shrink-0 bg-purple-600 text-white p-3 rounded-full">
                        <TrophyIcon size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">3. Earn Your Certification</h4>
                        <p className="text-gray-400 text-sm">Complete the course and get certified.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left animate-on-scroll animation-delay-400">
                <div className="text-purple-600 text-sm font-semibold flex items-center mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Get To Know Us
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white-900">
                  Not Sure Where To Start? We've Got You.
                </h2>
                <p className="text-gray-700 mb-8">
                  At **DigitallyBrave**, we don't just offer courses—we build **real-world learning experiences** with expert support and flexible stacks. We work with people, not just platforms. Whether you're starting fresh or switching careers, we're here to guide you—step by step.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 animate-on-scroll animation-delay-1000">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h-1a4 4 0 01-4-4V7a4 4 0 014-4h1a4 4 0 014 4v9a4 4 0 01-4 4zm-1-12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-white-900">Skilled, Supportive Mentors</h3>
                      <p className="text-gray-700">
                        Our mentors are experienced professionals here to guide you through every sprint.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 animate-on-scroll animation-delay-1200">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13.5m0-13.5c-4.82 0-8.75 3.197-8.75 7.124 0 1.547.469 3.018 1.34 4.31a.879.879 0 001.458.077c.433-.655 1.353-.984 2.222-.894 1.13.116 2.062.632 2.73 1.488.802 1.042 1.144 2.146 1.056 3.084m-1.056-3.084c.888-1.04 1.947-1.465 3.024-1.285 1.41.229 2.508 1.258 3.18 2.536 1.232 2.378 1.446 5.166.417 7.027" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-white-900">Practical, Project-Based Stacks</h3>
                      <p className="text-gray-700">
                        Learn by doing. Every DigitallyBrave stack builds real experience with smart systems and tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className={`py-16 bg-white text-gray-900 ${testimonialsInView ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll">
              What Our Students Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`relative bg-gray-100 p-8 rounded-lg shadow-md overflow-hidden glowing-border transition-all duration-300 hover:shadow-xl animate-on-scroll`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <p className="text-lg italic text-gray-700">"{testimonial.text}"</p>
                  <div className="flex items-center mt-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayIcon size={20} className="text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">Student</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Instructors Section */}
        <section ref={instructorsRef} className={`py-16 bg-[#120D25] text-white ${instructorsInView ? 'is-visible' : ''}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Meet Our Expert Instructors</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 animate-on-scroll animation-delay-200">
              Learn from the best in the industry. Our instructors are experienced professionals passionate about teaching.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {instructors.map((instructor, index) => (
                <div key={index}
                  className={`flex flex-col items-center group animate-on-scroll`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mt-4 text-xl font-semibold">{instructor.name}</h3>
                  <p className="text-sm text-purple-300">{instructor.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className={`py-24 bg-purple-600 text-white relative overflow-hidden ${ctaInView ? 'is-visible' : ''}`}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://placehold.co/1920x1080/000000/FFFFFF?text=Background')] bg-cover bg-center animate-pulse"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight animate-on-scroll">
              Buy The Premium Stack
            </h2>
            <p className="mt-4 text-lg md:text-xl text-purple-200 animate-on-scroll animation-delay-200">
              Get started now for free to unlock the full stack and start your journey now.
            </p>
            <button className="mt-8 bg-white text-purple-600 font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 animate-on-scroll animation-delay-400">
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#120D25] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <div className="text-xl font-bold">DIGITAL.</div>
            <div className="space-x-4">
              <a href="#" className="hover:text-purple-400">About</a>
              <a href="#" className="hover:text-purple-400">Courses</a>
              <a href="#" className="hover:text-purple-400">Blog</a>
              <a href="#" className="hover:text-purple-400">Contact</a>
            </div>
            <p className="text-sm text-gray-400">&copy; 2023 Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add custom animations */}
      <style>{`
                /* 3D Carousel Animations */
                @keyframes autoRun3d {
                    from { transform: perspective(1000px) rotateY(-360deg); }
                    to { transform: perspective(1000px) rotateY(0deg); }
                }

                @keyframes animateBrightness {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(0.7); } /* Slightly dim when in background */
                }

                /* Blog background gradient animation */
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .blog-background-gradient {
                    background: linear-gradient(-45deg, #120D25, #2A1E4B, #120D25);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                }

                /* Utility Animations */
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }
                @keyframes bounce-slow {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                    40% {transform: translateY(-10px);}
                    60% {transform: translateY(-5px);}
                }

                /* New on-scroll animations */
                @keyframes slide-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fade-in-down {
                    0% { transform: translateY(-20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                /* Hero V-shape animations */
                .hero-v-card {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transition: none;
                }

                .hero-section-visible .hero-v-card-left {
                    animation: spread-out-left 0.8s ease-out forwards;
                    animation-delay: 1200ms;
                }
                .hero-section-visible .hero-v-card-right {
                    animation: spread-out-right 0.8s ease-out forwards;
                    animation-delay: 1400ms;
                }

                @keyframes spread-out-left {
                    from { opacity: 0; transform: translate(-50%, -50%) rotate(0deg) scale(0.8); }
                    to { opacity: 1; transform: translate(-100%, -50%) rotate(-6deg) scale(1); }
                }
                @keyframes spread-out-right {
                    from { opacity: 0; transform: translate(-50%, -50%) rotate(0deg) scale(0.8); }
                    to { opacity: 1; transform: translate(0%, -50%) rotate(6deg) scale(1); }
                }
                
                /* Ribbon Animation for Stats */
                @keyframes ribbon-wave {
                    0%, 100% { transform: scaleX(0); }
                    50% { transform: scaleX(1); }
                }
                .ribbon-animation {
                    transform: scaleX(0);
                    transition: all 0.6s ease-out;
                    transform-origin: center;
                }
                .is-visible .ribbon-animation {
                    animation: ribbon-wave 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                @keyframes text-glow {
                    0%, 100% { text-shadow: 0 0 5px rgba(139, 92, 246, 0.8); }
                    50% { text-shadow: 0 0 20px rgba(139, 92, 246, 1); }
                }
                .text-glow {
                    animation: none;
                }
                .is-visible .text-glow {
                    animation: text-glow 2s infinite ease-in-out;
                }
                
                /* Glowing Border for Testimonials */
                .glowing-border {
                    position: relative;
                    background: #f3f4f6; /* Tailwind gray-100 */
                    z-index: 1;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                    transition: box-shadow 0.3s ease-out;
                }

                .glowing-border:hover {
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1), 0 0 20px 0px #8b5cf6, 0 0 40px 0px #d8b4fe; /* glow effect */
                }

                /* General animation styles */
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease-out;
                }

                .is-visible .animate-on-scroll {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Hero section-specific animations */
                .hero-section-container .animate-fade-in-down,
                .hero-section-container .animate-slide-up-200,
                .hero-section-container .animate-slide-up-500,
                .hero-section-container .animate-slide-up-700,
                .hero-section-container .animate-slide-up-900,
                .hero-section-container .animate-slide-up-1100,
                .hero-section-container .animate-slide-up-1300,
                .hero-section-container .animate-slide-up-1500 {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease-out;
                }
                
                .hero-section-visible .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; animation-delay: 500ms; }
                .hero-section-visible .animate-slide-up-200 { animation: slide-up 0.6s ease-out forwards; animation-delay: 200ms; }
                .hero-section-visible .animate-slide-up-500 { animation: slide-up 0.6s ease-out forwards; animation-delay: 500ms; }
                .hero-section-visible .animate-slide-up-700 { animation: slide-up 0.6s ease-out forwards; animation-delay: 700ms; }
                .hero-section-visible .animate-slide-up-900 { animation: slide-up 0.6s ease-out forwards; animation-delay: 900ms; }
                .hero-section-visible .animate-slide-up-1100 { animation: slide-up 0.6s ease-out forwards; animation-delay: 1100ms; }
                .hero-section-visible .animate-slide-up-1300 { animation: slide-up 0.6s ease-out forwards; animation-delay: 1300ms; }
                .hero-section-visible .animate-slide-up-1500 { animation: slide-up 0.6s ease-out forwards; animation-delay: 1500ms; }
                

                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .animate-bounce-slow { animation: bounce-slow 2s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }

                .card-3d {
                    position: relative;
                    width: 500px;
                    height: 400px;
                    transform-style: preserve-3d;
                    transform: perspective(1000px) rotateY(0deg);
                    animation: autoRun3d 25s linear infinite;
                    will-change: transform;
                }

                .card-3d:hover { animation-play-state: paused !important; }

                .blog-card {
                    position: absolute;
                    width: 220px;
                    height: 280px;
                    top: 50%;
                    left: 50%;
                    transform-origin: center center;
                    animation: animateBrightness 25s linear infinite;
                    transition-duration: 300ms;
                    will-change: transform, filter;
                }

                .card-3d:hover .blog-card { animation-play-state: paused !important; }

                .blog-card-inner {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .course-card {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease-out;
                }
                .course-card.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
    </div>
  );
}

export default LandingPage;
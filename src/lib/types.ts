export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  createdAt: Date;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  owner: User;
  rating?: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'technical' | 'cultural' | 'creative' | 'business' | 'lifestyle';
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Web Development', icon: 'code-2', type: 'technical' },
  { id: '2', name: 'Mobile Development', icon: 'smartphone', type: 'technical' },
  { id: '3', name: 'Data Science', icon: 'bar-chart', type: 'technical' },
  { id: '4', name: 'Cloud Computing', icon: 'cloud', type: 'technical' },
  { id: '5', name: 'Artificial Intelligence', icon: 'cpu', type: 'technical' },
  { id: '6', name: 'Cybersecurity', icon: 'shield', type: 'technical' },
  
  { id: '7', name: 'Language Learning', icon: 'languages', type: 'cultural' },
  { id: '8', name: 'Cultural History', icon: 'landmark', type: 'cultural' },
  { id: '9', name: 'Traditional Arts', icon: 'palette', type: 'cultural' },
  { id: '10', name: 'Cooking', icon: 'utensils', type: 'cultural' },
  
  { id: '11', name: 'Digital Art', icon: 'pen-tool', type: 'creative' },
  { id: '12', name: 'Music Production', icon: 'music', type: 'creative' },
  { id: '13', name: 'Photography', icon: 'camera', type: 'creative' },
  { id: '14', name: 'Creative Writing', icon: 'pen', type: 'creative' },
  
  { id: '15', name: 'Digital Marketing', icon: 'trending-up', type: 'business' },
  { id: '16', name: 'Project Management', icon: 'clipboard-list', type: 'business' },
  { id: '17', name: 'Entrepreneurship', icon: 'briefcase', type: 'business' },
  
  { id: '18', name: 'Fitness Training', icon: 'activity', type: 'lifestyle' },
  { id: '19', name: 'Mindfulness', icon: 'heart', type: 'lifestyle' },
  { id: '20', name: 'Personal Finance', icon: 'dollar-sign', type: 'lifestyle' },
];

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'UI/UX designer with 5+ years of experience',
    location: 'San Francisco, CA',
    skills: ['UI Design', 'UX Design', 'Figma'],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Full-stack developer focused on React and Node.js',
    location: 'New York, NY',
    skills: ['React', 'Node.js', 'JavaScript', 'C++', 'Python'],
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Marketing specialist with expertise in social media campaigns',
    location: 'Chicago, IL',
    skills: ['Social Media Marketing', 'Content Strategy', 'SEO'],
    createdAt: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'Taylor Swift',
    email: 'taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Professional photographer specializing in portraits and events',
    location: 'Austin, TX',
    skills: ['Photography', 'Photo Editing', 'Lightroom'],
    createdAt: new Date('2023-04-05')
  },
  {
    id: '5',
    name: 'Deepanshu Kumar',
    email: 'deepanshu@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Programming instructor with 8+ years of experience teaching C++ and algorithms',
    location: 'Bangalore, India',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Programming Fundamentals'],
    createdAt: new Date('2023-05-15')
  },
  {
    id: '6',
    name: 'Prachi Rai',
    email: 'prachi@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    bio: 'AI specialist with expertise in machine learning and neural networks',
    location: 'Mumbai, India',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Python', 'TensorFlow'],
    createdAt: new Date('2023-09-20')
  },
  {
    id: '7',
    name: 'Ankit Sharma',
    email: 'ankit@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    bio: 'Data Scientist with focus on predictive analytics and data visualization',
    location: 'Patna, India',
    skills: ['Data Science', 'Python', 'R', 'Machine Learning', 'Data Visualization'],
    createdAt: new Date('2023-10-15')
  },
  {
    id: '8',
    name: 'Raman Verma',
    email: 'raman@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Cloud computing expert specializing in AWS, Azure and Google Cloud',
    location: 'Rohtak, India',
    skills: ['Cloud Computing', 'AWS', 'Azure', 'Google Cloud', 'DevOps'],
    createdAt: new Date('2023-11-10')
  },
  {
    id: '9',
    name: 'Abhiraj Singh',
    email: 'abhiraj@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Full-stack developer with expertise in MERN and MEAN stacks',
    location: 'Dubai, UAE',
    skills: ['Full-Stack Development', 'React', 'Node.js', 'MongoDB', 'Express', 'Angular'],
    createdAt: new Date('2023-12-05')
  }
];

export const MOCK_SKILLS = [
  {
    id: '1',
    title: 'Website Design & Development',
    description: 'I can design and develop responsive websites using modern technologies like React, Tailwind CSS, and more.',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww',
    owner: MOCK_USERS[1],
    rating: 4.8,
    createdAt: new Date('2023-05-10')
  },
  {
    id: '2',
    title: 'Logo & Brand Identity Design',
    description: 'I create memorable logos and comprehensive brand identity systems that help businesses stand out.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1560157368-946d9c8f7cb6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzaWdufGVufDB8fDB8fHww',
    owner: MOCK_USERS[0],
    rating: 4.9,
    createdAt: new Date('2023-05-15')
  },
  {
    id: '3',
    title: 'Social Media Marketing Strategy',
    description: 'I can help develop and implement effective social media marketing strategies to grow your audience and engagement.',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D',
    owner: MOCK_USERS[2],
    rating: 4.7,
    createdAt: new Date('2023-06-01')
  },
  {
    id: '4',
    title: 'Portrait & Event Photography',
    description: 'Professional photography services for portraits, events, and product photography with quick turnaround times.',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww',
    owner: MOCK_USERS[3],
    rating: 4.9,
    createdAt: new Date('2023-06-15')
  },
  {
    id: '5',
    title: 'Mobile App UI/UX Design',
    description: 'I design intuitive and engaging user interfaces for mobile applications with a focus on user experience.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D',
    owner: MOCK_USERS[0],
    rating: 4.8,
    createdAt: new Date('2023-07-01')
  },
  {
    id: '6',
    title: 'Content Writing & Copywriting',
    description: 'I create compelling content and copy for websites, blogs, social media, and marketing materials.',
    category: 'Writing',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    owner: MOCK_USERS[2],
    rating: 4.6,
    createdAt: new Date('2023-07-15')
  },
  {
    id: '7',
    title: 'C++ Programming & Data Structures',
    description: 'Learn C++ programming from basic syntax to advanced concepts like OOP, STL, and data structures.',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww',
    owner: MOCK_USERS[4],
    rating: 4.9,
    createdAt: new Date('2023-08-01')
  },
  {
    id: '8',
    title: 'Algorithms in C++',
    description: 'Master algorithmic problem solving in C++ for competitive programming and technical interviews.',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kaW5nfGVufDB8fDB8fHww',
    owner: MOCK_USERS[4],
    rating: 4.8,
    createdAt: new Date('2023-08-15')
  },
  {
    id: '9',
    title: 'Artificial Intelligence Fundamentals',
    description: 'Learn the basics of AI including machine learning algorithms, neural networks, and practical applications',
    category: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a886d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QUl8ZW58MHx8MHx8fDA%3D',
    owner: MOCK_USERS[5],
    rating: 4.9,
    createdAt: new Date('2023-09-25')
  },
  {
    id: '10',
    title: 'Data Science with Python',
    description: 'Master data science techniques using Python, pandas, numpy, and scikit-learn for data analysis and visualization',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D',
    owner: MOCK_USERS[6],
    rating: 4.8,
    createdAt: new Date('2023-10-20')
  },
  {
    id: '11',
    title: 'Cloud Computing Architecture',
    description: 'Learn to design, implement and manage cloud infrastructure using AWS, Azure and Google Cloud services',
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBjb21wdXRpbmd8ZW58MHx8MHx8fDA%3D',
    owner: MOCK_USERS[7],
    rating: 4.7,
    createdAt: new Date('2023-11-15')
  },
  {
    id: '12',
    title: 'Full-Stack Web Development',
    description: 'Comprehensive course covering both frontend and backend development using modern JavaScript frameworks and tools',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
    owner: MOCK_USERS[8],
    rating: 4.9,
    createdAt: new Date('2023-12-10')
  },
  {
    id: '13',
    title: 'Traditional Indian Cooking',
    description: 'Learn authentic Indian cuisine and cooking techniques from different regions.',
    category: 'Cooking',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107dc1c2c0?w=800',
    owner: MOCK_USERS[5],
    rating: 4.9,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '14',
    title: 'Digital Art Fundamentals',
    description: 'Master digital art creation using industry-standard tools and techniques.',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1595844724771-e5fe7d3126af?w=800',
    owner: MOCK_USERS[0],
    rating: 4.7,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '15',
    title: 'Spanish for Beginners',
    description: 'Learn conversational Spanish with a focus on practical everyday situations.',
    category: 'Language Learning',
    image: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=800',
    owner: MOCK_USERS[2],
    rating: 4.8,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '16',
    title: 'Mindfulness Meditation',
    description: 'Develop mindfulness practices for stress reduction and mental well-being.',
    category: 'Mindfulness',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800',
    owner: MOCK_USERS[3],
    rating: 4.9,
    createdAt: new Date('2024-02-15')
  }
];

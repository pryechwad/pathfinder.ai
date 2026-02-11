-- Seed Data for PathFinder AI

-- Insert Mentors
INSERT INTO mentors (email, name, title, company, expertise, experience, rating, reviews, sessions, price, location, languages, available, next_slot, response_time, image, color, bio, achievements, specialties, is_premium) VALUES
('rahul.sharma@google.com', 'Rahul Sharma', 'Senior Software Engineer', 'Google', ARRAY['Web Development', 'System Design', 'Cloud Computing'], '8 years', 4.9, 127, 450, 2500, 'Bangalore', ARRAY['English', 'Hindi'], true, 'Tomorrow 3 PM', '< 2 hours', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', 'blue', 'Passionate about mentoring aspiring developers. Specialized in full-stack development and cloud architecture.', ARRAY['Google Cloud Certified', 'Led 50+ projects', 'Published 10+ tech articles'], ARRAY['React', 'Node.js', 'GCP'], true),

('priya.patel@microsoft.com', 'Priya Patel', 'AI Research Scientist', 'Microsoft', ARRAY['Machine Learning', 'Data Science', 'AI'], '6 years', 4.8, 98, 320, 3000, 'Hyderabad', ARRAY['English', 'Gujarati'], true, 'Today 5 PM', '< 1 hour', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', 'purple', 'AI researcher helping students break into ML/AI field. Former IIT Delhi graduate.', ARRAY['Microsoft AI Award', 'PhD in ML', '20+ research papers'], ARRAY['TensorFlow', 'PyTorch', 'NLP'], true),

('amit.verma@amazon.com', 'Amit Verma', 'Product Manager', 'Amazon', ARRAY['Product Management', 'Business Strategy', 'Agile'], '10 years', 4.7, 156, 580, 2000, 'Mumbai', ARRAY['English', 'Hindi', 'Marathi'], true, 'Wed 2 PM', '< 3 hours', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', 'green', 'Helping students transition into product management roles. MBA from IIM Ahmedabad.', ARRAY['Launched 15+ products', 'IIM-A Alumni', 'TEDx Speaker'], ARRAY['Product Strategy', 'User Research', 'Analytics'], false),

('sneha.reddy@adobe.com', 'Sneha Reddy', 'UX Design Lead', 'Adobe', ARRAY['UI/UX Design', 'Product Design', 'Design Systems'], '7 years', 4.9, 142, 490, 2200, 'Bangalore', ARRAY['English', 'Telugu', 'Hindi'], true, 'Tomorrow 11 AM', '< 2 hours', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', 'pink', 'Award-winning designer passionate about creating delightful user experiences.', ARRAY['Adobe Design Award', 'Dribbble Top Designer', 'Mentor of 200+ designers'], ARRAY['Figma', 'Adobe XD', 'User Research'], true),

('vikram.singh@flipkart.com', 'Vikram Singh', 'Data Engineer', 'Flipkart', ARRAY['Data Engineering', 'Big Data', 'Analytics'], '5 years', 4.6, 89, 310, 1800, 'Bangalore', ARRAY['English', 'Hindi', 'Punjabi'], true, 'Today 4 PM', '< 4 hours', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram', 'orange', 'Helping students master data engineering and analytics. IIT Bombay graduate.', ARRAY['Built data pipelines for 100M+ users', 'AWS Certified', 'Kaggle Expert'], ARRAY['Spark', 'Kafka', 'SQL'], false),

('anjali.mehta@tcs.com', 'Anjali Mehta', 'Cybersecurity Expert', 'TCS', ARRAY['Cybersecurity', 'Ethical Hacking', 'Network Security'], '9 years', 4.8, 134, 420, 2100, 'Pune', ARRAY['English', 'Hindi'], true, 'Fri 10 AM', '< 2 hours', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali', 'red', 'Certified ethical hacker helping students build careers in cybersecurity.', ARRAY['CEH Certified', 'CISSP', 'Trained 500+ professionals'], ARRAY['Penetration Testing', 'Security Audits', 'Compliance'], false);

-- Insert Courses
INSERT INTO courses (title, description, category, duration, level, instructor, rating, students, price, image) VALUES
('Full Stack Web Development Bootcamp', 'Master HTML, CSS, JavaScript, React, Node.js, MongoDB and build real-world projects', 'Technology', '16 weeks', 'Beginner', 'Rahul Sharma', 4.8, 2340, 4999, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'),

('Machine Learning A-Z', 'Complete ML course covering supervised, unsupervised learning, neural networks and deep learning', 'Technology', '12 weeks', 'Intermediate', 'Priya Patel', 4.9, 1890, 5999, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c'),

('Product Management Masterclass', 'Learn product strategy, roadmapping, user research, and agile methodologies', 'Business', '10 weeks', 'Intermediate', 'Amit Verma', 4.7, 1560, 4499, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'),

('UI/UX Design Complete Course', 'Master Figma, design thinking, prototyping, and user research', 'Creative', '14 weeks', 'Beginner', 'Sneha Reddy', 4.9, 2120, 3999, 'https://images.unsplash.com/photo-1561070791-2526d30994b5'),

('Data Engineering with Python', 'Learn data pipelines, ETL, Apache Spark, Kafka, and cloud data warehousing', 'Technology', '12 weeks', 'Advanced', 'Vikram Singh', 4.6, 980, 5499, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'),

('Ethical Hacking & Cybersecurity', 'Complete cybersecurity course covering penetration testing, network security, and compliance', 'Technology', '16 weeks', 'Intermediate', 'Anjali Mehta', 4.8, 1450, 6999, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'),

('Digital Marketing Mastery', 'Master SEO, SEM, social media marketing, content marketing, and analytics', 'Business', '8 weeks', 'Beginner', 'Neha Gupta', 4.7, 3200, 2999, 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293'),

('Python Programming for Beginners', 'Learn Python from scratch with hands-on projects and real-world applications', 'Technology', '8 weeks', 'Beginner', 'Karan Joshi', 4.8, 4500, 1999, 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935'),

('Financial Analysis & Investment', 'Learn financial modeling, valuation, investment strategies, and portfolio management', 'Business', '10 weeks', 'Intermediate', 'Rohan Kapoor', 4.6, 1200, 4999, 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3'),

('Mobile App Development with Flutter', 'Build cross-platform mobile apps for iOS and Android using Flutter and Dart', 'Technology', '14 weeks', 'Intermediate', 'Arjun Nair', 4.7, 1680, 4499, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c');

-- Insert Forum Categories
INSERT INTO forum_categories (name, description, icon, color, posts_count) VALUES
('Data Science & AI', 'Discuss machine learning, AI, data analysis, and career paths in data science', '🤖', 'purple', 0),
('Engineering', 'Software engineering, computer science, and technical career discussions', '⚙️', 'blue', 0),
('Medical & Healthcare', 'Medical careers, NEET preparation, healthcare industry insights', '🏥', 'red', 0),
('Business & Management', 'MBA, product management, entrepreneurship, and business careers', '💼', 'green', 0),
('Creative Arts', 'Design, content creation, photography, and creative career paths', '🎨', 'pink', 0),
('Law & Civil Services', 'UPSC preparation, law careers, judiciary, and civil services', '⚖️', 'yellow', 0),
('Career Guidance', 'General career advice, resume tips, interview preparation', '🎯', 'orange', 0),
('Study Tips', 'Study techniques, time management, productivity hacks', '📚', 'indigo', 0);

-- Insert Hackathons
INSERT INTO hackathons (title, description, organizer, start_date, end_date, prize, difficulty, participants, tags, image, registration_link) VALUES
('AI Innovation Challenge 2026', 'Build innovative AI solutions for real-world problems. Focus on healthcare, education, or sustainability.', 'Google', '2026-03-15 09:00:00+00', '2026-03-17 18:00:00+00', '₹5,00,000', 'Advanced', 0, ARRAY['AI', 'Machine Learning', 'Innovation'], 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', 'https://hackathon.google.com'),

('Web3 Hackathon', 'Create decentralized applications using blockchain technology. Build the future of web.', 'Ethereum Foundation', '2026-04-01 10:00:00+00', '2026-04-03 20:00:00+00', '₹3,00,000', 'Intermediate', 0, ARRAY['Blockchain', 'Web3', 'DApps'], 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0', 'https://web3hack.io'),

('Mobile App Challenge', 'Design and develop innovative mobile applications for Android and iOS platforms.', 'Microsoft', '2026-03-20 08:00:00+00', '2026-03-22 17:00:00+00', '₹2,50,000', 'Beginner', 0, ARRAY['Mobile', 'Flutter', 'React Native'], 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', 'https://microsoft.com/hackathon'),

('Cybersecurity CTF', 'Capture The Flag competition testing your cybersecurity and ethical hacking skills.', 'HackerRank', '2026-04-10 00:00:00+00', '2026-04-12 23:59:00+00', '₹4,00,000', 'Advanced', 0, ARRAY['Security', 'CTF', 'Hacking'], 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', 'https://hackerrank.com/ctf');

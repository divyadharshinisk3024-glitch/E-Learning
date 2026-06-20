
        // Sample Data
        const courses = [
            {
                id: 1,
                title: "Web Development",
                description: "Learn to build modern websites with HTML, CSS, and JavaScript",
                level: "Beginner",
                duration: "8 weeks",
                progress: 65,
                enrolled: false,
                lessons: [
                    "Introduction to HTML",
                    "CSS Basics",
                    "JavaScript Fundamentals",
                    "Responsive Design",
                    "DOM Manipulation",
                    "Async JavaScript",
                    "Introduction to Frameworks",
                    "Final Project"
                ]
            },
            {
                id: 2,
                title: "Data Science",
                description: "Introduction to data analysis and visualization with Python",
                level: "Intermediate",
                duration: "10 weeks",
                progress: 30,
                enrolled: true,
                lessons: [
                    "Python for Data Science",
                    "NumPy and Pandas",
                    "Data Visualization",
                    "Statistical Analysis",
                    "Machine Learning Basics"
                ]
            },
            {
                id: 3,
                title: "Mobile App Development",
                description: "Build cross-platform mobile apps with React Native",
                level: "Intermediate",
                duration: "6 weeks",
                progress: 0,
                enrolled: false,
                lessons: [
                    "React Native Basics",
                    "Components and Props",
                    "State Management",
                    "Navigation",
                    "API Integration",
                    "Publishing Apps"
                ]
            },
            {
                id: 4,
                title: "UI/UX Design",
                description: "Learn user interface and experience design principles",
                level: "Beginner",
                duration: "4 weeks",
                progress: 0,
                enrolled: false,
                lessons: [
                    "Design Thinking",
                    "Wireframing",
                    "Prototyping",
                    "User Testing",
                    "Design Systems"
                ]
            },
            {
                id: 5,
                title: "Cloud Computing",
                description: "Introduction to AWS and cloud infrastructure",
                level: "Advanced",
                duration: "12 weeks",
                progress: 0,
                enrolled: false,
                lessons: [
                    "Cloud Concepts",
                    "AWS Fundamentals",
                    "Compute Services",
                    "Storage Options",
                    "Database Services",
                    "Security",
                    "Architecting"
                ]
            },
            {
                id: 6,
                title: "DevOps",
                description: "Learn continuous integration and deployment",
                level: "Intermediate",
                duration: "8 weeks",
                progress: 0,
                enrolled: false,
                lessons: [
                    "Version Control",
                    "CI/CD Pipelines",
                    "Containerization",
                    "Infrastructure as Code",
                    "Monitoring"
                ]
            }
        ];

        const completedCourses = [
            {
                id: 7,
                title: "Programming Fundamentals",
                description: "Learn basic programming concepts",
                level: "Beginner",
                duration: "4 weeks",
                progress: 100
            },
            {
                id: 8,
                title: "Git and GitHub",
                description: "Version control for developers",
                level: "Beginner",
                duration: "2 weeks",
                progress: 100
            },
            {
                id: 9,
                title: "JavaScript Basics",
                description: "Introduction to JavaScript programming",
                level: "Beginner",
                duration: "3 weeks",
                progress: 100
            }
        ];

        // DOM Elements
        const activeCoursesCount = document.getElementById('active-courses-count');
        const completedCoursesCount = document.getElementById('completed-courses-count');
        const hoursLearned = document.getElementById('hours-learned');
        const currentStreak = document.getElementById('current-streak');
        const recentCoursesList = document.getElementById('recent-courses-list');
        const courseGrid = document.getElementById('course-grid');
        const courseDetailTitle = document.getElementById('course-detail-title');
        const courseProgress = document.getElementById('course-progress');
        const lessonList = document.getElementById('lesson-list');
        const videoPlayer = document.getElementById('video-player');
        const videoCourseTitle = document.getElementById('video-course-title');
        const videoLessonTitle = document.getElementById('video-lesson-title');
        const videoDescription = document.getElementById('video-description');
        const searchInput = document.getElementById('searchInput');
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileSidebar = document.getElementById('mobileSidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const overlay = document.getElementById('overlay');
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const backToCoursesBtn = document.getElementById('back-to-courses');
        const backFromVideoBtn = document.getElementById('back-from-video');

        // Content sections
        const dashboardContent = document.getElementById('dashboard-content');
        const coursesContent = document.getElementById('courses-content');
        const courseDetailContent = document.getElementById('course-detail-content');
        const videoEmbedContent = document.getElementById('video-embed-content');

        // Navigation links
        const navLinks = document.querySelectorAll('nav a');
        const mobileNavLinks = document.querySelectorAll('.sidebar-mobile nav a');

        // Current state
        let currentPage = 'dashboard';
        let currentCourse = null;

        // Initialize the app
        function init() {
            loadProgress();
            updateDashboard();
            renderCourses();
            setupEventListeners();
        }

        // Update dashboard statistics
        function updateDashboard() {
            const activeCourses = courses.filter(course => course.enrolled && course.progress < 100).length;
            activeCoursesCount.textContent = activeCourses;
            completedCoursesCount.textContent = completedCourses.length;
            hoursLearned.textContent = Math.floor(Math.random() * 100) + 20;
            currentStreak.textContent = `${Math.floor(Math.random() * 14) + 1} days`;
            
            // Render recent courses
            recentCoursesList.innerHTML = '';
            const recentCourses = [...courses.filter(c => c.enrolled), ...completedCourses].slice(0, 3);
            recentCourses.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.className = 'course-item';
                courseItem.innerHTML = `
                    <div class="course-icon">${course.title.charAt(0)}</div>
                    <div>
                        <h3>${course.title}</h3>
                        <p>${course.progress}% complete</p>
                    </div>
                `;
                courseItem.addEventListener('click', () => {
                    if (course.lessons) {
                        showCourseDetail(course);
                    }
                });
                recentCoursesList.appendChild(courseItem);
            });
        }

        // Render all courses
        function renderCourses(filter = '') {
            courseGrid.innerHTML = '';
            const filteredCourses = filter ? 
                courses.filter(course => 
                    course.title.toLowerCase().includes(filter.toLowerCase()) || 
                    course.description.toLowerCase().includes(filter.toLowerCase())
                ) : 
                courses;
            
            filteredCourses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'card course-card';
                courseCard.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p><small>Level: ${course.level} • Duration: ${course.duration}</small></p>
                    <button class="enroll-btn" data-id="${course.id}" ${course.enrolled ? 'disabled' : ''}>
                        ${course.enrolled ? 'Enrolled' : 'Enroll'}
                    </button>
                `;
                courseGrid.appendChild(courseCard);
                
                // Add click handler for the card
                courseCard.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('enroll-btn')) {
                        showCourseDetail(course);
                    }
                });
            });
            
            // Add event listeners to enroll buttons
            document.querySelectorAll('.enroll-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const courseId = parseInt(btn.getAttribute('data-id'));
                    enrollCourse(courseId);
                });
            });
        }

        // Enroll in a course
        function enrollCourse(courseId) {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                course.enrolled = true;
                const btn = document.querySelector(`.enroll-btn[data-id="${courseId}"]`);
                if (btn) {
                    btn.textContent = 'Enrolled';
                    btn.disabled = true;
                }
                showCourseDetail(course);
            }
        }

        // Show course detail
        function showCourseDetail(course) {
            currentCourse = course;
            courseDetailTitle.textContent = course.title;
            courseProgress.style.width = `${course.progress}%`;
            
            // Render lessons
            lessonList.innerHTML = '';
            course.lessons.forEach((lesson, index) => {
                const lessonElement = document.createElement('div');
                lessonElement.className = 'lesson';
                lessonElement.textContent = `${index + 1}. ${lesson}`;
                lessonElement.addEventListener('click', () => {
                    showVideoLesson(course, lesson);
                });
                lessonList.appendChild(lessonElement);
            });
            
            showPage('course-detail');
        }

        // Show video lesson
        function showVideoLesson(course, lesson) {
            videoCourseTitle.textContent = course.title;
            videoLessonTitle.textContent = lesson;
            videoDescription.textContent = `This lesson covers ${lesson.toLowerCase()}. Follow along with the instructor to learn the concepts.`;

            // Real YouTube tutorial video IDs for each course
            const videoMap = {
                "Web Development": "pQN-pnXPaVg", // HTML Tutorial for Beginners
                "Data Science": "r-uOLxNrNk8", // Python for Data Science
                "Mobile App Development": "0-S5a0eXPoc", // React Native Tutorial
                "UI/UX Design": "c9Wg6Cb_YlU", // UI/UX Design Tutorial
                "Cloud Computing": "3hLmDS179YE", // AWS Cloud Computing
                "DevOps": "9UZY3G5JqH4" // DevOps Tutorial
            };

            const videoId = videoMap[course.title] || "pQN-pnXPaVg"; // Default to HTML tutorial
            videoPlayer.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

            // Render recommended tutorials
            renderTutorials(course);

            // Mark lesson as watched and save progress
            markLessonWatched(course.id, lesson);

            showPage('video-embed');
        }

        // Mark lesson as watched and update progress
        function markLessonWatched(courseId, lesson) {
            const course = courses.find(c => c.id === courseId);
            if (course && course.lessons) {
                const lessonIndex = course.lessons.indexOf(lesson);
                if (lessonIndex !== -1) {
                    // Save watched lessons to localStorage
                    const watchedLessons = JSON.parse(localStorage.getItem('watchedLessons') || '{}');
                    if (!watchedLessons[courseId]) {
                        watchedLessons[courseId] = [];
                    }
                    if (!watchedLessons[courseId].includes(lessonIndex)) {
                        watchedLessons[courseId].push(lessonIndex);
                        localStorage.setItem('watchedLessons', JSON.stringify(watchedLessons));

                        // Update course progress
                        const progress = Math.round((watchedLessons[courseId].length / course.lessons.length) * 100);
                        course.progress = progress;

                        // Update progress bar if currently viewing this course
                        if (currentCourse && currentCourse.id === courseId) {
                            courseProgress.style.width = `${progress}%`;
                        }
                    }
                }
            }
        }

        // Load progress from localStorage
        function loadProgress() {
            const watchedLessons = JSON.parse(localStorage.getItem('watchedLessons') || '{}');
            courses.forEach(course => {
                if (watchedLessons[course.id]) {
                    course.progress = Math.round((watchedLessons[course.id].length / course.lessons.length) * 100);
                }
            });
        }

        // Render recommended tutorials for the current course
        function renderTutorials(course) {
            const tutorialList = document.getElementById('tutorial-list');
            tutorialList.innerHTML = '';

            // Sample tutorials for each course
            const tutorials = {
                "Web Development": [
                    {
                        title: "Advanced CSS Grid Layout",
                        description: "Master CSS Grid for creating complex layouts with ease.",
                        duration: "15 min",
                        views: "2.1k"
                    },
                    {
                        title: "JavaScript ES6+ Features",
                        description: "Learn modern JavaScript features like arrow functions, destructuring, and async/await.",
                        duration: "20 min",
                        views: "3.5k"
                    },
                    {
                        title: "Building Responsive Websites",
                        description: "Create websites that work perfectly on all devices.",
                        duration: "18 min",
                        views: "1.8k"
                    }
                ],
                "Data Science": [
                    {
                        title: "Pandas DataFrame Operations",
                        description: "Advanced data manipulation techniques with Pandas.",
                        duration: "25 min",
                        views: "4.2k"
                    },
                    {
                        title: "Data Visualization with Matplotlib",
                        description: "Create stunning charts and graphs for data analysis.",
                        duration: "22 min",
                        views: "3.8k"
                    },
                    {
                        title: "Machine Learning Algorithms",
                        description: "Introduction to supervised and unsupervised learning.",
                        duration: "30 min",
                        views: "5.1k"
                    }
                ],
                "Mobile App Development": [
                    {
                        title: "React Native Navigation",
                        description: "Implement navigation patterns in React Native apps.",
                        duration: "20 min",
                        views: "2.9k"
                    },
                    {
                        title: "State Management with Redux",
                        description: "Manage complex app state with Redux toolkit.",
                        duration: "28 min",
                        views: "3.7k"
                    },
                    {
                        title: "Publishing to App Stores",
                        description: "Deploy your React Native app to iOS and Android stores.",
                        duration: "15 min",
                        views: "2.4k"
                    }
                ],
                "UI/UX Design": [
                    {
                        title: "User Research Methods",
                        description: "Conduct effective user research for better design decisions.",
                        duration: "18 min",
                        views: "1.9k"
                    },
                    {
                        title: "Prototyping with Figma",
                        description: "Create interactive prototypes for user testing.",
                        duration: "22 min",
                        views: "4.1k"
                    },
                    {
                        title: "Design Systems",
                        description: "Build scalable design systems for consistent UI.",
                        duration: "25 min",
                        views: "2.6k"
                    }
                ],
                "Cloud Computing": [
                    {
                        title: "AWS EC2 Instances",
                        description: "Deploy and manage virtual servers in the cloud.",
                        duration: "20 min",
                        views: "3.3k"
                    },
                    {
                        title: "Database Services on AWS",
                        description: "Choose and implement the right database for your application.",
                        duration: "24 min",
                        views: "2.7k"
                    },
                    {
                        title: "Cloud Security Best Practices",
                        description: "Secure your cloud infrastructure and data.",
                        duration: "19 min",
                        views: "3.0k"
                    }
                ],
                "DevOps": [
                    {
                        title: "Docker Containerization",
                        description: "Package applications with Docker for consistent deployment.",
                        duration: "22 min",
                        views: "4.5k"
                    },
                    {
                        title: "CI/CD with Jenkins",
                        description: "Automate your development pipeline with Jenkins.",
                        duration: "26 min",
                        views: "3.2k"
                    },
                    {
                        title: "Infrastructure as Code",
                        description: "Manage infrastructure using code with Terraform.",
                        duration: "21 min",
                        views: "2.8k"
                    }
                ]
            };

            const courseTutorials = tutorials[course.title] || [];

            courseTutorials.forEach(tutorial => {
                const tutorialItem = document.createElement('div');
                tutorialItem.className = 'tutorial-item';
                tutorialItem.innerHTML = `
                    <h4>${tutorial.title}</h4>
                    <p>${tutorial.description}</p>
                    <div class="tutorial-meta">
                        <span><i class="fas fa-clock"></i> ${tutorial.duration}</span>
                        <span><i class="fas fa-eye"></i> ${tutorial.views} views</span>
                    </div>
                `;
                tutorialList.appendChild(tutorialItem);
            });
        }

        // Show a specific page
        function showPage(page) {
            currentPage = page;
            
            // Hide all content sections
            dashboardContent.classList.add('hidden');
            coursesContent.classList.add('hidden');
            courseDetailContent.classList.add('hidden');
            videoEmbedContent.classList.add('hidden');
            
            // Show the requested page
            switch(page) {
                case 'dashboard':
                    dashboardContent.classList.remove('hidden');
                    break;
                case 'courses':
                    coursesContent.classList.remove('hidden');
                    break;
                case 'course-detail':
                    courseDetailContent.classList.remove('hidden');
                    break;
                case 'video-embed':
                    videoEmbedContent.classList.remove('hidden');
                    break;
            }
            
            // Update active nav link
            navLinks.forEach(link => {
                if (link.getAttribute('data-page') === page) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            mobileNavLinks.forEach(link => {
                if (link.getAttribute('data-page') === page) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Close mobile sidebar if open
            mobileSidebar.classList.remove('active');
            overlay.classList.remove('active');
        }

        // Setup event listeners
        function setupEventListeners() {
            // Navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    showPage(page);
                });
            });
            
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    showPage(page);
                    mobileSidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            });
            
            // Search input
            searchInput.addEventListener('input', (e) => {
                if (currentPage === 'courses') {
                    renderCourses(e.target.value);
                }
            });
            
            // Theme toggle
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? 
                    '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });
            
            mobileThemeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                mobileThemeToggle.innerHTML = document.body.classList.contains('dark-mode') ? 
                    '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            });
            
            // Mobile menu
            mobileMenuBtn.addEventListener('click', () => {
                mobileSidebar.classList.add('active');
                overlay.classList.add('active');
            });
            
            closeSidebar.addEventListener('click', () => {
                mobileSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            overlay.addEventListener('click', () => {
                mobileSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            // Video controls
            playBtn.addEventListener('click', () => {
                videoPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            });
            
            pauseBtn.addEventListener('click', () => {
                videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            });
            
            fullscreenBtn.addEventListener('click', () => {
                if (videoPlayer.requestFullscreen) {
                    videoPlayer.requestFullscreen();
                } else if (videoPlayer.webkitRequestFullscreen) {
                    videoPlayer.webkitRequestFullscreen();
                } else if (videoPlayer.msRequestFullscreen) {
                    videoPlayer.msRequestFullscreen();
                }
            });
            
            // Back buttons
            backToCoursesBtn.addEventListener('click', () => {
                showPage('courses');
            });
            
            backFromVideoBtn.addEventListener('click', () => {
                if (currentCourse) {
                    showPage('course-detail');
                } else {
                    showPage('courses');
                }
            });
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);
    
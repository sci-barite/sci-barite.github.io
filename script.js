fetch('https://cdn.jsdelivr.net/gh/sci-barite/sci-barite.github.io@main/data/CV.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Profile
        const header = document.querySelector('header');
        if (data.profile && header) {
            const profileTitle = document.createElement('h2');
            profileTitle.textContent = 'Profile';
            header.appendChild(profileTitle);

            const ageDiv = document.createElement('div');
            ageDiv.textContent = `Age: ${data.profile.age}`;
            header.appendChild(ageDiv);

            const educationList = document.createElement('ul');
            data.profile.education.forEach(education => {
                const educationItem = document.createElement('li');
                educationItem.textContent = `Degree: ${education.degree}, Institution: ${education.institution}, Year: ${education.year}, Details: ${education.details}`;
                educationList.appendChild(educationItem);
            });
            header.appendChild(educationList);

            if (data.languages) {
                data.languages.forEach(lang => {
                    const languageDiv = document.createElement('div');
                    languageDiv.textContent = `Language: ${lang.language}, Level: ${lang.level}`;
                    header.appendChild(languageDiv);
                });
            }
        }

        // Sidebar: Skills
        const sidebar = document.getElementById('sidebar');
        if (data.skills && sidebar) {
            const skillsTitle = document.createElement('h3');
            skillsTitle.textContent = 'Skills';
            sidebar.appendChild(skillsTitle);
            const skillsList = document.createElement('ul');
            data.skills.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.textContent = skill.name;
                const skillLevel = document.createElement('div');
                skillLevel.textContent = `Level: ${skill.level}`;
                skillItem.appendChild(skillLevel);

                if (skill.experiences && skill.experiences.length > 0) {
                    skill.experiences.forEach(experience => {
                        const skillExperienceDiv = document.createElement('div');
                        skillExperienceDiv.textContent = experience;
                        skillItem.appendChild(skillExperienceDiv);
                    });
                }
                skillsList.appendChild(skillItem);
            });
            sidebar.appendChild(skillsList);
        }
        //Sidebar: Courses
        if (data.courses && sidebar) {
            const coursesTitle = document.createElement('h3');
            coursesTitle.textContent = 'Courses';
            sidebar.appendChild(coursesTitle);
            const coursesList = document.createElement('ul');
            data.courses.forEach(course => {
                const courseItem = document.createElement('li');
                courseItem.classList.add('course');
                const courseTitle = document.createElement('h4');
                courseTitle.textContent = course.title;
                const provider = document.createElement('p');
                provider.textContent = `Provider: ${course.provider}`;
                const year = document.createElement('p');
                year.textContent = `Year: ${course.year}`;
                courseItem.appendChild(courseTitle);
                courseItem.appendChild(provider);
                courseItem.appendChild(year);

                if (course.relatedSkills && course.relatedSkills.length > 0) {
                    course.relatedSkills.forEach(relatedSkill => {
                        const relatedSkillDiv = document.createElement('div');
                        relatedSkillDiv.textContent = relatedSkill;
                        courseItem.appendChild(relatedSkillDiv);
                    });
                }
                coursesList.appendChild(courseItem);
            });
            sidebar.appendChild(coursesList);
        }
        // Main: Experiences
        const mainContent = document.getElementById('main-content');
        if (data.experiences && mainContent) {
            const experiencesTitle = document.createElement('h3');
            experiencesTitle.textContent = 'Experiences';
            mainContent.appendChild(experiencesTitle);
            const experiencesContainer = document.createElement('div');
            data.experiences.forEach(experience => {
                const experienceDiv = document.createElement('div');
                experienceDiv.classList.add('experience');
                const companyName = document.createElement('h3');
                companyName.textContent = experience.company;
                const role = document.createElement('p');
                role.textContent = experience.role;
                const duration = document.createElement('p');
                duration.textContent = experience.duration;
                experienceDiv.appendChild(companyName);
                experienceDiv.appendChild(role);
                experienceDiv.appendChild(duration);
                if (experience.projects) {
                    experience.projects.forEach((project, index) => {
                        const projectDiv = document.createElement('div');
                        projectDiv.classList.add('project');
                        projectDiv.addEventListener('click', () => {
                            projectDiv.classList.toggle('expanded');
                            if (projectDiv.classList.contains('expanded')) {
                                projectDiv.classList.remove('collapsed');
                            }
                        });
                        const title = document.createElement('h4');
                        title.textContent = project.title;
                        const description = document.createElement('p');
                        description.textContent = project.description;
                        const technologies = document.createElement('p');
                        technologies.textContent = `Technologies: ${project.technologies.join(', ')}`;
                        const status = document.createElement('p');
                        status.textContent = `Status: ${project.status}`;
                        projectDiv.append(title, description, technologies, status);                       
                        experienceDiv.appendChild(projectDiv);
                        if (index >= 3) {
                            projectDiv.classList.add('collapsed');
                        }
                    });
                }
                experiencesContainer.appendChild(experienceDiv)
            });
            mainContent.appendChild(experiencesContainer);
        }
         // Main: Interests
         if (data.interests && mainContent) {
            const interestsTitle = document.createElement('h3');
            interestsTitle.textContent = 'Interests';
            mainContent.appendChild(interestsTitle);
            const interestsContainer = document.createElement('div');
            data.interests.forEach(interest => {
                const interestDiv = document.createElement('div');
                interestDiv.classList.add('interest');
                interestDiv.textContent = interest;
                interestsContainer.appendChild(interestDiv)
            });
            mainContent.appendChild(interestsContainer);
        }
        const cvContainer = document.getElementById('cv-container');
        const landscapeButton = document.getElementById('landscape-button');
        if (landscapeButton && cvContainer) {
            landscapeButton.addEventListener('click', () => {
                cvContainer.classList.toggle('landscape');
            });
        }
        const pageModeButton = document.getElementById('page-mode-button');
        if (pageModeButton && cvContainer) {
            pageModeButton.addEventListener('click', () => {
                cvContainer.classList.toggle('multi-page');
                const allProjects = document.querySelectorAll('.project');
                allProjects.forEach(project => {
                    project.classList.toggle('expanded');
                    if(project.classList.contains('expanded')){
                        project.classList.remove('collapsed')
                    }
                });
                
            });
        }
    })
    .catch(error => console.error('Error:', error));




// script.js

// Fetch JSON data
fetch('https://cdn.jsdelivr.net/gh/sci-barite/sci-barite.github.io@main/data/CV.json')
    .then(response => response.json())
    .then(data => {
        // Profile
        const header = document.getElementById('header');
        if (data.profile && header) {
             const profileData = document.createElement('div');
            const profileTitle = document.createElement('h2');
            profileTitle.textContent = 'Profile';
            profileData.appendChild(profileTitle);

            const ageDiv = document.createElement('div');
            ageDiv.textContent = `Age: ${data.profile.age}`;
            profileData.appendChild(ageDiv);

            const languagesTitle = document.createElement('h3');
            languagesTitle.textContent = "Languages";
            profileData.appendChild(languagesTitle);

            const educationList = document.createElement('ul');
            educationList.id = "education-list";

            data.profile.education.forEach(education => {

                const educationItem = document.createElement('li');
                educationItem.textContent = `Degree: ${education.degree}, Institution: ${education.institution}, Year: ${education.year}, Details: ${education.details}`;
                educationList.appendChild(educationItem);
            });
             profileData.appendChild(educationList);
            if (data.languages) {
                data.languages.forEach(lang => {
                    const languageDiv = document.createElement('div');
                    languageDiv.textContent = `Language: ${lang.language}, Level: ${lang.level}`;
                     profileData.appendChild(languageDiv);
                });
            }
             header.appendChild(profileData);
        }
        // Sidebar: Skills
        const sidebar = document.getElementById('sidebar');
        if (data.skills && sidebar) {
            const skillsTitle = document.createElement('h3');
            skillsTitle.textContent = 'Skills';
            sidebar.insertBefore(skillsTitle, sidebar.firstChild);
            const skillsContainer = document.getElementById('skills-container');

            data.skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill');
                skillItem.textContent = skill.name;//only name
                const skillLevel = document.createElement('div');
                skillLevel.textContent = `Level: ${skill.level}`;
                skillLevel.style.display = 'none';
                skillItem.appendChild(skillLevel);
                const skillExperiencesContainer = document.createElement('ul');
                skillExperiencesContainer.style.display = 'none';
                if (skill.experiences && skill.experiences.length > 0) {
                    skill.experiences.forEach(experience => {
                        const skillExperienceDiv = document.createElement('li');
                        skillExperienceDiv.textContent = experience;
                        skillExperiencesContainer.appendChild(skillExperienceDiv);
                    });
                }
                skillItem.appendChild(skillExperiencesContainer);//add the list to the item
                const cvContainer = document.getElementById('cv-container');//get the container
                if (cvContainer.classList.contains('multi-page')) {
                    skillLevel.style.display = 'block';
                    skillExperiencesContainer.style.display = 'block';
                }



                skillsContainer.appendChild(skillItem);
            });//end of skills loop
        }
        //Sidebar: Courses
        if (data.courses && sidebar) {
            const coursesTitle = document.createElement('h3');

            coursesTitle.textContent = 'Courses';
            sidebar.appendChild(coursesTitle)

            const coursesContainer = document.getElementById('courses-container');
            data.courses.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.classList.add('course');
                const provider = document.createElement('p');
                provider.textContent = course.provider;
                courseItem.appendChild(provider);
                const courseTitle = document.createElement('p');
                courseTitle.textContent = course.title;
                courseTitle.style.display = 'none';//hidden by default
                const year = document.createElement('div');
                year.textContent = `Year: ${course.year}`;
                year.style.display = 'none';//hidden by default
                courseItem.appendChild(courseTitle);
                courseItem.appendChild(year);

                const relatedSkillsContainer = document.createElement('ul');
                if (course.relatedSkills && course.relatedSkills.length > 0) {
                    course.relatedSkills.forEach(relatedSkill => {
                        const relatedSkillDiv = document.createElement('li');
                        relatedSkillDiv.textContent = relatedSkill;
                        relatedSkillsContainer.appendChild(relatedSkillDiv);
                    });
                }
                courseItem.appendChild(relatedSkillsContainer);
                coursesContainer.appendChild(courseItem);
            });




        }
        // Main: Experiences
        const mainContent = document.getElementById('main-content');
        if (data.experiences && mainContent) {
            const experiencesTitle = document.createElement('h3');
            experiencesTitle.textContent = 'Experiences';
            mainContent.appendChild(experiencesTitle);
            const experiencesContainer = document.getElementById('experiences-container');
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
             interestsContainer.id = "interests-container";
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
                    if (project.classList.contains('expanded')) {
                        project.classList.remove('collapsed')
                    }
                });

                const skillsContainer = document.getElementById('skills-container');
                const coursesContainer = document.getElementById('courses-container');
                const allSkills = skillsContainer.querySelectorAll(".skill");
                allSkills.forEach(skill => {
                    const skillLevel = skill.querySelector("div");
                    const skillExperiences = skill.querySelector("ul");
                    if (cvContainer.classList.contains('multi-page')) {
                        skillLevel.style.display = 'block';
                        skillExperiences.style.display = 'block';
                    } else {
                        skillLevel.style.display = 'none';
                        skillExperiences.style.display = 'none';
                    }
                });
                const allCourses = coursesContainer.querySelectorAll(".course");
                allCourses.forEach(course => {
                    const courseTitle = course.querySelector("p");
                    const year = course.querySelector("div");
                    courseTitle.style.display = cvContainer.classList.contains("multi-page") ? "block" : "none";
                    year.style.display = cvContainer.classList.contains("multi-page") ? "block" : "none";
                });

            });
        }
        const jsonPreview = document.getElementById('json-preview');
        const jsonButton = document.getElementById('json-button');
        jsonButton.addEventListener('click', () => {
            jsonPreview.classList.toggle('hidden');
        });
        const jsonCode = document.createElement('code');
        jsonCode.className = 'language-json';
        jsonCode.textContent = JSON.stringify(data, null, 2);
        const jsonPre = document.createElement('pre');
        jsonPre.appendChild(jsonCode);
        jsonPreview.appendChild(jsonPre);
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(jsonCode);
        }
    })
    .catch(error => console.error('Error:', error));

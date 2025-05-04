// Fetch JSON data
fetch('https://cdn.jsdelivr.net/gh/sci-barite/sci-barite.github.io@main/data/CV.json')
    .then(response => response.json())
    .then(data => {
        // Display the JSON in the json-preview div using Prism
        const jsonPreview = document.getElementById('json-preview');
        if (jsonPreview) {
            // Make the JSON preview visible
            jsonPreview.style.display = 'block';
            const jsonString = JSON.stringify(data, null, 2);
            jsonPreview.innerHTML = `<pre><code class="language-json">${jsonString}</code></pre>`;
            Prism.highlightAll();
        }
         // Add event listener to toggle JSON preview visibility
         const jsonButton = document.getElementById('json-button');
         if (jsonButton && jsonPreview) {
            jsonButton.addEventListener('click', () => {
                jsonPreview.style.display = jsonPreview.style.display === 'none' ? 'block' : 'none';
            });
        }

        // Display Profile Data in the Header
        const header = document.querySelector('header');
        if (data.profile && header) {
            const profilePic = document.getElementById('profile-pic');
            if(profilePic){
                profilePic.src = "pfp.jpeg";
            }
            
            const ageDiv = document.createElement('p');
            ageDiv.textContent = `Age: ${data.profile.age}`;
            header.appendChild(ageDiv);

            const educationDiv = document.createElement('div');
            educationDiv.innerHTML = '<h3>Education</h3>';
            data.profile.education.forEach(edu => {
                educationDiv.innerHTML += `<p>${edu.degree} at ${edu.institution} (${edu.year})</p>`;
            });
            header.appendChild(educationDiv);
            const languagesDiv = document.createElement('div');
            languagesDiv.innerHTML = '<h3>Languages</h3>';
            if (data.languages) {
                 data.languages.forEach(lang=>{
                    languagesDiv.innerHTML += `<p>${lang.language} - ${lang.level}</p>`;
                });
            }
            header.appendChild(languagesDiv);
        }

        // Display Skills and Courses in the Sidebar
        const sidebar = document.getElementById('sidebar');
        if (data.skills && sidebar) {
            const skillsDiv = document.createElement('div');
            skillsDiv.innerHTML = '<h3>Skills</h3>';
             data.skills.forEach(skill => {
                 const skillItem = document.createElement('div');
                 skillItem.innerHTML = `<p>${skill.name}</p>`;//name only
                 const skillLevel = document.createElement('p');
                 skillLevel.textContent = `Level: ${skill.level}`;
                 skillLevel.style.display = 'none';//hidden by default
                 skillItem.appendChild(skillLevel);
                 const skillExperiencesContainer = document.createElement('ul');
                 skillExperiencesContainer.style.display = 'none';//hidden by default
                 if (skill.experiences && skill.experiences.length > 0) {
                     skill.experiences.forEach(experience => {
                         const skillExperienceDiv = document.createElement('li');
                         skillExperienceDiv.textContent = experience;
                         skillExperiencesContainer.appendChild(skillExperienceDiv);
                     });
                 }
                 skillItem.appendChild(skillExperiencesContainer);//add the list to the item
                 skillsDiv.appendChild(skillItem);
             });
             sidebar.appendChild(skillsDiv);
             const coursesDiv = document.createElement('div');
             coursesDiv.innerHTML = '<h3>Courses</h3>';
             data.courses.forEach(course=>{
                 const courseItem = document.createElement('div');
                 courseItem.innerHTML = `<p>Provider: ${course.provider}</p>`;//provider only
                 const courseTitle = document.createElement('p');
                 courseTitle.textContent = `Title: ${course.title}`;
                 courseTitle.style.display = 'none';//hidden by default
                 const year = document.createElement('div');
                 year.textContent = `Year: ${course.year}`;
                 year.style.display = 'none';//hidden by default
                 courseItem.appendChild(courseTitle);
                 courseItem.appendChild(year);
                 const relatedSkillsContainer = document.createElement('ul');
                 relatedSkillsContainer.style.display = 'none';//hidden by default
                 if (course.relatedSkills && course.relatedSkills.length > 0) {
                     course.relatedSkills.forEach(relatedSkill => {
                         const relatedSkillDiv = document.createElement('li');
                         relatedSkillDiv.textContent = relatedSkill;
                         relatedSkillsContainer.appendChild(relatedSkillDiv);
                     });
                 }
                 courseItem.appendChild(relatedSkillsContainer);
                 coursesDiv.appendChild(courseItem);
                });
             sidebar.appendChild(coursesDiv);
        }
        // Display Experiences and Interests in the Main Section
        const mainContent = document.getElementById('main-content');
        if (data.experiences && mainContent) {
            const experiencesDiv = document.createElement('div');
            experiencesDiv.innerHTML = '<h3>Experiences</h3>';
            data.experiences.forEach(experience => {
                const experienceDiv = document.createElement('div');
                 experienceDiv.innerHTML = `<h4>${experience.company}</h4>
                                             <p>${experience.role} (${experience.duration})</p>`;
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
                         projectDiv.innerHTML = `<h4>${project.title}</h4>
                                                 <p>${project.description}</p>
                                                 <p>Technologies: ${project.technologies.join(', ')}</p>
                                                 <p>Status: ${project.status}</p>`;
                         experienceDiv.appendChild(projectDiv);
                         if (index >= 3) {
                             projectDiv.classList.add('collapsed');
                         }
                    });
                }
                 experiencesDiv.appendChild(experienceDiv);
            });
            mainContent.appendChild(experiencesDiv);
            const interestsDiv = document.createElement('div');
            interestsDiv.innerHTML = '<h3>Interests</h3>';
            data.interests.forEach(interest => {
                const interestDiv = document.createElement('div');
                interestDiv.innerHTML = `<p>${interest}</p>`;
                interestsDiv.appendChild(interestDiv)
            });
            mainContent.appendChild(interestsDiv);
        }
        //Buttons
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
                 //show or hide skill and course details
             const allSkills = document.querySelectorAll(".skill");
             allSkills.forEach(skill=>{
                 const skillLevel = skill.querySelector("p:nth-child(2)");
                 const skillExperiences = skill.querySelector("ul");
                     if(cvContainer.classList.contains('multi-page')){
                         skillLevel.style.display = 'block';
                         skillExperiences.style.display = 'block';
                     }else{
                         skillLevel.style.display = 'none';
                         skillExperiences.style.display = 'none';
                    }
                 });
                 const allCourses = document.querySelectorAll(".course");
                 allCourses.forEach(course=>{
                     const courseTitle = course.querySelector("p:nth-child(2)");
                     const year = course.querySelector("div");
                     const relatedSkills = course.querySelector("ul");
                      courseTitle.style.display = cvContainer.classList.contains("multi-page") ? "block":"none";
                      year.style.display = cvContainer.classList.contains("multi-page") ? "block":"none";
                      relatedSkills.style.display = cvContainer.classList.contains("multi-page") ? "block":"none";
                 });
                 
            });
        } 
    })
    .catch(error => console.error('Fetch Error:', error));


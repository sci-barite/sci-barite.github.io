fetch('https://cdn.jsdelivr.net/gh/sci-barite/sci-barite.github.io@main/data/CV.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the entire data object
    const profileContainer = document.getElementById('profile-container');
        if(data.profile && profileContainer){
            const ageDiv = document.createElement('div');
            ageDiv.textContent = `Age: ${data.profile.age}`;
            profileContainer.appendChild(ageDiv);

            data.profile.education.forEach(education => {
                const educationDiv = document.createElement('div');
                educationDiv.textContent = `Degree: ${education.degree}, Institution: ${education.institution}, Year: ${education.year}, Details: ${education.details}`;
                profileContainer.appendChild(educationDiv);
            });
        }

    const cvContainer = document.getElementById('cv-container');

    if (data.skills && cvContainer) {
      data.skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.textContent = skill.name;
        const skillLevel = document.createElement('div');
        skillLevel.textContent = `Level: ${skill.level}`;
        skillDiv.appendChild(skillLevel);

        if (skill.experiences && skill.experiences.length > 0) {
            skill.experiences.forEach(experience => {
                const skillExperienceDiv = document.createElement('div');
                skillExperienceDiv.textContent = experience;
                skillDiv.appendChild(skillExperienceDiv);
            });
        }



        cvContainer.appendChild(skillDiv);
      });
    }

    const experiencesContainer = document.getElementById('experiences-container');
    if (data.experiences && experiencesContainer) {
      data.experiences.forEach(experience => {
        const experienceDiv = document.createElement('div');
        experienceDiv.classList.add('experience');

        const companyName = document.createElement('h3');
        companyName.textContent = experience.company;
        const role = document.createElement('p');
        role.textContent = experience.role;
        const duration = document.createElement('p');
        duration.textContent = experience.duration;
        experienceDiv.appendChild(companyName)
        experienceDiv.appendChild(role);
        experienceDiv.appendChild(duration);
        if(experience.projects){
          experience.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            const title = document.createElement('h4');
            title.textContent = project.title;
            const description = document.createElement('p');
            description.textContent = project.description;
            const technologies = document.createElement('p');
            technologies.textContent = `Technologies: ${project.technologies.join(', ')}`;
            const status = document.createElement('p');
            status.textContent = `Status: ${project.status}`;
            projectDiv.append(title,description,technologies,status);
            experienceDiv.appendChild(projectDiv);});}
        experiencesContainer.appendChild(experienceDiv);
      });
    }
    const coursesContainer = document.getElementById('courses-container');
    if (data.courses && coursesContainer) {
      data.courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');

        const courseTitle = document.createElement('h4');
        courseTitle.textContent = course.title;
        const provider = document.createElement('p');
        provider.textContent = `Provider: ${course.provider}`;
        const year = document.createElement('p');
        year.textContent = `Year: ${course.year}`;
        courseDiv.appendChild(courseTitle);
        courseDiv.appendChild(provider);
        courseDiv.appendChild(year);

        if (course.relatedSkills && course.relatedSkills.length > 0) {
          course.relatedSkills.forEach(relatedSkill => {
              const relatedSkillDiv = document.createElement('div');
              relatedSkillDiv.textContent = relatedSkill;
              courseDiv.appendChild(relatedSkillDiv);
          });
      }
        coursesContainer.appendChild(courseDiv);
      });
    } // end of courses
        const landscapeButton = document.getElementById('landscape-button');
        if(landscapeButton && cvContainer){
            landscapeButton.addEventListener('click', () => {
              cvContainer.classList.toggle('landscape');
            });
        }
        const interestsContainer = document.getElementById('interests-container');
        if(data.interests && interestsContainer){
          data.interests.forEach(interest=>{
            const interestDiv = document.createElement('div');
            interestDiv.textContent = interest;
            interestsContainer.appendChild(interestDiv)
          })
        }//end of interests
        
    })
  .catch(error => console.error('Error:', error));

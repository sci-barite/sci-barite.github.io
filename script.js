window.addEventListener("load", function () {
    // Carica i dati JSON dal file locale o remoto
    fetch("https://cdn.jsdelivr.net/gh/sci-barite/sci-barite.github.io@main/data/CV.json")
      .then(response => response.json())
      .then(data => {
        renderCV(data);
      })
      .catch(err => console.error('Errore nel caricamento del JSON:', err));
  
    // Funzione per stampare il CV
    document.getElementById('print-btn').addEventListener('click', function() {
      window.print();
    });
  
    // Funzione per popolare il CV con i dati
    function renderCV(data) {
      // Header
      document.getElementById('cv-photo').src = data.photo || "pfp.jpeg";
      document.getElementById('cv-name').innerText = data.name;
      document.getElementById('cv-title').innerText = data.title;
      document.getElementById('cv-contact').innerHTML = `<strong>Email:</strong> ${data.contact.email} <br><strong>Phone:</strong> ${data.contact.phone}`;
  
      // Lingue
      const languagesList = document.getElementById('cv-languages').querySelector('ul');
      data.languages.forEach(language => {
        let li = document.createElement('li');
        li.innerHTML = `<strong>${language.name}:</strong> ${language.level} - ${language.details}`;
        languagesList.appendChild(li);
      });
  
      // Skill
      const skillsList = document.getElementById('skills-list');
      data.skills.forEach(skill => {
        let skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');
        skillDiv.innerHTML = `
          <strong>${skill.name}</strong>
          <div class="skill-bar" style="width: ${skill.level * 10}%"></div>
        `;
        skillsList.appendChild(skillDiv);
      });
  
      // Corsi
      const coursesList = document.getElementById('courses-list');
      data.courses.forEach(course => {
        let li = document.createElement('li');
        li.innerHTML = `<strong>${course.name}</strong> (${course.date}) - ${course.source}`;
        coursesList.appendChild(li);
      });
  
      // Esperienze Lavorative
      const experiencesList = document.getElementById('experiences-list');
      data.experiences.forEach(experience => {
        let expDiv = document.createElement('div');
        expDiv.classList.add('experience');
        expDiv.innerHTML = `
          <h4>${experience.role} - ${experience.company} (${experience.period})</h4>
          <div class="projects">
            ${experience.projects.map(project => `
              <div class="project">
                <strong>${project.name}</strong>
                <p>${project.description}</p>
              </div>
            `).join('')}
          </div>
        `;
        experiencesList.appendChild(expDiv);
      });
    }
  });
  
window.addEventListener("load", () => {
    const cvContainer = document.getElementById("cv-container");
    const printBtn    = document.getElementById("print-btn");
  
    fetch("cv.json")
      .then(r => r.json())
      .then(data => renderCV(data))
      .catch(e => console.error(e));
  
    printBtn.addEventListener("click", () => window.print());
  });
  
  function renderCV(d) {
    // HEADER: foto, nome, titolo, età, istruzione e lingue
    const headerEl = document.getElementById("cv-header");
    headerEl.innerHTML = `
      ${d.profile.photo ? `<img id="cv-photo" src="pfp.jpeg" alt="Foto" />` : ""}
      <div>
        <h1 id="cv-name">${d.name || "Rafael Romo Mulas"}</h1>
        ${d.profile.age ? `<p>Età: ${d.profile.age}</p>` : ""}
        <h2 id="cv-title">${d.title || ""}</h2>
        <div id="cv-contact">${d.contact ? `${d.contact.email} ‑ ${d.contact.phone}` : ""}</div>
      </div>
    `;
  
    // Istruzione
    const eduList = d.profile.education.map(ed => `
      <li>
        <strong>${ed.degree}</strong>, ${ed.institution} (${ed.year})<br>
        <em>${ed.details}</em>
      </li>
    `).join("");
    document.querySelector("#cv-languages + ul").insertAdjacentHTML("beforebegin",
      `<h3>Istruzione</h3><ul>${eduList}</ul>`
    );
  
    // Lingue
    const langUl = document.querySelector("#cv-languages ul");
    langUl.innerHTML = d.profile.languages.map(l => `
      <li><strong>${l.name}</strong> – ${l.level}${l.details ? ` (${l.details})` : ""}</li>
    `).join("");
  
    // SKILLS & COURSES in sidebar
    const skillsList   = document.getElementById("skills-list");
    const coursesList  = document.getElementById("courses-list");
    const pagesMode    = document.getElementById("pages").value;
    const sortedSkills = d.skills.sort((a,b)=>b.level - a.level);
  
    if (pagesMode === "2") {
      // dettagliati
      skillsList.innerHTML = sortedSkills.map(s => `
        <div class="skill">
          <strong>${s.name}</strong><br>
          <div class="skill-bar" style="--pct:${s.level}%"></div>
          <small>${s.functionalCategory}</small>
        </div>
      `).join("");
      coursesList.innerHTML = d.courses.map(c => `
        <li class="course">
          <strong>${c.title}</strong> – ${c.provider} (${c.year})
        </li>
      `).join("");
    } else {
      // compatto
      skillsList.innerHTML = `<p>${d.skills.map(s=>s.name).join(", ")}</p>`;
      coursesList.innerHTML = `<p>${d.courses.length} corsi totali</p>`;
    }
  
    // EXPERIENCE + progetti
    const expList = document.getElementById("experiences-list");
    expList.innerHTML = "";
    d.experiences.forEach((exp, i) => {
      const projToShow = pagesMode==="2" ? exp.projects : exp.projects.slice(0,3);
      expList.insertAdjacentHTML("beforeend", `
        <div class="experience ${projToShow.length < exp.projects.length ? 'collapsed' : ''}">
          <h4>${exp.role} @ ${exp.company} <span class="period">(${exp.duration})</span></h4>
          <ul class="project-list">
            ${projToShow.map(p=>`<li class="project">
              <strong>${p.title}</strong>: ${p.description}
            </li>`).join("")}
          </ul>
        </div>
      `);
    });
  
    // INTERESTS
    const intSec = document.getElementById("interests-list");
    if(intSec){
      intSec.innerHTML = d.interests.map(i=>`<li>${i}</li>`).join("");
    }
  }
  
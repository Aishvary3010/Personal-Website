"use strict";

// Keep the shared site controls in one file so every page behaves the same.
const pageBody = document.body;

// Translate fixed interface labels only; blog article copy stays in its authored language.
const languageToggle = document.querySelector(".language-toggle");
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.interests": "Interests",
    "nav.projects": "Projects",
    "nav.blogs": "Blogs",
    "nav.contact": "Contact Me",
    "footer.explore": "Explore",
    "footer.connect": "Connect",
    "footer.sitemap": "Full site map",
    "contact.eyebrow": "SAY HELLO",
    "contact.title": "Let’s start a conversation.",
    "contact.lede": "Have an engineering opportunity, a project idea, or just want to connect? Send me a note.",
    "contact.formNote": "Your email app will open with your message ready to send.",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.message": "Your message",
    "contact.submit": "Prepare email",
    "contact.namePlaceholder": "Jane Smith",
    "contact.emailPlaceholder": "jane@example.com",
    "contact.messagePlaceholder": "Tell me a little about it...",
  },
  de: {
    "nav.home": "Startseite",
    "nav.about": "Über mich",
    "nav.interests": "Interessen",
    "nav.projects": "Projekte",
    "nav.blogs": "Blog",
    "nav.contact": "Kontakt",
    "footer.explore": "Entdecken",
    "footer.connect": "Kontaktieren",
    "footer.sitemap": "Sitemap",
    "contact.eyebrow": "KONTAKT",
    "contact.title": "Lassen Sie uns ins Gespräch kommen.",
    "contact.lede": "Sie haben ein Jobangebot im Ingenieurwesen, eine Projektidee oder möchten sich einfach vernetzen? Schreiben Sie mir.",
    "contact.formNote": "Ihre E-Mail-App wird mit einer vorbereiteten Nachricht geöffnet.",
    "contact.name": "Ihr Name",
    "contact.email": "Ihre E-Mail-Adresse",
    "contact.message": "Ihre Nachricht",
    "contact.submit": "E-Mail vorbereiten",
    "contact.namePlaceholder": "Max Mustermann",
    "contact.emailPlaceholder": "max@beispiel.de",
    "contact.messagePlaceholder": "Schreiben Sie mir kurz, worum es geht …",
  },
};

// Page copy is translated by its exact English text. This keeps project and profile
// content easy to edit, while blog cards and individual blog articles stay untouched.
const fixedCopyGerman = {
  "M.Sc. Mechatronics student · University of Siegen": "M.Sc.-Student der Mechatronik · Universität Siegen",
  "I’m pursuing an M.Sc. in Mechatronics at the University of Siegen after more than two years in manufacturing engineering. I’m open to internships in manufacturing, automation, and robotics.": "Ich studiere Mechatronik im Master an der Universität Siegen und bringe mehr als zwei Jahre Erfahrung im Fertigungsingenieurwesen mit. Ich suche Praktika in den Bereichen Fertigung, Automatisierung und Robotik.",
  "OPEN TO INTERNSHIPS & ENGINEERING OPPORTUNITIES": "OFFEN FÜR PRAKTIKA UND INGENIEURSTÄTIGKEITEN",
  "Explore my work": "Meine Projekte ansehen",
  "Contact me": "Kontakt aufnehmen",
  "Siegen, Germany": "Siegen, Deutschland",
  "Mechatronics · Robotics · Manufacturing": "Mechatronik · Robotik · Fertigung",
  "A QUICK INTRODUCTION": "KURZ VORGESTELLT",
  "Engineering that connects the dots.": "Ingenieurwesen, das Bereiche verbindet.",
  "From commissioning CNC machines in an industrial environment to building robotic arms and connected devices, I enjoy turning engineering ideas into working systems.": "Ob bei der Inbetriebnahme von CNC-Maschinen oder beim Bau von Roboterarmen und vernetzten Geräten: Ich setze technische Ideen gern in funktionierende Systeme um.",
  "Get to know me": "Mehr über mich",
  "Hands-on experience": "Praxisnahe Erfahrung",
  "Manufacturing operations, equipment commissioning, process validation, and continuous improvement.": "Fertigungsabläufe, Anlageninbetriebnahme, Prozessvalidierung und kontinuierliche Verbesserung.",
  "Curious by design": "Neugierig und lösungsorientiert",
  "Robotics, sensors, motion control, and embedded systems explored through practical projects.": "Robotik, Sensorik, Bewegungssteuerung und eingebettete Systeme in praktischen Projekten.",
  "Always learning": "Ständiges Lernen",
  "Currently pursuing an M.Sc. in Mechatronics at the University of Siegen.": "Derzeit studiere ich Mechatronik im Master an der Universität Siegen.",
  "WHAT I WORK WITH": "WOMIT ICH ARBEITE",
  "A mix of practical skills.": "Eine Kombination aus praktischen Fähigkeiten.",
  "From improving production on the shop floor to building a robot that moves with purpose, I like connecting mechanical systems, electronics, and code.": "Von Verbesserungen in der Fertigung bis zum Bau eines gezielt bewegten Roboters: Ich verbinde gern Mechanik, Elektronik und Programmierung.",
  "Explore all skills": "Alle Kompetenzen ansehen",
  "Robotics & automation": "Robotik und Automatisierung",
  "Manufacturing & design": "Fertigung und Konstruktion",
  "Tools & collaboration": "Werkzeuge und Zusammenarbeit",
  "LATEST FROM THE WORKBENCH": "NEUES AUS DER WERKSTATT",
  "Notes from what I’m learning.": "Einblicke in meine aktuellen Lernthemen.",
  "All articles": "Alle Beiträge",
  "SELECTED WORK": "AUSGEWÄHLTE PROJEKTE",
  "Projects with moving parts.": "Projekte mit Bewegung.",
  "All projects": "Alle Projekte",
  "Scroll sideways to explore": "Zum Entdecken seitlich scrollen",
  "AROUND THE WEB": "IM INTERNET",
  "Engineering, images, and everything between.": "Technik, Fotografie und mehr.",
  "A closer look at my photography and the work I share online.": "Ein Einblick in meine Fotografie und meine Online-Projekte.",
  "Open photography profile": "Fotografieprofil öffnen",
  "Open personal profile": "Persönliches Profil öffnen",
  "HAVE A PROJECT IN MIND?": "HAST DU EINE PROJEKTIDEE?",
  "Let’s make something work better.": "Lass uns etwas besser machen.",
  "Get in touch": "Kontakt aufnehmen",
  "Mechatronics, manufacturing, and robotics.": "Mechatronik, Fertigung und Robotik.",
  "A LITTLE ABOUT ME": "ÜBER MICH",
  "I’m a Mechatronics M.Sc. student at the University of Siegen, bringing more than two years of manufacturing engineering experience. I’m interested in connecting manufacturing with robotics and automation.": "Ich studiere Mechatronik im Master an der Universität Siegen und bringe mehr als zwei Jahre Erfahrung im Fertigungsingenieurwesen mit. Mich interessiert die Verbindung von Fertigung, Robotik und Automatisierung.",
  "I have worked on CNC machine commissioning, production process validation, automation initiatives, and shop-floor improvements. Outside of work, I keep exploring robotics, embedded systems, and hands-on projects.": "Ich habe an der Inbetriebnahme von CNC-Maschinen, der Validierung von Fertigungsprozessen, Automatisierungsinitiativen und Verbesserungen in der Produktion gearbeitet. Darüber hinaus beschäftige ich mich mit Robotik, eingebetteten Systemen und praktischen Projekten.",
  "My goal is to bring practical engineering and thoughtful problem-solving together to make systems work better.": "Mein Ziel ist es, praxisnahes Ingenieurwissen und durchdachte Problemlösung zu verbinden, damit technische Systeme besser funktionieren.",
  "Download my resume": "Lebenslauf herunterladen",
  "THE JOURNEY SO FAR": "MEIN BISHERIGER WEG",
  "CAREER DEVELOPMENT": "BERUFLICHE ENTWICKLUNG",
  "Professional experience": "Berufserfahrung",
  "Manufacturing Engineer · Functional Trainee → Assistant Manager": "Fertigungsingenieur · Trainee → Assistant Manager",
  "Selected work: capacity enhancement, SAP EWM storage upgrades, and a curve-conveyor improvement recognized in the 2024 Operations Innovation Challenge.": "Ausgewählte Projekte: Kapazitätserweiterung, SAP-EWM-Lageroptimierung und eine Kurvenförderer-Verbesserung, die 2024 beim Operations Innovation Challenge ausgezeichnet wurde.",
  "Volvo Eicher Commercial Vehicles · Supported fixtures, tooling, layouts, process sheets, CNC installation and commissioning, machine audits, engineering trials, and SOP/OPL/DCN documentation. Worked across engine machining, assembly, and testing, and served as an Early Equipment Management successor within the Volvo Production System. Selected work: capacity enhancement, SAP EWM storage upgrades, and a curve-conveyor improvement recognized in the 2024 Operations Innovation Challenge.": "Volvo Eicher Commercial Vehicles · Unterstützung bei Vorrichtungen, Werkzeugen, Layouts, Prozessblättern, CNC-Installation und -Inbetriebnahme, Maschinenaudits, technischen Versuchen sowie SOP-, OPL- und DCN-Dokumentation. Mitarbeit in Motorenbearbeitung, Montage und Prüfung sowie Nachfolge im Early Equipment Management des Volvo Production System. Ausgewählte Projekte: Kapazitätserweiterung, SAP-EWM-Lageroptimierung und eine 2024 ausgezeichnete Kurvenförderer-Verbesserung.",
  "Intern · Ministry of Cooperation, India": "Praktikant · Ministry of Cooperation, Indien",
  "Assisted the District Nodal Officer with preparing the National Cooperation Database and gathering information about local cooperative societies. Used Microsoft Excel and database tools for the work.": "Unterstützung der zuständigen Bezirksstelle bei der Erstellung der National Cooperation Database und beim Sammeln von Informationen zu lokalen Genossenschaften. Einsatz von Microsoft Excel und Datenbankwerkzeugen.",
  "Web Design Intern · Eurecon Pumps India": "Praktikant Webdesign · Eurecon Pumps India",
  "Maintained the company website and prepared digital content, graphic layouts, banners, mailers, and promotional specifications.": "Pflege der Unternehmenswebsite sowie Erstellung digitaler Inhalte, grafischer Layouts, Banner, Mailings und Werbespezifikationen.",
  "EDUCATION & TRAINING": "AUSBILDUNG",
  "Education": "Ausbildung",
  "M.Sc. Mechatronics": "M.Sc. Mechatronik",
  "B.Tech. Mechanical Engineering · Honours": "B.Tech. Maschinenbau · Honours",
  "Samrat Ashok Technological Institute, Vidisha · 8.87 CGPA": "Samrat Ashok Technological Institute, Vidisha · 8,87 CGPA",
  "Diploma in Computer Applications": "Diplom in Computeranwendungen",
  "Higher Secondary School · Class 12": "Weiterführende Schule · Klasse 12",
  "High School · Class 10": "Sekundarschule · Klasse 10",
  "SKILLS & TOOLS": "KOMPETENZEN UND WERKZEUGE",
  "Mechatronics & automation": "Mechatronik und Automatisierung",
  "Manufacturing & design": "Fertigung und Konstruktion",
  "Programming & embedded systems": "Programmierung und eingebettete Systeme",
  "Software & collaboration": "Software und Zusammenarbeit",
  "Programming and web technologies also reflect the practice projects on my GitHub profile.": "Programmier- und Webtechnologien zeigen sich auch in meinen Übungsprojekten auf GitHub.",
  "CERTIFICATIONS & LANGUAGES": "ZERTIFIKATE UND SPRACHEN",
  "CONTINUOUS LEARNING": "KONTINUIERLICHES LERNEN",
  "Certifications": "Zertifikate",
  "LANGUAGES I SPEAK": "MEINE SPRACHEN",
  "Communication": "Kommunikation",
  "Full professional proficiency · C2": "Annähernd muttersprachliche Kenntnisse · C2",
  "Mother tongue": "Muttersprache",
  "Currently improving": "Ich lerne weiter",
  "ACHIEVEMENTS & RECOGNITION": "ERFOLGE UND AUSZEICHNUNGEN",
  "Curve-conveyor project selected among the best innovations.": "Das Kurvenförderer-Projekt wurde als eine der besten Innovationen ausgewählt.",
  "Placed 5th in the 2023 Mechanical Engineering merit list.": "5. Platz in der Rangliste des Maschinenbaujahrgangs 2023.",
  "Served as convenor for the institute’s annual cultural and technical festivals.": "Organisation der jährlichen Kultur- und Technikfestivals des Instituts als Convenor.",
  "Received a memento for media coverage in 2021–22.": "Auszeichnung für die Medienberichterstattung 2021–22.",
  "EXTRACURRICULAR & COMMUNITY": "ENGAGEMENT UND GEMEINSCHAFT",
  "Leadership, clubs & volunteering": "Leitung, Clubs und Ehrenamt",
  "Member, instructor, and Club Secretary at S.A.T.I. Vidisha. Helped run Getting Started with Arduino and IoT home-automation workshops, Roborace and Robowar competitions, and Miniature Madness.": "Mitglied, Kursleiter und Club Secretary bei S.A.T.I. Vidisha. Mitorganisation von Arduino- und IoT-Workshops, Roborace- und Robowar-Wettbewerben sowie Miniature Madness.",
  "Progressed from Content Writer to Editor and Chief Editor, leading the newsletter team in the final year.": "Vom Content Writer über den Editor zum Chief Editor aufgestiegen und das Redaktionsteam im Abschlussjahr geleitet.",
  "Worked as Photographer and Editor, then Coordinator. Photographs were selected for college publications and local media.": "Als Fotograf und Editor, später als Koordinator tätig. Fotos wurden für Hochschulpublikationen und lokale Medien ausgewählt.",
  "Served as a Student Coordinator and supported student-led cultural activities.": "Als Student Coordinator studentische Kulturaktivitäten unterstützt.",
  "Volunteered and exhibited the 5-DOF robotic arm at the model exhibition.": "Als Freiwilliger mitgewirkt und den 5-DOF-Roboterarm bei der Modellausstellung präsentiert.",
  "Promoted entrepreneurship initiatives through my college network. Also served as an Internshala Student Partner in 2020 and volunteered with the M.P. Council of Science & Technology.": "Förderung von Gründungsinitiativen im Hochschulnetzwerk. Außerdem 2020 als Internshala Student Partner tätig und freiwilliger Mitarbeiter des M.P. Council of Science & Technology.",
  "OUTSIDE ENGINEERING": "AUSSERHALB DER TECHNIK",
  "A little beyond the workshop.": "Ein Blick über die Werkstatt hinaus.",
  "Away from engineering, I enjoy photography, chess, and community activities.": "Neben dem Ingenieurwesen beschäftige ich mich gern mit Fotografie, Schach und gemeinschaftlichen Aktivitäten.",
  "Explore interests": "Interessen entdecken",
  "PERSONAL INTERESTS": "PERSÖNLICHE INTERESSEN",
  "A few things that keep me curious.": "Ein paar Dinge, die meine Neugier wecken.",
  "Creativity, strategy, and hands-on learning are part of how I recharge and how I approach new challenges.": "Kreativität, Strategie und praktisches Lernen geben mir neue Energie und prägen, wie ich Herausforderungen angehe.",
  "Photography": "Fotografie",
  "Looking for interesting details, light, and stories worth capturing.": "Auf der Suche nach spannenden Details, Licht und Geschichten, die es festzuhalten lohnt.",
  "View my photography": "Meine Fotografie ansehen",
  "Photography & cinematography": "Fotografie und Film",
  "Mechatronics": "Mechatronik",
  "Robotics": "Robotik",
  "Industrial automation": "Industrielle Automatisierung",
  "Manufacturing systems": "Fertigungssysteme",
  "Embedded systems": "Eingebettete Systeme",
  "Internet of Things": "Internet der Dinge",
  "Technical workshops": "Technische Workshops",
  "Chess": "Schach",
  "Practicing patience, pattern recognition, and thinking ahead.": "Geduld, Mustererkennung und vorausschauendes Denken trainieren.",
  "View my Chess.com profile": "Mein Chess.com-Profil ansehen",
  "DIY projects": "DIY-Projekte",
  "Learning by building, experimenting, and refining practical ideas.": "Durch Bauen, Ausprobieren und Weiterentwickeln praktischer Ideen lernen.",
  "Event management": "Veranstaltungsorganisation",
  "Coordinating people and details to create a shared experience.": "Menschen und Details koordinieren, um gemeinsame Erlebnisse zu schaffen.",
  "AREAS I LIKE EXPLORING": "THEMEN, DIE MICH INTERESSIEREN",
  "COMMUNITY & LEADERSHIP": "GEMEINSCHAFT UND LEITUNG",
  "Clubs & organizations": "Clubs und Organisationen",
  "Volunteering": "Ehrenamt",
  "Student Coordinator · S.A.T.I. Vidisha": "Student Coordinator · S.A.T.I. Vidisha",
  "Member · Instructor · Club Secretary · S.A.T.I.": "Mitglied · Kursleiter · Club Secretary · S.A.T.I.",
  "Content Writer · Editor · Chief Editor": "Content Writer · Editor · Chefredakteur",
  "Photographer & Editor · Coordinator": "Fotograf und Editor · Koordinator",
  "Student Volunteer · Model Exhibition Participant": "Freiwilliger · Teilnehmer der Modellausstellung",
  "Student Coordinator": "Studentischer Koordinator",
  "Student Volunteer": "Freiwilliger",
  "Campus Ambassador": "Campus-Botschafter",
  "Internshala Student Partner": "Internshala-Studentenpartner",
  "Photography & Cinematography Club": "Fotografie- und Filmclub",
  "SAE Collegiate Club": "SAE-Hochschulclub",
  "UDAAN · Theatre Society": "UDAAN · Theatergesellschaft",
  "Club FLUX · Technical Society": "Club FLUX · Technischer Verein",
  "Mechanical Newsletter · S.A.T.I.": "Technischer Newsletter · S.A.T.I.",
  "MIRAGE · Photography Club": "MIRAGE · Fotografieclub",
  "MP Young Scientist Congress": "MP Young Scientist Congress",
  "MP Young Scientist Congress & Science Festival": "MP Young Scientist Congress und Wissenschaftsfestival",
  "E-Cell, IIT Bombay · 2020–2021": "E-Cell, IIT Bombay · 2020–2021",
  "Internshala · Mar–May 2020": "Internshala · März–Mai 2020",
  "M.P. Council of Science & Technology · Science and technology": "M.P. Council of Science & Technology · Wissenschaft und Technik",
  "Led Arduino and IoT workshops and helped organize Roborace, Robowar, and Miniature Madness.": "Arduino- und IoT-Workshops geleitet und Roborace, Robowar sowie Miniature Madness mitorganisiert.",
  "Led the student newsletter team as chief editor in the final year of my degree.": "Das studentische Redaktionsteam im Abschlussjahr als Chief Editor geleitet.",
  "Photographed and edited for the institute’s photography and cinematography club; selected photographs appeared in local newspapers and media.": "Für den Fotografie- und Filmclub des Instituts fotografiert und Bilder bearbeitet; ausgewählte Fotos erschienen in lokalen Zeitungen und Medien.",
  "Supported student activities focused on engineering and mobility.": "Studentische Aktivitäten rund um Technik und Mobilität unterstützt.",
  "Contributed to coordination and student-led cultural activities.": "Bei der Koordination und bei studentischen Kulturaktivitäten mitgewirkt.",
  "Led a student volunteer committee, exhibited the 5-DOF robotic arm, and connected with young scientists.": "Ein studentisches Freiwilligenteam geleitet, den 5-DOF-Roboterarm ausgestellt und sich mit Nachwuchswissenschaftlern ausgetauscht.",
  "Promoted entrepreneurial initiatives through my college network.": "Gründungsinitiativen über mein Hochschulnetzwerk bekannt gemacht.",
  "SELECTED MOMENTS": "AUSGEWÄHLTE MOMENTE",
  "Learning by doing, together.": "Gemeinsam durch praktisches Arbeiten lernen.",
  "Sharing hands-on electronics and Arduino learning": "Praktische Elektronik- und Arduino-Kenntnisse teilen",
  "Engineering review and project coordination": "Technische Projektbesprechung und Koordination",
  "Operations Innovation Challenge": "Operations Innovation Challenge",
  "Workplace event and team activities": "Betriebsveranstaltung und Teamaktivitäten",
  "Engineering team": "Ingenieurteam",
  "A student-built drone project": "Ein studentisches Drohnenprojekt",
  "Student community and campus activities": "Studentengemeinschaft und Aktivitäten auf dem Campus",
  "SELECTED PROJECTS": "AUSGEWÄHLTE PROJEKTE",
  "Ideas built to move.": "Ideen, die etwas bewegen.",
  "Selected manufacturing and mechatronics work, from production improvements to robotics prototypes.": "Ausgewählte Projekte aus Fertigung und Mechatronik - von Prozessverbesserungen bis zu Robotik-Prototypen.",
  "Curve conveyor development": "Entwicklung eines Kurvenförderers",
  "Led a team to design, develop, and commission taper-roller curve conveyors, replacing turntables with zero downtime and a 4% improvement in OLE.": "Ein Team bei der Konstruktion, Entwicklung und Inbetriebnahme von Kurvenförderern mit Kegelrollen geleitet. Die Drehtische wurden ohne Stillstand ersetzt; die OLE verbesserte sich um 4 %.",
  "Read project details": "Projektdetails ansehen",
  "PRODUCTIVITY IMPROVEMENT": "PRODUKTIVITÄTSSTEIGERUNG",
  "CAPACITY & COMMISSIONING": "KAPAZITÄT UND INBETRIEBNAHME",
  "WAREHOUSE & MATERIAL FLOW": "LAGER UND MATERIALFLUSS",
  "PICK & PLACE ROBOTICS": "PICK-AND-PLACE-ROBOTIK",
  "AUTONOMOUS SORTING": "AUTONOME SORTIERUNG",
  "SMART HOME": "INTELLIGENTES ZUHAUSE",
  "EMBEDDED AUTOMATION": "EINGEBETTETE AUTOMATISIERUNG",
  "SPEED MEASUREMENT": "DREHZAHLMESSUNG",
  "Machine shop capacity enhancement": "Kapazitätserweiterung der Maschinenhalle",
  "Contributed to a machine-shop capacity project targeting an increase from 75,000 to 80,000 units per year, commissioning six HMC and two VMC machines.": "Mitwirkung an der Kapazitätserweiterung der Maschinenhalle von 75.000 auf 80.000 Einheiten pro Jahr sowie an der Inbetriebnahme von sechs HMC- und zwei VMC-Maschinen.",
  "SAP EWM storage facility upgrade": "Lageroptimierung mit SAP EWM",
  "Part of a team that upgraded storage facilities for EURO-7 and CNG cylinder-head and block variants using SAP EWM workflows, QR scanning, and dynamic bins.": "Mitwirkung bei der Modernisierung von Lagerbereichen für EURO-7- und CNG-Zylinderkopf- und Blockvarianten mit SAP-EWM-Workflows, QR-Scans und dynamischen Lagerplätzen.",
  "5-DOF robotic arm": "5-DOF-Roboterarm",
  "Designed and fabricated a five-degree-of-freedom robotic arm for pick-and-place tasks, with 3D-printed parts, Arduino servo control, kinematics, and an Android interface.": "Konstruktion und Fertigung eines Roboterarms mit fünf Freiheitsgraden für Pick-and-Place-Aufgaben, mit 3D-gedruckten Teilen, Arduino-Servosteuerung, Kinematik und Android-Oberfläche.",
  "Color-based object sorting manipulator": "Manipulator zur Farbsortierung",
  "Developed a Python-controlled LEGO EV3 manipulator to sort objects on a conveyor by color, using inverse kinematics and color, touch, and encoder sensors.": "Entwicklung eines Python-gesteuerten LEGO-EV3-Manipulators, der Objekte auf einem Förderband anhand ihrer Farbe sortiert und inverse Kinematik sowie Farb-, Berührungs- und Encodersensoren nutzt.",
  "IoT-based home automation": "IoT-basierte Hausautomatisierung",
  "Built a voice-controlled home automation prototype for two LED bulbs and a fan using NodeMCU8266, Blynk IoT, Google Assistant webhooks, and a relay.": "Bau eines sprachgesteuerten Hausautomatisierungs-Prototyps für zwei LED-Lampen und einen Ventilator mit NodeMCU8266, Blynk IoT, Google-Assistant-Webhooks und einem Relais.",
  "Smart curtain opening device": "Automatischer Vorhangöffner",
  "Designed a Bluetooth-controlled curtain opener with an Arduino Uno, HC-05 module, L298N motor driver, DC motor, and screw-and-nut motion.": "Konstruktion eines Bluetooth-gesteuerten Vorhangöffners mit Arduino Uno, HC-05-Modul, L298N-Motortreiber, Gleichstrommotor und Spindelantrieb.",
  "Digital tachometer": "Digitaler Drehzahlmesser",
  "Developed a PCB-based digital tachometer using an Arduino Nano and IR sensor to measure rotational speed and display live RPM on a 16×2 LCD.": "Entwicklung eines digitalen Drehzahlmessers auf Leiterplattenbasis mit Arduino Nano und IR-Sensor zur Messung der Drehzahl und Echtzeitanzeige auf einem 16×2-LCD.",
  "Explore more repositories on GitHub": "Weitere Repositories auf GitHub ansehen",
  "FRONT-END PRACTICE": "FRONTEND-ÜBUNGEN",
  "Small builds, steady progress.": "Kleine Projekte, stetiger Fortschritt.",
  "A selection of web development practice projects from GitHub and LinkedIn.": "Eine Auswahl meiner Webentwicklungs-Übungsprojekte von GitHub und LinkedIn.",
  "NOTES FROM THE WORKBENCH": "NOTIZEN AUS DER WERKSTATT",
  "Learning out loud.": "Lernen und Wissen teilen.",
  "Practical notes on manufacturing, design, robotics, and control. Each article includes further reading for deeper study.": "Praxisnahe Beiträge zu Fertigung, Konstruktion, Robotik und Regelungstechnik. Jeder Artikel enthält weiterführende Quellen.",
  "ABOUT THE AUTHOR": "ÜBER DEN AUTOR",
  "Mechatronics M.Sc. student at the University of Siegen with experience in manufacturing engineering. I write about robotics, manufacturing, controls, and hands-on engineering.": "Masterstudent der Mechatronik an der Universität Siegen mit Erfahrung im Fertigungsingenieurwesen. Ich schreibe über Robotik, Fertigung, Regelungstechnik und praktische Ingenieurarbeit.",
  "More about me": "Mehr über mich",
};

const originalFixedCopy = new WeakMap();

function translateFixedPageCopy(language) {
  // Do not translate any content in individual blog articles or generated blog cards.
  const isBlogArticle = /\/blogs\/[^/]+\.html$/i.test(window.location.pathname);
  const translatableElements = document.querySelectorAll(
    "main h1:not([data-i18n]), main h2:not([data-i18n]), main h3:not([data-i18n]), main h4:not([data-i18n]), main p:not([data-i18n]), main small:not([data-i18n]), main strong:not([data-i18n]), main a:not([data-i18n]), main span:not([data-i18n])",
  );

  translatableElements.forEach((element) => {
    if (isBlogArticle || element.closest(".blog-card, .writing-grid, [data-no-translate]")) return;
    if (!originalFixedCopy.has(element)) originalFixedCopy.set(element, element.innerHTML);

    if (language === "en") {
      element.innerHTML = originalFixedCopy.get(element);
      return;
    }

    const sourceText = element.textContent.replace(/[↗→↓]/g, "").replace(/\s+/g, " ").trim();
    const translatedText = fixedCopyGerman[sourceText];
    if (translatedText) element.innerHTML = translatedText;
  });
}

function setLanguage(language) {
  const dictionary = translations[language];
  if (!dictionary) return;

  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translatedText = dictionary[element.dataset.i18n];
    if (!translatedText) return;

    // Keep decorative arrow/icon spans in buttons and links when changing their labels.
    const icon = element.querySelector(":scope > span");
    if (icon) {
      const firstTextNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (firstTextNode) firstTextNode.textContent = `\n            ${translatedText}\n            `;
    } else {
      element.textContent = translatedText;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const translatedText = dictionary[element.dataset.i18nPlaceholder];
    if (translatedText) element.placeholder = translatedText;
  });

  translateFixedPageCopy(language);

  if (languageToggle) {
    languageToggle.setAttribute("aria-pressed", String(language === "de"));
    languageToggle.setAttribute(
      "aria-label",
      language === "de" ? "Switch language to English" : "Sprache auf Deutsch umstellen",
    );
    languageToggle.title = language === "de" ? "Switch to English" : "Auf Deutsch umstellen";
  }

  window.localStorage.setItem("portfolio-language", language);
}

if (languageToggle) {
  const savedLanguage = window.localStorage.getItem("portfolio-language") || "en";
  setLanguage(savedLanguage);
  languageToggle.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "de" ? "en" : "de";
    setLanguage(nextLanguage);
  });
}

// Persist the reader's light or dark theme between visits.
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = window.localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  pageBody.classList.add("dark");
}

if (themeToggle) {
  themeToggle.textContent = pageBody.classList.contains("dark") ? "☾" : "☼";

  themeToggle.addEventListener("click", () => {
    pageBody.classList.toggle("dark");

    const selectedTheme = pageBody.classList.contains("dark") ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", selectedTheme);
    themeToggle.textContent = selectedTheme === "dark" ? "☾" : "☼";
  });
}

// Open and close the compact navigation menu on small screens.
const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".nav");

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const menuIsOpen = siteNavigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
    menuToggle.setAttribute(
      "aria-label",
      menuIsOpen ? "Close navigation" : "Open navigation",
    );
  });
}

// Show a convenient return-to-top control after the reader scrolls down.
const returnToTopButton = document.querySelector(".to-top");

if (returnToTopButton) {
  window.addEventListener("scroll", () => {
    returnToTopButton.classList.toggle("visible", window.scrollY > 420);
  });

  returnToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Prepare a message in the visitor's email app; this static site has no inbox.
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Portfolio message from ${formData.get("name")}`);
    const message = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
    );
    const statusMessage = document.querySelector("#form-status");

    if (statusMessage) {
      statusMessage.textContent = "Opening your email app…";
    }

    window.location.href = `mailto:aishvaryturkar@gmail.com?subject=${subject}&body=${message}`;
  });
}

// Reveal content as it enters the viewport, respecting reduced-motion settings.
(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  const revealTargets = document.querySelectorAll(
    ".content-section, .project-card, .skill-card, .blog-card, .organization-card, .hobby-card, .cert-card, .photo-card",
  );

  if (!revealTargets.length) return;

  pageBody.classList.add("motion-ready");
  revealTargets.forEach((target) => target.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (observedEntries, observer) => {
      observedEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
})();

// Accessible photo carousel on the About page: manual controls, pause, and autoplay.
(() => {
  const photoCarousel = document.querySelector("[data-photo-carousel]");
  if (!photoCarousel) return;

  const slides = Array.from(photoCarousel.querySelectorAll(".about-slide"));
  const galleryDots = Array.from(photoCarousel.querySelectorAll(".gallery-dot"));
  const currentSlideCounter = photoCarousel.querySelector("[data-gallery-current]");
  const slideshowToggle = photoCarousel.querySelector("[data-carousel-toggle]");

  if (slides.length < 2 || galleryDots.length !== slides.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeSlideIndex = 0;
  let slideshowTimer = null;
  // Respect reduced-motion preferences until the visitor explicitly presses Play.
  let slideshowIsPaused = prefersReducedMotion;
  let slidesToShow = [];

  // Randomize the photos without showing the same photo twice in a cycle.
  function refillRandomPhotos() {
    slidesToShow = slides
      .map((_, index) => index)
      .filter((index) => index !== activeSlideIndex);

    for (let index = slidesToShow.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [slidesToShow[index], slidesToShow[randomIndex]] = [
        slidesToShow[randomIndex],
        slidesToShow[index],
      ];
    }
  }

  function stopSlideshow() {
    if (slideshowTimer) {
      window.clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  }

  function showSlide(index) {
    activeSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlideIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    galleryDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlideIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });

    if (currentSlideCounter) {
      currentSlideCounter.textContent = String(activeSlideIndex + 1).padStart(2, "0");
    }
  }

  function showRandomSlide() {
    if (!slidesToShow.length) refillRandomPhotos();
    showSlide(slidesToShow.pop());
  }

  function startSlideshow() {
    stopSlideshow();

    const shouldWait =
      slideshowIsPaused ||
      document.hidden ||
      (photoCarousel.matches(":focus-within") &&
        !slideshowToggle?.matches(":focus"));

    if (!shouldWait) {
      slideshowTimer = window.setInterval(showRandomSlide, 2500);
    }
  }

  galleryDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      refillRandomPhotos();
      startSlideshow();
    });
  });

  if (slideshowToggle) {
    slideshowToggle.textContent = slideshowIsPaused ? "▶" : "Ⅱ";
    slideshowToggle.setAttribute(
      "aria-label",
      slideshowIsPaused ? "Play photo slideshow" : "Pause photo slideshow",
    );

    slideshowToggle.addEventListener("click", () => {
      slideshowIsPaused = !slideshowIsPaused;
      slideshowToggle.textContent = slideshowIsPaused ? "▶" : "Ⅱ";
      slideshowToggle.setAttribute(
        "aria-label",
        slideshowIsPaused ? "Play photo slideshow" : "Pause photo slideshow",
      );

      if (slideshowIsPaused) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    });
  }

  photoCarousel.addEventListener("focusin", stopSlideshow);
  photoCarousel.addEventListener("focusout", (event) => {
    if (!photoCarousel.contains(event.relatedTarget)) startSlideshow();
  });

  photoCarousel.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? slides.length - 1
          : activeSlideIndex + (event.key === "ArrowRight" ? 1 : -1);

    showSlide(nextIndex);
    refillRandomPhotos();
    galleryDots[activeSlideIndex].focus();
    startSlideshow();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  showSlide(0);
  startSlideshow();
})();

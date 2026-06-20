export interface DemandJob {
  role: string;
  activeAds: number;
  avgSalary: number;
  salaryRange: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  futureOutlook: string;
  requiredSkills: string[];
  educationRequired: string;
  category: string;
}

export const SWEDEN_REGIONS = [
  "Alla platser",
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköpings kommun",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
  "Umeå",
  "Kista",
  "Distans (Sverige)"
];

export const IN_DEMAND_JOBS: DemandJob[] = [
  {
    role: "Mjukvaruutvecklare (Software Developer)",
    activeAds: 5410,
    avgSalary: 52000,
    salaryRange: "38 000 - 75 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växer mycket snabbt till följd av automatisering, molninfrastruktur och AI-lösningar.",
    requiredSkills: ["TypeScript", "React", "Node.js", "Docker", "REST-API:er", "AWS/Azure Cloud"],
    educationRequired: "Kandidatexamen i datavetenskap, YH-examen (Yrkeshögskola) eller motsvarande yrkeserfarenhet.",
    category: "Teknik"
  },
  {
    role: "Systemutvecklare / IT-arkitekt",
    activeAds: 2980,
    avgSalary: 64000,
    salaryRange: "48 000 - 85 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Kritiskt behov när finansiella, statliga nätverk och fordonssystem migrerar till säkra API-baserade modeller.",
    requiredSkills: ["Systemdesign", "Kubernetes", "Mikrotjänster", "Java", "Go", "Enterprise Architecture"],
    educationRequired: "Civilingenjör, högskoleingenjör i datateknik eller 5+ års erfarenhet av systemutveckling.",
    category: "Teknik"
  },
  {
    role: "Datasäkerhetsanalytiker (Cybersecurity Specialist)",
    activeAds: 1240,
    avgSalary: 58000,
    salaryRange: "44 000 - 82 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Oöverträffad efterfrågan driven av regelefterlevnad för NIS2-direktivet, nationell säkerhet och transaktionsskydd.",
    requiredSkills: ["Penetrationstestning", "ISO 27001-protokoll", "Nätverkssäkerhet", "Incidenthantering", "SIEM-verktyg"],
    educationRequired: "Kandidatexamen i cybersäkerhet, YH-utbildning inom IT-säkerhet eller avancerade nätverkscertifieringar (CISSP, CEH).",
    category: "Teknik"
  },
  {
    role: "Data Scientist / AI-ingenjör",
    activeAds: 840,
    avgSalary: 56500,
    salaryRange: "43 000 - 78 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket stark tillväxt i takt med att företag och myndigheter utvecklar egna språkmodeller och prediktiva analyssystem.",
    requiredSkills: ["Python", "TensorFlow", "Pandas", "Maskininlärning", "SQL", "Data Pipelines"],
    educationRequired: "Masterexamen i data science, statistik, tillämpad matematik eller civilingenjörsexamen.",
    category: "Teknik"
  },
  {
    role: "IT-projektledare (IT Project Manager)",
    activeAds: 1560,
    avgSalary: 55000,
    salaryRange: "42 000 - 72 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stort behov av bryggbyggare mellan teknikteam och ledningsgrupper, särskilt i agila transformationer.",
    requiredSkills: ["Scrum / Agile", "Jira", "Projektplanering", "Riskhantering", "Intressenthantering"],
    educationRequired: "Högskoleexamen inom IT eller ekonomi, agila certifieringar (Scrum Master, PRINCE2, PMP).",
    category: "Teknik"
  },
  {
    role: "Front-end utvecklare (Frontend Developer)",
    activeAds: 1940,
    avgSalary: 48000,
    salaryRange: "36 000 - 65 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan då digitala tjänsters användarvänlighet och gränssnitt är avgörande för konkurrenskraften.",
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Git"],
    educationRequired: "2-årig YH-utbildning (Yrkeshögskola) inom Frontend eller motsvarande portfolio.",
    category: "Teknik"
  },
  {
    role: "UX/UI Designer",
    activeAds: 920,
    avgSalary: 45500,
    salaryRange: "34 500 - 60 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Fokus skiftar mot tillgänglighetsanpassning (WCAG) samt komplexa datatäta webbapplikationer.",
    requiredSkills: ["Figma", "Prototyping", "Användartester", "Designsystem", "WCAG-standarder"],
    educationRequired: "Kandidatexamen i interaktionsdesign, kognitionsvetenskap eller YH-utbildning.",
    category: "Teknik"
  },
  {
    role: "Cloud / DevOps Engineer",
    activeAds: 1810,
    avgSalary: 59000,
    salaryRange: "44 000 - 80 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket gynnsam marknad. Företag migrerar kontinuerligt till molnmiljöer och automatiserar CI/CD-flöden.",
    requiredSkills: ["Terraform", "CI/CD (GitHub Actions)", "Docker & Kubernetes", "AWS", "Linux"],
    educationRequired: "Teknisk högskoleexamen eller specialistutbildning från YH inom Cloud Computing.",
    category: "Teknik"
  },
  {
    role: "Nätverks- och Systemadministratör",
    activeAds: 710,
    avgSalary: 41000,
    salaryRange: "32 000 - 55 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stabilt behov. Fokus skiftar från fysiska servrar till hybridmoln och säkra företagslösningar.",
    requiredSkills: ["Active Directory", "Brandväggar", "Cisco Networks", "DNS/DHCP", "Windows Server/Linux"],
    educationRequired: "YH-examen inom nätverksteknik eller certifieringar (CCNA, Network+).",
    category: "Teknik"
  },
  {
    role: "Civilingenjör, bygg (Civil Engineer)",
    activeAds: 1680,
    avgSalary: 54000,
    salaryRange: "40 000 - 78 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stadigt behov fokuserat på infrastruktur, underhåll, transportnav och hållbart miljöbyggande.",
    requiredSkills: ["BIM-koordinering", "AutoCAD", "Strukturella beräkningar", "Miljölagstiftning"],
    educationRequired: "Civilingenjörsexamen eller höggskoleingenjörsexamen inom bygg- och anläggning.",
    category: "Teknik"
  },
  {
    role: "Civilingenjör, maskinteknik (Mechanical Engineer)",
    activeAds: 1110,
    avgSalary: 53100,
    salaryRange: "39 000 - 75 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Hög efterfrågan i fordons- och tillverkningsindustrin för att ställa om till fossilfria drivlinor och maskiner.",
    requiredSkills: ["CAD-konstruktion", "SolidWorks", "Materiallära", "FEM-analys"],
    educationRequired: "Högskoleingenjörs- eller civilingenjörsexamen i maskinteknik.",
    category: "Teknik"
  },
  {
    role: "Civilingenjör, elektroteknik (Electrical Engineer)",
    activeAds: 1340,
    avgSalary: 54900,
    salaryRange: "41 000 - 78 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket hett yrke. Samhällets elektrifiering och moderniseringen av det svenska elnätet kräver djup expertis.",
    requiredSkills: ["Elkraftsystem", "Projektledning", "Matlab", "Förnybar energi"],
    educationRequired: "Civil- eller högskoleingenjörsexamen samt förståelse för kraftöverföring.",
    category: "Teknik"
  },
  {
    role: "Energispecialist / Energiingenjör",
    activeAds: 890,
    avgSalary: 49500,
    salaryRange: "38 000 - 68 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan når fastighetsägare och industri ställer om till energieffektiva och fossilfria energikällor.",
    requiredSkills: ["Energioptimering", "BMS-system", "Värmepumpar", "Miljöcertifiering", "Energieffektivisering"],
    educationRequired: "Civil- eller högskoleingenjörsexamen i energiteknik eller motsvarande YH-utbildning.",
    category: "Teknik"
  },
  {
    role: "Legitimerad Sjuksköterska (Registered Nurse)",
    activeAds: 4890,
    avgSalary: 41500,
    salaryRange: "35 000 - 58 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Betydande inhemskt strukturellt underskott till följd av demografiska förändringar och regionala vårdinsatser.",
    requiredSkills: ["Patientvård", "Akutmedicin", "Svensk medicinsk språkkunskap", "Klinisk diagnostik"],
    educationRequired: "Universitets-/högskoleexamen i omvårdnad samt svensk legitimation (Socialstyrelsen).",
    category: "Hälsa"
  },
  {
    role: "Legitimerad Läkare (Medical Doctor)",
    activeAds: 3120,
    avgSalary: 84000,
    salaryRange: "62 000 - 110 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Akut brist på specialistläkare, särskilt inom allmänmedicin på vårdcentraler och psykiatri i mindre kommuner.",
    requiredSkills: ["Patientkonsultation", "Diagnostik", "Medicinsk behandling", "Journalföring"],
    educationRequired: "Läkarexamen, allmäntjänstgöring (AT) eller bastjänstgöring (BT) samt svensk legitimation och specialistbevis.",
    category: "Hälsa"
  },
  {
    role: "Tandläkare (Dentist)",
    activeAds: 850,
    avgSalary: 56000,
    salaryRange: "45 000 - 72 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Särskilt stor brist inom Folktandvården i glesbygdsregioner, samt ett stadigt generationsskifte.",
    requiredSkills: ["Tandvård", "Kirurgi", "Röntgenanalys", "Patientbemötande"],
    educationRequired: "Tandläkarexamen (5 år) samt svensk yrkeslegitimation från Socialstyrelsen.",
    category: "Hälsa"
  },
  {
    role: "Legitimerad Psykolog (Psychologist)",
    activeAds: 1100,
    avgSalary: 46800,
    salaryRange: "38 000 - 58 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Efterfrågan växer snabbt inom både företagshälsovård, skolsjukvård och den öppna specialistpsykiatrin.",
    requiredSkills: ["KBT (Kognitiv beteendeterapi)", "Psykologisk utredning", "Samtalsterapi", "Crisis Support"],
    educationRequired: "Psykologprogrammet (5 år), ett års praktisk tjänstgöring (PTP) samt legitimation.",
    category: "Hälsa"
  },
  {
    role: "Undersköterska (Assistant Nurse)",
    activeAds: 6200,
    avgSalary: 29500,
    salaryRange: "25 000 - 35 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Sveriges enskilt största bristyrke. En åldrande befolkning gör att behovet av hemtjänst och äldreboenden är enormt.",
    requiredSkills: ["Basal omvårdnad", "Medicindelegering", "Äldreomsorg", "Social dokumentation"],
    educationRequired: "Vård- och omsorgsprogrammet (gymnasieskola eller vuxenutbildning). Skyddad yrkestitel sedan 2023.",
    category: "Hälsa"
  },
  {
    role: "Fysioterapeut / Sjukgymnast",
    activeAds: 550,
    avgSalary: 37500,
    salaryRange: "31 000 - 46 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stadigt behov inom primärvård, äldreomsorg och idrottsmedicin. Förebyggande hälsovård ökar i popularitet.",
    requiredSkills: ["Rehabilitering", "Rörelseanalys", "Ergonomi", "Träningsprogram"],
    educationRequired: "Fysioterapeutprogrammet (3 år) samt yrkeslegitimation.",
    category: "Hälsa"
  },
  {
    role: "Apotekare (Pharmacist)",
    activeAds: 480,
    avgSalary: 48500,
    salaryRange: "38 000 - 62 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Goda jobbmöjligheter på apotekskedjor, inom läkemedelsindustrin och klinisk farmaci på sjukhus.",
    requiredSkills: ["Läkemedelsrådgivning", "Farmakologi", "Kvalitetssäkring", "Recepthantering"],
    educationRequired: "Apotekarprogrammet (5 år) samt yrkeslegitimation.",
    category: "Hälsa"
  },
  {
    role: "Grundskollärare (Primary School Teacher)",
    activeAds: 3120,
    avgSalary: 39000,
    salaryRange: "34 000 - 45 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Konstant hög efterfrågan i snabbväxande kommuner. Mycket stabil tillväxt med fackligt förhandlade karriärsteg.",
    requiredSkills: ["Pedagogik", "Läroplansdesign", "Klassrumsledarskap", "Svenska språkkunskaper"],
    educationRequired: "Lärarlegitimation från ett ackrediterat universitet.",
    category: "Utbildning"
  },
  {
    role: "Gymnasielärare (High School Teacher)",
    activeAds: 1890,
    avgSalary: 42500,
    salaryRange: "36 000 - 49 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Brist på behöriga lärare inom naturvetenskapliga ämnen, matematik och yrkesämnen.",
    requiredSkills: ["Ämnesdidaktik", "Betyg och bedömning", "Klassrumsledarskap", "Digitala lärverktyg"],
    educationRequired: "Ämneslärarutbildning (4,5 - 5 år) samt lärarlegitimation.",
    category: "Utbildning"
  },
  {
    role: "Förskollärare (Pre-school Teacher)",
    activeAds: 2450,
    avgSalary: 34800,
    salaryRange: "31 000 - 39 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stort behov i hela landet för att upprätthålla kvaliteten och den pedagogiska intentionen i svensk förskola.",
    requiredSkills: ["Lekpedagogik", "Barns utveckling", "Föräldrasamverkan", "Värdegrundsarbete"],
    educationRequired: "Förskollärarprogrammet (3,5 år) samt legitimation.",
    category: "Utbildning"
  },
  {
    role: "Specialpedagog (Special Education Teacher)",
    activeAds: 720,
    avgSalary: 45000,
    salaryRange: "39 000 - 52 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Skolans behov av extra anpassningar och tidiga insatser ger legitimerade specialpedagoger ett utmärkt utgångsläge.",
    requiredSkills: ["Pedagogisk utredning", "Handledning", "Anpassat lärmaterial", "Elevhälsa"],
    educationRequired: "Lärarutbildning samt påbyggnadsprogram till specialpedagog eller speciallärare.",
    category: "Utbildning"
  },
  {
    role: "Elektriker (Electrician)",
    activeAds: 1850,
    avgSalary: 38200,
    salaryRange: "31 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Drivs på av den gröna omställningen, smarta elnät, solcellsinstallationer samt laddinfrastruktur för elbilar.",
    requiredSkills: ["Felsökning", "Säkerhetsrutiner", "Kopplingsscheman", "Svensk elstandard (Elarbetstagare)"],
    educationRequired: "Gymnasieskolans el- och energiprogram eller fullföljt lärlingsprogram (ECY-certifierad).",
    category: "Säkerhet / Logistik"
  },
  {
    role: "VVS-montör (Plumber)",
    activeAds: 1420,
    avgSalary: 39100,
    salaryRange: "32 000 - 49 050 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Goda utsikter till följd av omfattande renoveringar av flerbostadshus, energieffektivisering samt nybygge.",
    requiredSkills: ["Rördragning", "Svetsteknik", "Ritningsläsning", "Värmepumpar & Fjärrvärme"],
    educationRequired: "VVS- och fastighetsprogrammet samt lärlingstid (VVS-branschens yrkesnämnd).",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Svetsare (Welder)",
    activeAds: 960,
    avgSalary: 32400,
    salaryRange: "27 000 - 41 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan inom svensk verkstadsindustri, fordonsindustri och infrastrukturprojekt.",
    requiredSkills: ["TIG/MIG/MAG-svetsning", "Ritningsläsning", "Metallarbeten", "Kvalitetskontroll"],
    educationRequired: "Gymnasial industriteknisk utbildning eller vuxenutbildning samt internationella svetsarprövningsintyg.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "CNC-operatör (Machinist)",
    activeAds: 880,
    avgSalary: 33800,
    salaryRange: "28 000 - 43 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Finmekaniska svenska exportföretag digitaliserar sin tillverkning, vilket kräver kompetenta programmerare av industrimaskiner.",
    requiredSkills: ["CNC-programmering", "Cad/Cam", "Mätverktyg", "Ritningsförståelse"],
    educationRequired: "Industriteknisk inriktning eller specialistutbildning inom skärande bearbetning.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Träarbetare / Snickare (Carpenter)",
    activeAds: 1150,
    avgSalary: 35600,
    salaryRange: "29 000 - 44 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Kopplat till konjunkturen i byggsektorn, men renoveringsbehov, träbyggnadsinitiativ och ombyggnationer håller uppe suget.",
    requiredSkills: ["Träkonstruktion", "Ritningsläsning", "Monteringsarbeten", "Verktygshantering"],
    educationRequired: "Gymnasieskolans bygg- och anläggningsprogram samt yrkesteoretisk utbildning och lärlingstimmar för yrkesbevis.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Lastbilschaufför (Truck Driver)",
    activeAds: 2210,
    avgSalary: 31900,
    salaryRange: "26 500 - 39 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Svensk e-handel och industri kräver kontinuerliga tunga transporter. Mycket goda chanser till direkt anställning.",
    requiredSkills: ["C/CE-körkort", "YKB", "Lastsäkring", "Körekonomi"],
    educationRequired: "Yrkesförarutbildning på gymnasienivå eller godkänd vuxenutbildning (Komvux).",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Lagerarbetare (Warehouse Worker)",
    activeAds: 3400,
    avgSalary: 29200,
    salaryRange: "24 000 - 34 500 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Hög ruljans och nyanställningstakt på grund av automatiserade distributionscentraler och logistikparker.",
    requiredSkills: ["Truckkort (A+B)", "Orderplock", "WMS-system", "Logistikflöden"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs normalt. Truckkort är meriterande.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Väktare / Skyddsvakt",
    activeAds: 640,
    avgSalary: 30500,
    salaryRange: "25 000 - 36 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växande behov av säkerhet och rondering i offentliga lokaler, köpcentrum och på industrianläggningar.",
    requiredSkills: ["Konflikthantering", "Hjärt-lungräddning", "Bevakning", "Rapportering"],
    educationRequired: "Godkänd väktarutbildning (VU1 & VU2) via auktoriserat utbildningsföretag.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Kock (Chef)",
    activeAds: 2240,
    avgSalary: 33000,
    salaryRange: "26 000 - 42 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stark återhämtning i den gastronomiska sektorn. Hög säsongsefterfrågan i Stockholm, Göteborg och fjällvärlden.",
    requiredSkills: ["Kulinarisk konst", "HACCP-livsmedelssäkerhet", "Menykalkylering", "Kökskoordinering"],
    educationRequired: "Yrkesutbildning inom restaurang eller dokumenterad erfarenhet från professionella kök.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Revisor (Auditor / Accountant)",
    activeAds: 1210,
    avgSalary: 47500,
    salaryRange: "34 000 - 68 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stabilt behov. Skärpta regler för penningtvätt och finansiell transparens ökar behovet av kvalificerad granskning.",
    requiredSkills: ["Bokföring", "Koncerndeklaration", "Skatterätt", "Financial Reporting", "Analysförmåga"],
    educationRequired: "Kandidatexamen i ekonomi samt facklig auktorisation från Revisorsinspektionen.",
    category: "Ekonomi"
  },
  {
    role: "Finansanalytiker (Financial Analyst)",
    activeAds: 550,
    avgSalary: 58500,
    salaryRange: "44 000 - 88 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Eftertraktat inom storbanker, investmentbolag och större koncerner för riskhantering och kapitalplacering.",
    requiredSkills: ["Excel", "Finansiell modellering", "Företagsvärdering", "Makroanalys"],
    educationRequired: "Civilekonom eller master i finansiell ekonomi.",
    category: "Ekonomi"
  },
  {
    role: "HR-partner / Personalspecialist",
    activeAds: 1150,
    avgSalary: 42000,
    salaryRange: "33 000 - 58 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Fokus ligger på Employer Branding, kompetensförsörjning samt arbetsrättslig rådgivning i hybridarbetskulturen.",
    requiredSkills: ["Arbetsrätt (LAS/MBL)", "Rekrytering", "Fackliga förhandlingar", "Rehabprocesser"],
    educationRequired: "Kandidatexamen inom personal- och arbetslivsfrågor (PA-programmet) eller motsvarande.",
    category: "Ekonomi"
  },
  {
    role: "Ekonomichef (CFO / Financial Controller)",
    activeAds: 430,
    avgSalary: 68500,
    salaryRange: "50 000 - 105 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Goda chanser för seniora ekonomer med erfarenhet av strategisk styrning och digitaler BI-verktyg.",
    requiredSkills: ["Budgetering", "BI-verktyg", "Strategisk planering", "Konstruktiv analys"],
    educationRequired: "Magisterexamen i ekonomi samt minst 5-10 års relevant ledarskapserfarenhet.",
    category: "Ekonomi"
  },
  {
    role: "Jurist (Legal Counsel / Lawyer)",
    activeAds: 880,
    avgSalary: 51200,
    salaryRange: "38 000 - 85 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Goda möjligheter inom affärsjuridik, GDPR/integritetsskydd och offentlig förvaltning.",
    requiredSkills: ["Avtalsrätt", "GDPR", "Svensk lagstiftning", "Förhandlingsteknik"],
    educationRequired: "Juristexamen (Master of Laws, LL.M. på 4,5 år) från svenskt universitet.",
    category: "Ekonomi"
  },
  {
    role: "Socionom (Social Worker)",
    activeAds: 1980,
    avgSalary: 40100,
    salaryRange: "33 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stor brist inom kommunala verksamheter, speciellt inom barn- och ungdomsutredningar samt biståndshandläggning.",
    requiredSkills: ["Sociallagstiftning", "Myndighetsutövning", "Krisstöd", "Dokumentation"],
    educationRequired: "Socionomexamen (3,5 år). En stark grund för välfärdsarbete.",
    category: "Ekonomi"
  },
  {
    role: "Företagssäljare / Key Account Manager",
    activeAds: 2850,
    avgSalary: 44000,
    salaryRange: "32 000 - 75 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Företag söker ständigt drivande säljare. B2B-försäljning av molntjänster och tekniska lösningar växer mest.",
    requiredSkills: ["B2B-försäljning", "CRM", "Kundvård", "Affärsförhandling"],
    educationRequired: "YH-examen inom B2B-försäljning, säljutbildning eller dokumenterat framgångsrik säljhistorik.",
    category: "Ekonomi"
  }
];

export const INITIAL_USER_PROFILE = {
  fullName: "Sven Johansson",
  targetRole: "Software Developer",
  targetLocation: "Stockholm",
  email: "sven.johansson@example.se",
  phone: "+46 70 123 45 67",
  languages: "Svenska (Modersmål), Engelska (Flytande)",
  skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Git", "REST-API:er", "SQL"],
  education: "Högskoleexamen i Systemutveckling (2 år), Yrkeshögskola (YH) Göteborg",
  certifications: "Scrum Master (PSM I), AWS Cloud Practitioner (Pågående)",
  driverLicenses: ["B-Körkort (Personbil)"],
  experience: "Juniorutvecklare på TechHub Göteborg (2024-2026). Utvecklade dashboard-gränssnitt och integrerade webhooks.\nPraktikant på Retail SE (2023). Integrerade betalningsformulär.",
  interests: "Modern frontend-tillståndshantering, server-side ramverk (Next.js/Express), molnautomatisering, grön teknik.",
  cvText: "Sven Johansson. Erfaren frontend-utvecklare som söker en roll i Sverige. Kompetenser: React, JavaScript, HTML, CSS, REST-API:er, TypeScript, Git. Erfarenhet: Juniorutvecklare i 2 år. Professionellt fokus på webbutveckling och molnbaserade system."
};

export const TRENDS_SWEDEN = {
  overallMarketState: "Positivt för teknik och specialistyrken. Växande fokus på AI-integration, hållbarhetsinitiativ och direktrekrytering via Yrkeshögskola (YH).",
  topSectors: [
    { name: "Informationsteknik (IT)", averageSalary: "54 200 SEK", vacanciesCount: 8200, demandState: "Hög" },
    { name: "Sjukvård & Omsorg", averageSalary: "41 000 SEK", vacanciesCount: 11500, demandState: "Mycket hög" },
    { name: "Hantverk & Byggteknik", averageSalary: "38 500 SEK", vacanciesCount: 5100, demandState: "Hög" },
    { name: "Utbildning", averageSalary: "39 500 SEK", vacanciesCount: 6800, demandState: "Hög" }
  ],
  salaryInsightsText: "Lönerna i Sverige påverkas i hög grad av Kollektivavtal (samarbetsavtal mellan fackförbund som Unionen, Sveriges Ingenjörer och arbetsgivare). Anställningen inkluderar vanligtvis Tjänstopension (pensionsavsättningar på 4,5 % - 30 %), fasta lönetrappor och generös föräldralön.",
  keyGrowthDrivers: [
    "Omfattande satsningar på grön energi och batteritillverkning i norra Sverige (Skellefteå, Boden).",
    "Digitalisering av offentliga myndigheter (Arbetsförmedlingen, Skatteverket) vilket kräver fler säkerhetsingenjörer.",
    "Snabb automatisering och intelligent maskinteknik hos ledande bolag (Volvo Group, Scania, ABB)."
  ]
};

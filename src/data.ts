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

export const BASE_IN_DEMAND_JOBS: DemandJob[] = [
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

import { EXPANDED_EXTRA_JOBS } from "./data_all_jobs";

export const NEW_INDUSTRIES_SHORTAGE_JOBS: DemandJob[] = [
  // 1. Bygg & Anläggning
  {
    role: "Snickare (Carpenter)",
    activeAds: 1450,
    avgSalary: 36500,
    salaryRange: "30 000 - 45 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stort behov av behöriga snickare för både bostadsbyggande och renoveringsprojekt i hela landet.",
    requiredSkills: ["Träkonstruktion", "Ritningsläsning", "Verktygsvana Layout", "Byggregler (PBL/BBR)", "Måttagning"],
    educationRequired: "Gymnasial byggutbildning eller vuxenutbildning följt av lärlingstid för yrkesbevis.",
    category: "Bygg & Anläggning"
  },
  {
    role: "Elektriker (Electrician)",
    activeAds: 1890,
    avgSalary: 38200,
    salaryRange: "31 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket stark efterfrågan med koppling till omställningen av elnät, solceller och elbilsladdning.",
    requiredSkills: ["Elinstallation", "Kopplingsschema", "Elsäkerhetslagen", "Felsökning", "Kabeldragning"],
    educationRequired: "Gymnasieskolans el- och energiprogram eller Komvux, samt godkänd lärlingstid.",
    category: "Bygg & Anläggning"
  },
  {
    role: "VVS-montör (Plumber)",
    activeAds: 1150,
    avgSalary: 39000,
    salaryRange: "32 000 - 46 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Ständig efterfrågan inom energieffektivisering, stambyten och nyinstallation av värmepumpar.",
    requiredSkills: ["Rördragning", "Värmepumpar & Sanitet", "Ritningsläsning", "Svetsning", "Säker Vatten-installation"],
    educationRequired: "Gymnasial VVS-utbildning eller certifierad yrkesutbildning samt avklarad gesäll/lärlingsperiod.",
    category: "Bygg & Anläggning"
  },
  {
    role: "Byggingenjör (Civil Engineer)",
    activeAds: 980,
    avgSalary: 44500,
    salaryRange: "36 500 - 58 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Kritiskt behov av projektledare och konstruktörer för infrastruktur och komplexa byggprojekt.",
    requiredSkills: ["Byggprojektledning", "CAD / BIM", "Entreprenadrätt", "Kalkylering", "Miljöcertifiering"],
    educationRequired: "Högskoleingenjör (3 år) eller civilingenjör i byggteknik, alternativt kvalificerad YH-utbildning.",
    category: "Bygg & Anläggning"
  },
  {
    role: "Anläggningsarbetare (Civil Construction Worker)",
    activeAds: 1200,
    avgSalary: 35000,
    salaryRange: "28 500 - 41 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stora infrastruktursatsningar på järnväg och vägar skapar ett ihållande behov av anläggningsarbetare.",
    requiredSkills: ["Markarbete", "Ritningstolkning", "Rörläggning", "Maskinkörning", "Asfaltering"],
    educationRequired: "Bygg- och anläggningsprogrammet på gymnasiet, yrkesvux eller motsvarande dokumenterad kompetens.",
    category: "Bygg & Anläggning"
  },

  // 2. Industri & Tillverkning
  {
    role: "CNC-operatör (CNC Operator)",
    activeAds: 850,
    avgSalary: 34200,
    salaryRange: "28 000 - 41 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan inom verkstadsindustrin. Kunskaper i programmering och ritningsläsning är avgörande.",
    requiredSkills: ["CNC-programmering", "Svarvning & Fräsning", "Mätteknik", "Ritningsläsning", "Kvalitetskontroll"],
    educationRequired: "Industritekniska programmet på gymnasienivå, Komvux eller YH-utbildning med CNC-inriktning.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Processoperatör (Process Operator)",
    activeAds: 920,
    avgSalary: 37000,
    salaryRange: "30 000 - 46 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växande behov inom kemisk industri, pappersbruk och den nya gröna batteritillverkningen i norr.",
    requiredSkills: ["Processövervakning", "Felsökning", "Systemkontroll (SCADA)", "Underhållsteknik", "Säkerhetsrutiner"],
    educationRequired: "Gymnasial industriteknisk utbildning eller YH-utbildning inom processteknik.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Industrimontör (Assembler)",
    activeAds: 1400,
    avgSalary: 31500,
    salaryRange: "26 000 - 38 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Viktig roll inom fordonstillverkning och mekanisk industri. Förmåga att jobba i team värderas högt.",
    requiredSkills: ["Monteringsteknik", "Verktygshantering", "Kvalitetssäkring (LEAN)", "Ritningsförståelse", "Lagarbete"],
    educationRequired: "Internutbildning, gymnasial el/industriteknisk inriktning eller introduktionsutbildning.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Produktionstekniker (Production Engineer)",
    activeAds: 750,
    avgSalary: 42500,
    salaryRange: "34 000 - 52 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Företag optimerar produktionen genom LEAN och automatisering vilket kräver kvalificerade produktionstekniker.",
    requiredSkills: ["LEAN Manufacturing", "Produktionsoptimering", "CAD / BIM", "Automation", "Riskbedömning"],
    educationRequired: "Högskoleexamen eller YH-examen inom produktionsteknik, industriell ekonomi eller maskinteknik.",
    category: "Industri & Tillverkning"
  },

  // 3. Försäljning & Marknadsföring
  {
    role: "Säljare (Sales Representative)",
    activeAds: 2200,
    avgSalary: 33000,
    salaryRange: "25 000 - 45 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Konstant behov inom både B2B och konsumentförsäljning med inriktning mot rådgivande försäljning.",
    requiredSkills: ["Försäljningsteknik", "Kundkontakt", "Förhandling", "Målmedvetenhet", "Säljpresentationer"],
    educationRequired: "Gymnasial utbildning och personlig fallenhet, eller certifierad säljutbildning.",
    category: "Försäljning & Marknadsföring"
  },
  {
    role: "Account Manager (Key Accounts)",
    activeAds: 1850,
    avgSalary: 43000,
    salaryRange: "32 000 - 68 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Viktig roll för att behålla och utveckla kundrelationer hos tillväxtföretag, särskilt inom tjänste- och IT-sektorn.",
    requiredSkills: ["Kundvård (CRM)", "B2B-försäljning", "Affärsmannaskap", "Avtalsförhandling", "Strategisk planering"],
    educationRequired: "YH-examen eller högskoleutbildning inom företagsekonomi, försäljning eller marknadsföring.",
    category: "Försäljning & Marknadsföring"
  },
  {
    role: "Marknadsförare (Marketer)",
    activeAds: 950,
    avgSalary: 38500,
    salaryRange: "30 000 - 52 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Varumärkesbyggande och strategisk positionering är avgörande för företags överlevnad och kundtillväxt.",
    requiredSkills: ["Varumärkesstrategi", "Marknadsanalys", "Projektledning", "Copywriting", "Kampanjplanering"],
    educationRequired: "Kandidatexamen i medie- och kommunikationsvetenskap, marknadsföring eller motsvarande.",
    category: "Försäljning & Marknadsföring"
  },
  {
    role: "Digital marknadsförare (Digital Marketer)",
    activeAds: 1250,
    avgSalary: 39200,
    salaryRange: "31 000 - 55 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Extremt stort behov av specialister på sökmotoroptimering, Google Ads och datadriven marknadsföring.",
    requiredSkills: ["SEO / SEM", "Google Analytics", "Sociala Medier", "Innehållsproduktion", "Datadriven optimering"],
    educationRequired: "YH-utbildning i digital marknadsföring (t.ex. Berghs, Medieinstitutet, Hyper Island) eller kandidatexamen.",
    category: "Försäljning & Marknadsföring"
  },

  // 4. Service & Handel
  {
    role: "Butikssäljare (Store Associate)",
    activeAds: 3100,
    avgSalary: 27500,
    salaryRange: "22 000 - 33 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Trots e-handeln behövs duktiga säljare som ger personlig service och lyfter köperfarenheten i butiker.",
    requiredSkills: ["Kundservice", "Kassahantering", "Produktkännedom", "Merförsäljning", "Butiksvård (Merchandising)"],
    educationRequired: "Slutförd gymnasieutbildning, meriterande med handel- och administrationsutbildning.",
    category: "Service & Handel"
  },
  {
    role: "Kundtjänstmedarbetare (Customer Service)",
    activeAds: 2450,
    avgSalary: 28200,
    salaryRange: "23 000 - 34 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växande behov av digital support och professionellt kundbemötande i alla tjänstebaserade företag.",
    requiredSkills: ["Kommunikation", "Problemlösning", "Ärendehantering", "Telefonsupport", "Digitala verktyg"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. God språklig förmåga är avgörande.",
    category: "Service & Handel"
  },
  {
    role: "Inköpare (Buyer / Procurement)",
    activeAds: 1050,
    avgSalary: 41200,
    salaryRange: "33 000 - 55 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Fokus på hållbara leverantörskedjor och kostnadskontroll driver behovet av skickliga taktiska inköpare.",
    requiredSkills: ["Strategiskt inköp", "Leverantörsförhandling", "Logistik", "Kostnadsanalys", "Avtalshantering"],
    educationRequired: "Högskoleexamen inom ekonomi/logistik, eller YH-utbildning till internationell inköpare.",
    category: "Service & Handel"
  },
  {
    role: "Butikschef (Store Manager)",
    activeAds: 890,
    avgSalary: 37500,
    salaryRange: "30 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Sökes brett inom sällanköpshandeln och dagligvaruhandeln för att driva försäljning och leda retailteam.",
    requiredSkills: ["Butiksledning", "Personalansvar", "Ekonomistyrning & Budget", "Retail Merchandising", "Schemaläggning"],
    educationRequired: "Gymnasial utbildning och säljerfarenhet, gärna ledarskapsprogram eller YH-examen i butiksledning.",
    category: "Service & Handel"
  },

  // 5. Hotell, Restaurang & Turism
  {
    role: "Kock (Chef)",
    activeAds: 2150,
    avgSalary: 31000,
    salaryRange: "26 000 - 41 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Akut och ihållande brist på erfaren och utbildad kökspersonal i restauranger och storkök i hela Sverige.",
    requiredSkills: ["Matlagning", "Livsmedelshygien (HACCP)", "Menyplanering", "Köksekonomi", "Köksledning"],
    educationRequired: "Restaurang- och livsmedelsprogrammet på gymnasiet eller motsvarande vuxenutbildning.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Servitör / Servitris (Waiter / Waitress)",
    activeAds: 1650,
    avgSalary: 27200,
    salaryRange: "21 000 - 33 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket stor efterfrågan inför säsongstoppar och i större städer. Servicekänsla och flexibilitet är viktigt.",
    requiredSkills: ["Gästbemötande", "Serveringsteknik", "Matsalslogistik", "Kassasystem", "Mat & dryckeskombination"],
    educationRequired: "Gymnasial utbildning, internutbildning eller restaurangskola är meriterande.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Hotellreceptionist (Hotel Receptionist)",
    activeAds: 780,
    avgSalary: 28500,
    salaryRange: "23 000 - 35 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Efterfrågas stadigt. Språkkunskaper och administrationsförmåga värderas högt.",
    requiredSkills: ["Front Office system (Opera)", "Gästservice", "Bokningshantering", "Språkkunskaper", "Betalningshantering"],
    educationRequired: "Utbildning inom hotell och turism på gymnasie- eller YH-nivå är föredraget.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Turistguide (Tour Guide)",
    activeAds: 420,
    avgSalary: 26500,
    salaryRange: "20 500 - 32 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Säsongsbetonat men starkt växande behov inom ekoturism, vildmarksäventyr och kulturguidning i Sverige.",
    requiredSkills: ["Guidesteknik", "Kultur-, natur- och lokalhistoria", "Säkerhetsmedvetande", "Engelska & andra språk", "Retorik"],
    educationRequired: "Guideutbildning via YH, folkhögskola eller lokal guidecertifiering.",
    category: "Hotell, Restaurang & Turism"
  },

  // 6. Transport
  {
    role: "Lastbilschaufför (Truck Driver)",
    activeAds: 2950,
    avgSalary: 33800,
    salaryRange: "28 000 - 39 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stort och akut behov av yrkesförare med tunga körkort. Logistikbranschen snurrar dygnet runt.",
    requiredSkills: ["CE-körkort", "YKB (Yrkeskompetensbevis)", "Lastsäkring", "Färdskrivarregler", "Eco-Driving"],
    educationRequired: "Yrkesförarutbildning på gymnasienivå eller Komvux, gällande YKB samt relevanta behörigheter.",
    category: "Transport"
  },
  {
    role: "Bussförare (Bus Driver)",
    activeAds: 1450,
    avgSalary: 32500,
    salaryRange: "27 000 - 36 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Det kollektiva resandet växer och pensionsavgångar ger god arbetstrygghet för behöriga bussförare.",
    requiredSkills: ["D-Körkort", "Kundservice", "YKB", "Säker framföring", "Linjekörning"],
    educationRequired: "Komvux, arbetsmarknadsutbildning eller YH, D-körkort och yrkeskompetensbevis (YKB).",
    category: "Transport"
  },
  {
    role: "Lokförare (Train Driver)",
    activeAds: 650,
    avgSalary: 42000,
    salaryRange: "35 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan på lokförare för både gods- och persontrafik då tåg ses som framtidens miljöval.",
    requiredSkills: ["Tågframföring", "Signal- och säkerhetssystem", "Felsökning", "Säkerhetsmedvetande", "Kommunikation"],
    educationRequired: "Kvalificerad 1-årig yrkeshögskoleutbildning (YH) till lokförare, inklusive medicinskt godkännande.",
    category: "Transport"
  },
  {
    role: "Transportledare / Transport Planner",
    activeAds: 850,
    avgSalary: 39500,
    salaryRange: "32 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växande krav på snabba leveranser ökar trycket på logistikkoordinatorer och transportledare.",
    requiredSkills: ["Transportplanering", "Logistikflöden", "Ruttoptimering", "TMS-system", "Problemlösning"],
    educationRequired: "YH- eller högskoleutbildning inom logistik/transportplanering, eller tidigare förarerfarenhet.",
    category: "Transport"
  },

  // 7. Juridik & Offentlig Förvaltning
  {
    role: "Statsvetare (Political Scientist)",
    activeAds: 240,
    avgSalary: 42800,
    salaryRange: "34 000 - 58 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stadigt behov inom statliga myndigheter, regioner, kommuner och internationella organisationer för utredning och analys.",
    requiredSkills: ["Statsvetenskap", "Politisk analys", "Offentlig förvaltning", "Kvantitativ metod", "Kvalitativ utredning", "Omvärldsanalys", "Rapportskrivande"],
    educationRequired: "Kandidatexamen eller masterexamen i statsvetenskap, freds- och konfliktkunskap eller offentlig förvaltning.",
    category: "Juridik & Offentlig Förvaltning"
  },
  {
    role: "Jurist (Legal Counsel)",
    activeAds: 910,
    avgSalary: 49000,
    salaryRange: "38 000 - 75 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stor efterfrågan inom upphandling, affärsjuridik och offentlig förvaltning för att tolka ständigt ny lagstiftning.",
    requiredSkills: ["Svensk lagstiftning", "Avtalsrätt", "Juridisk analys", "Rådgivning", "Förhandling"],
    educationRequired: "Juristprogrammet (4,5 år) vid svenskt universitet för fullständig juristexamen (LL.M.).",
    category: "Juridik & Offentlig Förvaltning"
  },
  {
    role: "Offentlig Handläggare (Case Officer)",
    activeAds: 1400,
    avgSalary: 36000,
    salaryRange: "29 000 - 45 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Statliga och kommunala myndigheter söker ständigt utredare och handläggare för regelefterlevnad.",
    requiredSkills: ["Myndighetsutövning", "Ärendehantering", "Kommunal-/förvaltningsrätt", "Skriftlig framställning", "Utredningsmetodik"],
    educationRequired: "Kandidatexamen i statsvetenskap, offentlig förvaltning, juridik eller personalvetenskap.",
    category: "Juridik & Offentlig Förvaltning"
  },
  {
    role: "Administratör (Administrator)",
    activeAds: 1800,
    avgSalary: 31000,
    salaryRange: "24 000 - 38 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stabilt behov av ordningsamma administratörer för att stötta kärnverksamheten inom privat och offentlig sektor.",
    requiredSkills: ["Dokumenthantering", "Kontorsprogramvaror", "Koordinering", "Mötesprotokoll", "Servicebemötande"],
    educationRequired: "Gymnasial utbildning inom ekonomi/administration, meriterande med relevant YH-utbildning.",
    category: "Juridik & Offentlig Förvaltning"
  },
  {
    role: "Utredare / Analytiker (Investigator)",
    activeAds: 750,
    avgSalary: 43800,
    salaryRange: "35 000 - 58 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Myndigheter och större organisationer behöver kvalificerade undersökningar inom brottsförebyggande eller socioekonomiska områden.",
    requiredSkills: ["Kvantitativ/kvalitativ analys", "Rapportskrivande", "Datainsamling", "Omvärldsbevakning", "Projektledning"],
    educationRequired: "Universitetsexamen på avancerad nivå, t.ex. statsvetenskap, sociologi, ekonomi, kriminologi.",
    category: "Juridik & Offentlig Förvaltning"
  },

  // 8. Media & Kreativa Yrken
  {
    role: "Grafisk formgivare (Graphic Designer)",
    activeAds: 650,
    avgSalary: 35500,
    salaryRange: "27 000 - 48 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Konkurrensen är tuff, men formgivare med stark digital portfolio och färdigheter i rörlig grafik är attraktiva.",
    requiredSkills: ["Adobe Creative Suite (InDesign/Illustrator/Photoshop)", "Branding & Visuell Identitet", "Vektorgrafik", "Layoutdesign", "Motion Graphics"],
    educationRequired: "Eftergymnasial designutbildning (t.ex. Beckmans, HDK, Hyper Island) eller stark portfolio.",
    category: "Media & Kreativa Yrken"
  },
  {
    role: "Fotograf (Photographer)",
    activeAds: 280,
    avgSalary: 31000,
    salaryRange: "22 000 - 45 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "De flesta fotografer driver eget företag. Behovet ökar inom e-handel (produktbilder) och sociala medier (video).",
    requiredSkills: ["Ljus- och kamerateknik", "Bildredigering (Lightroom/Photoshop)", "Videoproduktion", "Visuell komposition", "Frilanskunskap"],
    educationRequired: "Fotoutbildning från folkhögskola, yrkeshögskola eller konstnärlig högskola.",
    category: "Media & Kreativa Yrken"
  },
  {
    role: "Journalist (Journalist)",
    activeAds: 350,
    avgSalary: 36500,
    salaryRange: "28 000 - 46 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Behovet av kritiska granskningar och välformulerad nyhetsrapportering håller i sig, särskilt inom digitaler kanaler.",
    requiredSkills: ["Källkritik & Granskning", "Nyhetsskrivande", "Intervjuteknik", "SEO-skrivande", "Podd & Ljudproduktion"],
    educationRequired: "Högskoleutbildning (Journalisthögskolan) eller folkhögskoleutbildning i journalistik.",
    category: "Media & Kreativa Yrken"
  },
  {
    role: "UX/UI Specialist (User Experience Designer)",
    activeAds: 920,
    avgSalary: 45500,
    salaryRange: "35 000 - 62 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stort fokus på digital tillgänglighet och konvertering gör UX-kompetens oumbärlig i alla produktteam.",
    requiredSkills: ["Figma / Axure", "Användartester", "Wireframing", "Målgruppsanalys", "UX-research"],
    educationRequired: "YH-examen eller kandidatexamen inom människa-datorinteraktion, kognitionsvetenskap eller interaktionsdesign.",
    category: "Media & Kreativa Yrken"
  },
  {
    role: "Spelutvecklare (Game Developer)",
    activeAds: 810,
    avgSalary: 47000,
    salaryRange: "33 000 - 65 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Den svenska spelindustrin (Stockholm, Skövde, Malmö) är världsledande och letar ständigt efter utvecklare.",
    requiredSkills: ["C++ / C#", "Unity / Unreal Engine", "Spelmekanik", "3D-grafik", "Skuggning (Shaders)"],
    educationRequired: "Specialiserad spelutvecklingsutbildning (t.ex. The Game Assembly, Futuregames) eller datateknikutbildning.",
    category: "Media & Kreativa Yrken"
  },

  // 9. Naturbruk & Miljö
  {
    role: "Lantbrukare (Farmer)",
    activeAds: 340,
    avgSalary: 31000,
    salaryRange: "24 000 - 38 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Efterfrågan på lokalproducerad mat och teknologisk omställning inom jordbruket ökar rekryteringsbehoven.",
    requiredSkills: ["Djurhållning / Odling", "Maskinkörning (Traktor)", "Driftsekonomi", "Tekniskt underhåll", "Miljöhänsyn"],
    educationRequired: "Naturbruksgymnasium eller högre utbildning vid SLU (Sveriges Lantbruksuniversitet).",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Skogsmaskinförare (Forestry Operator)",
    activeAds: 480,
    avgSalary: 33500,
    salaryRange: "27 000 - 39 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Efterfrågan på biobränsle och svensk skogsråvara gör skotarförare och skördarförare mycket eftertraktade.",
    requiredSkills: ["Skotare / Skördare", "Skogsskötsel", "GPS/Navigering", "Maskintekniskt underhåll", "Miljöhänsyn"],
    educationRequired: "Naturbruksprogrammet med skoglig inriktning eller yrkesutbildning för vuxna.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Miljövetare (Environmental Scientist)",
    activeAds: 620,
    avgSalary: 38900,
    salaryRange: "31 000 - 49 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket goda möjligheter som konsulter och miljöinspektörer inom kommunal tillsyn och industriell miljörevision.",
    requiredSkills: ["Miljölagstiftning (Miljöbalken)", "Provtagning & Markanalys", "Miljökonsekvensbeskrivning (MKB)", "GIS-kartor", "Hållbarhetsanalys"],
    educationRequired: "Kandidat- eller masterexamen i miljövetenskap, biologi eller miljö- och hälsoskydd.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Hållbarhetsspecialist (Sustainability Specialist)",
    activeAds: 840,
    avgSalary: 46000,
    salaryRange: "36 000 - 64 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Företag rustar kraftigt för nya EU-direktiv om hållbarhetsrapportering (CSRD), vilket ger hög efterfrågan.",
    requiredSkills: ["CSRD & ESG-rapportering", "Växthusgasberäkningar (GHG Protocol)", "Livscykelanalys (LCA)", "Cirkulär ekonomi", "Strategiskt förändringsarbete"],
    educationRequired: "Akademisk examen inom hållbar utveckling, miljöekonomi, civilingenjör med miljöfokus eller motsvarande YH.",
    category: "Naturbruk & Miljö"
  },

  // 10. Omsorg & Socialt Arbete
  {
    role: "Undersköterska (Assistant Nurse)",
    activeAds: 4850,
    avgSalary: 29200,
    salaryRange: "24 550 - 34 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "En av Sveriges absolut största bristgrupper. Nu en skyddad yrkestitel med stor trygghet och bred efterfrågan.",
    requiredSkills: ["Patientvård & Omvårdnad", "Medicinsk dokumentation", "Läkemedelshantering", "Hygienrutiner", "Hjärt-lungräddning (HLR)"],
    educationRequired: "Vård- och omsorgsprogrammet på gymnasienivå, Komvux eller godkänd yrkeshögskola.",
    category: "Omsorg & Socialt Arbete"
  },
  {
    role: "Socialsekreterare (Social Case Worker)",
    activeAds: 1980,
    avgSalary: 40100,
    salaryRange: "33 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Ihängande brist inom kommunal socialtjänst för att arbeta med barn, unga eller vuxna.",
    requiredSkills: ["Sociallagstiftning (SoL/LVU/LVM)", "Myndighetsutövning", "Utredningsmetodik (BBIC)", "Krisstöd", "Dokumentation"],
    educationRequired: "Socionomexamen (3,5 år) från svenskt universitet eller högskola.",
    category: "Omsorg & Socialt Arbete"
  },
  {
    role: "Behandlingsassistent (Care Assistant)",
    activeAds: 950,
    avgSalary: 31500,
    salaryRange: "25 000 - 38 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan på behandlingshem (HVB, SiS) och inom öppenvård för att stötta individer i förändringsprocesser.",
    requiredSkills: ["Motiverande samtal (MI)", "Konflikthantering", "Missbruksbehandling", "Socialpedagogiskt stöd", "Dokumentation"],
    educationRequired: "Tvåårig eftergymnasial utbildning till behandlingspedagog eller socialpedagog via folkhögskola/YH.",
    category: "Omsorg & Socialt Arbete"
  },
  {
    role: "Personlig assistent (Personal Assistant)",
    activeAds: 3200,
    avgSalary: 27300,
    salaryRange: "21 500 - 32 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Viktigt yrke med konstant hög efterfrågan i hela landet för att möjliggöra ett självständigt liv för personer med funktionsvariationer.",
    requiredSkills: ["Kommunikationsstöd", "Omvårdnad", "Hushållssysslor", "Hjälpmedelsvana", "Empati & Flexibilitet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Stor vikt läggs vid personlig lämplighet och lyhördhet.",
    category: "Omsorg & Socialt Arbete"
  }
];

export const ENTRY_LEVEL_NO_EDU_JOBS: DemandJob[] = [
  // 1. Lager & Logistik
  {
    role: "Lagerarbetare",
    activeAds: 3200,
    avgSalary: 28550,
    salaryRange: "24 000 - 33 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket stabil efterfrågan inom e-handelslager, grossister och logistikterminaler över hela landet.",
    requiredSkills: ["Lagerhållning", "Bärhjälp", "Plock & Pack", "Inventering", "Fysisk uthållighet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Paketsorterare",
    activeAds: 1100,
    avgSalary: 26050,
    salaryRange: "22 000 - 29 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växande behov i takt med ökad paketvolym från e-handel, främst under sena kvällar och nätter.",
    requiredSkills: ["Pakethantering", "Sortering", "Fysisk uthållighet", "Noggrannhet", "Tempo"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Terminalarbetare",
    activeAds: 950,
    avgSalary: 29010,
    salaryRange: "25 000 - 34 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stadig ström av lediga jobb vid större omlastningshubbar och godsterminaler.",
    requiredSkills: ["Godshantering", "Lastning", "Säkerhetsrutiner", "Truckkort", "Samarbetsförmåga"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Lagerplockare",
    activeAds: 1540,
    avgSalary: 27500,
    salaryRange: "23 000 - 31 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Sökes brett till automatiserade och manuella lager för plockning med skanner.",
    requiredSkills: ["Plock & Pack", "Handskanner", "Lagerhållning", "Noggrannhet", "Tempo"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Inventerare",
    activeAds: 420,
    avgSalary: 28000,
    salaryRange: "23 000 - 32 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Återkommande behov vid lagerrevisioner och inventeringar inom detaljhandel och dagligvaruhandel.",
    requiredSkills: ["Inventering", "Sifferförståelse", "Noggrannhet", "Handskanner", "Systemregistrering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Flyttarbetare",
    activeAds: 640,
    avgSalary: 27800,
    salaryRange: "23 000 - 32 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Flyttfirmor söker kontinuerligt stark personal för både privatflyttar och kontorsflyttar.",
    requiredSkills: ["Tunga lyft", "Bärteknik", "Packningsteknik", "Kundkontakt", "Lagarbete"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Godshanterare",
    activeAds: 870,
    avgSalary: 28200,
    salaryRange: "24 000 - 33 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stabil efterfrågan inom hamnar, järnvägsterminaler och flygfraktstationer.",
    requiredSkills: ["Godsmottagning", "Truckkort", "Sortering", "Kvalitetskontroll", "Säkerhetsmedvetande"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Ramparbetare (flygplats)",
    activeAds: 230,
    avgSalary: 29500,
    salaryRange: "25 000 - 34 500 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Sökande ställs under säkerhetsprövning. Goda chanser inför semester- och semestersäsonger.",
    requiredSkills: ["Bagagesortering", "Säkerhetsrutiner", "Samarbete", "Fysisk styrka", "Hörselskyddsvana"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Säkerhet / Logistik"
  },
  {
    role: "Chaufförsmedhjälpare",
    activeAds: 380,
    avgSalary: 26800,
    salaryRange: "22 500 - 31 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Värdefullt ingångsyrke för transportintresserade som vill assistera vid tunga leveranser.",
    requiredSkills: ["Ruttplanering", "Kundkontakt", "Bärhjälp", "Logistik", "Samarbetsförmåga"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Transport"
  },

  // 2. Service & Handel
  {
    role: "Butiksmedarbetare",
    activeAds: 2900,
    avgSalary: 27200,
    salaryRange: "22 000 - 32 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "En av handelns vanligaste tjänster med stort inflöde av extrajobb och heltidstjänster.",
    requiredSkills: ["Kundservice", "Kassahantering", "Varupåfyllnad", "Exponering", "Butiksvård"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Kassabiträde",
    activeAds: 1800,
    avgSalary: 26500,
    salaryRange: "21 500 - 31 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Anställningar finns inom livsmedel såväl som fackhandel. Utmärkta karriärsteg.",
    requiredSkills: ["Kassahantering", "Kundservice", "Betalningslösningar", "Merförsäljning", "Noggrannhet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Butikssäljare",
    activeAds: 2150,
    avgSalary: 28000,
    salaryRange: "22 500 - 34 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Goda chanser för den med personligt säljdriv och engagemang för kundrelationer.",
    requiredSkills: ["Butiksförsäljning", "Kundkontakt", "Produktkunskap", "Merförsäljning", "Butiksvård"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Kundvärd",
    activeAds: 920,
    avgSalary: 27000,
    salaryRange: "22 000 - 31 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Sökes brett till kollektivtrafiken, köpcentrum och större utställningar för att guida och besvara frågor.",
    requiredSkills: ["Lösningsorienterad", "Gästvänlighet", "Information", "Kommunikation", "Problemlösning"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Demonstratör",
    activeAds: 350,
    avgSalary: 25800,
    salaryRange: "21 000 - 29 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Framförallt tim- eller helgbaserade uppdrag med provsmakning och produktvisning i mataffärer.",
    requiredSkills: ["Produktpresentation", "Kundkontakt", "Utåtriktad", "Matinbjudan", "Försäljningsteknik"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Butikspåfyllare",
    activeAds: 740,
    avgSalary: 26100,
    salaryRange: "21 000 - 30 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Väldigt goda möjligheter till nattliga eller morgonbaserade varuinkomster och påfyllnad.",
    requiredSkills: ["Varuplacering", "Exponering", "Fysiskt arbete", "Noggrannhet", "Tempo"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Merchandiser",
    activeAds: 480,
    avgSalary: 29800,
    salaryRange: "24 000 - 35 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Besökande roll där man reser runt mellan butiker och monterar upp kampanjer eller fyller på specifika leverantörshyllor.",
    requiredSkills: ["Produktplacering", "Kampanjexponering", "Leverantörskontakt", "Kreativitet", "Ruttplanering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Kassapersonal",
    activeAds: 1950,
    avgSalary: 26400,
    salaryRange: "21 000 - 31 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Varaktigt intag av medarbetare inom stormarknader, caféer och biografkedjor.",
    requiredSkills: ["Kassasystem", "Kundbemötande", "Sifferkontroll", "Servicekänsla", "Merförsäljning"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Uthyrningsmedarbetare",
    activeAds: 620,
    avgSalary: 29100,
    salaryRange: "23 000 - 34 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Uthyrning av verktyg, byggmaskiner eller bilar upplever hög efterfrågan med inriktning kundrådgivning.",
    requiredSkills: ["Kundservice", "Hyresavtal", "Produktgenomgång", "Administration", "Felsökning"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },

  // 3. Restaurang & Hotell
  {
    role: "Restaurangbiträde",
    activeAds: 1950,
    avgSalary: 26000,
    salaryRange: "21 000 - 29 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Generellt en av de snabbaste dörrarna in på arbetsmarknaden med jobb i snabbmatskedjor, fika- och lunchställen.",
    requiredSkills: ["Matberedning", "Kassahantering", "Disk & Städ", "Livsmedelshygien", "Snabbhet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Diskare",
    activeAds: 850,
    avgSalary: 25500,
    salaryRange: "20 500 - 28 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket stort rekryteringsbehov hos alla restauranger, särskilt under helger och semestersäsongen.",
    requiredSkills: ["Diskmaskinshantering", "Köksstöd", "Hygienrutiner", "Fysisk styrka", "Samarbete"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Köksbiträde",
    activeAds: 1200,
    avgSalary: 26800,
    salaryRange: "22 000 - 30 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Värdefullt ingångsjobb i skolkök, äldreboendekök och restauranger för att bistå kockarna.",
    requiredSkills: ["Grönsakshackning", "Enkel matlagning", "Disk & Städ", "Hygienrutiner", "Kökssamarbete"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Serveringspersonal",
    activeAds: 1580,
    avgSalary: 27000,
    salaryRange: "21 500 - 32550 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stort och kontinuerligt behov av servering med bra möjligheter till dricks och nätverkande.",
    requiredSkills: ["Gästservice", "Serveringsteknik", "Dryckeskunskap", "Kassasystem", "Stresshantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Städpersonal hotell",
    activeAds: 1400,
    avgSalary: 26200,
    salaryRange: "21 500 - 29 800 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket stabil efterfrågan hos de stora hotellkedjorna för att förbereda gästrum.",
    requiredSkills: ["Rumsbäddning", "Städrutiner", "Noggrannhet", "Servicekänsla", "Tidsplanering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Cafébiträde",
    activeAds: 1100,
    avgSalary: 25900,
    salaryRange: "21 000 - 29 200 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög ruljans på tjänster. Jättebra ingång för ungdomar och studerande.",
    requiredSkills: ["Kassahantering", "Kaffeservering", "Smörgåsar & Bakverk", "Kundservice", "Livsmedelshygien"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Barista",
    activeAds: 820,
    avgSalary: 27500,
    salaryRange: "22 000 - 31 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Växande kaffekultur skapar ständigt nya baristatjänster. Kaffekedjorna erbjuder ofta interna baristautbildningar.",
    requiredSkills: ["Espressoteknik", "Latte Art", "Kaffebönor", "Kundservice", "Kassahantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Snabbmatsmedarbetare",
    activeAds: 2400,
    avgSalary: 25200,
    salaryRange: "20 500 - 28 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Enormt intag dygnet runt. Perfekt för första jobbet eller kombinerat med studier.",
    requiredSkills: ["Snabbmatstillagning", "Kassahantering", "Gästservice", "Hygienrutiner", "Tempo"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Matleveransbud",
    activeAds: 1900,
    avgSalary: 24500,
    salaryRange: "20 000 - 29 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hemleveranser har etablerat en helt ny permanent arbetsmarknad med extremt flexibla arbetstider.",
    requiredSkills: ["Omdöme i trafik", "GPS-navigering", "Kundbemötande", "Ruttplanering", "Snabbhet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Matsalsvärd",
    activeAds: 540,
    avgSalary: 27500,
    salaryRange: "22 000 - 32 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Fokus på gott bemötande i lunchmatsalar, hotellmatsalar och herrgårdar.",
    requiredSkills: ["Gästmottagande", "Platsbokning", "Kommunikation", "Menypresentation", "Elegans"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },
  {
    role: "Frukostvärd",
    activeAds: 640,
    avgSalary: 26900,
    salaryRange: "21 500 - 30 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Frukostservering kräver tidiga morgnar men har goda chanser till fasta scheman hos hotellen.",
    requiredSkills: ["Frukostbuffé", "Gästbemötande", "Livsmedelshygien", "Påfyllningsarbete", "Köksförberedelser"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Hotell, Restaurang & Turism"
  },

  // 4. Transport
  {
    role: "Cykelbud",
    activeAds: 850,
    avgSalary: 24000,
    salaryRange: "19 500 - 27 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Fortsatt stor efterfrågan i storstäder på snabba lokala leveranser av dokument, mat och mediciner.",
    requiredSkills: ["Cykling", "Köromdöme", "GPS-navigering", "Kundkontakt", "Fysisk kondition"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Transport"
  },
  {
    role: "Tidningsdistributör",
    activeAds: 1050,
    avgSalary: 26200,
    salaryRange: "21 000 - 30 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Nattarbete till fots, på cykel eller med bil. Stabil arbetsmarknad med god självständighet.",
    requiredSkills: ["Nattarbete", "Självständighet", "Ruttlista", "Noggrannhet", "Koncentration"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Transport"
  },
  {
    role: "Budbilsmedhjälpare",
    activeAds: 420,
    avgSalary: 25500,
    salaryRange: "21 000 - 29 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Biträder föraren vid budleveranser av vitvaror eller tyngre möbler direkt till slutkund.",
    requiredSkills: ["Pakethantering", "Bärhjälp", "Kundbemötande", "Lagarbete", "Flexibilitet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Transport"
  },

  // 5. Fastighet & Städ
  {
    role: "Lokalvårdare",
    activeAds: 2800,
    avgSalary: 27200,
    salaryRange: "22 000 - 31 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Mycket hög efterfrågan inom skolor, kontorskomplex och offentliga miljöer. Trygg sysselsättning.",
    requiredSkills: ["Ytstädning", "Kemikaliehantering", "Maskinstädning", "Hygienrutiner", "Noggrannhet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Hemstädare",
    activeAds: 1450,
    avgSalary: 26800,
    salaryRange: "21 500 - 30 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "RUT-tjänster upprätthåller en väldigt stark privatmarknad för städning i hemmen.",
    requiredSkills: ["Hemstädning", "Kundkontakt", "Känsliga material", "Noggrannhet", "Diskretion"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Fönsterputsare",
    activeAds: 380,
    avgSalary: 28500,
    salaryRange: "23 000 - 33 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Speciellt stark efterfrågan under våren och sommarmånaderna hos fönsterputsningsfirmor.",
    requiredSkills: ["Fönsterputsning", "Arbeta på hög höjd", "Verktygsteknik", "Säkerhetstänk", "Noggrannhet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Fastighetsskötarassistent",
    activeAds: 520,
    avgSalary: 29000,
    salaryRange: "23 500 - 33 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Kommunala bostadsbolag och bostadsrättsföreningar söker assistenter för renhållning och skötsel.",
    requiredSkills: ["Yttre underhåll", "Gräsklippning", "Skottning", "Enklare reparationer", "Verktygshantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Trappstädare",
    activeAds: 670,
    avgSalary: 26500,
    salaryRange: "21 000 - 30 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Flerbostadshus kräver regelbunden trapphusrengöring, vilket ger kontinuerliga uppdragsmöjligheter.",
    requiredSkills: ["Trapphusstädning", "Fysisk kondition", "Tidsplanering", "Städredskap", "Ordning"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Saneringsmedhjälpare",
    activeAds: 295,
    avgSalary: 30500,
    salaryRange: "25 000 - 37 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Spännande och fysiskt krävande jobb vid skadesanering (brand, vatten, asbest). Mycket god sammanhållning.",
    requiredSkills: ["Saneringsteknik", "Skyddsutrustning", "Fysisk styrka", "Säkerhetsrutiner", "Problemhantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Fastighetsvärd",
    activeAds: 480,
    avgSalary: 32000,
    salaryRange: "25 500 - 38 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Kundorienterad roll med fokus på trivsel och enklare tillsyn i bostadsområden.",
    requiredSkills: ["Kundkontakt och felanmälningar", "Rondering", "Värme & Ventilation", "Administration", "Problemlösning"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },

  // 6. Industri
  {
    role: "Montör",
    activeAds: 1350,
    avgSalary: 29800,
    salaryRange: "24 000 - 35 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Stor efterfrågan i monteringslinjer inom verkstads- och fordonsindustrin.",
    requiredSkills: ["Skruvdragning", "Monteringsteknik", "Kvalitetskontroll", "Ritningsläsning", "LEAN"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Paketeringspersonal",
    activeAds: 950,
    avgSalary: 28200,
    salaryRange: "23 000 - 32 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Nödvändig funktion i tillverknings- och läkemedelsindustrin innan godset skickas vidare.",
    requiredSkills: ["Paketering", "Etikettering", "Noggrannhet", "Kvalitetssäkring", "Linjearbete"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Sorteringsarbetare",
    activeAds: 620,
    avgSalary: 28500,
    salaryRange: "23 500 - 32 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Sortering av råvaror eller återvinningsmaterial på industriella anläggningar.",
    requiredSkills: ["Materialsortering", "Kvalitetskontroll", "Skyddsutrustning", "Säkerhetsregler", "Tempo"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Återvinningsarbetare",
    activeAds: 540,
    avgSalary: 29100,
    salaryRange: "24 000 - 33 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hållbarhetsvågen ökar kraven på cirkulär avfallshantering. Goda jobbutsikter på miljöstationer.",
    requiredSkills: ["Sopsortering", "Miljöregler", "Fysiskt arbete", "Maskinkörning", "Säkerhetsmedvetande"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Operatörsassistent",
    activeAds: 430,
    avgSalary: 30200,
    salaryRange: "25 000 - 36 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Assisterar linjeoperatörer med materialpåfyllning och enklare kvalitetsinspektioner.",
    requiredSkills: ["Maskinsupport", "Felrapportering", "LEAN", "Felsökning", "Materialpåfyllnad"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Industri & Tillverkning"
  },
  {
    role: "Fabriksarbetare",
    activeAds: 1100,
    avgSalary: 28900,
    salaryRange: "23 500 - 34 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Goda chanser till tunga och stabila skiftjobb inom plast-, trä- eller metalltillverkning.",
    requiredSkills: ["Manuell produktion", "Säkerhetsrutiner", "Lagarbete", "Kvalitetsinspektion", "Uthållighet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Industri & Tillverkning"
  },

  // 7. Omsorg & Service
  {
    role: "Hemtjänstbiträde",
    activeAds: 1855,
    avgSalary: 27200,
    salaryRange: "22 500 - 30 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Med en åldrande befolkning ökar hemtjänstens behov av engagerade biträden för hjälp i vardagen.",
    requiredSkills: ["Social omsorg", "Hushållssysslor", "Promenadstöd", "Bemötande", "Rapportering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Omsorg & Socialt Arbete"
  },
  {
    role: "Avlösare",
    activeAds: 490,
    avgSalary: 26500,
    salaryRange: "21 000 - 30 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Kommunala insatser för att avlasta anhöriga. Mycket flexibla extrajobb.",
    requiredSkills: ["Ledsagning", "Trygghetsskapande", "Empati", "Tålamod", "Aktivering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Omsorg & Socialt Arbete"
  },
  {
    role: "Ledsagare",
    activeAds: 580,
    avgSalary: 26300,
    salaryRange: "21 000 - 29 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Ledsagarservice ger stöd till personer med funktionsnedsättning att delta i samhällslivet.",
    requiredSkills: ["Lokal kännedom", "Hjälpmedel (Rullstol)", "Socialt stöd", "Tidspassning", "Empatiskt bemötande"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Omsorg & Socialt Arbete"
  },
  {
    role: "Servicevärd inom vården",
    activeAds: 410,
    avgSalary: 27600,
    salaryRange: "22 000 - 31 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Avlastar vårdpersonalen på sjukhusavdelningar med sängbäddning, förrådshållning och måltider.",
    requiredSkills: ["Sängbäddning", "Måltidshantering", "Städ & Desinficering", "Vårdbemötande", "Förrådspåfyllning"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Omsorg & Socialt Arbete"
  },

  // 8. Natur, Trädgård & Säsongsjobb
  {
    role: "Bärplockare",
    activeAds: 1200,
    avgSalary: 23500,
    salaryRange: "18 500 - 27 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Säsongsberoende bärplockning i skog eller på odlingar med goda möjligheter till ackord.",
    requiredSkills: ["Fysiskt arbete", "Naturkännedom", "Bärsortering", "Manualitet", "Uthållighet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Skördearbetare",
    activeAds: 940,
    avgSalary: 24800,
    salaryRange: "20 000 - 28 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Säsongsarbete på lantbruk och frukthodlingar under sensommar och höst.",
    requiredSkills: ["Skördning", "Fysisk uthållighet", "Kvalitetssortering", "Lagarbete", "Tidiga morgnar"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Växthusarbetare",
    activeAds: 850,
    avgSalary: 25200,
    salaryRange: "20 500 - 29 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Trädgårdsodlingar och blomsterproduktion söker skötare året runt, med högsäsong på våren.",
    requiredSkills: ["Plantvård", "Bevattning", "Beskärning", "Sortering", "Fysisk uthållighet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Skogsplanterare",
    activeAds: 620,
    avgSalary: 27500,
    salaryRange: "22 000 - 32 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Intensivt säsongsbaserat vår- och sommarjobb. Perfekt för naturälskare som gillar fysisk utmaning.",
    requiredSkills: ["Plantering", "Terränggång", "Fysisk styrka", "Miljöhänsyn", "Självständighet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Trädgårdsarbetare",
    activeAds: 1450,
    avgSalary: 28200,
    salaryRange: "22 500 - 32 500 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Skötsel av grönytor, parker och trädgårdar för kommuner och privata anläggningsfirmor.",
    requiredSkills: ["Gräsklippning", "Plantering", "Ogräsrensning", "Verktygsbruk", "Utemiljöskötsel"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Kyrkogårdsarbetare",
    activeAds: 380,
    avgSalary: 28400,
    salaryRange: "23 000 - 32 500 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Stabil säsongsanställning hos Svenska kyrkan under de snöfria månaderna för grönyteskötsel.",
    requiredSkills: ["Kyrkogårdsskötsel", "Gräsklippning", "Gästbemötande", "Säkerhetsmedvetande", "Blomplantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },
  {
    role: "Renhållningsarbetare",
    activeAds: 920,
    avgSalary: 30500,
    salaryRange: "25 000 - 35 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Arbete med sophämtning eller drift av återvinningscentraler dygnet runt. Stabil lön.",
    requiredSkills: ["Sopsortering", "Fysiskt arbete", "Miljöstationer", "Kundbemötande", "Säkerhetsregler"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Naturbruk & Miljö"
  },

  // 9. Försäljning
  {
    role: "Telefonsäljare",
    activeAds: 1850,
    avgSalary: 26500,
    salaryRange: "20 000 - 45 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Hög efterfrågan. Ofta rörlig provision på toppen som belönar hårt arbete. Utmärkt säljskola.",
    requiredSkills: ["Telefonförsäljning", "Argumentation", "Målmedveten", "Kundkontakt", "Hinderhantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Försäljning & Marknadsföring"
  },
  {
    role: "Mötesbokare",
    activeAds: 940,
    avgSalary: 27200,
    salaryRange: "21 000 - 35 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Perfekt startroll i näringslivet. Boka in säljmöten till mer seniora säljare.",
    requiredSkills: ["Telefonkontakt", "B2B-kontakt", "Kalenderhantering", "Kommunikation", "Målfokus"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Försäljning & Marknadsföring"
  },
  {
    role: "Door-to-door-säljare",
    activeAds: 750,
    avgSalary: 28000,
    salaryRange: "21 000 - 48 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Uppsökande dörrförsäljning av elavtal, larm eller fiber ger fantastiska möjligheter för utåtriktade personer.",
    requiredSkills: ["Uppsökande försäljning", "Kundkontakt", "Argumentationsteknik", "Självförtroende", "Uthållighet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Försäljning & Marknadsföring"
  },
  {
    role: "Eventsäljare",
    activeAds: 810,
    avgSalary: 27800,
    salaryRange: "21 000 - 45 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Försäljning på mässor, köpcentrum och allmänna ytor kräver energi och gott humör.",
    requiredSkills: ["Uppsökande kontakt", "Eventpresentation", "Utåtriktad", "Muntlig presentation", "Försäljningsmål"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Försäljning & Marknadsföring"
  },

  // 10. Event & Service
  {
    role: "Eventpersonal",
    activeAds: 890,
    avgSalary: 26800,
    salaryRange: "21 500 - 31 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Säsongsbetonat och händelserikt vid mässor, föreläsningar, konserter och festivaler.",
    requiredSkills: ["Eventkoordinering", "Kundservice", "Gästbemötande", "Lösningsfokuserad", "Flexibilitet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Garderobiär",
    activeAds: 420,
    avgSalary: 25100,
    salaryRange: "20 000 - 28 000 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Kvälls- och helgarbete på nattklubbar, teatrar och konserthus under de kallare månaderna.",
    requiredSkills: ["Garderobshantering", "Kundbemötande", "Stresshantering", "Ordningssinne", "Betalningshantering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Arenapersonal",
    activeAds: 540,
    avgSalary: 26000,
    salaryRange: "21 000 - 29 500 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Arbeta på sportarenor och musikevent med publikhantering, biljetter eller enklare kiosktjänster.",
    requiredSkills: ["Säkerhetsvägledning", "Gästinsläpp", "Publikvärdskap", "Kundservice", "Lagarbete"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Publikvärd",
    activeAds: 750,
    avgSalary: 26200,
    salaryRange: "21 000 - 29 800 SEK/månad",
    demandLevel: "High",
    futureOutlook: "Kritiskt för evenemangshygien och trygghet för stora folksamlingar vid konserter eller matcher.",
    requiredSkills: ["Publiksäkerhet", "Kundbemötande", "Krisstöd", "Kommunikation", "Uppmärksamhet"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  },
  {
    role: "Biljettkontrollant",
    activeAds: 380,
    avgSalary: 27100,
    salaryRange: "22 500 - 31 000 SEK/månad",
    demandLevel: "Medium",
    futureOutlook: "Intygande och guidande roll inom kollektivtrafik, biografer eller nöjesparker.",
    requiredSkills: ["Biljetthantering", "Digital skanner", "Kundkontakt", "Konflikthantering", "Rapportering"],
    educationRequired: "Ingen formell eftergymnasial utbildning krävs. Ingen tidigare erfarenhet krävs, upplärning sker på plats.",
    category: "Service & Handel"
  }
];

// Filter out duplicates by matching role name to prevent duplicated key errors in React.
// We prioritize high-integrity, hand-crafted entry level & base catalog datasets over dynamic fallbacks.
const uniqueShortageJobsMap = new Map<string, DemandJob>();
[...ENTRY_LEVEL_NO_EDU_JOBS, ...BASE_IN_DEMAND_JOBS, ...NEW_INDUSTRIES_SHORTAGE_JOBS, ...EXPANDED_EXTRA_JOBS].forEach(job => {
  const normKey = job.role.split('(')[0].trim().toLowerCase();
  if (!uniqueShortageJobsMap.has(normKey)) {
    uniqueShortageJobsMap.set(normKey, job);
  }
});
export const IN_DEMAND_JOBS: DemandJob[] = Array.from(uniqueShortageJobsMap.values());

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

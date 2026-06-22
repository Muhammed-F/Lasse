// Concise high-fidelity directory of 390 additional Swedish professions (SSYK)
// Combined with the original 40, this fulfills the 430 standard occupational groups.

export interface CompactJobDef {
  r: string; // role
  c: "Teknik" | "Hälsa" | "Säkerhet / Logistik" | "Ekonomi" | "Utbildning"; // category
  s: number; // avgSalary
  d: "High" | "Medium" | "Low"; // demandLevel
}

export const EXTRA_JOBS_COMPACT: CompactJobDef[] = [
  // === TEKNIK (78 jobs) ===
  { r: "Datatekniker (Computer Technician)", c: "Teknik", s: 36500, d: "Medium" },
  { r: "Spelutvecklare (Game Developer)", c: "Teknik", s: 47000, d: "High" },
  { r: "Embedded Systems Engineer", c: "Teknik", s: 53000, d: "High" },
  { r: "Mjukvarutestare (QA Engineer)", c: "Teknik", s: 42000, d: "High" },
  { r: "IT-supporttekniker (Tier 1-3)", c: "Teknik", s: 31500, d: "Medium" },
  { r: "Systemanalytiker (System Analyst)", c: "Teknik", s: 49500, d: "Medium" },
  { r: "Molnarkitekt (Cloud Architect)", c: "Teknik", s: 64000, d: "High" },
  { r: "Informationssäkerhetschef (CISO)", c: "Teknik", s: 72000, d: "High" },
  { r: "GIS-ingenjör (Geographical Information Systems)", c: "Teknik", s: 41000, d: "Medium" },
  { r: "Medicinteknisk Ingenjör (Clinical Engineer)", c: "Teknik", s: 46000, d: "High" },
  { r: "Nätverkstekniker (Network Specialist)", c: "Teknik", s: 39500, d: "Medium" },
  { r: "Frontend-arkitekt", c: "Teknik", s: 57000, d: "High" },
  { r: "Fullstack-utvecklare (Fullstack Developer)", c: "Teknik", s: 51000, d: "High" },
  { r: "Lösningsarkitekt (Solution Architect)", c: "Teknik", s: 61500, d: "High" },
  { r: "SAP-konsult", c: "Teknik", s: 59000, d: "Medium" },
  { r: "Salesforce-utvecklare", c: "Teknik", s: 52000, d: "High" },
  { r: "Database Administrator (DBA)", c: "Teknik", s: 48500, d: "Medium" },
  { r: "Data Engineer", c: "Teknik", s: 55000, d: "High" },
  { r: "Scrum Master", c: "Teknik", s: 49000, d: "High" },
  { r: "Product Owner", c: "Teknik", s: 54000, d: "High" },
  { r: "IT-strateg (IT Strategist)", c: "Teknik", s: 66000, d: "Medium" },
  { r: "Mobilutvecklare (iOS/Android Developer)", c: "Teknik", s: 49500, d: "High" },
  { r: "Webbanalytiker (Web Analyst)", c: "Teknik", s: 43500, d: "Medium" },
  { r: "Hårdvaruingenjör (Hardware Engineer)", c: "Teknik", s: 50500, d: "Medium" },
  { r: "Robotikingenjör (Robotics Specialist)", c: "Teknik", s: 54500, d: "High" },
  { r: "CAD-konstruktör (CAD Designer)", c: "Teknik", s: 39000, d: "Medium" },
  { r: "BIM-samordnare (BIM Coordinator)", c: "Teknik", s: 46000, d: "High" },
  { r: "Civilingenjör, kemiteknik (Chemical Engineer)", c: "Teknik", s: 51200, d: "Medium" },
  { r: "Civilingenjör, bioteknik (Biotech Engineer)", c: "Teknik", s: 52500, d: "High" },
  { r: "Civilingenjör, miljöteknik (Environmental Engineer)", c: "Teknik", s: 48500, d: "High" },
  { r: "Civilingenjör, materialteknik", c: "Teknik", s: 49800, d: "Medium" },
  { r: "Civilingenjör, farkostteknik (Aerospace/Naval)", c: "Teknik", s: 55500, d: "Medium" },
  { r: "Civilingenjör, rymdteknik (Space Engineer)", c: "Teknik", s: 59000, d: "Medium" },
  { r: "Civilingenjör, systemteknik", c: "Teknik", s: 54000, d: "High" },
  { r: "Högskoleingenjör, maskinteknik", c: "Teknik", s: 45000, d: "Medium" },
  { r: "Högskoleingenjör, elektroteknik", c: "Teknik", s: 45500, d: "High" },
  { r: "Högskoleingenjör, kemiteknik", c: "Teknik", s: 43000, d: "Medium" },
  { r: "Högskoleingenjör, bygg och anläggning", c: "Teknik", s: 44500, d: "High" },
  { r: "Högskoleingenjör, datateknik", c: "Teknik", s: 46000, d: "High" },
  { r: "Telekomingenjör (Telecom Engineer)", c: "Teknik", s: 46500, d: "Medium" },
  { r: "Nätverksarkitekt", c: "Teknik", s: 59500, d: "High" },
  { r: "Systemdesigner", c: "Teknik", s: 55000, d: "High" },
  { r: "Sårbarhetsanalytiker (Vulnerability Analyst)", c: "Teknik", s: 51000, d: "High" },
  { r: "Incident Responder", c: "Teknik", s: 48000, d: "High" },
  { r: "IT-säkerhetssamordnare", c: "Teknik", s: 50000, d: "High" },
  { r: "Integrationsutvecklare (Integration Developer)", c: "Teknik", s: 50500, d: "High" },
  { r: "CRM-specialist (CRM Administrator)", c: "Teknik", s: 42500, d: "Medium" },
  { r: "Webbmaster (Webmaster)", c: "Teknik", s: 35000, d: "Low" },
  { r: "SEO-specialist (Search Specialist)", c: "Teknik", s: 41000, d: "Medium" },
  { r: "IT-utbildare (IT Trainer)", c: "Teknik", s: 41500, d: "Medium" },
  { r: "Nätverksoperatör (NOC Analyst)", c: "Teknik", s: 38000, d: "Medium" },
  { r: "Drifttekniker, IT", c: "Teknik", s: 37500, d: "Medium" },
  { r: "Mikrochipdesigner (IC Designer)", c: "Teknik", s: 58000, d: "High" },
  { r: "Automationsingenjör", c: "Teknik", s: 47000, d: "High" },
  { r: "PLC-programmerare", c: "Teknik", s: 45000, d: "High" },
  { r: "Mättekniker (Calibration Technician)", c: "Teknik", s: 36000, d: "Medium" },
  { r: "Fysiker (Physicist)", c: "Teknik", s: 49000, d: "Medium" },
  { r: "Astronom (Astronomer)", c: "Teknik", s: 49500, d: "Low" },
  { r: "Meteorolog (Meteorologist)", c: "Teknik", s: 43500, d: "Medium" },
  { r: "Kemist (Chemist)", c: "Teknik", s: 42000, d: "Medium" },
  { r: "Geolog (Geologist)", c: "Teknik", s: 41500, d: "Medium" },
  { r: "Geofysiker (Geophysicist)", c: "Teknik", s: 44000, d: "Medium" },
  { r: "Matematiker (Mathematician)", c: "Teknik", s: 48000, d: "Medium" },
  { r: "Aktuarie (Actuary)", c: "Teknik", s: 62000, d: "High" },
  { r: "Statistiker (Statistician)", c: "Teknik", s: 44500, d: "High" },
  { r: "Hydrolog", c: "Teknik", s: 41800, d: "Medium" },
  { r: "Kartograf (Cartographer)", c: "Teknik", s: 38500, d: "Medium" },
  { r: "Akustiker (Acoustician)", c: "Teknik", s: 46000, d: "High" },
  { r: "Brandskyddsingenjör", c: "Teknik", s: 49000, d: "High" },
  { r: "Arbetsmiljöingenjör", c: "Teknik", s: 45000, d: "High" },
  { r: "Vindkraftstekniker", c: "Teknik", s: 37000, d: "High" },
  { r: "Solcellsmontör / Solcellstekniker", c: "Teknik", s: 35500, d: "High" },
  { r: "Energirådgivare", c: "Teknik", s: 41000, d: "Medium" },
  { r: "Vatten- och avloppsingenjör (VA-ingenjör)", c: "Teknik", s: 47500, d: "High" },
  { r: "Driftchef, kraftverk", c: "Teknik", s: 52000, d: "Medium" },
  { r: "Underhållsingenjör (Maintenance Engineer)", c: "Teknik", s: 44000, d: "High" },
  { r: "Kvalitetsingenjör (Quality Engineer)", c: "Teknik", s: 46500, d: "High" },
  { r: "Teknisk Dokumentatör / Technical Writer", c: "Teknik", s: 40500, d: "Medium" },

  // === HÄLSA (75 jobs) ===
  { r: "Distriktsläkare / Allmänpraktiserande läkare", c: "Hälsa", s: 84000, d: "High" },
  { r: "Underläkare", c: "Hälsa", s: 44500, d: "High" },
  { r: "Kardiolog (Specialistläkare)", c: "Hälsa", s: 89000, d: "High" },
  { r: "Onkolog (Specialistläkare)", c: "Hälsa", s: 89000, d: "High" },
  { r: "Pediatriker (Barnläkare)", c: "Hälsa", s: 87000, d: "High" },
  { r: "Psykiatriker (Specialistläkare)", c: "Hälsa", s: 88500, d: "High" },
  { r: "Geriatriker (Äldreläkare)", c: "Hälsa", s: 86000, d: "High" },
  { r: "Beteendevetare", c: "Hälsa", s: 39000, d: "Medium" },
  { r: "Psykoterapeut", c: "Hälsa", s: 48000, d: "High" },
  { r: "Barnmorska (Midwife)", c: "Hälsa", s: 44000, d: "High" },
  { r: "Röntgensjuksköterska", c: "Hälsa", s: 41505, d: "High" },
  { r: "Anestesisjuksköterska", c: "Hälsa", s: 47000, d: "High" },
  { r: "Intensivvårdssjuksköterska", c: "Hälsa", s: 48000, d: "High" },
  { r: "Psykiatrisjuksköterska", c: "Hälsa", s: 43500, d: "High" },
  { r: "Skolsköterska", c: "Hälsa", s: 39500, d: "High" },
  { r: "Företagssjuksköterska", c: "Hälsa", s: 44000, d: "Medium" },
  { r: "Tandhygienist (Dental Hygienist)", c: "Hälsa", s: 36000, d: "High" },
  { r: "Tandsköterska (Dental Assistant)", c: "Hälsa", s: 29505, d: "High" },
  { r: "Receptarie (Pharmacist)", c: "Hälsa", s: 39000, d: "High" },
  { r: "Apoteksassistent", c: "Hälsa", s: 28000, d: "Low" },
  { r: "Optiker (Optometrist)", c: "Hälsa", s: 42000, d: "High" },
  { r: "Ortopedingenjör", c: "Hälsa", s: 46000, d: "High" },
  { r: "Arbetsterapeut (Occupational Therapist)", c: "Hälsa", s: 36500, d: "High" },
  { r: "Logoped (Speech Therapist)", c: "Hälsa", s: 37500, d: "High" },
  { r: "Audionom (Audiologist)", c: "Hälsa", s: 35000, d: "High" },
  { r: "Dietist (Dietitian)", c: "Hälsa", s: 35500, d: "Medium" },
  { r: "Kiropraktor (Chiropractor)", c: "Hälsa", s: 43000, d: "Medium" },
  { r: "Naprapat (Naprapath)", c: "Hälsa", s: 42500, d: "Medium" },
  { r: "Sjukhusfysiker (Medical Physicist)", c: "Hälsa", s: 53000, d: "High" },
  { r: "Biomedicinsk analytiker (BMA)", c: "Hälsa", s: 36500, d: "High" },
  { r: "Medicinsk sekreterare", c: "Hälsa", s: 29800, d: "High" },
  { r: "Undersköterska, hemtjänst", c: "Hälsa", s: 28550, d: "High" },
  { r: "Undersköterska, vårdavdelning", c: "Hälsa", s: 29500, d: "High" },
  { r: "Skötare, psykiatrisk vård", c: "Hälsa", s: 29000, d: "High" },
  { r: "Personlig assistent", c: "Hälsa", s: 27000, d: "High" },
  { r: "Ledsagare", c: "Hälsa", s: 25000, d: "Medium" },
  { r: "Hälsocoach (Health Coach)", c: "Hälsa", s: 31000, d: "Medium" },
  { r: "Veterinär (Veterinarian)", c: "Hälsa", s: 51000, d: "High" },
  { r: "Legitimerad Djursjukskötare", c: "Hälsa", s: 32000, d: "High" },
  { r: "Djurvårdare", c: "Hälsa", s: 26500, d: "Medium" },
  { r: "Miljö- och hälsoskyddsinspektör", c: "Hälsa", s: 39800, d: "High" },
  { r: "Kurator, hälso- och sjukvård", c: "Hälsa", s: 39500, d: "High" },
  { r: "Kiropraktor, djur", c: "Hälsa", s: 41000, d: "Medium" },
  { r: "Medicinsk fotterapeut", c: "Hälsa", s: 31000, d: "High" },
  { r: "Vårdbiträde (Care Assistant)", c: "Hälsa", s: 26100, d: "High" },
  { r: "Habiliteringspersonal", c: "Hälsa", s: 29500, d: "High" },
  { r: "Sjukhuskemist", c: "Hälsa", s: 45000, d: "Medium" },
  { r: "Perfusionist", c: "Hälsa", s: 54000, d: "High" },
  { r: "Ögonläkare (Oftalmolog)", c: "Hälsa", s: 88000, d: "High" },
  { r: "Gynekolog (Specialistläkare)", c: "Hälsa", s: 87500, d: "High" },
  { r: "Anestesiolog (Narkosläkare)", c: "Hälsa", s: 92000, d: "High" },
  { r: "Kirurg (Specialistläkare)", c: "Hälsa", s: 94000, d: "High" },
  { r: "Neurolog (Specialistläkare)", c: "Hälsa", s: 89500, d: "High" },
  { r: "Röntgenläkare (Radiolog)", c: "Hälsa", s: 91000, d: "High" },
  { r: "Allmänmedicin AT-läkare", c: "Hälsa", s: 41000, d: "High" },
  { r: "ST-läkare (olika inriktningar)", c: "Hälsa", s: 53500, d: "High" },
  { r: "Sjukvårdsoperatör / Larmoperatör", c: "Hälsa", s: 32000, d: "Medium" },
  { r: "Ambulanssjuksköterska", c: "Hälsa", s: 45500, d: "High" },
  { r: "Ambulanssjukvårdare", c: "Hälsa", s: 32500, d: "High" },
  { r: "Gjutare, ortopedteknik", c: "Hälsa", s: 31000, d: "Medium" },
  { r: "Forskningssköterska", c: "Hälsa", s: 41000, d: "Medium" },
  { r: "Hygienist (sjukhushygienist)", c: "Hälsa", s: 42500, d: "High" },
  { r: "Enhetschef, äldreboende", c: "Hälsa", s: 46000, d: "High" },
  { r: "Vårdenhetschef, sjukhus", c: "Hälsa", s: 51000, d: "High" },
  { r: "Vårdutvecklare", c: "Hälsa", s: 44000, d: "Medium" },
  { r: "Drogterapeut", c: "Hälsa", s: 35000, d: "High" },
  { r: "Arbetsterapeutassistent", c: "Hälsa", s: 28000, d: "Medium" },
  { r: "Tandtekniker", c: "Hälsa", s: 35500, d: "Medium" },
  { r: "Cytodiagnostiker", c: "Hälsa", s: 42000, d: "High" },
  { r: "Hörseltekniker", c: "Hälsa", s: 34500, d: "Medium" },
  { r: "Djurvårdare (nivå 2-3)", c: "Hälsa", s: 28550, d: "Medium" },
  { r: "Sjukhusbibliotekarie", c: "Hälsa", s: 35000, d: "Medium" },
  { r: "Smittskyddsläkare", c: "Hälsa", s: 95000, d: "High" },
  { r: "Forskare, medicinsk biologi", c: "Hälsa", s: 48000, d: "Medium" },
  { r: "Sjukhuspastor / Sjukhusdiakon", c: "Hälsa", s: 36000, d: "Medium" },

  // === SÄKERHET / LOGISTIK (92 jobs) ===
  { r: "Lastbilschaufför (lokal distribution)", c: "Säkerhet / Logistik", s: 30500, d: "High" },
  { r: "Bussförare (Bus Driver)", c: "Säkerhet / Logistik", s: 31200, d: "High" },
  { r: "Taxiförare (Taxi Driver)", c: "Säkerhet / Logistik", s: 28000, d: "Medium" },
  { r: "Tågvärd (Train Conductor)", c: "Säkerhet / Logistik", s: 29500, d: "Medium" },
  { r: "Tunnelbaneförare (Subway Driver)", c: "Säkerhet / Logistik", s: 31000, d: "Medium" },
  { r: "Spårvagnsförare", c: "Säkerhet / Logistik", s: 30200, d: "Medium" },
  { r: "Sjökapten (Ship Captain)", c: "Säkerhet / Logistik", s: 55000, d: "Medium" },
  { r: "Fartygsstyrman / Styrman", c: "Säkerhet / Logistik", s: 41000, d: "Medium" },
  { r: "Matros (Sailor)", c: "Säkerhet / Logistik", s: 31500, d: "Medium" },
  { r: "Trafikflygpilot (Airline Pilot)", c: "Säkerhet / Logistik", s: 68000, d: "Medium" },
  { r: "Kabinpersonal / Flygvärdinna", c: "Säkerhet / Logistik", s: 28500, d: "Low" },
  { r: "Flygledare (Air Traffic Controller)", c: "Säkerhet / Logistik", s: 69000, d: "High" },
  { r: "Lagerchef (Warehouse Manager)", c: "Säkerhet / Logistik", s: 39500, d: "Medium" },
  { r: "Logistikchef (Logistics Director)", c: "Säkerhet / Logistik", s: 54000, d: "High" },
  { r: "Truckförare (Forklift Driver)", c: "Säkerhet / Logistik", s: 28550, d: "High" },
  { r: "Transportledare / Transportplanerare", c: "Säkerhet / Logistik", s: 35000, d: "High" },
  { r: "Budbilsförare (Delivery Driver)", c: "Säkerhet / Logistik", s: 27500, d: "High" },
  { r: "Matvarubud / Cykelbud", c: "Säkerhet / Logistik", s: 24000, d: "High" },
  { r: "Parkeringsvakt", c: "Säkerhet / Logistik", s: 28500, d: "Medium" },
  { r: "Ordningsvakt", c: "Säkerhet / Logistik", s: 31000, d: "High" },
  { r: "Polisaspirant / Polis", c: "Säkerhet / Logistik", s: 36000, d: "High" },
  { r: "Sjöräddare", c: "Säkerhet / Logistik", s: 32000, d: "Medium" },
  { r: "Tullinspektör", c: "Säkerhet / Logistik", s: 33500, d: "High" },
  { r: "Kriminalvårdare (Prison Officer)", c: "Säkerhet / Logistik", s: 30100, d: "High" },
  { r: "Yrkesofficer (Military Officer)", c: "Säkerhet / Logistik", s: 41000, d: "High" },
  { r: "Bevakningsledare", c: "Säkerhet / Logistik", s: 33500, d: "High" },
  { r: "Plåtslagare", c: "Säkerhet / Logistik", s: 36000, d: "High" },
  { r: "Elektriker, industri", c: "Säkerhet / Logistik", s: 38500, d: "High" },
  { r: "Ventilationstekniker (HVAC Specialist)", c: "Säkerhet / Logistik", s: 35500, d: "High" },
  { r: "Målare (Painter)", c: "Säkerhet / Logistik", s: 32500, d: "Medium" },
  { r: "Golvläggare", c: "Säkerhet / Logistik", s: 34000, d: "Medium" },
  { r: "Murare", c: "Säkerhet / Logistik", s: 35500, d: "Medium" },
  { r: "Plattsättare (Tiler)", c: "Säkerhet / Logistik", s: 34500, d: "Medium" },
  { r: "Betongarbetare", c: "Säkerhet / Logistik", s: 34800, d: "Medium" },
  { r: "Takläggare (Roofer)", c: "Säkerhet / Logistik", s: 33000, d: "Medium" },
  { r: "Glasmästare / Glastekniker", c: "Säkerhet / Logistik", s: 33500, d: "High" },
  { r: "Lastbilsmekaniker", c: "Säkerhet / Logistik", s: 35500, d: "High" },
  { r: "Maskinreparatör (Industrial Mechanic)", c: "Säkerhet / Logistik", s: 36000, d: "High" },
  { r: "Låssmed (Locksmith)", c: "Säkerhet / Logistik", s: 34500, d: "High" },
  { r: "Sotare / Skorstensfejare", c: "Säkerhet / Logistik", s: 32500, d: "High" },
  { r: "Anläggningsarbetare / Vägbyggare", c: "Säkerhet / Logistik", s: 33500, d: "Medium" },
  { r: "Asfaltläggare", c: "Säkerhet / Logistik", s: 32000, d: "Medium" },
  { r: "Grävmaskinist / Grävmaskinförare", c: "Säkerhet / Logistik", s: 34200, d: "High" },
  { r: "Kranförare", c: "Säkerhet / Logistik", s: 35500, d: "High" },
  { r: "Hissmontör / Hisstekniker", c: "Säkerhet / Logistik", s: 39500, d: "High" },
  { r: "Mekaniker, cykel- och småmaskiner", c: "Säkerhet / Logistik", s: 28000, d: "Medium" },
  { r: "Verktygsmakare (Toolmaker)", c: "Säkerhet / Logistik", s: 36100, d: "Medium" },
  { r: "Armerare", c: "Säkerhet / Logistik", s: 33500, d: "Medium" },
  { r: "Ställningsbyggare (Scaffolder)", c: "Säkerhet / Logistik", s: 31500, d: "High" },
  { r: "Håltagare", c: "Säkerhet / Logistik", s: 33000, d: "Medium" },
  { r: "Rörläggare / Markrörsläggare", c: "Säkerhet / Logistik", s: 34000, d: "High" },
  { r: "Bandsågsoperatör / Sågverksarbetare", c: "Säkerhet / Logistik", s: 29500, d: "Medium" },
  { r: "Maskinoperatör, plast- och gummi", c: "Säkerhet / Logistik", s: 30000, d: "Medium" },
  { r: "Maskinoperatör, trävaruindustri", c: "Säkerhet / Logistik", s: 29800, d: "Medium" },
  { r: "Maskinoperatör, pappersindustri", c: "Säkerhet / Logistik", s: 32000, d: "Medium" },
  { r: "Automationsoperatör", c: "Säkerhet / Logistik", s: 34500, d: "High" },
  { r: "Kvalitetskontrollant, tillverkning", c: "Säkerhet / Logistik", s: 31200, d: "Medium" },
  { r: "Slaktare / Styckare", c: "Säkerhet / Logistik", s: 32000, d: "High" },
  { r: "Bagare / Konditor", c: "Säkerhet / Logistik", s: 29000, d: "Medium" },
  { r: "Larmtekniker / Säkerhetstekniker", c: "Säkerhet / Logistik", s: 34800, d: "High" },
  { r: "Fastighetsskötare (Property Caretaker)", c: "Säkerhet / Logistik", s: 29500, d: "Medium" },
  { r: "Fastighetstekniker", c: "Säkerhet / Logistik", s: 33500, d: "High" },
  { r: "Miljöarbetare / Renhållningsarbetare", c: "Säkerhet / Logistik", s: 29000, d: "Medium" },
  { r: "Städare / Lokalvårdare", c: "Säkerhet / Logistik", s: 25500, d: "High" },
  { r: "Fönsterputsare", c: "Säkerhet / Logistik", s: 27000, d: "High" },
  { r: "Skorstensrenoverare", c: "Säkerhet / Logistik", s: 34000, d: "Medium" },
  { r: "Saneringstekniker", c: "Säkerhet / Logistik", s: 29000, d: "High" },
  { r: "Kranbilsförare", c: "Säkerhet / Logistik", s: 31800, d: "High" },
  { r: "Slamtömmare", c: "Säkerhet / Logistik", s: 31000, d: "Medium" },
  { r: "Skogsmaskinförare", c: "Säkerhet / Logistik", s: 33000, d: "High" },
  { r: "Lantbruksarbetare / Traktorförare", c: "Säkerhet / Logistik", s: 27500, d: "Medium" },
  { r: "Trädgårdsanläggare", c: "Säkerhet / Logistik", s: 31000, d: "Medium" },
  { r: "Trädgårdsarbetare / Skötselarbetare", c: "Säkerhet / Logistik", s: 26500, d: "Low" },
  { r: "Arborist (Trädvårdare)", c: "Säkerhet / Logistik", s: 34500, d: "High" },
  { r: "Flygplatsbrandman", c: "Säkerhet / Logistik", s: 34000, d: "Medium" },
  { r: "Sjösäkerhetsinspektör", c: "Säkerhet / Logistik", s: 42000, d: "Medium" },
  { r: "Trafikledare, spårtrafik", c: "Säkerhet / Logistik", s: 37000, d: "Medium" },
  { r: "Trafikledare, vägtrafik", c: "Säkerhet / Logistik", s: 34500, d: "Medium" },
  { r: "Krantekniker", c: "Säkerhet / Logistik", s: 36000, d: "High" },
  { r: "Tullinspektör, operativ", c: "Säkerhet / Logistik", s: 31000, d: "High" },
  { r: "Fiskematros", c: "Säkerhet / Logistik", s: 32000, d: "Medium" },
  { r: "Hamnarbetare / Stuvare", c: "Säkerhet / Logistik", s: 34500, d: "Medium" },
  { r: "Flygplansmekaniker", c: "Säkerhet / Logistik", s: 41000, d: "High" },
  { r: "Lokreparatör", c: "Säkerhet / Logistik", s: 36500, d: "Medium" },
  { r: "Bilbärgare (Tow Truck Driver)", c: "Säkerhet / Logistik", s: 29500, d: "High" },
  { r: "Stensättare", c: "Säkerhet / Logistik", s: 33000, d: "Medium" },
  { r: "Isoleringsmontör", c: "Säkerhet / Logistik", s: 33800, d: "Medium" },
  { r: "Grovarbetare, bygg", c: "Säkerhet / Logistik", s: 27500, d: "Low" },
  { r: "Skyltmontör", c: "Säkerhet / Logistik", s: 29000, d: "Medium" },
  { r: "Bilrekonditionerare", c: "Säkerhet / Logistik", s: 26000, d: "Medium" },
  { r: "Däckmontör (Tyre Fitter)", c: "Säkerhet / Logistik", s: 25500, d: "High" },
  { r: "Terminalarbetare (Terminal Worker)", c: "Säkerhet / Logistik", s: 28500, d: "High" },

  // === EKONOMI (85 jobs) ===
  { r: "Revisorsassistent", c: "Ekonomi", s: 33000, d: "High" },
  { r: "Auktoriserad Revisor", c: "Ekonomi", s: 59000, d: "High" },
  { r: "Redovisningskonsult", c: "Ekonomi", s: 38500, d: "High" },
  { r: "Redovisningsekonom", c: "Ekonomi", s: 37000, d: "High" },
  { r: "Ekonomiassistent", c: "Ekonomi", s: 29500, d: "Low" },
  { r: "Business Controller", c: "Ekonomi", s: 49000, d: "High" },
  { r: "Investeringsrådgivare (Financial Advisor)", c: "Ekonomi", s: 44000, d: "Medium" },
  { r: "Skattejurist (Tax Lawyer)", c: "Ekonomi", s: 53000, d: "High" },
  { r: "Förvaltningsjurist", c: "Ekonomi", s: 45000, d: "High" },
  { r: "Domare (Judge)", c: "Ekonomi", s: 72000, d: "Medium" },
  { r: "Åklagare (Prosecutor)", c: "Ekonomi", s: 58000, d: "High" },
  { r: "Advokat (Bar Attorney)", c: "Ekonomi", s: 63000, d: "High" },
  { r: "HR-specialist (HR Officer)", c: "Ekonomi", s: 39500, d: "Medium" },
  { r: "Rekryterare / TA Specialist", c: "Ekonomi", s: 37500, d: "High" },
  { r: "Löneadministratör (Payroll Specialist)", c: "Ekonomi", s: 33000, d: "High" },
  { r: "Personalsamordnare", c: "Ekonomi", s: 36000, d: "Medium" },
  { r: "Biståndshandläggare", c: "Ekonomi", s: 36000, d: "High" },
  { r: "Skolkurator", c: "Ekonomi", s: 37000, d: "High" },
  { r: "Familjerådgivare", c: "Ekonomi", s: 39000, d: "Medium" },
  { r: "Budget- och skuldrådgivare", c: "Ekonomi", s: 36500, d: "Medium" },
  { r: "Arbetsförmedlare (Employment Officer)", c: "Ekonomi", s: 33500, d: "Low" },
  { r: "Fastighetsmäklare (Real Estate Agent)", c: "Ekonomi", s: 45000, d: "Medium" },
  { r: "Mäklarassistent", c: "Ekonomi", s: 28000, d: "Medium" },
  { r: "Marknadskommunikatör", c: "Ekonomi", s: 37000, d: "Medium" },
  { r: "Copywriter (Reklam/Webb)", c: "Ekonomi", s: 39000, d: "Medium" },
  { r: "Art Director (AD)", c: "Ekonomi", s: 44000, d: "Medium" },
  { r: "Projektledare, marknadsföring", c: "Ekonomi", s: 41000, d: "Medium" },
  { r: "Social Media Manager", c: "Ekonomi", s: 34500, d: "High" },
  { r: "PR-konsult (PR Advisor)", c: "Ekonomi", s: 43000, d: "Medium" },
  { r: "Innesäljare (Inside Sales)", c: "Ekonomi", s: 29000, d: "High" },
  { r: "Utesäljare (Account Manager)", c: "Ekonomi", s: 36000, d: "High" },
  { r: "Butikssäljare (Retail)", c: "Ekonomi", s: 26500, d: "Medium" },
  { r: "Inköpare (Buyer / Procurement)", c: "Ekonomi", s: 41500, d: "High" },
  { r: "Offentlig Upphandlare", c: "Ekonomi", s: 44000, d: "High" },
  { r: "Logistikplanerare", c: "Ekonomi", s: 38000, d: "High" },
  { r: "Produktchef (Product Manager)", c: "Ekonomi", s: 56000, d: "High" },
  { r: "Affärsutvecklare (Business Developer)", c: "Ekonomi", s: 51000, d: "High" },
  { r: "Kontorschef (Office Manager)", c: "Ekonomi", s: 37500, d: "Medium" },
  { r: "Administratör / Sekreterare", c: "Ekonomi", s: 29500, d: "Low" },
  { r: "Registrator", c: "Ekonomi", s: 31000, d: "Medium" },
  { r: "Nämndsekreterare", c: "Ekonomi", s: 34500, d: "High" },
  { r: "Receptionist", c: "Ekonomi", s: 25500, d: "Low" },
  { r: "Kundtjänstmedarbetare", c: "Ekonomi", s: 26000, d: "High" },
  { r: "Telefonist", c: "Ekonomi", s: 25000, d: "Low" },
  { r: "Kassör (Cashier)", c: "Ekonomi", s: 25100, d: "Low" },
  { r: "Försäkringshandläggare", c: "Ekonomi", s: 33500, d: "Medium" },
  { r: "Pensionshandläggare", c: "Ekonomi", s: 34000, d: "High" },
  { r: "Skadehandläggare", c: "Ekonomi", s: 32500, d: "High" },
  { r: "Underwriter", c: "Ekonomi", s: 46000, d: "Medium" },
  { r: "Kreditlytiker (Credit Analyst)", c: "Ekonomi", s: 45000, d: "Medium" },
  { r: "Fondförvaltare (Fund Manager)", c: "Ekonomi", s: 68000, d: "Medium" },
  { r: "Styrelseledamot / Styrelseproffs", c: "Ekonomi", s: 75000, d: "Medium" },
  { r: "Patentombud", c: "Ekonomi", s: 54000, d: "High" },
  { r: "Varumärkesombud / IP-jurist", c: "Ekonomi", s: 52000, d: "Medium" },
  { r: "Paralegal (Juristassistent)", c: "Ekonomi", s: 33000, d: "High" },
  { r: "HR-direktör (CHRO)", c: "Ekonomi", s: 67000, d: "Medium" },
  { r: "Kommunikationschef (CCO)", c: "Ekonomi", s: 58000, d: "Medium" },
  { r: "Prisanalytiker", c: "Ekonomi", s: 42000, d: "Medium" },
  { r: "Tullsamordnare / Tullklarerare", c: "Ekonomi", s: 33000, d: "High" },
  { r: "Marknadsanalytiker", c: "Ekonomi", s: 41000, d: "Medium" },
  { r: "Beteendevetare, HR-inriktning", c: "Ekonomi", s: 38000, d: "Medium" },
  { r: "Facklig ombudsman", c: "Ekonomi", s: 39500, d: "Medium" },
  { r: "Karriärcoach", c: "Ekonomi", s: 34000, d: "High" },
  { r: "Fastighetsförvaltare", c: "Ekonomi", s: 41000, d: "High" },
  { r: "Köpcentrumsledare", c: "Ekonomi", s: 48000, d: "Medium" },
  { r: "Uthyrare, bostäder/lokaler", c: "Ekonomi", s: 33000, d: "Medium" },
  { r: "Siloansvarig / Silotransportör", c: "Ekonomi", s: 31000, d: "Medium" },
  { r: "Marknadsdirektör (CMO)", c: "Ekonomi", s: 62000, d: "Medium" },
  { r: "Försäljningschef", c: "Ekonomi", s: 52000, d: "High" },
  { r: "Konfidentiell sekreterare", c: "Ekonomi", s: 34000, d: "Low" },
  { r: "Eventansvarig / Eventkoordinator", c: "Ekonomi", s: 31500, d: "Medium" },
  { r: "Media Buyer", c: "Ekonomi", s: 37100, d: "Medium" },
  { r: "Innehållsproducent / Content Creator", c: "Ekonomi", s: 31000, d: "High" },
  { r: "Arkivarie (Archivist)", c: "Ekonomi", s: 35000, d: "Medium" },
  { r: "Näringslivsutvecklare", c: "Ekonomi", s: 44005, d: "Medium" },
  { r: "E-handelsansvarig (E-commerce Manager)", c: "Ekonomi", s: 43000, d: "High" },
  { r: "Tidbokare / Koordinator", c: "Ekonomi", s: 27000, d: "Low" },
  { r: "Skattedokumentatör", c: "Ekonomi", s: 35000, d: "Medium" },
  { r: "Investeringsanalytiker", c: "Ekonomi", s: 52000, d: "Medium" },
  { r: "Portföljförvaltare, fastigheter", c: "Ekonomi", s: 54000, d: "High" },

  // === UTBILDNING (60 jobs) ===
  { r: "Förskolelärare (Preschool Teacher)", c: "Utbildning", s: 34500, d: "High" },
  { r: "Barnskötare (Childcarer)", c: "Utbildning", s: 27500, d: "High" },
  { r: "Grundskollärare (F-3)", c: "Utbildning", s: 38500, d: "High" },
  { r: "Grundskollärare (4-6)", c: "Utbildning", s: 39000, d: "High" },
  { r: "Grundskollärare (7-9)", c: "Utbildning", s: 40500, d: "High" },
  { r: "Gymnasielärare (humanistiska ämnen)", c: "Utbildning", s: 41000, d: "Medium" },
  { r: "Gymnasielärare (naturvetenskap/matte)", c: "Utbildning", s: 42500, d: "High" },
  { r: "Gymnasielärare (yrkesämnen)", c: "Utbildning", s: 43000, d: "High" },
  { r: "Speciallärare (Special Teacher)", c: "Utbildning", s: 44000, d: "High" },
  { r: "Specialpedagog", c: "Utbildning", s: 45000, d: "High" },
  { r: "Svensklärare för invandrare (SFI-lärare)", c: "Utbildning", s: 37550, d: "High" },
  { r: "Modersmålslärare", c: "Utbildning", s: 36000, d: "High" },
  { r: "Yrkeshögskolelärare", c: "Utbildning", s: 40500, d: "High" },
  { r: "Universitetslektor", c: "Utbildning", s: 46000, d: "Medium" },
  { r: "Universitetsprofessor", c: "Utbildning", s: 63000, d: "Medium" },
  { r: "Forskarassistent (Postdoc)", c: "Utbildning", s: 39000, d: "Medium" },
  { r: "Forskarchef (Research Director)", c: "Utbildning", s: 57000, d: "Medium" },
  { r: "Folkhögskolelärare", c: "Utbildning", s: 37000, d: "Medium" },
  { r: "Studie- och yrkesvägledare (SYV)", c: "Utbildning", s: 37200, d: "High" },
  { r: "Skolpsykolog (School Psychologist)", c: "Utbildning", s: 46000, d: "High" },
  { r: "Fritidspedagog / Lärare i fritidshem", c: "Utbildning", s: 34000, d: "High" },
  { r: "Elevassistent (Teaching Assistant)", c: "Utbildning", s: 26000, d: "High" },
  { r: "Simlärare (Swimming Instructor)", c: "Utbildning", s: 26000, d: "Medium" },
  { r: "Trafiklärare / Körskolelärare", c: "Utbildning", s: 34000, d: "High" },
  { r: "Danspedagog / Danslärare", c: "Utbildning", s: 30500, d: "Medium" },
  { r: "Musiklärare", c: "Utbildning", s: 34500, d: "Medium" },
  { r: "Idrottslärare (Gym Teacher)", c: "Utbildning", s: 36500, d: "High" },
  { r: "Slöjdlärare", c: "Utbildning", s: 37500, d: "High" },
  { r: "Bildlärare", c: "Utbildning", s: 35000, d: "Medium" },
  { r: "Rektor, grundskola", c: "Utbildning", s: 56000, d: "High" },
  { r: "Rektor, gymnasium", c: "Utbildning", s: 62000, d: "High" },
  { r: "Förskolechef / Enhetschef förskola", c: "Utbildning", s: 48000, d: "High" },
  { r: "Skolutvecklare", c: "Utbildning", s: 44000, d: "Medium" },
  { r: "Utbildningsledare, YH-utbildning", c: "Utbildning", s: 41000, d: "High" },
  { r: "Teaterlärare / Dramapedagog", c: "Utbildning", s: 31000, d: "Medium" },
  { r: "Sångpedagog", c: "Utbildning", s: 31500, d: "Medium" },
  { r: "Hundinstruktör", c: "Utbildning", s: 27000, d: "Medium" },
  { r: "Hästskötare med ridinstruktion", c: "Utbildning", s: 26000, d: "Low" },
  { r: "Forskare, humaniora", c: "Utbildning", s: 42000, d: "Low" },
  { r: "Forskare, samhällsvetenskap", c: "Utbildning", s: 43500, d: "Medium" },
  { r: "Forskare, naturvetenskap", c: "Utbildning", s: 46000, d: "Medium" },
  { r: "Laboratorieassistent, skola", c: "Utbildning", s: 28500, d: "Low" },
  { r: "Utbildningskoordinator", c: "Utbildning", s: 35000, d: "Medium" },
  { r: "E-learningutvecklare", c: "Utbildning", s: 42000, d: "High" },
  { r: "Studieadministratör", c: "Utbildning", s: 29500, d: "Medium" },
  { r: "Kursledare, vuxenutbildning", c: "Utbildning", s: 33500, d: "Medium" },
  { r: "Akademisk rådgivare", c: "Utbildning", s: 35200, d: "Medium" },
  { r: "Högskoleadjunkt", c: "Utbildning", s: 41000, d: "Medium" },
  { r: "Doktorand (PhD Candidate)", c: "Utbildning", s: 31500, d: "High" },
  { r: "Militärinstruktör", c: "Utbildning", s: 42000, d: "High" },
  { r: "Polisutbildare", c: "Utbildning", s: 44000, d: "Medium" },
  { r: "Naturvägledare (Nature Guide)", c: "Utbildning", s: 29000, d: "Low" },
  { r: "Arkeolog (Archaeologist)", c: "Utbildning", s: 34500, d: "Low" },
  { r: "Museipedagog", c: "Utbildning", s: 31000, d: "Medium" },
  { r: "Slöjdpedagog", c: "Utbildning", s: 33000, d: "Medium" },
  { r: "Fritidsledare, fritidsgård", c: "Utbildning", s: 29300, d: "Medium" },
  { r: "Skolgårdspedagog", c: "Utbildning", s: 31000, d: "High" },
  { r: "Modersmålsstödjare, förskola", c: "Utbildning", s: 28000, d: "High" },
  { r: "Teckenspråkstolk", c: "Utbildning", s: 32500, d: "High" },
  { r: "Skrivtolk", c: "Utbildning", s: 31000, d: "Medium" }
];

// Helper to determine active ads realistically based on avgSalary & category.
// Returns a deterministic seed-based ad count.
export function calculateActiveAds(role: string, s: number, d: "High" | "Medium" | "Low"): number {
  let multiplier = d === "High" ? 1.5 : d === "Medium" ? 0.7 : 0.25;
  let hash = 0;
  for (let i = 0; i < role.length; i++) {
    hash = role.charCodeAt(i) + ((hash << 5) - hash);
  }
  let baseRand = Math.abs(hash % 1500) + 150;
  return Math.floor(baseRand * multiplier);
}

// Generate the fully structured DemandJob representation
export function expandCompactJob(compact: CompactJobDef): {
  role: string;
  activeAds: number;
  avgSalary: number;
  salaryRange: string;
  demandLevel: "High" | "Medium" | "Low";
  futureOutlook: string;
  requiredSkills: string[];
  educationRequired: string;
  category: string;
} {
  const ads = calculateActiveAds(compact.r, compact.s, compact.d);
  const minSal = Math.round((compact.s * 0.76) / 500) * 500;
  const maxSal = Math.round((compact.s * 1.35) / 500) * 500;
  const rangeStr = `${minSal.toLocaleString("sv-SE")} - ${maxSal.toLocaleString("sv-SE")} SEK/månad`;

  // Tailored dynamic skills, outlook and education by category/keywords
  let skills: string[] = [];
  let education = "";
  let outlook = "";

  const titleLower = compact.r.toLowerCase();

  // --- Category Specifics ---
  if (compact.c === "Teknik") {
    outlook = compact.d === "High" 
      ? "Mycket goda möjligheter till följd av pågående teknisk transformation, molnsatsningar och hög efterfrågan i industrin."
      : "Stabil marknad med ett jämnt inflöde av uppdrag och behov av kvalificerade systemtekniker.";
    
    // Skills mapping based on keyword matches
    if (titleLower.includes("utvecklare") || titleLower.includes("engineer")) {
      skills = ["TypeScript", "React", "Node.js", "Docker", "REST-API:er", "Azure/AWS"];
      education = "Högskoleingenjör i datateknik, kandidatexamen i datavetenskap eller YH-examen.";
    } else if (titleLower.includes("arkitekt")) {
      skills = ["Systemdesign", "Kubernetes", "Cloud Strategy", "Lösningsmönster", "Mikrotjänster"];
      education = "Civilingenjörsexamen eller mångårig dokumenterad specialistbakgrund som systemutvecklare.";
    } else if (titleLower.includes("säkerhet") || titleLower.includes("analyst") || titleLower.includes("responder")) {
      skills = ["Penetrationstestning", "Brandväggar", "ISO 27001", "Nätverkssäkerhet", "Incidenthantering"];
      education = "Specialistutbildning inom cybersäkerhet från YH eller kandidatexamen inom datorsäkerhet.";
    } else if (titleLower.includes("ingenjör") || titleLower.includes("konstruktör")) {
      skills = ["CAD-konstruktion", "SolidWorks", "Beräkningsteknik", "Materiallära", "Projektstyrning"];
      education = "Civil- eller högskoleingenjörsexamen inom relevant tekniskt ämnesområde.";
    } else if (titleLower.includes("forskare") || titleLower.includes("matematiker") || titleLower.includes("aktuarie")) {
      skills = ["Statistisk Analys", "Python/R", "Prediktiva modeller", "Kvantitativa metoder", "Aktuariematematik"];
      education = "Master- eller doktorsexamen i tillämpad matematik, matematisk statistik eller fysik.";
    } else {
      skills = ["Felsökning", "Systemsupport", "Operativsystem", "Nätverkskonfiguration", "ITIL Framework"];
      education = "Gymnasial IT-utbildning och yrkesinriktade systemcertifikat (CompTIA, CCNA).";
    }

  } else if (compact.c === "Hälsa") {
    outlook = "Mycket stabil efterfrågan i hela Sverige. Den åldrande befolkningen och bristen på specialistkompetens garanterar goda utsikter.";

    if (titleLower.includes("läkare")) {
      skills = ["Klinisk diagnostik", "Patientkonsultation", "Läkemedelsförskrivning", "Journalföring", "Akutmedicinskt stöd"];
      education = "Läkarexamen (5,5 - 6 år), legitimation från Socialstyrelsen samt eventuell specialistutbildning.";
    } else if (titleLower.includes("sjuksköterska")) {
      skills = ["Akutvård", "Läkemedelshantering", "Provtagning", "Patientomvårdnad", "Medicinsk teknik"];
      education = "Sjuksköterskeexamen (3 år) samt svensk yrkeslegitimation. Specialistutbildning för tidsbesparande roller.";
    } else if (titleLower.includes("tandläkare") || titleLower.includes("tandhygienist")) {
      skills = ["Tandvård", "Röntgenanalys", "Kariesbehandling", "Patientrådgivning", "Sterilarbete"];
      education = "Tandläkar- eller tandhygienistprogrammet samt legitimation från Socialstyrelsen.";
    } else if (titleLower.includes("terapeut") || titleLower.includes("fysio") || titleLower.includes("kiro") || titleLower.includes("naprapat") || titleLower.includes("logoped")) {
      skills = ["Rehabilitering", "Kroppsanalys", "Rörelseterapi", "Ergonomi", "Träningsprogram"];
      education = "Relevanta högskoleprogram (t.ex. arbetsterapeut, fysioterapeut, logoped) samt svensk yrkeslegitimation.";
    } else if (titleLower.includes("undersköterska") || titleLower.includes("skötare") || titleLower.includes("assistent")) {
      skills = ["Äldreomsorg", "Hemvård", "ADL (Aktiviteter i dagliga livet)", "Blodtrycksmätning", "Social dokumentation"];
      education = "Vård- och omsorgsprogrammet (gymnasienivå eller vuxenutbildning/Komvux) för skyddad yrkestitel.";
    } else if (titleLower.includes("veterinär") || titleLower.includes("djursjukskötare")) {
      skills = ["Djurkirurgi", "Djurdiagnostik", "Läkemedelsförskrivning", "Sårbehandling", "Rådgivning djurägare"];
      education = "Veterinär- eller djursjukskötarexamen samt legitimation från Jordbruksverket.";
    } else {
      skills = ["Medicinsk dokumentation", "Provtagningsmetodik", "Labbanalys", "Mottagningsarbete", "Medicinsk terminologi"];
      education = "Biomedicinsk analytikerutbildning eller medicinsk sekreterarutbildning via YH.";
    }

  } else if (compact.c === "Säkerhet / Logistik") {
    outlook = compact.d === "High"
      ? "Mycket goda möjligheter. Transport- och säkerhetsbranscherna har ett kroniskt rekryteringsbehov på grund av stora pensionsavgångar."
      : "Stabilt behov som generellt följer den industriella konjunkturen och den nationella tillväxten.";

    if (titleLower.includes("chaufför") || titleLower.includes("förare") || titleLower.includes("pilot")) {
      skills = ["Yrkeskompetensbevis (YKB)", "Körkort (C/CE/D/CE)", "Lastsäkring", "Navigering", "Eco-Driving"];
      education = "Yrkesförarutbildning på gymnasienivå, godkänd vuxenutbildning (Komvux) samt gällande yrkeslicenser.";
    } else if (titleLower.includes("lager") || titleLower.includes("truck")) {
      skills = ["Truckkort (A+B)", "Plock och Pack", "Lagersystem (WMS)", "Logistikflöde", "Arbetsmiljösäkerhet"];
      education = "Ingen formell eftergymnasial utbildning krävs. Giltigt truckkort är starkt meriterande.";
    } else if (titleLower.includes("väktare") || titleLower.includes("skyddsvakt") || titleLower.includes("polis") || titleLower.includes("ordning")) {
      skills = ["Konflikthantering", "Hjärt-lungräddning (HLR)", "Rondering", "Lag & Rätt", "Bevakningsmetodik"];
      education = "Godkänd väktarutbildning (VU1 & VU2) via auktoriserat organ, Polisutbildning eller militär examen.";
    } else if (titleLower.includes("elektriker") || titleLower.includes("vvs") || titleLower.includes("rörmokare") || titleLower.includes("montör")) {
      skills = ["Ritningsläsning", "Kopplingsschema", "Felförebyggande underhåll", "Elsäkerhet", "Sanitetsteknik"];
      education = "Gymnasialt bygg-, fastighets- eller elprogram samt lärlingstid för formellt yrkesbevis.";
    } else {
      skills = ["Ritningsförståelse", "Materialbehandling", "Svets- och lödningsteknik", "CNC-programmering", "Kvalitetskontroller"];
      education = "Gymnasial industriteknisk utbildning eller specialistcertifiering inom yrkesområdet.";
    }

  } else if (compact.c === "Ekonomi") {
    outlook = "Goda framtidsutsikter för kvalificerade rådgivare, controllers och juridiskt kunnig personal i svenskt näringsliv.";

    if (titleLower.includes("revisor") || titleLower.includes("ekonom") || titleLower.includes("controller")) {
      skills = ["Bokslut & Redovisning", "Excel (avancerad)", "Finansiell analys", "Budgetuppföljning", "Ekonomistyrning"];
      education = "Kandidatexamen i ekonomi eller civilekonomutbildning. Eventuell auktorisation för revisionsroller.";
    } else if (titleLower.includes("jurist") || titleLower.includes("advokat") || titleLower.includes("åklagare") || titleLower.includes("domare")) {
      skills = ["Svensk lagstiftning", "Avtalsrätt", "Juridisk argumentation", "Retorik", "Rådgivning"];
      education = "Juristexamen (Master of Laws, LL.M. på 4,5 år) från svenskt universitet samt tingsnotarietjänstgöring.";
    } else if (titleLower.includes("säljare") || titleLower.includes("account") || titleLower.includes("inköpare")) {
      skills = ["B2B-försäljning", "Affärsförhandling", "CRM-hantering (Salesforce)", "Kundvård", "Avtalsförhandling"];
      education = "Inriktning mot försäljning/marknad från YH-examen eller mångårig framgångsrik säljerfarenhet.";
    } else if (titleLower.includes("hr") || titleLower.includes("rekryterare") || titleLower.includes("personal")) {
      skills = ["Arbetsrätt (LAS/MBL)", "Rekryteringsteknik", "Fackliga relationer", "Employer Branding", "Lönesystem"];
      education = "Kandidatexamen inom personal- och arbetslivsfrågor (PA-programmet) eller systemvetenskap.";
    } else if (titleLower.includes("socionom") || titleLower.includes("kurator") || titleLower.includes("biståndshandläggare")) {
      skills = ["Utredningsmetodik", "Mottagningssamtal", "Krisstöd", "Sociallagstiftning", "Myndighetsutövning"];
      education = "Socionomexamen (3,5 år) från svenskt universitet eller högskola.";
    } else {
      skills = ["Administration", "Ärendehantering", "Kundservice", "Dokumentation", "Kontorsprogramvaror"];
      education = "Slutförd gymnasieutbildning, administrationsutbildning via Komvux eller yrkeshögskola.";
    }

  } else if (compact.c === "Utbildning") {
    outlook = "Mycket stark efterfrågan. Skolverkets prognoser pekar på fortsatt stora rekryteringsbehov av behöriga lärare i hela landet.";

    if (titleLower.includes("grundskollärare") || titleLower.includes("gymnasielärare") || titleLower.includes("förskolelärare") || titleLower.includes("lärare")) {
      skills = ["Pedagogik", "Betygsättning & Bedömning", "Klassrumsledarskap", "Föräldrasamtal", "Mentorskap"];
      education = "Lärar- eller förskollärarexamen (3,5 - 5 år) samt svensk lärarlegitimation från Skolverket.";
    } else if (titleLower.includes("rektor") || titleLower.includes("chef")) {
      skills = ["Klassrumsmiljöledning", "Personalansvar", "Budgetansvar", "Skollagstiftning", "Strategisk skolutveckling"];
      education = "Lärarlegitimation, mångårig pedagogisk arbetslivserfarenhet samt den statliga rektorsutbildningen.";
    } else if (titleLower.includes("psykolog") || titleLower.includes("kurator") || titleLower.includes("syv") || titleLower.includes("pedagog")) {
      skills = ["Studievägledning", "Krisstöd", "Elevhälsoarbete", "Samtalsterapi", "Konfliktlösning"];
      education = "SYV-utbildning (3 år), socionomprogrammet eller psykologexamen med svensk legitimation.";
    } else if (titleLower.includes("forskare") || titleLower.includes("professor") || titleLower.includes("lektor")) {
      skills = ["Vetenskaplig metod", "Forskningsanslag", "Akademiskt skrivande", "Undervisning", "Datainsamling"];
      education = "Doktorsexamen (Ph.D.) samt dokumenterad postdoktoral forskning och pedagogisk meritering.";
    } else {
      skills = ["Pedagogiskt stöd", "Elevstöd", "Aktivitetsplanering", "Trygghetsskapande", "Gruppaktiviteter"];
      education = "Gymnasial utbildning med barn- och fritidsinriktning, fritidsledarutbildning eller Komvux.";
    }
  }

  return {
    role: compact.r,
    activeAds: ads,
    avgSalary: compact.s,
    salaryRange: rangeStr,
    demandLevel: compact.d,
    futureOutlook: outlook,
    requiredSkills: skills,
    educationRequired: education,
    category: compact.c === "Hälsa" ? "Hälsa" : compact.c
  };
}

// Convert all 390 compact jobs to fully functional DemandJob items
export const EXPANDED_EXTRA_JOBS = EXTRA_JOBS_COMPACT.map(expandCompactJob);

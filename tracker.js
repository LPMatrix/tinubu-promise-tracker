const STATUSES = [
  { key: 'all',     label: 'All' },
  { key: 'kept',    label: 'Kept' },
  { key: 'partial', label: 'Partial' },
  { key: 'broken',  label: 'Broken' },
  { key: 'pending', label: 'In progress' },
];

const promises = [
  {
    id: 1,
    title: 'Remove petrol subsidy and redirect savings to infrastructure',
    category: 'Economy',
    status: 'partial',
    promise: 'Announced on inauguration day ("subsidy is gone"). Promised savings would be redirected to public infrastructure and welfare for the most vulnerable.',
    assessment: 'Subsidy was removed immediately on May 29, 2023. Fuel prices surged from ₦187 to over ₦700/litre. The ₦8,000/month palliative cash transfer programme was announced but reached only a fraction of intended recipients. Infrastructure redirection remains largely unverified.',
    source: 'https://www.bsg.ox.ac.uk/blog/midterm-assessment-evaluating-president-tinubus-first-two-years-office',
    sourceLabel: 'Oxford Blavatnik School — midterm assessment',
    updated: 'May 2025',
  },
  {
    id: 2,
    title: 'Unify the foreign exchange market',
    category: 'Economy',
    status: 'kept',
    promise: 'End Nigeria\'s multiple exchange rate regime and unify the official and parallel market rates.',
    assessment: 'The CBN unified exchange rates in June 2023. The naira was significantly devalued as a result — falling from ~₦460/$ to over ₦1,500/$ at one point — but the structural reform was implemented.',
    source: 'https://www.bsg.ox.ac.uk/blog/midterm-assessment-evaluating-president-tinubus-first-two-years-office',
    sourceLabel: 'Oxford Blavatnik School — midterm assessment',
    updated: 'May 2025',
  },
  {
    id: 3,
    title: 'Reduce inflation to 15% by end of 2025',
    category: 'Economy',
    status: 'broken',
    promise: 'Pledged during the 2024 budget presentation to bring inflation down to 15% by December 2025.',
    assessment: 'Inflation remained around 18% at end of 2025 — down from a peak of ~34% but well above the 15% target. Food inflation eased due to harvest season, not structural change. Analysts note transport, housing, and power costs are still rising.',
    source: 'https://punchng.com/tracking-tinubus-five-major-economic-pledges/',
    sourceLabel: 'Punch — tracking five economic pledges',
    updated: 'December 2025',
  },
  {
    id: 4,
    title: 'Create 50 million jobs',
    category: 'Economy',
    status: 'pending',
    promise: 'Create 50 million jobs for the teeming youthful population through collaboration across ministries.',
    assessment: 'No verifiable progress data published. The Ministry of Industry, Trade and Investment expressed confidence at inception. No independent tracking mechanism has been established.',
    source: 'https://dailytrust.com/tinubu-unveils-8-point-agenda/',
    sourceLabel: 'Daily Trust — 8-point agenda',
    updated: 'August 2023',
  },
  {
    id: 5,
    title: 'Achieve 7% annual GDP growth by 2027',
    category: 'Economy',
    status: 'pending',
    promise: 'Announced in August 2025 — target at least 7% annual economic growth by 2027 through bold reforms and infrastructure expansion.',
    assessment: 'Current GDP growth rate is 4.23%. Target is ambitious. Tracking depends on quarterly GDP reports over the next two years.',
    source: 'https://punchng.com/tracking-tinubus-five-major-economic-pledges/',
    sourceLabel: 'Punch — tracking five economic pledges',
    updated: 'October 2025',
  },
  {
    id: 6,
    title: 'Tackle insecurity — obliterate terror, kidnapping and banditry',
    category: 'Security',
    status: 'broken',
    promise: 'Make it a fundamental responsibility to protect lives and property. Mobilise national security and military assets to obliterate terror, kidnapping, banditry and all other forms of violent extremism.',
    assessment: 'Security budget increased 160% from ₦1.25trn (2023) to ₦3.25trn (2024). Despite this, 17,617 fatalities and 16,462 abductions were recorded from June 2023 to April 2025. Governors of Borno and Plateau states publicly stated government forces were "losing ground" to terrorists in April 2025.',
    source: 'https://trt.global/afrika-english/article/04ebd1191144',
    sourceLabel: 'TRT Afrika — midterm security review',
    updated: 'May 2025',
  },
  {
    id: 7,
    title: 'Deliver affordable and sufficient electricity',
    category: 'Energy',
    status: 'broken',
    promise: 'Generate, transmit and distribute sufficient, affordable electricity. Administration pledged if it fails to solve the power problem, it should not be re-elected.',
    assessment: 'Electricity tariffs were increased in 2024. Power supply has not materially improved for most Nigerians. Aregbesola, a former ally, cited electricity failure as the clearest broken promise in April 2026.',
    source: 'https://osundefender.com/tinubus-renewed-hope-agenda-a-scam-aregbesola/',
    sourceLabel: 'Osun Defender — Aregbesola assessment',
    updated: 'April 2026',
  },
  {
    id: 8,
    title: 'Make healthcare, education and housing accessible and affordable',
    category: 'Social',
    status: 'pending',
    promise: 'Make basic healthcare, education, and housing accessible and affordable for all Nigerians.',
    assessment: 'Some investments in education infrastructure and digital skills noted. Number of out-of-school children reportedly increased from 18.3 million to nearly 20 million under this administration according to opposition critics. No comprehensive housing programme launched.',
    source: 'https://glamtush.com/tinubus-renewed-hope-is-a-scam-aregbesola/',
    sourceLabel: 'Aregbesola ADC convention speech',
    updated: 'April 2026',
  },
  {
    id: 9,
    title: 'Pass landmark tax reform legislation',
    category: 'Economy',
    status: 'kept',
    promise: 'Raise Nigeria\'s tax-to-GDP ratio, enhance fiscal transparency, and reduce revenue leakages through comprehensive tax reform.',
    assessment: 'Four major tax reform bills signed into law on June 26, 2025: the Nigeria Tax Act, Nigeria Tax Administration Act, Nigeria Revenue Service Establishment Act, and Joint Revenue Board Establishment Act. Laws take effect January 2026.',
    source: 'https://punchng.com/tracking-tinubus-five-major-economic-pledges/',
    sourceLabel: 'Punch — tracking five economic pledges',
    updated: 'June 2025',
  },
  {
    id: 10,
    title: 'Boost food security and local agricultural production',
    category: 'Agriculture',
    status: 'partial',
    promise: 'Boost food production through a new agricultural policy, commodity exchanges, and supporting young farmers. Food security listed as a top 8-point agenda item.',
    assessment: 'Food inflation eased somewhat by late 2025 due to harvest cycles. No commodity exchange has been established. Youth farmer programme details remain unclear. Poverty levels described by analysts as continuing to rise despite food price moderation.',
    source: 'https://punchng.com/tracking-tinubus-five-major-economic-pledges/',
    sourceLabel: 'Punch — tracking five economic pledges',
    updated: 'December 2025',
  },
  {
    id: 11,
    title: 'Fight corruption and strengthen rule of law',
    category: 'Governance',
    status: 'pending',
    promise: 'Fight corruption to its knees, support anti-corruption agencies, and not relent on Buhari\'s anti-corruption fight. Establish rule of law as a core pillar.',
    assessment: 'Tax reform bills include transparency provisions. However, critics including NLC and opposition note that anti-corruption action has not been visible. No high-profile convictions of political figures have occurred.',
    source: 'https://dailytrust.com/tinubus-unfulfilled-promises-2025/',
    sourceLabel: 'Daily Trust — 2025 unfulfilled promises',
    updated: 'December 2025',
  },
  {
    id: 12,
    title: 'End overlapping budget cycles',
    category: 'Governance',
    status: 'broken',
    promise: 'Promised in December 2025 that by March 31, 2026, all capital liabilities from previous budgets would be fully funded and closed — ending Nigeria\'s habit of running three budgets in one flow.',
    assessment: 'The Senate extended the 2025 budget capital implementation to June 2026 in April 2026 — the second extension. The overlapping cycle Tinubu explicitly promised to terminate has continued.',
    source: 'https://allafrica.com/stories/202604010059.html',
    sourceLabel: 'AllAfrica — Senate budget extension',
    updated: 'April 2026',
  },
  {
    id: 13,
    title: 'Empower youth through tech, sports and entrepreneurship',
    category: 'Youth',
    status: 'partial',
    promise: 'Invest in sports, entertainment, culture, youth empowerment and entrepreneurship to expand job opportunities for millions of Nigerian youths. Harness digital economy for young Nigerians.',
    assessment: 'Ministry of Digital Economy has run tech skills programmes. Telecom sector recorded significant capital inflows. However, data costs increased, youth unemployment remains unacceptably high, and the promised youth conference has not been held.',
    source: 'https://www.bsg.ox.ac.uk/blog/midterm-assessment-evaluating-president-tinubus-first-two-years-office',
    sourceLabel: 'Oxford Blavatnik School — midterm assessment',
    updated: 'May 2025',
  },
  {
    id: 14,
    title: 'Launch major infrastructure projects — roads and rail',
    category: 'Infrastructure',
    status: 'partial',
    promise: 'Modernise and expand public infrastructure. Flagged major projects including the Lagos–Calabar Coastal Highway, Sokoto–Badagry Superhighway, Abuja–Kaduna–Kano Road, and rail expansion.',
    assessment: 'Projects were officially flagged off in June 2025. Implementation is ongoing but contested. Budget capital component has been extended twice — raising implementation credibility concerns.',
    source: 'https://punchng.com/tracking-tinubus-five-major-economic-pledges/',
    sourceLabel: 'Punch — tracking five economic pledges',
    updated: 'October 2025',
  },
  {
    id: 15,
    title: 'Launch a student loan programme for higher education',
    category: 'Education',
    status: 'partial',
    promise: 'Provide accessible student loans to Nigerian university and polytechnic students to reduce the financial burden of higher education. The Student Loans Act was signed on June 12, 2023.',
    assessment: 'The Nigerian Education Loan Fund (NELFUND) was established and began disbursements in 2024, initially targeting federal polytechnic students. By 2025, over ₦50 billion had been disbursed. However, coverage remains limited — many eligible students at state institutions have not accessed the fund, and application processes have been criticised for complexity.',
    source: 'https://nelfund.gov.ng',
    sourceLabel: 'NELFUND — official portal',
    updated: 'March 2026',
  },
  {
    id: 16,
    title: 'Roll out CNG buses to reduce transportation costs',
    category: 'Transport',
    status: 'partial',
    promise: 'Launch a Presidential Compressed Natural Gas (CNG) Initiative to convert public transport to CNG, reducing fuel costs for Nigerians following the petrol subsidy removal.',
    assessment: 'The Presidential CNG Initiative was formally launched in 2023. Conversion centres and a limited fleet of CNG buses were deployed, primarily in Lagos and Abuja. Uptake has been slow due to limited CNG infrastructure nationwide. The programme has not yet meaningfully offset the transport cost surge from subsidy removal.',
    source: 'https://punchng.com/tracking-tinubus-five-major-economic-pledges/',
    sourceLabel: 'Punch — CNG initiative coverage',
    updated: 'December 2025',
  },
  {
    id: 17,
    title: 'Raise the national minimum wage',
    category: 'Labour',
    status: 'kept',
    promise: 'Review and increase the national minimum wage in consultation with labour unions to reflect the rising cost of living after subsidy removal.',
    assessment: 'After prolonged negotiations and a threatened general strike by the Nigerian Labour Congress, Tinubu signed a new National Minimum Wage Act in July 2024, raising the floor from ₦30,000 to ₦70,000 per month. Labour unions had initially demanded ₦250,000. The ₦70,000 figure was accepted as a compromise and enacted into law.',
    source: 'https://punchng.com/tinubu-signs-70000-minimum-wage/',
    sourceLabel: 'Punch — minimum wage signing',
    updated: 'July 2024',
  },
  {
    id: 18,
    title: 'Establish state police and reform internal security',
    category: 'Security',
    status: 'partial',
    promise: 'Reform Nigeria\'s policing architecture by enabling state-level police forces through constitutional amendment, improving community-based security across the federation.',
    assessment: 'Tinubu signed a constitutional amendment in July 2024 enabling states to establish their own police forces — a historic structural shift. However, most states have not yet operationalised their forces as of early 2026. Implementation timelines, funding mechanisms, and oversight frameworks remain unclear.',
    source: 'https://dailytrust.com/tinubu-signs-state-police-bill/',
    sourceLabel: 'Daily Trust — state police bill signing',
    updated: 'January 2026',
  },
  {
    id: 19,
    title: 'Fully fund the Basic Health Care Provision Fund',
    category: 'Health',
    status: 'pending',
    promise: 'Ensure full and timely release of the Basic Health Care Provision Fund (BHCPF) to primary healthcare centres across all 36 states, improving grassroots healthcare access for the poorest Nigerians.',
    assessment: 'The BHCPF has historically been under-funded under previous administrations. Under Tinubu, some releases have occurred but civil society monitors note that rural primary health centres continue to suffer from drug stockouts, staffing shortfalls, and delayed disbursements. No independent audit of BHCPF releases under this administration has been published.',
    source: 'https://dailytrust.com/tinubus-unfulfilled-promises-2025/',
    sourceLabel: 'Daily Trust — unfulfilled promises 2025',
    updated: 'December 2025',
  },
  {
    id: 20,
    title: 'Implement 35% affirmative action in federal appointments',
    category: 'Governance',
    status: 'broken',
    promise: 'Ensure women occupy at least 35% of federal government appointments, in line with Nigeria\'s commitment to the Beijing Platform for Action and the SDG gender equality goals.',
    assessment: 'Tinubu\'s initial 48-member cabinet included only 7 women — approximately 14.6%, well below the 35% target. Subsequent appointments have not brought the aggregate to target. Women\'s rights groups including WRAPA and the Gender and Equal Opportunities Commission have publicly criticised the administration\'s record on this pledge.',
    source: 'https://guardian.ng/news/nigeria/tinubus-cabinet-gender-gap/',
    sourceLabel: 'The Guardian Nigeria — cabinet gender gap',
    updated: 'March 2026',
  },
  {
    id: 21,
    title: 'Improve diaspora remittance policies and engagement',
    category: 'Economy',
    status: 'partial',
    promise: 'Engage the Nigerian diaspora as a strategic economic partner, improve remittance inflows, and reduce the cost and friction of sending money home to Nigeria.',
    assessment: 'The CBN in 2023 introduced a policy allowing licensed banks to pay diaspora remittances directly in foreign currency, ending forced naira conversion. Nigeria\'s estimated remittance inflows improved, reaching approximately $20 billion in 2024. However, transfer fees remain high relative to global benchmarks, and a formal diaspora engagement policy framework has not been published.',
    source: 'https://www.bsg.ox.ac.uk/blog/midterm-assessment-evaluating-president-tinubus-first-two-years-office',
    sourceLabel: 'Oxford Blavatnik School — midterm assessment',
    updated: 'May 2025',
  },
  {
    id: 22,
    title: "Grow Nigeria into a $1 trillion economy",
    category: "Economy",
    status: "pending",
    promise: "At the 29th Nigerian Economic Summit (October 2023), Tinubu set the ambition of a $1 trillion economy by 2026, later consolidated to a $1 trillion economy by 2030 with a stretch goal of $3 trillion by end of decade.",
    assessment: "By April 2026, Nigeria's GDP (rebased) stands at roughly $375–442 billion. The Minister of State for Finance and independent analysts confirm 10–17.6% annual real growth would be required to reach $1 trillion by 2030; actual 2025 growth was only 3.85–4.23%. The 2026 milestone is already missed; the 2030 target is technically alive but is extremely unlikely on current trajectory.",
    source: "https://economypost.ng/economy/nigeria-needs-17-6-annual-growth-to-achieve-tinubus-nearly-impossible-1trn-gdp-dream-by-2030/2026/03/20/",
    sourceLabel: "Economy Post",
    updated: "2026-04-16"
  },
  {
    id: 23,
    title: "Raise tax-to-GDP ratio to 18% in three years",
    category: "Economy",
    status: "partial",
    promise: "At the inauguration of the Presidential Fiscal Policy & Tax Reforms Committee on 8 August 2023, Tinubu pledged to \"transform the tax system to support sustainable development while achieving a minimum of 18% tax-to-GDP ratio within the next three years.\"", 
    assessment: "The ratio rose from about 10% in 2023 to 13.5% by end 2024,  driven by record FIRS collections of N21.66 trillion (111.6% of target)  and the 2025 Nigeria Tax Acts. However, the 18% target within the three-year window (expiring August 2026) will not be met on current data.",
    source: "https://businessday.ng/news/article/tinubu-targets-18-tax-to-gdp-ratio-with-oyedeles-tax-reforms-committee/",
    sourceLabel: "BusinessDay",
    updated: "2026-04-16"
  },
  {
    id: 24,
    title: "Lift crude production to 2.5 mbpd by 2027",
    category: "Energy",
    status: "pending",
    promise: "At the 9th Nigeria International Energy Summit (February 2026) Tinubu reaffirmed: \"Through targeted initiatives such as Project 1 Million Barrels Per Day, we are working systematically towards 2.5 million barrels per day by 2027… and 3 million barrels per day of liquid hydrocarbons and 12 billion cubic feet per day of gas by 2030.\"",
    assessment: "Output rose from about 1.2 mbpd in mid-2023  to 1.84 mbpd  by April 2026 (NUPRC). Rigs grew from 14 to 60+.  However, Nigeria remains approximately 660,000 bpd short of the 2.5 mbpd target with under 18 months remaining, making the 2027 milestone unlikely without sharp acceleration.",
    source: "https://www.arise.tv/tinubu-reaffirms-nigerias-3-million-bpd-oil-output-target-by-2030/",
    sourceLabel: "Arise News",
    updated: "2026-04-16"
  },
  {
    id: 25,
    title: "Project 1MMBOPD — add 1 million bpd in 12 months",
    category: "Energy",
    status: "broken",
    promise: "Tinubu launched the '1MMBOPD' Initiative  in August 2024 at NUPRC's 3rd anniversary, pledging to raise oil production by 1 million barrels per day within 12 months by \"harnessing dormant oil assets and optimising existing ones.\"",
    assessment: "20 months later (April 2026), production has risen only about 400,000–640,000 bpd above the 1.2 mbpd starting point — less than two-thirds of the target in nearly twice the stated time. Progress is real but the specific 12-month deliverable was missed.",
    source: "https://www.arise.tv/president-tinubu-launches-1mmbopd-initiative-to-boost-nigerias-oil-production-by-1m-bpd/",
    sourceLabel: "Arise News",
    updated: "2026-04-16"
  },
  {
    id: 26,
    title: "Restart Port Harcourt refinery by December 2023",
    category: "Energy",
    status: "broken",
    promise: "In August 2023, after a meeting with NLC/TUC, Tinubu publicly committed that the Port Harcourt refinery would commence production by December 2023,  with Warri and Kaduna refineries to follow in 2024.",
    assessment: "Phase-one mechanical completion was announced on 20 December 2023, but actual product loading did not begin until 26 November 2024 — nearly a year late — at only 60,000 bpd on the old plant. The 150,000 bpd new plant remains unreliable and the Warri and Kaduna refineries are still not operational at full capacity. Government has missed at least seven restart deadlines.",
    source: "https://tribuneonlineng.com/five-times-tinubus-govt-has-promised-to-kickstart-port-harcourt-refinery/",
    sourceLabel: "Nigerian Tribune",
    updated: "2026-04-16"
  },
  {
    id: 27,
    title: "Deliver 12 bcfd gas production by 2030",
    category: "Energy",
    status: "pending",
    promise: "Under Tinubu's \"Gas for Prosperity\" / Decade of Gas agenda, Nigeria committed to 12 billion cubic feet/day of gas production by 2030 via 16 named infrastructure projects requiring ~$22 billion in investment, with LPG consumption to rise from 1.8m to 3m tonnes annually.",
    assessment: "Gas production rose from 6.8 bcfd in 2023 to roughly 7.5 bcfd in 2025; domestic supply exceeded 2 bcfd for the first time.  ANOH plant commissioned May 2024 (+500 MMscf/d);  AKK and OB3  progressing; Jindal ($4bn) and Brass Methanol ($3.3bn) FIDs unlocked. Tracking well below the trajectory required for 12 bcfd by 2030.",
    source: "https://nannews.ng/decade-of-gas-nigeria-advances-16-projects-eyes-12bcfd-production-by-2030/",
    sourceLabel: "News Agency of Nigeria",
    updated: "2026-04-16"
  },
  {
    id: 28,
    title: "Complete bank recapitalisation for $1 trillion economy",
    category: "Economy",
    status: "kept",
    promise: "Tinubu endorsed CBN's recapitalisation plan in November 2023;  CBN formally announced in March 2024 that international-licensed banks must raise capital to N500 billion, national banks to N200 billion, regional banks to N50 billion, by March 2026.",
    assessment: "Exercise successfully concluded end-March 2026. Nigerian banks raised a total of N4.65 trillion in fresh capital;  33 lenders met thresholds; 72.55% sourced locally, 27.45% offshore. CBN has officially declared the sector \"positioned to fund a $1 trillion economy.\"", 
    source: "https://businessday.ng/news/article/33-banks-raise-n4-65trn-to-meet-new-capital-thresholds/",
    sourceLabel: "BusinessDay",
    updated: "2026-04-16"
  },
  {
    id: 29,
    title: "Launch National Single Window port reform",
    category: "Governance",
    status: "partial",
    promise: "At the National Single Window Steering Committee inauguration (April 2024), Tinubu said Nigeria loses \"$4 billion annually to red tape, bureaucracy, delays and corruption at the ports\" and pledged the NSW would yield \"an estimated $2.7 billion annually,\"  cutting clearance time from 72 hours to about 24 hours.",
    assessment: "NSW formally launched in April 2024, but 'go-live' was delayed to 27 March 2026. Only Phase 1 is functional; Phases 2 and 3 scheduled for Q2–Q3 2026 and Q4 2026–Q1 2027 respectively. $2.7 billion savings claim not yet verifiable.",
    source: "https://statehouse.gov.ng/president-tinubu-launches-national-single-window-initiative-to-enhance-revenue-generation-and-streamline-import-export-trade-process-for-ease-of-business/",
    sourceLabel: "State House",
    updated: "2026-04-16"
  },
  {
    id: 30,
    title: "Train 3 million technical talents by 2027",
    category: "Youth",
    status: "pending",
    promise: "Launched by Communications Minister Bosun Tijani in October/December 2023 under Tinubu's Renewed Hope Agenda: train 3 million Nigerians in 12 in-demand digital skill areas by 2027, alongside a parallel target of 2 million digital jobs by 2025.",
    assessment: "Phase 1 completed 30,000 fellows (March 2024); Phase 2 onboarded 270,000.  Total trained by late 2025: approximately 300,000 — only 10% of the 3 million target with one year remaining. The 2 million digital jobs by 2025 goal was not met.  EU committed $48m to Digital Skills Fund in December 2025.", 
    source: "https://3mtt.nitda.gov.ng/",
    sourceLabel: "3MTT / NITDA",
    updated: "2026-04-16"
  },
  {
    id: 31,
    title: "Deliver 70% broadband penetration by 2025",
    category: "Infrastructure",
    status: "broken",
    promise: "Under the National Broadband Plan 2020–2025 (continued by Tinubu) and Communications Minister Tijani's commitments, Nigeria targeted 70% broadband penetration and 90% population coverage by end-2025, plus a $2 billion, 90,000 km national fibre-optic rollout starting Q4 2025.", 
    assessment: "Broadband penetration was 49.89% in October 2025 and 50.58% in November 2025 (NCC) — roughly 20 percentage points short of target. Telecoms' GDP contribution fell from 16% in Q2 2023 to 9.2% in Q2 2025. Project 774 LGA Connectivity launched February 2025 as catch-up; Fibre SPV launched but actual deployment is still nascent.",
    source: "https://www.thisdaylive.com/2025/12/18/with-49-89-broadband-penetration-nigeria-may-not-attain-70-2025-target/",
    sourceLabel: "ThisDay",
    updated: "2026-04-16"
  },
  {
    id: 32,
    title: "Reset debt-service-to-revenue ratio below 50%",
    category: "Economy",
    status: "partial",
    promise: "In the 65th Independence Day speech and at the 31st NES (October 2025), Tinubu stated his administration had reduced the debt-service-to-revenue ratio \"from 97% where we met it\" to under 50%, pledging continued reduction to a sustainable level.",
    assessment: "Africa Check's fact-check shows the ratio was 86.9% at inauguration (not 97%) and was 61.4%  for Q1–Q3 2024 (not below 50%). Meanwhile fiscal deficit fell from 5.4% of GDP (2023) to 3.0% (2024), which is genuine progress. The specific 'below 50%' claim is overstated by the administration's own data.",
    source: "https://africacheck.org/fact-checks/reports/fact-or-spin-fact-checking-nigerian-president-tinubus-independence-day",
    sourceLabel: "Africa Check",
    updated: "2026-04-16"
  },
  {
    id: 33,
    title: "Deliver 15 million households N75,000 cash transfer",
    category: "Social",
    status: "partial",
    promise: "In his 1 October 2023 Independence broadcast and launch on 17 October 2023, Tinubu pledged a Renewed Hope Conditional Cash Transfer of N25,000/month for three months (N75,000 total) to 15 million vulnerable households (~62 million Nigerians)  to cushion subsidy removal.",
    assessment: "Programme suspended January 2024 over corruption scandal involving Humanitarian Affairs Minister Betta Edu; relaunched later. By March 2026, State House reports 9.2 million households had received first tranche  — roughly 61% of target after 2.5 years. The companion 'Iya Loja' N50,000 petty-trader fund  has not been shown to have scaled.",
    source: "https://www.thecable.ng/tinubu-launches-cash-transfer-to-15m-households-says-hope-is-here/",
    sourceLabel: "TheCable",
    updated: "2026-04-16"
  },
  {
    id: 34,
    title: "Build 50,000 Renewed Hope housing units",
    category: "Social",
    status: "broken",
    promise: "Launched 8 February 2024 at Karsana, Abuja: Phase One of the Renewed Hope Cities and Estates programme would deliver 50,000 housing units across Nigeria by end-2024 — seven Cities (1,000+ units each) and Estates (250–500 units) in the remaining 30 states, funded with N100bn from the 2023 supplementary budget plus N18.9bn in 2024.", 
    assessment: "End-2024 deadline dramatically missed. By November 2024 only 14 active sites totalling 10,112 units  existed. 1,000 units at Karsana-Abuja  and 1,500 units at Ibeju-Lekki are being readied for commissioning in late 2025. Administration has since pivoted to a new 500,000-unit 'Mega Renewed Hope City'  announcement, effectively acknowledging the original target's failure.",
    source: "https://fmhud.gov.ng/read/3120",
    sourceLabel: "Federal Ministry of Housing & Urban Development",
    updated: "2026-04-16"
  },
  {
    id: 35,
    title: "Clear pension backlog with N758bn bond",
    category: "Social",
    status: "kept",
    promise: "On 4 February 2025, Tinubu approved a N758 billion FGN Bond to settle outstanding pension liabilities under the Contributory Pension Scheme  — N253bn for accrued rights of Federal MDA retirees, N388bn to clear pension increases since 2007 (250,000+ retirees),  funding the Pension Protection Fund (unfunded since 2014), and professors' pension shortfall.  A N32,000 minimum pension was approved in July 2024  with 20–28% DBS increments.",
    assessment: "Core approval kept.  N8.6bn pension arrears were disbursed to 148,625 DBS pensioners by June 2025;  Pension Boost 1.0 added N2.68bn/month;  PTAD paid N1.75bn to 902 Next-of-Kin beneficiaries.  Pension Protection Fund received its first-ever funding. Police pension resolution remains pending.  This is one of the administration's clearest delivery wins.",
    source: "https://www.pensionnigeria.com/pension-news/president-tinubu-approves-n758-billion-bond-to-settle-outstanding-pension-liabilities-under-contributory-pension-scheme/",
    sourceLabel: "Pension Nigeria / PenCom",
    updated: "2026-04-16"
  },
  {
    id: 36,
    title: "Empower 25 million women via Nigeria for Women Scale-Up",
    category: "Social",
    status: "pending",
    promise: "At the 5 February 2026 Presidential Villa launch, Tinubu pledged: \"We have set a bold but achievable national ambition — to reach 25 million Nigerian women through this programme.\"  The $540 million scale-up, co-financed with the World Bank and states, directly targets 5 million women across the 36 states + FCT  with indirect reach of 19.5 million.  Tinubu also declared 2026 as the \"Year of Social Development and Families.\"", 
    assessment: "Phase 1 reached over 1 million beneficiaries in six pilot states,  forming 26,577 Women Affinity Groups with 560,000+ members who saved N4.9bn collectively.  The scale-up launched only in February 2026, so the 25m target is too early to assess. Katsina committed N4bn counterpart funding.", 
    source: "https://fmino.gov.ng/25m-nigerians-to-benefit-as-president-tinubu-expands-womens-economic-programme/",
    sourceLabel: "Federal Ministry of Information",
    updated: "2026-04-16"
  },
  {
    id: 37,
    title: "Establish 8,800 new primary healthcare centres",
    category: "Health",
    status: "partial",
    promise: "Under the Health Sector Renewal Investment Initiative (launched December 2023), Tinubu committed to \"over 8,800 new PHCs\"  and to raise functional PHCs from 8,809 to over 17,600 by 2027,  alongside 774 National Health Fellows (one per LGA),  an increase in Direct Facility Funding to N600,000–N800,000/quarter,  and training of 120,000 frontline health workers.",
    assessment: "By mid-2025 Tinubu said N45.9bn had been spent upgrading 8,800 PHCs;  2,565 upgraded and 1,456 under rehabilitation;  N98bn disbursed via BHCPF to 8,300+ PHCs.  Frontline health worker training reached 61,000 (51% of target). Nursing enrolment scaled from 28,000 to 150,000.  Meaningful progress, but far from the 17,600 functional PHCs by 2027 commitment.",
    source: "https://nairametrics.com/2025/04/06/tinubu-approves-establishment-of-over-8800-primary-healthcare-centres-across-nigeria/",
    sourceLabel: "Nairametrics",
    updated: "2026-04-16"
  },
  {
    id: 38,
    title: "Hit 70% local pharmaceutical production by 2030",
    category: "Health",
    status: "pending",
    promise: "Presidential Initiative for Unlocking Healthcare Value Chain (PVAC), inaugurated October 2023, targets \"increasing Nigeria's local pharmaceutical production to 70% of domestic consumption by 2030 and doubling Nigeria's pharmaceutical market share in Africa to 15%.\"  Executive Order on zero tariffs/VAT for pharma inputs signed June 2024.", 
    assessment: "PVAC reports $5bn project pipeline, $2bn foreign investment, 74 transformative projects, 87 local manufacturers supported, and a 12% drop in local production costs (per Minister Salako, August 2025).  Two Nigerian-made products received WHO pre-qualification; Ogun RDT plant commissioned.  Nigeria still imports ~70% of pharmaceuticals  — trajectory is positive but 70% local production by 2030 remains a stretch.",
    source: "https://pvac.gov.ng/about-us/",
    sourceLabel: "PVAC Nigeria",
    updated: "2026-04-16"
  },
  {
    id: 39,
    title: "Extend consumer credit to 50% of workers by 2030",
    category: "Economy",
    status: "partial",
    promise: "Nigerian Consumer Credit Corporation (CREDICORP) established April 2024 with commitment to \"accelerate consumer credit access to 50 per cent of economically active Nigerians by 2030,\" starting with 500,000 civil servants  and scaling total consumer credit from N35 trillion to N180 trillion. YouthCred and Pensioners' Credit were launched alongside.", 
    assessment: "By November 2025, N37bn in loans had been disbursed to approximately 200,000 Nigerians, over 50% of them first-time formal borrowers.  Far below the 500,000 civil servants target and a small fraction of the 50% workforce goal. Product innovation is genuine (BAFI Award winner 2025); scale is not.",
    source: "https://punchng.com/500000-civil-servants-to-benefit-from-tinubus-consumer-credit-scheme/",
    sourceLabel: "Punch",
    updated: "2026-04-16"
  },
  {
    id: 40,
    title: "Complete Lagos-Calabar Coastal Highway in eight years",
    category: "Infrastructure",
    status: "partial",
    promise: "Flagged off by Tinubu on 26 May 2024:  700 km coastal highway  across nine states,  cost approximately N15.6 trillion (~$11–13bn),  with Section 1 (47.47 km Lagos) financed by a $747m Deutsche Bank loan and initially targeted for completion by January 2026.", 
    assessment: "Only ~18–30 km of Section 1 opened temporarily on 12 December 2025;  Section 1 deadline revised to Q2 2026;  Section 2 has ~10 km of 55 km complete;  Sections 3A and 3B in Cross River/Akwa Ibom  are still being cleared. N1.06 trillion reportedly spent on Section 1 alone.  The original January 2026 deadline has slipped sharply.",
    source: "https://fmino.gov.ng/fg-temporarily-opens-completed-stretch-of-lagos-calabar-coastal-highway/",
    sourceLabel: "Federal Ministry of Information",
    updated: "2026-04-16"
  },
  {
    id: 41,
    title: "Complete Kano-Maradi railway by 2026",
    category: "Transport",
    status: "partial",
    promise: "In Katsina on 2 May 2025, Tinubu stated: \"The Federal Government plans to complete the 284-kilometre Kano-Jigawa-Katsina-Maradi rail project by 2026.\"  Contract value roughly $1.96 billion with Mota-Engil.",
    assessment: "Progress rose from 15% at the start of the administration to over 60% by late 2025.  Transport Minister Alkali (October 2025) revised the schedule: line to reach Katsina by December 2025, full completion by March 2027 — missing Tinubu's stated 2026 target by at least a year.",
    source: "https://www.channelstv.com/2025/05/03/fg-vows-to-complete-284-kilometre-kano-maradi-rail-project-by-2026/",
    sourceLabel: "Channels Television",
    updated: "2026-04-16"
  },
  {
    id: 42,
    title: "Deliver AKK gas pipeline by first quarter 2025",
    category: "Energy",
    status: "broken",
    promise: "In February 2025, Petroleum Minister (Gas) Ekpo and earlier NNPC GCEO Kyari (June 2024) committed that the 614 km, $2.8 billion Ajaokuta-Kaduna-Kano pipeline would be completed in Q1 2025, delivering 2.2 bcf/d to Abuja, Kaduna and Kano.",
    assessment: "Q1 2025 deadline missed. The mainline was completed in December 2025; overall ~90% complete by April 2026. First gas delivery has been rescheduled to July 2026 (NUPRC). The midline compressor station at Ajaokuta remains unfunded, meaning the pipeline cannot deliver at design pressure — potentially adding another year of delay.",
    source: "https://www.channelstv.com/2025/12/29/2-8bn-akk-gas-pipeline-to-be-activated-early-2026-ojulari/",
    sourceLabel: "Channels Television",
    updated: "2026-04-16"
  },
  {
    id: 43,
    title: "Reform military doctrine and invest in armed forces",
    category: "Security",
    status: "partial",
    promise: "In his 29 May 2023 inauguration speech Tinubu pledged: \"To effectively tackle this menace, we shall reform both our security DOCTRINE and its ARCHITECTURE. We shall invest more in our security personnel, and this means more than an increase in number. We shall provide better training, equipment, pay and firepower.\" At the August 2025 African Chiefs of Defence Staff Summit, Tinubu further called for \"a new doctrine of continental defence.\"",
    assessment: "2026 budget allocates N4.9 trillion to security (largest ever). New equipment inductions (Mi-171 helicopters, attack drones, AW-109 Trekker), 30,000+ new recruits across services, and a pay rise for military personnel have occurred. However, the National Security Strategy remains substantially unchanged, over 30,000 kidnappings occurred in 2023–2025, and major attacks continue (e.g., Zamfara, Benue, Plateau). Doctrinal overhaul is more rhetorical than institutional.",
    source: "https://www.thecable.ng/full-text-tinubus-inaugural-speech-as-president-of-nigeria/",
    sourceLabel: "TheCable (inauguration speech)",
    updated: "2026-04-16"
  },
  {
    id: 44,
    title: "Raise judicial officers' salaries by 300%",
    category: "Governance",
    status: "kept",
    promise: "Tinubu submitted an executive bill in March 2024 (signed into law 13 August 2024) — the Judicial Office Holders' Salaries and Allowances Act — granting a 300% salary increase to federal and state judicial officers, bringing the Chief Justice of Nigeria to N64 million annually, Supreme Court Justices to N61.4 million, and Court of Appeal President to N62.4 million.",
    assessment: "Fully kept. First upward revision for Nigeria's judiciary since 2008. Implementation has occurred across federal and state benches. Separately, Tinubu also signed the 2023 Constitution Fourth Alteration Act harmonising retirement ages for judicial officers — his first bill as president.",
    source: "https://www.premiumtimesng.com/news/headlines/723934-tinubu-signs-bill-to-increase-salaries-allowances-of-judicial-officers-by-300.html",
    sourceLabel: "Premium Times",
    updated: "2026-04-16"
  },
  {
    id: 45,
    title: "Lead ECOWAS to restore democracy in Niger",
    category: "Foreign Policy",
    status: "broken",
    promise: "As ECOWAS Chair (July 2023), Tinubu declared \"we must stand firm on democracy\" and after Niger's 26 July 2023 coup spearheaded ECOWAS sanctions, a no-fly zone, border closures, and a one-week ultimatum to the Niamey junta to reinstate President Bazoum, backed by a standby force.",
    assessment: "Military intervention was blocked by Nigeria's Senate. Sanctions were progressively lifted from February 2024 \"on humanitarian grounds\" without reinstating Bazoum. Niger, Mali and Burkina Faso formally exited ECOWAS in January 2025 to form the Alliance of Sahel States (AES). Bazoum remained in detention as of April 2026. The pledge to \"stand firm on democracy\" ended in the bloc's largest-ever membership loss — a substantive diplomatic defeat.",
    source: "https://www.voaafrica.com/a/ecowas-lifts-sanctions-on-niger-imposed-after-2023-military-coup/7501207.html",
    sourceLabel: "VOA Africa",
    updated: "2026-04-16"
  },
  {
    id: 46,
    title: "End gas flaring and cut methane 30% by 2030",
    category: "Energy",
    status: "pending",
    promise: "At COP28 (Dubai, 2 December 2023), Tinubu committed Nigeria to \"critical steps to reduce methane emissions by ensuring gas flaring is eliminated\" and signed onto the Global Methane Pledge of at least 30% methane reduction by 2030. Nigeria also joined the COP28 pledge to triple renewables and double energy efficiency by 2030, and reaffirmed Net-Zero by 2060 and a $1.9 trillion Energy Transition Plan at Abu Dhabi Sustainability Week (January 2025), where he also announced a $2 billion National Climate Change Fund and Climate Investment Platform.",
    assessment: "Gas flaring fell from 9.6 bcm (2012) to 5.3 bcm (2022) but has barely moved under Tinubu; 174 active flare sites were counted in the last NUPRC survey. TotalEnergies ended routine flaring at its OML 100 assets (December 2023) but IOC/NNPC compliance is uneven. The 30% methane cut by 2030 is Nigeria's fourth consecutive unmet flaring-elimination pledge (2008, 2020, 2030 NDC, COP28). National Climate Change Fund announced but not yet capitalised; carbon market policy finalised March 2026. Direction positive but delivery is slow.",
    source: "https://punchng.com/cop28-tinubu-pledges-end-to-gas-flaring/",
    sourceLabel: "Punch (COP28 Dubai)",
    updated: "2026-04-16"
  }
];

let activeStatus = 'all';
let expandedId = null;

const BADGE_LABEL = { kept: 'Kept', broken: 'Broken', partial: 'Partial', pending: 'In progress' };

function getFiltered() {
  const q = document.getElementById('search').value.toLowerCase();
  const cat = document.getElementById('cat-filter').value;
  return promises.filter(p => {
    const matchStatus = activeStatus === 'all' || p.status === activeStatus;
    const matchCat = cat === 'all' || p.category === cat;
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.promise.toLowerCase().includes(q);
    return matchStatus && matchCat && matchQ;
  });
}

function renderStats() {
  const counts = { kept: 0, partial: 0, broken: 0, pending: 0 };
  promises.forEach(p => counts[p.status]++);
  const total = promises.length;
  document.getElementById('stats').innerHTML = `
    <div class="pt-stat">
      <div class="pt-stat-value total">${total}</div>
      <div class="pt-stat-label">Total tracked</div>
    </div>
    <div class="pt-stat">
      <div class="pt-stat-value kept">${counts.kept}</div>
      <div class="pt-stat-label">Kept</div>
    </div>
    <div class="pt-stat">
      <div class="pt-stat-value partial">${counts.partial}</div>
      <div class="pt-stat-label">Partial / mixed</div>
    </div>
    <div class="pt-stat">
      <div class="pt-stat-value broken">${counts.broken}</div>
      <div class="pt-stat-label">Broken</div>
    </div>
  `;
  const bar = document.getElementById('progress-bar');
  bar.innerHTML = `
    <div class="pt-bar-kept"    style="width:${(counts.kept/total*100).toFixed(1)}%"></div>
    <div class="pt-bar-partial" style="width:${(counts.partial/total*100).toFixed(1)}%"></div>
    <div class="pt-bar-broken"  style="width:${(counts.broken/total*100).toFixed(1)}%"></div>
    <div class="pt-bar-pending" style="width:${(counts.pending/total*100).toFixed(1)}%"></div>
  `;
}

function renderFilters() {
  const cats = [...new Set(promises.map(p => p.category))].sort();
  const sel = document.getElementById('cat-filter');
  cats.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  });
  const fg = document.getElementById('status-filters');
  fg.innerHTML = '';
  STATUSES.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'pt-filter-btn' + (s.key === activeStatus ? ' active' : '');
    btn.textContent = s.label;
    btn.onclick = () => { activeStatus = s.key; renderFilters(); render(); };
    fg.appendChild(btn);
  });
}

function render() {
  const filtered = getFiltered();
  const list = document.getElementById('list');
  if (!filtered.length) {
    list.innerHTML = '<div class="pt-empty">No promises match your filters.</div>';
    return;
  }
  list.innerHTML = filtered.map(p => `
    <div class="pt-card${expandedId === p.id ? ' expanded' : ''}" data-id="${p.id}" onclick="toggle(${p.id})">
      <div class="pt-card-header">
        <div class="pt-card-meta">
          <div class="pt-card-category">${p.category}</div>
          <div class="pt-card-title">${p.title}</div>
        </div>
        <div class="pt-card-right">
          <span class="pt-badge pt-badge-${p.status}">${BADGE_LABEL[p.status]}</span>
          <span class="pt-chevron">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2.5 4.5L6.5 8.5L10.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
      <div class="pt-card-detail-wrap">
        <div class="pt-card-detail-inner">
          <div class="pt-card-detail">
            <div class="pt-detail-grid">
              <div>
                <div class="pt-detail-label">The promise</div>
                <div class="pt-detail-text">${p.promise}</div>
              </div>
              <div>
                <div class="pt-detail-label">Assessment</div>
                <div class="pt-detail-text">${p.assessment}</div>
              </div>
            </div>
            <div class="pt-detail-footer">
              <span>Source:</span>
              <a class="pt-source-link" href="${p.source}" target="_blank" onclick="event.stopPropagation()">${p.sourceLabel}</a>
              <span>· Updated ${p.updated}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function toggle(id) {
  const wasExpanded = expandedId === id;
  if (expandedId !== null) {
    const prev = document.querySelector(`.pt-card[data-id="${expandedId}"]`);
    if (prev) prev.classList.remove('expanded');
  }
  expandedId = wasExpanded ? null : id;
  if (expandedId !== null) {
    const card = document.querySelector(`.pt-card[data-id="${expandedId}"]`);
    if (card) card.classList.add('expanded');
  }
}

renderStats();
renderFilters();
render();

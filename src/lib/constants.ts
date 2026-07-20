export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  {
    name: "Programs",
    href: "#",
    children: [
      { name: "Trading Education", href: "/trading", description: "Learn with discipline and mentorship" },
      { name: "Website Design", href: "/website-design", description: "Custom sites that convert" },
      { name: "AI Solutions", href: "/ai", description: "Automate and scale your business" },
    ],
  },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
] as const;

export const pillars = [
  {
    id: "trading",
    title: "Trading Education",
    description:
      "Develop the skills, discipline, and risk management needed to navigate markets with confidence. Our foundation in trading teaches you how to think, not just trade.",
    icon: "TrendingUp",
    href: "/trading",
    features: ["Structured curriculum", "Live mentorship", "Risk management", "Trading psychology"],
  },
  {
    id: "business",
    title: "Business Growth",
    description:
      "From entrepreneurship to digital marketing, we help you build businesses that generate real income and create lasting opportunities in the modern economy.",
    icon: "Building2",
    href: "/services",
    features: ["Business development", "Digital marketing", "Lead generation", "Brand strategy"],
  },
  {
    id: "ai",
    title: "AI & Digital Skills",
    description:
      "Leverage artificial intelligence and modern technology to automate workflows, increase productivity, and build smarter businesses for the future.",
    icon: "Sparkles",
    href: "/ai",
    features: ["AI automation", "Productivity tools", "Digital workflows", "Future-ready skills"],
  },
] as const;

export const services = [
  {
    id: "trading-mentorship",
    title: "Trading Mentorship",
    description:
      "Personalized guidance from experienced mentors who prioritize education, risk management, and long-term skill development over quick wins.",
    href: "/trading",
    icon: "LineChart",
  },
  {
    id: "website-design",
    title: "Website Design",
    description:
      "Custom, conversion-focused websites built with modern technology. From brand strategy to SEO, we create digital experiences that grow your business.",
    href: "/website-design",
    icon: "Globe",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Strategic marketing that attracts the right audience. Google Business, funnels, lead generation, and content that builds trust and drives results.",
    href: "/website-design",
    icon: "Megaphone",
  },
  {
    id: "ai-consulting",
    title: "AI Consulting",
    description:
      "Practical AI implementation for entrepreneurs and small businesses. Automate repetitive tasks, enhance productivity, and stay ahead of the curve.",
    href: "/ai",
    icon: "Bot",
  },
  {
    id: "business-development",
    title: "Business Development",
    description:
      "Strategic guidance to help you identify opportunities, build sustainable revenue streams, and create a business aligned with your vision of freedom.",
    href: "/services",
    icon: "Briefcase",
  },
] as const;

export const stats = [
  { value: 3, suffix: "", label: "Core Learning Pillars" },
  { value: 5, suffix: "", label: "Service Pathways" },
  { value: 4, suffix: "", label: "Trading Curriculum Phases" },
  { value: 100, suffix: "%", label: "Education-First Approach" },
] as const;

export const testimonials = [
  {
    quote:
      "Stefan is an incredible trading mentor whose guidance has transformed both my results and my mindset in the markets. He breaks complex concepts down step by step, makes sure everything actually makes sense, and does not move on until he knows you truly understand.\nFrom day one, Stefan focused on risk management, emotional control, and having a clear plan before every trade, which has helped me protect capital and grow my account consistently instead of giving profits back. He is patient, honest, and direct with feedback, always showing exactly where I went wrong and how to improve, while also pointing out what I did right to build confidence.\nWhat stands out most is how much Stefan genuinely cares about his students' success—he is always willing to answer questions, review trades, and adapt his teaching style to how you learn best. Trading with his strategies has allowed me to approach volatile markets with confidence and turn what used to be stress and confusion into a structured, repeatable process. I highly recommend Stefan to anyone serious about learning to trade the right way and looking for a mentor who is both professional and truly invested in your growth.",
    author: "Gurpreet B.",
    role: "Student",
    avatar: "GB",
  },
  {
    quote:
      "I started training with Stefan in January of 2025. Charts had always been a mystery to me, nonsense lines that did nothing but predicted more randomness. Stefan made it make sense, support and resistance, trends, consolidation and all the reasons why they occur and how to predict from those levels.\nNeedless to say it's made a substantial impact on my ability to be financially strong. Just took my first withdrawal of $22,500 after 1 month of going live. Spent 5 months in demo.\nIf there's any challenge worth doing, it's worth have a coach to show you the way.",
    author: "Justin I.",
    role: "Student",
    avatar: "JI",
  },
  {
    quote:
      "I was recommended mentorship from a friend because I was interested into learning how to day trade. There's no other learning experience like it, Stefan has a way of explaining everything and breaking it down in a way even a 2 year old would understand. I went from very minimal knowledge on anything to do with day trading to now excelling in it in every way. I highly recommend it. There is no better investment in yourself than proper guidance and these provide exactly that to the highest degree.",
    author: "Branden R.",
    role: "Student",
    avatar: "BR",
  },
  {
    quote:
      "I paid Stefan to mentor me a little bit under a year ago because I had already tried trading a little bit and lost quite a bit of money and most sources were saying that takes about 2 to 3 years to master trading so I wanted to speed up the process. I was nervous at first, but with Stefan's help and his relentless dedication to my success. I have, in under a year, been able to make back all of the money I had lost and feel like I have a true understanding of trading. I can't thank him enough for this opportunity it has been truly life-changing. I no longer have to stress about money or paying bills and I can finally buy back all the time I spent at my 9-5 Jobs.",
    author: "Fisher W.",
    role: "Student",
    avatar: "FW",
  },
  {
    quote:
      "For a long time I had been wanting to get into the world of day trading and was lucky to be able to start that process with Stefan. From the start, I could see that he was genuine and wanted us to succeed and he has been helping every step of the way to make sure I do.\nHe is very knowledgeable and does a great job at explaining things simply and clearly and makes trading a fun experience. I went from knowing just a little to starting a live account in 3 months and have so far been profitable, all thanks to Stefan's help.\nOne thing that I have really appreciated is that whenever I have a question or have wanted to meet up to get extra help, he has always made time for that and continues to tell me that I will always be able to go to him, even years from now.\n10/10 experience and I would recommend anyone that is taking this seriously to learn from him and his team. You'll be glad you did!",
    author: "Aaron B.",
    role: "Student",
    avatar: "AB",
  },
  {
    quote:
      "Where do I begin on this review.. The moment I met Stefan I knew we were going to have a great relationship.\nStefan has a great way of adaptability when it comes to teaching. He has helped me throughout the whole process of my trading journey and still continues to do so.\nThe amount of support he has provided to push past the limits of one's doubt is unimaginable. With his knowledge, expertise, and support I have been able to accelerate my skills in trading that I never thought possible.\nTrading was a dream in my past, now it's my present and future. We're only scraping the surface, but the possibilities with Stefan as my mentor is endless.\nWhen you ever have the pleasure of meeting Stefan, you'll get someone who's honest, goal oriented, and one who will never sugar coat.",
    author: "Leo G.",
    role: "Student",
    avatar: "LG",
  },
  {
    quote:
      "I feel incredibly fortunate to have had Stefan as a mentor. Their guidance, patience, and genuine willingness to share knowledge made a lasting impact on my personal and professional growth. They always took the time to listen, offered thoughtful advice, and challenged me to think critically and push beyond my comfort zone.\nWhat I appreciated most was their ability to tailor their mentorship to my goals while creating a safe and encouraging space to learn and ask questions. Their mentorship has truly helped me gain confidence and clarity in my path forward.\nThank you, Stefan, for your time, support, and belief in me. Your mentorship has been invaluable, and I'm truly grateful!",
    author: "Keegan R.",
    role: "Student",
    avatar: "KR",
  },
  {
    quote:
      "Starting trading was challenging, filled with uncertainty and risk. However, trusting Stefan proved to be the best decision that I've made in a long time. Stefan has been there for me every step of the way not only for trading but for advice, financials, and just being a friend. Trusting Stefan opened doors to opportunities I wouldn't have otherwise encountered. It led me to the most promising setup for success, paving the way for financial freedom for me and my family.\nI started trading almost a year ago and trading hasn't been easy for me. But, nothing is never easy in life. Yes, I've had my ups and downs but Stefan has been there every step of the way to guide and teach me. I know I probably haven't been the easiest to teach haha but Stefan has never made me feel unintelligent or like I'm never going to understand trading. He has a lot of patience and always made sure I understood everything before moving forward to another section. We would be there for how long I needed until I understood and asked as many questions as I needed. No question was a stupid question and he made sure I understood that clearly. Even when I second guessed myself, he was always there to lift me up and help me to better understand so I won't second guess myself. No matter what time and day Stefan has always been available and able to help me whether it's meeting up somewhere, texting, or calling to make sure I know what I'm talking about and most importantly understand.\nIt took me a while to get out of that learning phase to the demo phase and now to my LIVE ACCOUNT! But, one thing I had to understand is that everyone learns at their own pace. Some people learn faster and are able to start live trading quicker but if you like me I toook my timeee. But, if I had to redo my whole trading experience all over again I wouldn't change anything. Everything happens for a reason and I wouldn't be here with these certain opportunities without Stefan and trusting him. He's genuinely a great person and very intelligent. So, if you are having second thoughts about trading, not thinking Stefan will help you, thinking he's not a good mentor etc. DONT! I repeat DONT! That would be the dumbest decision you will ever have not choosing him to help you and have as a mentor.\nNot only has Stefan helped me with trading but he has helped me financially with debt and building my credit. I have built my credit to the 700s while working with Stefan. He was able to point me in the directions for the best credit cards and how to pay off debt. Listening to him was the best advice I've had in so long. I was able to help my grandmother's credit rise to the 700s with the same advice he gave me. My grandmother was on the verge of losing her house and with the advice I got from Stefan I used to help build my grandmother's credit and give her the ability to accept and close an offer on a new house. So, not only has Stefan helped my life but my family's life and I am so grateful to have someone like him in my life to help aid and guide me.\nSo like I said before, If you are having second thoughts about trading, not thinking Steph will help you, thinking he's not a good mentor etc. DONT! I repeat DONT! You'll regret it!",
    author: "My'Jah M.",
    role: "Student",
    avatar: "MM",
  },
  {
    quote:
      "I want to thank you for everything. You are a great friend and mentor. I have enjoyed this entire process, even when I was having a hard time. I have learned so much about trading and I feel like some of the things have even applied to my personal life, like emotional control. Thank you for being such an inspiring person and mentor. I feel like you see the best in me and it's meant a lot. I really hope we always stay in contact. Ok enough of the soft shit. Let's make this money!\nBefore I approached Stefan about trading, I had been working the same job for three and a half years as well as going to school. I didn't like my job and lost interest in what I was going into for school. I knew I needed to find something else, something I actually enjoyed. I started asking questions and I was hooked. I asked him how he got into it and what he recommend I do if I wanted to get into it. He told me that the best way was to find a mentor. I asked him if he would be my mentor. I told him he has been the only person I've ever known to do day trading and be successful at it. I was really nervous to start because I didn't know anything about the financial field. On our first day, I knew I had made the right decision. Stefan made sure I understood everything we went over and encouraged me to ask as many questions as I wanted. When we would meet up again, I always had more questions and he made sure we went through all of them, even if it was something we had already been over. I used to always dread asking teachers questions yet I found myself asking a lot with Stefan. I found myself excited to learn again. It was, and is, something I started to look forward to. Something that really impressed me with Stefan was how quickly he discovered the way that I learn best. There were times when I felt confident that I had been learning really well and making good trades on the demo account. Other times I was really hard on myself and felt like maybe I didn't know as much as I thought I did. Stefan was always there to help me learn from my mistakes and remind me of how far I had come. He was always honest and would tell me exactly where I had gone wrong and made sure I understood why. But what really made him stand out from any other teacher I've ever had was that he also celebrated with me when I understood what was being taught or if I made a good trade. He knew that would be the best way for me, personally, to learn. I know Stefan wants me to succeed and will do everything he can to make sure that I do. It has been stressful at times but in the best way. This has been one of the most exciting things I have ever done in my life. It's amazing to think that I went from knowing nothing to feeling confident about trading. I have sincere gratitude for Stefan for being the best mentor someone could have and that he allowed me to take this opportunity to do something life changing.",
    author: "Marcus S.",
    role: "Student",
    avatar: "MS",
  },
  {
    quote:
      "January of 2023 my oldest son introduced me to Stefan. I had worked in the securities sector from 2002 till 2013 before letting my licensures lapse and just focusing on trading my own funds. I had many successful trades but kept giving back gains. As a mentor Stefan is the best, he is excellent at reading people and recognizing when you are able and willing to learn more. From January to July has been extreme market volatility. Prior to Stefan, I would shy away from being in the market when big news was to come out, now it is just another day of using Stefan's methodologies and securing the profits there from. Stefan has done what most people say cannot be done, \"teach this old dog new tricks\". I will always be grateful for his direction.",
    author: "Scott B.",
    role: "Student",
    avatar: "SB",
  },
  {
    quote:
      "Well, to start off, my mentorship experience with Stefan has been worthwhile and great!!! I was truly grateful to be able to be under his mentorship because he is very passionate about what he does, he wants to see me succeed and he wants to make sure he helps me get there!! No doubt whenever I met with Stefan, I always was on my A game and made sure I gave him my full attention because he cares about my success and definitely wants to make sure I understand the material and lessons being taught! I recommend that if anyone is interested and willing to put in the work and effort in this that to give your full attention to this because trading is its own beast, you learn so much that you think your not getting it or it's not clicking but it does take practice! I'm grateful that I have a mentor and resource in Stef for anything as far as trading goes and just lifestyle choices because he's very inspiring!\nThanks for all your help, Stefan!",
    author: "Ashley O.",
    role: "Student",
    avatar: "AO",
  },
  {
    quote:
      "***LIFECHANGING***\nI came into trading as a means to supplement my income. I have a good-paying job but wanted to make more money and not have to work as much. What Stefan teaches you is invaluable in my eyes. I started off not knowing a single thing about trading. He made sure that I understood everything before moving on to the next segment. Sometimes I've needed refreshers on a few things and he makes sure to always answer my questions in greater detail and confirm I understand. Expect to not understand a few things, but just know Stef will always be there because he cares. He doesn't need to spend his time teaching but chooses to do so because he has seen what trading can do for your life to open up opportunities.\nI have paid a lot of money over the years for school and the information I have learned from Stef was more valuable than what I would ever have been taught in school. Money can't buy happiness but it can buy you time. With trading, I look forward to not being so buried in my work but instead taking time to be able to enjoy my family and life.\nIf you're debating whether you should get into trading or not DO IT. Its going to open so many doors for you. Stefs is amazing and I look forward to having a lifelong mentor and friend.",
    author: "Brakken B.",
    role: "Student",
    avatar: "BB",
  },
  {
    quote:
      "When I first thought of doing any sort of trade I reached out to Stefan. Just a quick question, \"hey bro I know you trade just got a question\" met up and talked for an hour or so. Got me interested in learning and at the time he was barely interested in teaching and wasn't looking for people to teach. I thought to myself \"yo it's time to invest in yourself and make some side bread\"\nReached back out to Stefan about a week later. \"Hey man, just curious what you're thinking about these courses you were talking about\". Quick response \"I got you when do you have time so I can put it in my schedule?\". I thought damn this guy will work around my schedule alright. When I met up with Stefan he said I'm not going to do this if it's not something you think you're going to be able to do. What he meant by that was I'm not going to charge you and train you if you're just going to pay for something you can't use. I said \"no brother I'm ready, and we got down\". My schedule at the time was all over the place. Stef ran me through two days of reading charts and candles and support and resistance then the man showed me demo accounts. During my demo days I asked Stefan questions day in and day out. Man had an answer for everything. Never phased nor bothered by me reaching out real quick. Some times he would even say sorry for the late reply. Bro I'm on your time! My bad for reaching out on a busy day. The amount of knowledge I was hit with in every question I asked was insane. It wasn't just a brief oh it's this. It was a run down of pictures, videos, voice chats, quick calls. I'm telling you it was like working with a coworker. What was nice too is he didn't lie. He said you're not ready for live, I don't want you to go live. Once I went live and sent him a profit piece I got a congratulations and a hey if you have any questions let me know. Stefan told me from the gate, I'm going to blow your mind. Mind blown, the man still answers a quick question from time to time and helps me out.\nSo thank you Stefan, for an additional income to my hustle. Life can get busy and money wasn't always right but with extra money on the side I've been able to help family, try new things, invest and all sorts of other things. Stefan may not know it but the man opened doors for me I thought weren't going to be open for a while! Thank you Stefan. I highly recommend people to use you as a mentor brother.",
    author: "Chance S.",
    role: "Student",
    avatar: "CS",
  },
  {
    quote:
      "I was lucky enough to have Stefan help me learn how to trade and this was after years of me trying to understand the process of trading. He breaks it down step by step and made it easy for me to follow along the process of how to trade. Knowing when to trade and looking for the set ups from the chart that he taught me has made a world of difference in my confidence so that I can do this full time as one of my occupations. Just in the last month I have had 7 profitable trades and only 3 non-profitable trades. One out of those 3 losses was because I tried entering a trade too late after what he taught me and safe to say I won't be doing that again. So far after doing what he taught me and trading when I can, I've made 20k profit in just under 2 months. I definitely did not have that extra 20k before and I am excited because this is just the beginning. If anyone is looking to actually understand and make a profit with day trading, I highly recommend reaching out and having Stefan teach them his techniques.",
    author: "Zach C.",
    role: "Student",
    avatar: "ZC",
  },
  {
    quote:
      "This review is many years in the making.\nOur beginnings were at Jiu Jitsu. We met and became friends, but I found while I was struggling to beat him in any way possible on the mat, he was consistently trying to help me. It inspired me and I wanted to learn more about his, and CheyAnn's life. I decided to take the Forex courses they were offering.\nBoth CheyAnn and Stefan were excellent teachers: attentive, excited, supportive, and clearly in love with what they do.\nStefan is and has always been there through my losses and gains; there have been many of both. We remain friends through Jiu Jitsu, Instagram and phone calls just to say hello. It doesn't seem to matter how busy life gets, he is a valued friend and counselor who is steadfast, knowledgeable, and always available for advice.\nTo sum up my review in as few words as possible, I would say; Stefan has transformed my life. He has been a life coach, mentor, and has become part of my family. He challenges me to conquer my fears, chase my dreams, and help others do the same. I am a better person for knowing Stefan.",
    author: "Sean M.",
    role: "Student",
    avatar: "SM",
  },
  {
    quote:
      "Stefan is a phenomenal trader, and an even better person. I'm thankful to have had the opportunity to learn from someone as passionate and knowledgeable about trading as he is. It's evident that Stef has had countless hours and experience in markets through demonstration of his knowledge on trading theory and psychology. I appreciate the patience, transparency, and professionalism that he has displayed throughout the lessons. He isn't going to hold your hand through the whole thing and tell you when to buy or sell, but he'll teach you how and it's up to you on whether or not you decide to take the first steps on your own and execute. As such, I have been able to grow and develop exponentially as a trader and person and have been profitable as a result.\nRegardless of your background and experience, he treats you with the same respect and candor that he would with anyone else that he interacts with. Stefan genuinely cares about your success and development and structures his teachings in a way and pace that's conducive for you. I would only recommend people learning from Stefan if they are serious about learning--otherwise you're wasting everybody's time.",
    author: "Alex N.",
    role: "Student",
    avatar: "AN",
  },
] as const;

export const faqs = [
  {
    question: "Is Market Money HQ a get-rich-quick program?",
    answer:
      "Absolutely not. We are an education and mentorship company focused on helping you develop valuable skills over time. Financial freedom is built through consistent learning, smart decisions, and long-term thinking — not shortcuts.",
  },
  {
    question: "Do you guarantee trading profits?",
    answer:
      "No. Trading involves substantial risk and no profits are guaranteed. Our focus is on education, risk management, and developing the skills and mindset needed to make informed decisions. Past performance does not indicate future results.",
  },
  {
    question: "Who is Market Money HQ for?",
    answer:
      "Our programs are designed for people aged 20–45 who want to improve their financial future. Whether you're interested in trading, building a business, learning AI, or creating additional income streams — if you value education over hype, you're in the right place.",
  },
  {
    question: "What makes you different from other trading educators?",
    answer:
      "We don't sell trading — we teach people how to build skills that create freedom. Trading is one pillar among many, including business development, website design, digital marketing, and AI. Our holistic approach prepares you for the full digital economy.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free consultation to discuss your goals and find the right program for you. We'll help you understand your options and create a path forward based on where you are today and where you want to be.",
  },
  {
    question: "Do you offer one-on-one mentorship?",
    answer:
      "Yes. We offer personalized mentorship across trading, business development, and AI consulting. Our mentors work with you to develop a customized learning plan aligned with your goals and experience level.",
  },
] as const;

export const timeline = [
  {
    year: "Foundation",
    title: "Built on Real Experience",
    description:
      "Market Money HQ was founded on a simple belief: true wealth comes from developing skills, not chasing shortcuts. Our team brings years of experience in trading, business, and technology.",
  },
  {
    year: "Evolution",
    title: "Beyond the Charts",
    description:
      "We expanded beyond trading education to encompass the full digital economy — business development, website design, digital marketing, and AI consulting.",
  },
  {
    year: "Mission",
    title: "Skills That Create Freedom",
    description:
      "Today, we serve thousands of students worldwide, helping them build financial independence through practical education and mentorship.",
  },
  {
    year: "Vision",
    title: "The Future of Education",
    description:
      "We're building toward a world where everyday people have access to the skills, tools, and mentorship needed to create income, build wealth, and live with greater freedom.",
  },
] as const;

export const tradingFeatures = [
  {
    title: "Structured Education",
    description:
      "A comprehensive curriculum covering market fundamentals, technical analysis, and advanced strategies — taught with clarity and purpose.",
    icon: "BookOpen",
  },
  {
    title: "Risk Management",
    description:
      "Learn to protect your capital first. Our risk management framework is the foundation of every trading decision we teach.",
    icon: "Shield",
  },
  {
    title: "Trading Psychology",
    description:
      "Master the mental game. Develop the discipline, patience, and emotional control that separate consistent traders from the rest.",
    icon: "Brain",
  },
  {
    title: "Live Mentorship",
    description:
      "Learn directly from experienced mentors who provide real-time guidance, feedback, and accountability on your trading journey.",
    icon: "Users",
  },
] as const;

export const websiteServices = [
  {
    title: "Custom Websites",
    description: "Beautiful, fast, and conversion-optimized websites tailored to your brand and business goals.",
    icon: "Layout",
  },
  {
    title: "SEO Optimization",
    description: "Rank higher in search results with technical SEO, content strategy, and on-page optimization.",
    icon: "Search",
  },
  {
    title: "Brand Strategy",
    description: "Define your brand identity, messaging, and visual language to stand out in your market.",
    icon: "Palette",
  },
  {
    title: "Google Business",
    description: "Optimize your Google Business Profile to attract local customers and build credibility.",
    icon: "MapPin",
  },
  {
    title: "Sales Funnels",
    description: "Design and build high-converting funnels that turn visitors into leads and customers.",
    icon: "Filter",
  },
  {
    title: "Lead Generation",
    description: "Strategic systems and campaigns designed to attract qualified leads consistently.",
    icon: "UserPlus",
  },
  {
    title: "AI Automation",
    description: "Integrate AI tools into your website and workflows to save time and enhance user experience.",
    icon: "Zap",
  },
] as const;

export const aiFeatures = [
  {
    title: "Workflow Automation",
    description: "Automate repetitive tasks so you can focus on high-value work that grows your business.",
    icon: "Workflow",
  },
  {
    title: "Content Creation",
    description: "Use AI to streamline content production while maintaining your unique voice and quality standards.",
    icon: "PenTool",
  },
  {
    title: "Customer Support",
    description: "Implement AI-powered chatbots and support systems that serve customers 24/7.",
    icon: "Headphones",
  },
  {
    title: "Data Analysis",
    description: "Turn raw data into actionable insights with AI-powered analytics and reporting tools.",
    icon: "BarChart3",
  },
  {
    title: "Productivity Tools",
    description: "Discover and implement the right AI tools to multiply your output without multiplying your hours.",
    icon: "Clock",
  },
  {
    title: "Business Strategy",
    description: "Leverage AI to identify opportunities, optimize operations, and make smarter business decisions.",
    icon: "Lightbulb",
  },
] as const;

export const resources = [
  {
    title: "Trading Fundamentals",
    category: "Trading",
    description: "Essential concepts every trader should understand before placing their first trade.",
    readTime: "8 min read",
  },
  {
    title: "Risk Management 101",
    category: "Trading",
    description: "Why protecting your capital is the most important skill in trading.",
    readTime: "6 min read",
  },
  {
    title: "Starting Your Online Business",
    category: "Business",
    description: "A practical guide to launching a digital business from scratch.",
    readTime: "12 min read",
  },
  {
    title: "Digital Marketing Essentials",
    category: "Business",
    description: "Core strategies for attracting customers in the digital age.",
    readTime: "10 min read",
  },
  {
    title: "AI for Entrepreneurs",
    category: "AI",
    description: "How to identify and implement AI tools that actually save you time.",
    readTime: "7 min read",
  },
  {
    title: "Building Financial Freedom",
    category: "Mindset",
    description: "The mindset shifts required to move from employee to wealth builder.",
    readTime: "9 min read",
  },
] as const;

export const resourceCategories = ["All", "Trading", "Business", "AI", "Mindset"] as const;

const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/gminfotech"
async function  main(){
   await mongoose.connect(mongoURL);
}

main().then(()=>{console.log("Connection Successfull.....");}).catch(()=>{console.log("Error Occured during connection");})

const EmployeeData = require("./db.js") //JuryData

//Sample Data
const sampleData = [
  {
    _id: ObjectId('677d4434bc36712d024627dd'),
    name: 'Abhinav Sharma',
    position: 'BeyondCC • Founding team member',
    nominate: 'Top TA Leader',
    linkedin: 'https://www.linkedin.com/in/abhinav-sharma11000/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    votes: 54,
    juryVotes: 0,
    nominatedBy: 'nikita aggarwal',
    nominatedDes: 'I have worked with Abhinav closely in couple of requirements at Zenskar. He’s always gone above and beyond to ensure we have a great client                                        experience and brings out the best candidates.Def one of the most proactive recruiters I have work d with!',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627de'),
    name: 'Srilakshmi Ganta',
    position: 'Uber • Sr.Recruiting Manager - India Tech',
    nominate: 'Top TA Leader',
    linkedin: 'https://www.linkedin.com/in/abhinav-sharma11000/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    votes: 16,
    juryVotes: 0,
    nominatedBy: 'Swetha Yalagach',
    nominatedDes: "I am delighted to put forward the nomination of Srilakshmi for the esteemed TA Leadership Award. It is a pleasure to recognize her exceptional    leadership qualities and deep expertise in recruiting strategies. Sri has continuously demonstrated remarkable leadership by successfully hiring top-tier talent for prominent companies like Uber and Microsoft. Not only does she excel in hiring, but she also mentors her team members, fostering growth and development within the team. Additionally, Sri is a highly skilled sourcer, showcasing her versatility and dedication to excellence. Her unparalleled expertise in recruiting strategies is evident through her innovative recruitment methods, which have significantly contributed to the successful filling of critical positions and the improvement of our hiring processes. Sri's forward-thinking approach and unwavering commitment to excellence have not only strengthened our team but also set a high benchmark for others to follow. In summary, Srilakshmi's outstanding leadership and profound knowledge of recruiting strategies make her an ideal candidate for the TA Leadership Award. I wholeheartedly support her nomination and am confident that she will continue to inspire and lead with distinction.",
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627df'),
    name: 'Anushree Sharma',
    position: 'Morningstar • Associate Director',
    nominate: 'Top TA Leader',
    linkedin: 'https://www.linkedin.com/in/anushreesharma/',
    votes: 77,
    juryVotes: 0,
    nominatedBy: 'Raj Singh',
    nominatedDes: 'He has started DEI initiative at MoEngage and leading this initiative. MoEngage is known for the best DEI initiative in the industry.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e0'),
    name: 'Santhosh varghese',
    position: 'One.app • Recruitment Leader',
    nominate: 'Top TA Leader',
    linkedin: 'https://www.linkedin.com/in/santhosh-vargheseone/',
    votes: 79,
    juryVotes: 0,
    nominatedBy: 'Rajeev Reddy',
    nominatedDes: 'He has started DEI initiative at MoEngage and leading this initiative. MoEngage is known for the best DEI initiative in the industry.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e1'),
    name: 'Noel Fernandez',
    position: 'TOR Commodities Pvt Ltd • CHRO',
    nominate: 'Top TA Leader',
    linkedin: 'https://www.linkedin.com/in/noel-fernandez-hr-professional/',
    votes: 86,
    juryVotes: 0,
    nominatedBy: 'Komal Pandey',
    nominatedDes: 'Noel embodies the essence of an exceptional Talent Acquisition leader. As the CHRO at TORQ, he consistently demonstrates an unwavering passion for nurturing talent, fostering innovation, and driving excellence within the TA function. His ability to inspire, support, and elevate his team makes him a true champion of talent acquisition. Noel is known for his generosity, enthusiasm, and a unique ability to turn challenges into opportunities. His fun-loving and food-loving personality adds a personal touch to his leadership style, making the workplace environment collaborative, engaging, and inclusive. He is a firm believer in celebrating team efforts and never misses an opportunity to appreciate contributions, ensuring every individual feels valued. Under his guidance, the team at TORQ has achieved remarkable milestones, showcasing his vision and strategic acumen. Noel’s leadership not only drives successful outcomes for TORQ but also sets a benchmark for excellence in the TA community. His dedication to building strong employer branding, cultivating meaningful relationships, and empowering his team positions him as a deserving recipient of the TOP TA Leader award.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e2'),
    name: 'Shubham Patel',
    position: 'MoEngage • Talent Partner & Employer Branding',
    nominate: 'Best DEI Advocate',
    linkedin: 'https://www.linkedin.com/in/shubham-patel-he-him-b40689ba/',
    votes: 200,
    juryVotes: 0,
    nominatedBy: 'Raj Singh',
    nominatedDes: 'He has started DEI initiative at MoEngage and leading this initiative. MoEngage is known for the best DEI initiative in the industry.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e3'),
    name: 'Ashish Banka',
    position: 'Herkey • Senior Recruitment Manager',
    nominate: 'Best DEI Advocate',
    linkedin: 'https://www.linkedin.com/in/shubham-patel-he-him-b40689ba/',
    votes: 367,
    juryVotes: 0,
    nominatedBy: 'Self',
    nominatedDes: 'He has started DEI initiative at MoEngage and leading this initiative. MoEngage is known for the best DEI initiative in the industry.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e4'),
    name: 'Firdouse Begum',
    position: 'MoEngage • Talent Partner & Employer Branding',
    nominate: 'Best DEI Advocate',
    linkedin: 'https://www.linkedin.com/in/shubham-patel-he-him-b40689ba/',
    votes: 98,
    juryVotes: 0,
    nominatedBy: 'Self',
    nominatedDes: 'He has started DEI initiative at MoEngage and leading this initiative. MoEngage is known for the best DEI initiative in the industry.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e5'),
    name: 'Kshira Sagar',
    position: 'Adobe • Talent Partner',
    nominate: 'Best DEI Advocate',
    linkedin: 'https://www.linkedin.com/in/kshira-sagar-baa5a43a/',
    votes: 98,
    juryVotes: 0,
    nominatedBy: 'Swetha Yalagach',
    nominatedDes: "I am honored to nominate Sagar for the DEI Advocate Award in recognition of their exceptional contributions to hiring diverse talent and advancing diversity, equity, and inclusion. Sagar has shown unwavering commitment to creating a more inclusive and diverse workplace at Microsoft and Adobe. Their innovative approaches to recruitment and their ability to identify and attract diverse talent have significantly enriched our team's composition. Furthermore, Sagar’s efforts have gone beyond just hiring. They have been instrumental in fostering an inclusive culture where every team member feels valued and supported. In summary, Sagar's dedication to diversity, equity, and inclusion, combined with their exceptional skill in recruiting diverse talent, make them a standout candidate for the DEI Advocate Award. I wholeheartedly endorse their nomination and believe that their work will continue to drive positive change within our organization and beyond.",
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e6'),
    name: 'Indu Priya',
    position: 'Scadea Software Solutions • Director Human Resources',
    nominate: 'Best DEI Advocate',
    linkedin: 'https://www.linkedin.com/in/indupriya1269/',
    votes: 904,
    juryVotes: 0,
    nominatedBy: 'Self',
    nominatedDes: 'she has started DEI initiative at MoEngage and leading this initiative. MoEngage is known for the best DEI initiative in the industry.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e7'),
    name: 'Vinod Mathad',
    position: 'FIDIUS Advisory • Associate Principal',
    nominate: 'Best Leadership Recruiter',
    linkedin: 'https://www.linkedin.com/in/vinod-mathad/',
    votes: 276,
    juryVotes: 0,
    nominatedBy: 'Manav Das',
    nominatedDes: 'Vinod has great ability to identify passive talent and ensure an great experience in interview process and overall client experience in onboarding. His Offer to Joining ratio is almost 100 percent, especially in Data science leadership skills.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e8'),
    name: 'Lakshmikanth Byreddy',
    position: 'Pega Systems • Sr. Manager Recruitments',
    nominate: 'Best Leadership Recruiter',
    linkedin: 'https://www.linkedin.com/in/shubham-patel-he-him-b40689ba/',
    votes: 891,
    juryVotes: 0,
    nominatedBy: 'Rajeev Reddy',
    nominatedDes: 'He is very strong in to souring and finding top leaders. he is very focussed and played a vital role in setting up new COE.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627e9'),
    name: 'Ankita Sharan',
    position: 'Elastic Technologies India • Lead Tech Recruiter',
    nominate: 'Best Leadership Recruiter',
    linkedin: 'http://https//www.linkedin.com/in/ankitasharan/',
    votes: 768,
    juryVotes: 0,
    nominatedBy: 'Uttam Sanghi',
    nominatedDes: 'Ankita has very strong stakeholder management and interpersonal skills. She has closed multiple leadership (Director and above) roles for us at a global level and worked with some Global leaders in driving exceptional results both in recruiting and global projects.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627ea'),
    name: 'Jose Merciline',
    position: '247hire • Lead TA Specialist',
    nominate: 'Best Leadership Recruiter',
    linkedin: 'https://www.linkedin.com/in/josemerciline/',
    votes: 490,
    juryVotes: 0,
    nominatedBy: 'self',
    nominatedDes: 'He is very strong in to souring and finding top leaders. he is very focussed and played a vital role in setting up new COE.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627eb'),
    name: 'David Netto',
    position: 'ADP India • Senior Talent Acquisition Business Partner',
    nominate: 'Best Leadership Recruiter',
    linkedin: 'https://www.linkedin.com/in/david-nettojuly12/',
    votes: 670,
    juryVotes: 0,
    nominatedBy: 'self',
    nominatedDes: 'He is very strong in to souring and finding top leaders. he is very focussed and played a vital role in setting up new COE.',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627ec'),
    name: 'Fathima Nazreen',
    position: 'Mahy khoory • Recruiter',
    nominate: 'Best Tech Recruiter',
    linkedin: 'https://www.linkedin.com/in/fathima-nazreen5522/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    votes: 890,
    juryVotes: 0,
    nominatedBy: 'Tuba Zareen',
    nominatedDes: 'Knows her job too well Her skills to find proper match for the role of job description is exceptional',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627ed'),
    name: 'Harish Boddu',
    position: 'Simplify360 (A Nextiva Company) • Lead Technical Recruiter',
    nominate: 'Best Tech Recruiter',
    linkedin: 'https://www.linkedin.com/in/harishboddu/',
    votes: 890,
    juryVotes: 0,
    nominatedBy: 'self',
    nominatedDes: 'Knows her job too well Her skills to find proper match for the role of job description is exceptional',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627ee'),
    name: 'Rati Motewar-Choundawar',
    position: 'Posiview Digital Technologies • Head HR',
    nominate: 'Best Tech Recruiter',
    linkedin: 'https://www.linkedin.com/in/rati-choundawar-68236b38/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    votes: 560,
    juryVotes: 0,
    nominatedBy: 'self',
    nominatedDes: 'Knows her job too well Her skills to find proper match for the role of job description is exceptional',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627ef'),
    name: 'Satish Ch',
    position: 'Cloud Peritus • Lead Recruiter',
    nominate: 'Best Tech Recruiter',
    linkedin: 'https://www.linkedin.com/in/satish-ch/',
    votes: 435,
    juryVotes: 0,
    nominatedBy: 'self',
    nominatedDes: 'Knows her job too well Her skills to find proper match for the role of job description is exceptional',
    __v: 0
  },
  {
    _id: ObjectId('677d4434bc36712d024627f0'),
    name: 'Jayaseelan Balasubramaniam',
    position: 'Netskope Software India • Talent Acquisition Specialist',
    nominate: 'Best Tech Recruiter',
    linkedin: 'https://www.linkedin.com/in/jayaseelanbalasubramaniam/',
    votes: 391,
    juryVotes: 0,
    nominatedBy: 'self',
    nominatedDes: 'Knows her job too well Her skills to find proper match for the role of job description is exceptional',
    __v: 0
  }
]
EmployeeData.insertMany(sampleData).then(()=>{console.log("Data Added Successfully....");})
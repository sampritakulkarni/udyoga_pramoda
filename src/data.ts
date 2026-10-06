export const ROLES = ['Candidate','Mentor','Job Poster','Organizer','Admin','Alumni'] as const
export type Role = typeof ROLES[number]
export const STAGES = ['Registered','Mentoring','Upskilling','Applying','Got Job','Alumni']
export const MY_SKILLS = ['React','TypeScript','SQL','Communication']
export const jobs = [
 {id:1,title:'Frontend Engineer',company:'Nimbus Labs',loc:'Bengaluru',type:'Full-time',level:'Junior',skills:['React','TypeScript','CSS'],pay:'₹8–12 LPA'},
 {id:2,title:'Data Analyst',company:'Kanara Analytics',loc:'Hubballi',type:'Full-time',level:'Junior',skills:['SQL','Excel','Python'],pay:'₹5–8 LPA'},
 {id:3,title:'Product Intern',company:'Spark Works',loc:'Remote',type:'Internship',level:'Entry',skills:['Communication','Research'],pay:'₹25k / mo'},
 {id:4,title:'Backend Developer',company:'Deccan Systems',loc:'Pune',type:'Full-time',level:'Mid',skills:['Node.js','SQL','AWS'],pay:'₹12–18 LPA'},
 {id:5,title:'UI/UX Designer',company:'Pixel Forge',loc:'Remote',type:'Contract',level:'Mid',skills:['Figma','Research','CSS'],pay:'₹60k / mo'}]
export const mentors = [
 {name:'Anita Rao',role:'Engineering Manager, Nimbus',exp:['Web','Leadership'],slots:'Mon, Wed 6pm',rating:4.9},
 {name:'Vikram Patil',role:'Data Lead, Kanara',exp:['Data','SQL','Careers'],slots:'Tue, Sat 10am',rating:4.8},
 {name:'Meera Shetty',role:'Design Director, Pixel Forge',exp:['Design','Portfolio'],slots:'Thu 7pm',rating:4.7}]
export const events = [
 {id:1,title:'Resume Clinic',kind:'Workshop',date:'12 Oct',seats:40},
 {id:2,title:'Cloud Fundamentals',kind:'Upskilling',date:'18 Oct',seats:120},
 {id:3,title:'Vichara Vahini: Careers beyond metros',kind:'Vichara Vahini',date:'25 Oct',seats:200},
 {id:4,title:'Interview Masterclass',kind:'Webinar',date:'02 Nov',seats:300}]
export const stories = [
 {name:'Ravi K.',text:'From Registered to Software Engineer in 5 months, with mentoring and upskilling.',co:'Nimbus Labs'},
 {name:'Sneha P.',text:'Now mentoring 6 candidates and hosting a monthly workshop.',co:'Kanara Analytics'}]
export const board = [
 {id:1,name:'Asha N.',stage:'Registered'},{id:2,name:'Rohit M.',stage:'Mentoring'},{id:3,name:'Divya S.',stage:'Upskilling'},
 {id:4,name:'Kiran B.',stage:'Applying'},{id:5,name:'Praveen G.',stage:'Got Job'},{id:6,name:'Ravi K.',stage:'Alumni'},{id:7,name:'Neha T.',stage:'Mentoring'}]
export const growth = ['May','Jun','Jul','Aug','Sep','Oct'].map((m,i)=>({m,users:120+i*95+i*i*12,placed:8+i*11}))

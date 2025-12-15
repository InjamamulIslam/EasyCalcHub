import { CalculatorConfig } from "@/types/calculator";

export const educationCalculators: CalculatorConfig[] = [
    // Enhanced GPA Calculator
    {
        slug: 'gpa-calculator',
        category: 'Education',
        meta: {
            title: 'GPA Calculator',
            description: 'Calculate your Grade Point Average (GPA) based on grades and credit hours. Free, accurate, and easy to use GPA calculator for students.'
        },
        inputs: [
            {
                id: 'subjects',
                label: 'Number of Subjects',
                type: 'slider',
                defaultValue: 5,
                min: 1,
                max: 15,
                step: 1,
                helpText: 'Total number of subjects/courses'
            },
            {
                id: 'totalGradePoints',
                label: 'Total Grade Points',
                type: 'number',
                defaultValue: 35,
                min: 0,
                max: 200,
                helpText: 'Sum of (Grade Point × Credit Hours) for all subjects'
            },
            {
                id: 'totalCredits',
                label: 'Total Credit Hours',
                type: 'number',
                defaultValue: 15,
                min: 1,
                max: 100,
                helpText: 'Total credit hours of all subjects'
            }
        ],
        calculate: (inputs) => {
            const totalGradePoints = Number(inputs.totalGradePoints) || 0;
            const totalCredits = Number(inputs.totalCredits) || 1;

            const gpa = totalGradePoints / totalCredits;
            const percentage = (gpa / 4) * 100;

            let grade = 'F';
            if (gpa >= 3.7) grade = 'A+';
            else if (gpa >= 3.3) grade = 'A';
            else if (gpa >= 3.0) grade = 'B+';
            else if (gpa >= 2.7) grade = 'B';
            else if (gpa >= 2.3) grade = 'C+';
            else if (gpa >= 2.0) grade = 'C';
            else if (gpa >= 1.7) grade = 'D+';
            else if (gpa >= 1.0) grade = 'D';

            return [
                { id: 'gpa', label: 'GPA', value: gpa.toFixed(2), type: 'number', isHighlight: true },
                { id: 'percentage', label: 'Percentage', value: percentage.toFixed(1), type: 'percent' },
                { id: 'grade', label: 'Letter Grade', value: grade, type: 'text' }
            ];
        },
        content: {
            howItWorks: `## How GPA is Calculated

GPA (Grade Point Average) is calculated using this formula:

**GPA = Total Grade Points ÷ Total Credit Hours**

### Step-by-Step Process:

1. **For each course**, multiply the grade point by credit hours
   - Example: If you got an A (4.0) in a 3-credit course: 4.0 × 3 = 12 grade points

2. **Add all grade points** from all courses
   - Course 1: 12 + Course 2: 9 + Course 3: 8 = 29 total grade points

3. **Add all credit hours** from all courses
   - 3 + 3 + 2 = 8 total credits

4. **Divide** total grade points by total credits
   - 29 ÷ 8 = 3.625 GPA

### Grade Point Scale:
- A+ = 4.0
- A = 3.7
- B+ = 3.3
- B = 3.0
- C+ = 2.7
- C = 2.3
- D+ = 2.0
- D = 1.7
- F = 0.0`,
            faqs: [
                {
                    question: 'What is a good GPA?',
                    answer: 'A GPA of 3.5 or higher is considered excellent. 3.0-3.5 is good, 2.5-3.0 is average, and below 2.5 may require improvement. Most scholarships require a minimum GPA of 3.0.'
                },
                {
                    question: 'How is GPA different from percentage?',
                    answer: 'GPA is calculated on a 4.0 scale and considers credit hours, while percentage is a simple average. GPA gives more weight to courses with higher credit hours.'
                },
                {
                    question: 'Can I improve my GPA?',
                    answer: 'Yes! Focus on courses with higher credit hours, as they have more impact on your GPA. Consistently earning higher grades in all courses will gradually improve your GPA.'
                },
                {
                    question: 'What GPA do I need for graduate school?',
                    answer: 'Most graduate programs require a minimum GPA of 3.0, but competitive programs often look for 3.5 or higher. Check specific program requirements.'
                },
                {
                    question: 'How do I calculate grade points for each course?',
                    answer: 'Multiply your grade point (A=4.0, B=3.0, etc.) by the credit hours. For example, an A (4.0) in a 3-credit course = 12 grade points.'
                }
            ]
        },
        chartType: 'none'
    },

    // Enhanced CGPA Calculator
    {
        slug: 'cgpa-calculator',
        category: 'Education',
        meta: {
            title: 'CGPA Calculator',
            description: 'Calculate Cumulative Grade Point Average (CGPA) across multiple semesters. Track your overall academic performance with our free CGPA calculator.'
        },
        inputs: [
            {
                id: 'semesters',
                label: 'Number of Semesters',
                type: 'slider',
                defaultValue: 4,
                min: 1,
                max: 12,
                step: 1,
                helpText: 'Total number of semesters completed'
            },
            {
                id: 'totalGradePoints',
                label: 'Total Grade Points',
                type: 'number',
                defaultValue: 140,
                min: 0,
                max: 1000,
                helpText: 'Sum of all grade points from all semesters'
            },
            {
                id: 'totalCredits',
                label: 'Total Credits',
                type: 'number',
                defaultValue: 60,
                min: 1,
                max: 300,
                helpText: 'Total credit hours across all semesters'
            }
        ],
        calculate: (inputs) => {
            const totalGradePoints = Number(inputs.totalGradePoints) || 0;
            const totalCredits = Number(inputs.totalCredits) || 1;
            const semesters = Number(inputs.semesters) || 1;

            const cgpa = totalGradePoints / totalCredits;
            const percentage = (cgpa / 4) * 100;
            const avgCreditsPerSem = totalCredits / semesters;

            return [
                { id: 'cgpa', label: 'CGPA', value: cgpa.toFixed(2), type: 'number', isHighlight: true },
                { id: 'percentage', label: 'Percentage', value: percentage.toFixed(1), type: 'percent' },
                { id: 'avgCredits', label: 'Avg Credits/Semester', value: avgCreditsPerSem.toFixed(1), type: 'number' }
            ];
        },
        content: {
            howItWorks: `## How CGPA is Calculated

CGPA (Cumulative Grade Point Average) represents your overall academic performance across all semesters.

**CGPA = Total Grade Points (All Semesters) ÷ Total Credit Hours (All Semesters)**

### Calculation Example:

**Semester 1:**
- Total Grade Points: 36
- Total Credits: 15

**Semester 2:**
- Total Grade Points: 40
- Total Credits: 18

**Semester 3:**
- Total Grade Points: 38
- Total Credits: 16

**CGPA Calculation:**
- Total Grade Points: 36 + 40 + 38 = 114
- Total Credits: 15 + 18 + 16 = 49
- CGPA: 114 ÷ 49 = **2.33**

### Important Notes:
- CGPA considers ALL completed courses
- Each semester's GPA contributes to CGPA
- Higher credit courses have more impact
- CGPA is cumulative and changes each semester`,
            faqs: [
                {
                    question: 'What is the difference between GPA and CGPA?',
                    answer: 'GPA is for a single semester, while CGPA is your cumulative average across all semesters. CGPA gives you the big picture of your academic performance.'
                },
                {
                    question: 'How can I raise my CGPA?',
                    answer: 'Focus on earning high grades in upcoming semesters, especially in courses with more credit hours. The more semesters you have left, the more opportunity to improve your CGPA.'
                },
                {
                    question: 'What is a good CGPA for jobs?',
                    answer: 'Most employers look for a CGPA of 3.0 or higher. Top companies often require 3.5+. However, internships, projects, and skills also matter significantly.'
                },
                {
                    question: 'Does CGPA include failed courses?',
                    answer: 'Yes, failed courses (F grade = 0.0) are included in CGPA calculation, which can significantly lower your CGPA. Retaking and passing the course can help improve it.'
                },
                {
                    question: 'How to convert CGPA to percentage?',
                    answer: 'Multiply CGPA by 25 (for 4.0 scale) or use: (CGPA ÷ 4.0) × 100. For example, CGPA 3.2 = 80%.'
                }
            ]
        },
        chartType: 'none'
    },

    // Enhanced Percentage Calculator
    {
        slug: 'percentage-calculator-education',
        category: 'Education',
        meta: {
            title: 'Percentage Calculator',
            description: 'Calculate percentage from marks obtained and total marks. Convert exam scores to percentage instantly with grade classification.'
        },
        inputs: [
            {
                id: 'marksObtained',
                label: 'Marks Obtained',
                type: 'number',
                defaultValue: 425,
                min: 0,
                max: 2000,
                helpText: 'Total marks you scored'
            },
            {
                id: 'totalMarks',
                label: 'Total Marks',
                type: 'number',
                defaultValue: 500,
                min: 1,
                max: 2000,
                helpText: 'Maximum marks possible'
            }
        ],
        calculate: (inputs) => {
            const obtained = Number(inputs.marksObtained) || 0;
            const total = Number(inputs.totalMarks) || 1;

            const percentage = (obtained / total) * 100;
            const marksLost = total - obtained;

            let grade = 'F';
            let division = 'Fail';

            if (percentage >= 90) { grade = 'A+'; division = 'First Division with Distinction'; }
            else if (percentage >= 80) { grade = 'A'; division = 'First Division'; }
            else if (percentage >= 70) { grade = 'B+'; division = 'First Division'; }
            else if (percentage >= 60) { grade = 'B'; division = 'Second Division'; }
            else if (percentage >= 50) { grade = 'C'; division = 'Second Division'; }
            else if (percentage >= 40) { grade = 'D'; division = 'Third Division'; }

            return [
                { id: 'percentage', label: 'Percentage', value: percentage.toFixed(2), type: 'percent', isHighlight: true },
                { id: 'grade', label: 'Grade', value: grade, type: 'text' },
                { id: 'marksLost', label: 'Marks Lost', value: marksLost, type: 'number' }
            ];
        },
        content: {
            howItWorks: `## How to Calculate Percentage

Percentage shows your performance as a proportion of the total possible marks.

**Formula: Percentage = (Marks Obtained ÷ Total Marks) × 100**

### Example Calculation:

If you scored **425 marks out of 500**:
- Percentage = (425 ÷ 500) × 100
- Percentage = 0.85 × 100
- Percentage = **85%**

### Grade Classification:

| Percentage | Grade | Division |
|------------|-------|----------|
| 90-100% | A+ | First with Distinction |
| 80-89% | A | First Division |
| 70-79% | B+ | First Division |
| 60-69% | B | Second Division |
| 50-59% | C | Second Division |
| 40-49% | D | Third Division |
| Below 40% | F | Fail |

### Quick Tips:
- Higher percentage = Better performance
- Most universities require 40% to pass
- 75%+ is considered excellent
- Percentage is easy to understand and compare`,
            faqs: [
                {
                    question: 'What percentage is required to pass?',
                    answer: 'Most educational institutions require a minimum of 40% to pass. However, this varies by institution and country. Some require 35% or 50%.'
                },
                {
                    question: 'How to calculate percentage for multiple subjects?',
                    answer: 'Add all marks obtained across subjects, add all total marks, then divide and multiply by 100. Example: (425+380) ÷ (500+500) × 100 = 80.5%'
                },
                {
                    question: 'What is a good percentage in exams?',
                    answer: '85%+ is excellent, 75-85% is very good, 60-75% is good, 50-60% is average, and 40-50% is pass. Top universities often require 75%+ for admission.'
                },
                {
                    question: 'Can percentage be more than 100%?',
                    answer: 'In standard exams, no. However, some courses offer bonus points or extra credit, which could theoretically result in >100%, but this is rare.'
                },
                {
                    question: 'How to improve my percentage?',
                    answer: 'Focus on understanding concepts, practice regularly, solve previous papers, manage time well during exams, and pay attention to high-weightage topics.'
                }
            ]
        },
        chartType: 'none'
    },

    // Enhanced Grade Calculator
    {
        slug: 'grade-calculator',
        category: 'Education',
        meta: {
            title: 'Grade Calculator',
            description: 'Convert percentage or marks to letter grades (A, B, C, D, F) with GPA. Choose between standard and strict grading systems.'
        },
        inputs: [
            {
                id: 'score',
                label: 'Score/Percentage',
                type: 'slider',
                defaultValue: 85,
                min: 0,
                max: 100,
                step: 1,
                addonRight: '%',
                helpText: 'Your score or percentage'
            },
            {
                id: 'gradingSystem',
                label: 'Grading System',
                type: 'radio',
                defaultValue: 'standard',
                options: [
                    { label: 'Standard', value: 'standard' },
                    { label: 'Strict', value: 'strict' }
                ],
                helpText: 'Choose grading scale'
            }
        ],
        calculate: (inputs) => {
            const score = Number(inputs.score) || 0;
            const system = String(inputs.gradingSystem);

            let grade = 'F';
            let gpa = 0;
            let status = 'Fail';

            if (system === 'strict') {
                if (score >= 95) { grade = 'A+'; gpa = 4.0; status = 'Excellent'; }
                else if (score >= 90) { grade = 'A'; gpa = 3.7; status = 'Excellent'; }
                else if (score >= 85) { grade = 'B+'; gpa = 3.3; status = 'Very Good'; }
                else if (score >= 80) { grade = 'B'; gpa = 3.0; status = 'Good'; }
                else if (score >= 75) { grade = 'C+'; gpa = 2.7; status = 'Above Average'; }
                else if (score >= 70) { grade = 'C'; gpa = 2.3; status = 'Average'; }
                else if (score >= 65) { grade = 'D+'; gpa = 2.0; status = 'Below Average'; }
                else if (score >= 60) { grade = 'D'; gpa = 1.7; status = 'Pass'; }
            } else {
                if (score >= 90) { grade = 'A+'; gpa = 4.0; status = 'Excellent'; }
                else if (score >= 80) { grade = 'A'; gpa = 3.7; status = 'Excellent'; }
                else if (score >= 70) { grade = 'B+'; gpa = 3.3; status = 'Very Good'; }
                else if (score >= 60) { grade = 'B'; gpa = 3.0; status = 'Good'; }
                else if (score >= 50) { grade = 'C'; gpa = 2.3; status = 'Average'; }
                else if (score >= 40) { grade = 'D'; gpa = 1.7; status = 'Pass'; }
            }

            return [
                { id: 'grade', label: 'Letter Grade', value: grade, type: 'text', isHighlight: true },
                { id: 'gpa', label: 'GPA', value: gpa.toFixed(1), type: 'number' },
                { id: 'status', label: 'Status', value: status, type: 'text' }
            ];
        },
        content: {
            howItWorks: `## How Letter Grades Work

Letter grades provide a quick, standardized way to represent academic performance.

### Standard Grading System:

| Score | Grade | GPA | Status |
|-------|-------|-----|--------|
| 90-100% | A+ | 4.0 | Excellent |
| 80-89% | A | 3.7 | Excellent |
| 70-79% | B+ | 3.3 | Very Good |
| 60-69% | B | 3.0 | Good |
| 50-59% | C | 2.3 | Average |
| 40-49% | D | 1.7 | Pass |
| Below 40% | F | 0.0 | Fail |

### Strict Grading System:

| Score | Grade | GPA | Status |
|-------|-------|-----|--------|
| 95-100% | A+ | 4.0 | Excellent |
| 90-94% | A | 3.7 | Excellent |
| 85-89% | B+ | 3.3 | Very Good |
| 80-84% | B | 3.0 | Good |
| 75-79% | C+ | 2.7 | Above Average |
| 70-74% | C | 2.3 | Average |
| 65-69% | D+ | 2.0 | Below Average |
| 60-64% | D | 1.7 | Pass |
| Below 60% | F | 0.0 | Fail |

### Which System to Use?
- **Standard**: Most common in schools and universities
- **Strict**: Used by competitive institutions and honors programs`,
            faqs: [
                {
                    question: 'What does each letter grade mean?',
                    answer: 'A = Excellent (90%+), B = Good (80-89%), C = Average (70-79%), D = Pass (60-69%), F = Fail (<60%). The exact ranges vary by institution.'
                },
                {
                    question: 'Is B+ better than B?',
                    answer: 'Yes! Plus (+) grades are higher than regular grades. The hierarchy is: A+ > A > B+ > B > C+ > C > D+ > D > F.'
                },
                {
                    question: 'What grade do I need to maintain my GPA?',
                    answer: 'To maintain a 3.0 GPA, you need mostly B grades (80%+). For 3.5 GPA, aim for A/B+ grades (85%+). For 4.0, you need all A+ grades (90%+).'
                },
                {
                    question: 'Do all schools use the same grading scale?',
                    answer: 'No, grading scales vary by institution and country. Always check your school\'s specific grading policy. Some use 7-point scales, others use 10-point scales.'
                },
                {
                    question: 'Can I convert letter grades to percentage?',
                    answer: 'Yes, but it\'s approximate. A = 85-90%, B = 75-80%, C = 65-70%, D = 55-60%. The exact conversion depends on your institution\'s scale.'
                }
            ]
        },
        chartType: 'none'
    },

    // Enhanced Attendance Calculator
    {
        slug: 'attendance-calculator',
        category: 'Education',
        meta: {
            title: 'Attendance Calculator',
            description: 'Calculate attendance percentage and find out how many classes you need to attend or can miss to reach your target attendance.'
        },
        inputs: [
            {
                id: 'classesAttended',
                label: 'Classes Attended',
                type: 'number',
                defaultValue: 72,
                min: 0,
                max: 500,
                helpText: 'Number of classes you attended'
            },
            {
                id: 'totalClasses',
                label: 'Total Classes',
                type: 'number',
                defaultValue: 90,
                min: 1,
                max: 500,
                helpText: 'Total number of classes held'
            },
            {
                id: 'targetPercentage',
                label: 'Target Attendance %',
                type: 'slider',
                defaultValue: 75,
                min: 50,
                max: 100,
                step: 5,
                addonRight: '%',
                helpText: 'Required attendance percentage'
            }
        ],
        calculate: (inputs) => {
            const attended = Number(inputs.classesAttended) || 0;
            const total = Number(inputs.totalClasses) || 1;
            const target = Number(inputs.targetPercentage) || 75;

            const currentPercentage = (attended / total) * 100;
            const classesAbsent = total - attended;

            let classesNeeded = 0;
            if (currentPercentage < target) {
                classesNeeded = Math.ceil((target * total - 100 * attended) / (100 - target));
                if (classesNeeded < 0) classesNeeded = 0;
            }

            let canMiss = 0;
            if (currentPercentage > target) {
                canMiss = Math.floor((100 * attended - target * total) / target);
                if (canMiss < 0) canMiss = 0;
            }

            return [
                { id: 'attendance', label: 'Current Attendance', value: currentPercentage.toFixed(2), type: 'percent', isHighlight: true },
                { id: 'classesAbsent', label: 'Classes Absent', value: classesAbsent, type: 'number' },
                { id: 'classesNeeded', label: 'Classes Needed', value: classesNeeded, type: 'number' },
                { id: 'canMiss', label: 'Can Miss', value: canMiss, type: 'number' }
            ];
        },
        content: {
            howItWorks: `## How Attendance is Calculated

Attendance percentage shows what portion of classes you've attended.

**Formula: Attendance % = (Classes Attended ÷ Total Classes) × 100**

### Example Calculation:

**Scenario:** You attended 72 out of 90 classes
- Attendance % = (72 ÷ 90) × 100
- Attendance % = 0.8 × 100
- Attendance % = **80%**

### Planning Your Attendance:

**If Below Target:**
Calculate classes needed to reach target (e.g., 75%):
- Formula: Classes Needed = (Target% × Total - 100 × Attended) ÷ (100 - Target%)
- Example: (75 × 90 - 100 × 65) ÷ (100 - 75) = 8 classes

**If Above Target:**
Calculate how many you can miss:
- Formula: Can Miss = (100 × Attended - Target% × Total) ÷ Target%
- Example: (100 × 80 - 75 × 90) ÷ 75 = 16 classes

### Attendance Requirements:
- **75%**: Most common minimum requirement
- **80%**: Required for scholarships
- **85%+**: Excellent attendance
- **90%+**: Outstanding attendance`,
            faqs: [
                {
                    question: 'Why is 75% attendance important?',
                    answer: 'Most universities require 75% minimum attendance to be eligible for exams. Below this, you may not be allowed to sit for exams or may face academic penalties.'
                },
                {
                    question: 'How can I improve my attendance quickly?',
                    answer: 'Attend all upcoming classes consistently. The calculator shows exactly how many classes you need. Set reminders, plan ahead, and prioritize attendance.'
                },
                {
                    question: 'What happens if I miss too many classes?',
                    answer: 'Consequences vary but may include: exam ineligibility, grade penalties, academic probation, loss of scholarships, or requirement to repeat the course.'
                },
                {
                    question: 'Do medical leaves count as absence?',
                    answer: 'It depends on your institution\'s policy. Most schools excuse medical absences with proper documentation, but you should verify with your administration.'
                },
                {
                    question: 'How to maintain good attendance?',
                    answer: 'Set a routine, prepare the night before, use calendar reminders, sit in front rows (increases engagement), and communicate with professors if you must miss class.'
                }
            ]
        },
        chartType: 'none'
    },

    // Enhanced Marks to Percentage
    {
        slug: 'marks-to-percentage',
        category: 'Education',
        meta: {
            title: 'Marks to Percentage Converter',
            description: 'Convert marks to percentage for multiple subjects (1-10 subjects). Calculate overall percentage and average marks instantly.'
        },
        inputs: [
            {
                id: 'numSubjects',
                label: 'Number of Subjects',
                type: 'slider',
                defaultValue: 5,
                min: 1,
                max: 10,
                step: 1,
                helpText: 'How many subjects to calculate'
            },
            { id: 'subject1', label: 'Subject 1', type: 'number', defaultValue: 85, min: 0, max: 100 },
            { id: 'subject2', label: 'Subject 2', type: 'number', defaultValue: 78, min: 0, max: 100 },
            { id: 'subject3', label: 'Subject 3', type: 'number', defaultValue: 92, min: 0, max: 100 },
            { id: 'subject4', label: 'Subject 4', type: 'number', defaultValue: 88, min: 0, max: 100 },
            { id: 'subject5', label: 'Subject 5', type: 'number', defaultValue: 82, min: 0, max: 100 },
            { id: 'subject6', label: 'Subject 6', type: 'number', defaultValue: 75, min: 0, max: 100 },
            { id: 'subject7', label: 'Subject 7', type: 'number', defaultValue: 80, min: 0, max: 100 },
            { id: 'subject8', label: 'Subject 8', type: 'number', defaultValue: 85, min: 0, max: 100 },
            { id: 'subject9', label: 'Subject 9', type: 'number', defaultValue: 90, min: 0, max: 100 },
            { id: 'subject10', label: 'Subject 10', type: 'number', defaultValue: 88, min: 0, max: 100 }
        ],
        calculate: (inputs) => {
            const numSubjects = Number(inputs.numSubjects) || 5;
            const marks: number[] = [];

            for (let i = 1; i <= numSubjects; i++) {
                marks.push(Number(inputs[`subject${i}`]) || 0);
            }

            const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
            const maxMarks = numSubjects * 100;
            const percentage = (totalMarks / maxMarks) * 100;
            const avgMarks = totalMarks / numSubjects;

            return [
                { id: 'percentage', label: 'Overall Percentage', value: percentage.toFixed(2), type: 'percent', isHighlight: true },
                { id: 'totalMarks', label: 'Total Marks', value: totalMarks, type: 'number' },
                { id: 'avgMarks', label: 'Average Marks', value: avgMarks.toFixed(1), type: 'number' }
            ];
        },
        content: {
            howItWorks: `## How to Convert Marks to Percentage

This calculator helps you find your overall percentage across multiple subjects.

**Formula: Percentage = (Total Marks Obtained ÷ Total Maximum Marks) × 100**

### Step-by-Step Example:

**5 Subjects (each out of 100):**
- Subject 1: 85/100
- Subject 2: 78/100
- Subject 3: 92/100
- Subject 4: 88/100
- Subject 5: 82/100

**Calculation:**
1. Add all marks: 85 + 78 + 92 + 88 + 82 = **425**
2. Total maximum: 5 × 100 = **500**
3. Percentage: (425 ÷ 500) × 100 = **85%**
4. Average: 425 ÷ 5 = **85 marks**

### Using the Calculator:

1. **Select number of subjects** using the slider (1-10)
2. **Enter marks** for each subject (out of 100)
3. **Get instant results**: Overall %, Total marks, Average

### Important Notes:
- All subjects assumed to be out of 100
- Adjust slider to show only subjects you need
- Average marks = Total marks ÷ Number of subjects
- Percentage considers all subjects equally`,
            faqs: [
                {
                    question: 'What if my subjects have different maximum marks?',
                    answer: 'This calculator assumes all subjects are out of 100. For different max marks, convert each subject to percentage first, then average those percentages.'
                },
                {
                    question: 'How many subjects can I calculate?',
                    answer: 'You can calculate for 1 to 10 subjects. Simply adjust the slider to select the number of subjects you want to include in the calculation.'
                },
                {
                    question: 'Should I include all subjects or just core subjects?',
                    answer: 'Include all subjects that count toward your final grade. Check your institution\'s policy - some exclude certain subjects from overall percentage.'
                },
                {
                    question: 'What\'s the difference between average and percentage?',
                    answer: 'In this calculator, they\'re the same since all subjects are out of 100. Average marks = 85, Percentage = 85%. For different max marks, they would differ.'
                },
                {
                    question: 'How to improve my overall percentage?',
                    answer: 'Focus on subjects where you scored lowest - they have the most room for improvement. Even a 10-mark increase in weak subjects significantly boosts overall percentage.'
                }
            ]
        },
        chartType: 'none'
    }
];

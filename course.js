//DATA from Sandbox
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

// /* 
// -------------------------------------------------
// */

function getLearnerData(course, average, submission){
    const result = [];

    try {
        const courseId = course.id;
        if (courseId !== average.course_id) {
          throw new Error(
            `Wrong course ID. This is ${average.course_id} the correct one.`
          );
        }
    
  
      /*i am using Map to create a new array by calling the function on every element of the original array and storing the results in a new array */
        let userData = new Map()
        for (let i=0; i<submission.length; i++){
            let learnerId= submission[i].learner_id;
            let assignmentId = submission[i].assignment_id;
            let submissionVariable =submission[i].submission;
            let learnerScore= submission[i].submission.score;
            if (!userData.has(learnerId)){
                userData.set(learnerId, [[assignmentId,submissionVariable]])
            }else{
                userData.get(learnerId).push([assignmentId,submissionVariable])
            }
    
        }
    
        userData.forEach((value, key) => {
          let student = {};
          student["id"] = key;
          student["average"] = 0;
          let total_score = 0;
          let total_possible_score = 0;
    
          for (let j = 0; j < value.length; j++) {
        
            const submittedDate = new Date(value[j][1].submitted_at);
    
            const dueAtDate = new Date(average.assignments[value[j][0] - 1].due_at);
    
            const currentDate = new Date();
    
            try {
              if (dueAtDate < currentDate) {
                let learnerAssignId = value[j][0];
                let assignmentId = average.assignments[value[j][0] - 1].id;
                let pointsPossible =
                  average.assignments[value[j][0] - 1].points_possible;
                let submissionScore = value[j][1].score;
    
                student[`${value[j][0]}`] = submissionScore / pointsPossible;
    
                if (learnerAssignId === assignmentId) {
                  if (submittedDate > dueAtDate) {
                    student[`${value[j][0]}`] = (submissionScore / pointsPossible) ;
                    total_score += submissionScore * 0.9;
                    total_possible_score += pointsPossible;
                  } else {
                    total_score += submissionScore;
                    total_possible_score += pointsPossible;
                  }
                }
              }
            } catch (error) {
              console.error(error.message);
              break;
            }
          }
    
          student["average"] = total_score / total_possible_score;
          result.push(student);
        });
      } catch (error) {
        console.log(error.message);
      }
      return result;
    };
    
    let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result)


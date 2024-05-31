PerScholas SBA 308: JavaScript Fundamentals

1. Learner ID


2. Learner’s Weighted Average

Score (from learner submissions)
Pointspossible (from assignment group)

We want to add up all learner’s scores, then divide by all points possible for corresponding assignments

-determine lateness of an assignment 10% penalty
- whether the assignment is even due

3. A list/ set of Assignments with grades

-Create an array of objects to place each learner object in to return
-for each assignment we need an assignment id , with value as their calculated percentage grade

Secret Hack for obtaining Score/ Total points possible:
1. Initialize total_points and total_possible points as 0
Iterate through each submission of a learner ID and add the score to total_points, then look for the corresponding assignment in AssignmentGroup and add to total_possible_points

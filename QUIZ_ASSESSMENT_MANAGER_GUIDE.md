# Quiz & Assessment Manager Guide

## Overview
The Quiz & Assessment Manager allows educators to create and manage quizzes and assessments for their course modules. This is a standalone tool separate from the course upload process, giving you flexibility to add or modify quizzes and assessments after course creation.

## Features

### Quiz Management
- ✅ Create quizzes for any module
- ✅ Add multiple-choice questions with 4 options
- ✅ Mark correct answers
- ✅ Set pass score percentage
- ✅ View existing quizzes
- ✅ Delete quizzes
- ✅ Automatic token rewards (5 tokens per quiz pass)

### Assessment Management
- ✅ Create assessments for any module
- ✅ Add detailed instructions
- ✅ Set assessment type (Graded or Practice)
- ✅ Configure duration
- ✅ View existing assessments
- ✅ Delete assessments
- ✅ Automatic token rewards (15 tokens per assessment pass)

## How to Use

### Accessing the Manager
1. Login to your educator dashboard
2. Click "Home" in the sidebar
3. Select "Quiz and Assessment" from the top menu

### Creating a Quiz

#### Step 1: Select Course and Module
1. Choose a course from the "Select Course" dropdown
2. Choose a module from the "Select Module" dropdown
3. The system will load any existing quizzes for that module

#### Step 2: Create Quiz
1. Click "Create Quiz" button
2. Fill in the quiz details:
   - **Quiz Title**: Give your quiz a descriptive name (e.g., "Module 1 Quiz")
   - **Pass Score**: Set the minimum percentage to pass (default: 70%)

#### Step 3: Add Questions
1. Click "Add Question" to create a new question
2. For each question:
   - Enter the question text
   - Fill in 4 answer choices
   - Click the radio button next to the correct answer
3. Add as many questions as needed
4. Remove questions using the trash icon if needed

#### Step 4: Save Quiz
1. Review all questions
2. Click "Create Quiz"
3. The quiz will be saved and linked to the selected module

### Creating an Assessment

#### Step 1: Select Course and Module
1. Switch to the "Assessments" tab
2. Choose a course from the "Select Course" dropdown
3. Choose a module from the "Select Module" dropdown

#### Step 2: Create Assessment
1. Click "Create Assessment" button
2. Fill in the assessment details:
   - **Assessment Title**: Name your assessment (e.g., "Module 1 Assessment")
   - **Description/Instructions**: Explain what students need to do
   - **Type**: Choose "Graded" or "Practice"
   - **Duration**: Set time limit in minutes (default: 20)

#### Step 3: Save Assessment
1. Review the details
2. Click "Create Assessment"
3. The assessment will be saved and linked to the selected module

## Important Notes

### Quiz Limitations
- **One quiz per module**: Each module can only have one quiz
- If you try to create a second quiz for the same module, you'll get an error
- To replace a quiz, delete the existing one first

### Assessment Flexibility
- **Multiple assessments per module**: You can create multiple assessments for the same module
- Each assessment is independent

### Backend Integration
- All quizzes and assessments are stored in the database
- They're automatically linked to the selected module
- Students will see them when taking the course
- Token rewards are automatically configured

## Viewing Existing Content

### View Quizzes
1. Select a course and module
2. Stay on the "Quizzes" tab
3. You'll see:
   - Quiz title
   - Pass score percentage
   - Token reward amount
   - Number of questions
   - List of all questions with choice counts

### View Assessments
1. Select a course and module
2. Switch to the "Assessments" tab
3. You'll see:
   - Assessment title
   - Type (Graded/Practice)
   - Duration in minutes
   - Full description/instructions

## Deleting Content

### Delete a Quiz
1. Find the quiz in the list
2. Click the trash icon in the top-right corner
3. Confirm the deletion
4. The quiz will be permanently removed

### Delete an Assessment
1. Find the assessment in the list
2. Click the trash icon in the top-right corner
3. Confirm the deletion
4. The assessment will be permanently removed

## Best Practices

### Quiz Design
- **4-8 questions**: Keep quizzes focused and not too long
- **Clear questions**: Write unambiguous questions
- **Balanced difficulty**: Mix easy and challenging questions
- **One correct answer**: Ensure only one choice is marked correct
- **Meaningful distractors**: Make wrong answers plausible but clearly incorrect

### Assessment Design
- **Clear instructions**: Explain exactly what students need to do
- **Realistic duration**: Allow enough time for thoughtful responses
- **Grading criteria**: Include what you're looking for in the description
- **Practical focus**: Make assessments relevant to real-world scenarios

### Module Organization
- **Quiz after lessons**: Create quizzes after students have learned the material
- **Assessment for depth**: Use assessments to evaluate deeper understanding
- **Progressive difficulty**: Make later module quizzes/assessments more challenging

## Example Workflow

### Creating a Complete Module
1. **Create course and modules** (via Upload Courses page)
2. **Add lessons** (via Upload Courses page)
3. **Create quiz** (via Quiz & Assessment Manager):
   - Select the course and module
   - Create quiz with 5 questions
   - Set pass score to 70%
4. **Create assessment** (via Quiz & Assessment Manager):
   - Select the same module
   - Create graded assessment
   - Set duration to 30 minutes

### Updating Existing Content
1. **Navigate to Quiz & Assessment Manager**
2. **Select course and module**
3. **View existing content**
4. **Delete old quiz/assessment** (if needed)
5. **Create new quiz/assessment** with updated content

## Student Experience

### Taking a Quiz
1. Student completes all lessons in the module
2. Student clicks on the quiz
3. Student answers all questions
4. System auto-grades the quiz
5. If pass score is met:
   - Student earns 5 tokens
   - Quiz marked as complete
   - Progress updated

### Taking an Assessment
1. Student completes lessons and quiz
2. Student clicks on the assessment
3. Student reads instructions
4. Student submits their response
5. Educator grades the assessment manually
6. If passed:
   - Student earns 15 tokens
   - Assessment marked as complete
   - Progress updated

## Token Rewards Summary

| Action | Tokens Earned |
|--------|---------------|
| Pass Quiz | 5 tokens |
| Pass Assessment | 15 tokens |
| Complete Module | 10 tokens |
| Complete Course | 10 tokens |

## Troubleshooting

### "Quiz already exists for this module"
- Each module can only have one quiz
- Delete the existing quiz before creating a new one
- Or edit the quiz in the course upload page

### Module not showing in dropdown
- Ensure you've selected a course first
- Verify the course has modules
- Refresh the page if needed

### Quiz not saving
- Ensure quiz title is filled in
- Add at least one question
- Mark a correct answer for each question
- Check for error messages

### Assessment not saving
- Ensure assessment title is filled in
- Add description/instructions
- Check for error messages

## API Endpoints Used

### Quiz Endpoints
- `POST /api/courses/modules/{module_id}/quiz/create/` - Create quiz
- `DELETE /api/courses/quizzes/{quiz_id}/` - Delete quiz

### Assessment Endpoints
- `POST /api/courses/{course_id}/assessments/create/` - Create assessment
- `DELETE /api/courses/assessments/{assessment_id}/` - Delete assessment

### Data Endpoints
- `GET /api/courses/my/courses/` - Load educator's courses
- `GET /api/courses/{course_id}/content/` - Load modules and existing quizzes/assessments

## Future Enhancements

Planned features:
- [ ] Edit existing quizzes
- [ ] Edit existing assessments
- [ ] Duplicate quiz to another module
- [ ] Import questions from CSV
- [ ] Question bank/library
- [ ] Different question types (True/False, Fill-in-the-blank)
- [ ] Quiz analytics (pass rates, average scores)
- [ ] Assessment grading interface
- [ ] Bulk operations

## Support

For issues or questions:
- Check this guide first
- Review error messages carefully
- Contact support if problems persist

---

**Version**: 2.0.0  
**Last Updated**: 2026-03-23  
**Status**: ✅ Fully Functional

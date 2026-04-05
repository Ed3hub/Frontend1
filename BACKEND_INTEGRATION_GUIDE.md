# Backend Integration Guide - Course Upload with Modules, Lessons, Quizzes & Assessments

## Overview
The course upload system now fully integrates with the Django backend to create comprehensive courses with modules, lessons, quizzes, and assessments.

## Backend API Endpoints

### Course Management
- `POST /api/courses/create/` - Create new course with modules
- `PATCH /api/courses/{course_id}/update/` - Update course and modules
- `GET /api/courses/{course_id}/content/` - Get course modules structure
- `GET /api/courses/my/courses/` - List educator's courses

### Module Management (Individual)
- `POST /api/courses/{course_id}/modules/create/` - Create single module
- `PATCH /api/courses/modules/{module_id}/` - Update module
- `DELETE /api/courses/modules/{module_id}/` - Delete module

### Lesson Management
- `POST /api/courses/modules/{module_id}/lessons/create/` - Create lesson
- `PATCH /api/courses/lessons/{lesson_id}/` - Update lesson
- `DELETE /api/courses/lessons/{lesson_id}/` - Delete lesson

### Quiz Management
- `POST /api/courses/modules/{module_id}/quiz/create/` - Create quiz with questions
- `PATCH /api/courses/quizzes/{quiz_id}/` - Update quiz
- `DELETE /api/courses/quizzes/{quiz_id}/` - Delete quiz

### Assessment Management
- `POST /api/courses/{course_id}/assessments/create/` - Create assessment
- `PATCH /api/courses/assessments/{assessment_id}/` - Update assessment
- `DELETE /api/courses/assessments/{assessment_id}/` - Delete assessment

## Data Flow

### Creating a Course with Modules

When an educator saves a course, the frontend sends:

```javascript
const formData = new FormData();
formData.append('title', 'Introduction to DAOs');
formData.append('description', 'Learn about DAOs...');
formData.append('skill_level', 'beginner');
// ... other course fields

// Modules with nested structure
formData.append('modules', JSON.stringify([
  {
    id: '1234567890',
    title: 'Module 1: DAO Basics',
    description: 'Introduction to DAOs',
    lessons: [
      {
        id: '1234567891',
        title: 'What is a DAO?',
        type: 'video',
        videoUrl: 'https://youtube.com/watch?v=...',
        duration: '15 min'
      },
      {
        id: '1234567892',
        title: 'DAO Governance',
        type: 'text',
        content: 'DAOs use token-based voting...'
      }
    ],
    quizzes: [
      {
        id: '1234567893',
        question: 'What is the primary purpose of a DAO?',
        type: 'mcq',
        options: ['A) Centralize control', 'B) Decentralize governance', 'C) Speed up transactions', 'D) Store data'],
        correctAnswer: 'B) Decentralize governance'
      }
    ],
    assessments: [
      {
        id: '1234567894',
        question: 'Design a governance flow for a DAO',
        type: 'practical',
        expectedAnswer: 'Should include proposal creation, voting mechanism, execution...'
      }
    ]
  }
]));

formData.append('thumbnail', thumbnailFile);
```

### Backend Processing

The backend (`CourseCreateView` and `CourseUpdateView`) processes this data:

1. **Validates course data** using `CourseWriteSerializer`
2. **Creates the course** with instructor and basic info
3. **Parses modules JSON** from the request
4. **Creates modules** in order with:
   - Module title and order
   - Reward tokens (default: 10)
5. **Creates lessons** for each module:
   - Maps frontend types to backend types (video→video, text→reading, document→reading)
   - Parses duration strings ("15 min" → 15)
   - Stores video URLs or text content
6. **Creates quizzes** with questions and choices:
   - One quiz per module (if quizzes exist)
   - Multiple questions per quiz
   - Multiple choices per question
   - Marks correct answers
7. **Creates assessments**:
   - Linked to both course and module
   - Stores question as title
   - Stores expected answer as description

## Database Models

### Course
```python
- title, description, thumbnail
- skill_level, price, is_free, is_published
- duration_weeks, estimated_hours, hours_per_week
- tools_used, ideal_for, what_included, what_you_learn
- completion_tokens (fixed at 10)
```

### Module
```python
- course (ForeignKey)
- title, order
- reward_tokens (default: 10)
```

### Lesson
```python
- module (ForeignKey)
- title, lesson_type (video/reading/quiz/assignment)
- order, duration_minutes
- video_url, content, transcript
- is_free_preview
```

### Quiz
```python
- module (OneToOneField) or lesson (OneToOneField)
- title, pass_score (default: 70%)
- reward_tokens (default: 5)
```

### Question
```python
- quiz (ForeignKey)
- text, order
```

### Choice
```python
- question (ForeignKey)
- text, is_correct
```

### Assessment
```python
- course (ForeignKey)
- module (ForeignKey, optional)
- title, description
- assessment_type (graded/practice)
- duration_minutes, due_date
- reward_tokens (default: 15)
```

## Frontend-Backend Type Mapping

### Lesson Types
| Frontend | Backend |
|----------|---------|
| video | video |
| text | reading |
| document | reading |

### Quiz Types
| Frontend | Backend Implementation |
|----------|----------------------|
| mcq | Question with 4 choices |
| true_false | Question with 2 choices (True/False) |
| fill_blank | Question with 1 choice (correct answer) |

### Assessment Types
| Frontend | Backend |
|----------|---------|
| practical | graded |
| short_answer | graded |
| matching | graded |

## Loading Existing Modules (Edit Mode)

When editing a course, the frontend:

1. Calls `GET /api/courses/{course_id}/content/`
2. Receives modules with nested lessons, quizzes, assessments
3. Transforms backend format to frontend format:
   - Converts IDs to strings
   - Maps lesson types back to frontend types
   - Reconstructs quiz structure from questions/choices
   - Extracts assessment data

## Token Rewards System

### Automatic Token Awards
- **Module Completion**: 10 tokens (configurable per module)
- **Quiz Pass**: 5 tokens (configurable per quiz)
- **Assessment Pass**: 15 tokens (configurable per assessment)
- **Course Completion**: 10 tokens (fixed, set in course.completion_tokens)

### Token Flow
1. Learner completes module/quiz/assessment
2. Backend creates `TokenTransaction` record
3. Transaction marked as `is_claimed=False`
4. Learner claims tokens via `/api/courses/wallet/claim/{transaction_id}/`
5. Tokens added to learner's `TokenWallet.balance`

## Testing the Integration

### 1. Create a Test Course
```bash
# Login as educator
# Navigate to Upload Courses page
# Fill in course details
# Add at least one module with:
  - 2 lessons (1 video, 1 text)
  - 1 quiz with 2 questions
  - 1 assessment
# Save course
```

### 2. Verify in Backend
```bash
cd Backend
python manage.py shell

from courses.models import Course, Module, Lesson, Quiz, Assessment
course = Course.objects.last()
print(f"Course: {course.title}")
print(f"Modules: {course.modules.count()}")
for module in course.modules.all():
    print(f"  - {module.title}")
    print(f"    Lessons: {module.lessons.count()}")
    print(f"    Quiz: {hasattr(module, 'quiz')}")
    print(f"    Assessments: {module.assessments.count()}")
```

### 3. Edit the Course
```bash
# Click edit on the course
# Verify modules load correctly
# Add/edit/delete modules
# Save changes
# Verify in backend again
```

## Common Issues & Solutions

### Issue: Modules not saving
**Solution**: Check browser console for API errors. Ensure `modules` is being sent as JSON string in FormData.

### Issue: Quizzes not appearing
**Solution**: Verify quiz data structure includes `question`, `type`, `options`, and `correctAnswer` fields.

### Issue: Duration not parsing
**Solution**: Ensure duration format is "{number} min" (e.g., "15 min", "30 min").

### Issue: Edit mode not loading modules
**Solution**: Check that course ID is correct and `/content/` endpoint is accessible.

## Next Steps

1. **File Upload**: Implement actual file upload for video/document lessons
2. **Quiz Grading**: Add learner quiz submission and auto-grading
3. **Assessment Submission**: Create assessment submission and manual grading system
4. **Progress Tracking**: Implement lesson/module completion tracking
5. **Certificate Generation**: Auto-generate certificates on course completion
6. **NFT Integration**: Mint NFT certificates on blockchain

## API Response Examples

### Course Content Response
```json
{
  "modules": [
    {
      "id": 1,
      "title": "Module 1: DAO Basics",
      "order": 1,
      "reward_tokens": 10,
      "lessons": [
        {
          "id": 1,
          "title": "What is a DAO?",
          "lesson_type": "video",
          "order": 1,
          "duration_minutes": 15,
          "video_url": "https://youtube.com/...",
          "content": "",
          "quiz": null
        }
      ],
      "assessments": [
        {
          "id": 1,
          "title": "Design a governance flow",
          "description": "Expected: proposal creation, voting...",
          "assessment_type": "graded",
          "duration_minutes": 20
        }
      ]
    }
  ],
  "assessments": []
}
```

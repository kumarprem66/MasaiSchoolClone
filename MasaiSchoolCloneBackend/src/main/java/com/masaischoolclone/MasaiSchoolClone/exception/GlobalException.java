package com.masaischoolclone.MasaiSchoolClone.exception;

import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalException{

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> methodArgumentException(MethodArgumentNotValidException e){

        return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<String> noHandlerFound(NoHandlerFoundException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(AnnouncementException.class)
    public ResponseEntity<String> announcementException(AnnouncementException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(AssignmentException.class)
    public ResponseEntity<String> assignmentException(AssignmentException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CategoryException.class)
    public ResponseEntity<String> categoryException(CategoryException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CourseException.class)
    public ResponseEntity<String> courseException(CourseException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DepartmentException.class)
    public ResponseEntity<String> departmentException(DepartmentException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InstructorException.class)
    public ResponseEntity<String> instructorException(InstructorException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(LectureException.class)
    public ResponseEntity<String> lectureException(LectureException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(StudentException.class)
    public ResponseEntity<String> studentException(StudentException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SubmissionException.class)
    public ResponseEntity<String> submissionException(SubmissionException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<String> emailException(EmailException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> generalException(RuntimeException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }




}

package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface DepartmentRepo extends JpaRepository<Department,Integer>, PagingAndSortingRepository<Department,Integer> {


    @Query("from Department")
    List<Department> getAllDepartment();

    Department findByName(String name);



}

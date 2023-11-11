package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DepartmentRepo extends JpaRepository<Department,Integer>, PagingAndSortingRepository<Department,Integer> {


    @Query("from Department")
    Page<Department> getAllDepartment(Pageable pageable);

    Department findByName(String name);



}

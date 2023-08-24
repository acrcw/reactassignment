import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  IconButton,
  styled,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

interface Department {
  department: string;
  sub_departments: string[];
}

interface DepartmentHierarchyProps {
  departments: Department[];
}

const DepartmentHierarchy: React.FC<DepartmentHierarchyProps> = ({ departments }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggle = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const handleDepartmentToggle = (department: Department) => {
    const newSelectedDepartments = selectedDepartments.includes(department.department)
      ? selectedDepartments.filter((name) => name !== department.department)
      : [...selectedDepartments, department.department];

    if (newSelectedDepartments.includes(department.department)) {
      // Select all sub-departments
      department.sub_departments.forEach((subDepartment) => {
        if (!newSelectedDepartments.includes(subDepartment)) {
          newSelectedDepartments.push(subDepartment);
        }
      });
    } else {
      // Deselect all sub-departments
      department.sub_departments.forEach((subDepartment) => {
        const subDepartmentIndex = newSelectedDepartments.indexOf(subDepartment);
        if (subDepartmentIndex !== -1) {
          newSelectedDepartments.splice(subDepartmentIndex, 1);
        }
      });
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  const allSubDepartmentsSelected = (department: Department): boolean => {
    return department.sub_departments.every((subDepartment) =>
      selectedDepartments.includes(subDepartment)
    );
  };

  const renderDepartment = (department: Department, index: number) => (
    <div key={department.department}>
      <StyledListItem button onClick={() => handleToggle(index)}>
        <Checkbox
          edge="start"
          checked={selectedDepartments.includes(department.department) || allSubDepartmentsSelected(department)}
          onClick={(e) => e.stopPropagation()}
          onChange={() => handleDepartmentToggle(department)}
        />
        <ListItemText primary={department.department} />
        <IconButton size="small" onClick={() => handleToggle(index)}>
          {openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </StyledListItem>
      <Collapse in={openIndexes.includes(index)} timeout="auto">
        <List component="div" disablePadding>
          {department.sub_departments.map((subDepartment, subIndex) =>
            renderSubDepartment(subDepartment, subIndex)
          )}
        </List>
      </Collapse>
    </div>
  );

  const renderSubDepartment = (subDepartment: string, subIndex: number) => (
    <div key={subIndex}>
      <StyledListItem button className={StyledListItem} onClick={(e) => e.stopPropagation()}>
        <Checkbox
          edge="start"
          checked={selectedDepartments.includes(subDepartment)}
          onChange={() => handleSubDepartmentToggle(subDepartment)}
        />
        <ListItemText primary={subDepartment} />
      </StyledListItem>
    </div>
  );

  const handleSubDepartmentToggle = (subDepartment: string) => {
    const newSelectedDepartments = selectedDepartments.includes(subDepartment)
      ? selectedDepartments.filter((name) => name !== subDepartment)
      : [...selectedDepartments, subDepartment];

    setSelectedDepartments(newSelectedDepartments);
  };

  return (
    <List>
      {departments.map((department, index) => renderDepartment(department, index))}
    </List>
  );
};

export default DepartmentHierarchy;

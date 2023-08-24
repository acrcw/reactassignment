import React from 'react';
import { List, ListItem, ListItemText, Collapse, makeStyles, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: theme.spacing(2),
  },
}));

interface Department {
  id: number;
  name: string;
  subDepartments: Department[];
}

interface DepartmentTreeProps {
  departments: Department[];
}

const DepartmentTree: React.FC<DepartmentTreeProps> = ({ departments }) => {
  const classes = useStyles();
  const [openIndexes, setOpenIndexes] = React.useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const renderDepartment = (department: Department, index: number) => (
    <div key={department.id}>
      <ListItem button className={classes.listItem} onClick={() => handleToggle(index)}>
        <ListItemText primary={department.name} />
        <IconButton size="small" onClick={() => handleToggle(index)}>
          {openIndexes.includes(index) ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={openIndexes.includes(index)} timeout="auto">
        <List component="div" disablePadding>
          {department.subDepartments.map((subDepartment, subIndex) =>
            renderDepartment(subDepartment, subIndex)
          )}
        </List>
      </Collapse>
    </div>
  );

  return (
    <List>
      {departments.map((department, index) => renderDepartment(department, index))}
    </List>
  );
};

export default DepartmentTree;

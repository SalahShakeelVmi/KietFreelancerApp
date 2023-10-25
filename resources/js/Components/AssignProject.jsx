import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { v4 as uuidv4 } from "uuid";
import { Head, Link,router } from '@inertiajs/react'
import axios from "axios";
import TaskCard from "./AssignTaskCard";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  overflow: "auto",
}));

const TaskList = styled("div")(() => ({
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  background: "#d7dce8",
  minWidth: "341px",
  borderRadius: "20px",
  padding: "15px 15px",
  marginRight: "45px",
}));

const TaskColumnStyles = styled("div")(() => ({
  margin: "8px",
  display: "flex",
  width: "100%",
  minHeight: "80vh",
}));
const Title = styled("span")(() => ({
  fontWeight: "bold",
  color: "#333333",
  fontSize: 16,
  marginBottom: "1.5px",
}));


const AssignProject = ({getProjects,user}) => {
  const [columns, setColumns] = useState(
    {

      [uuidv4()]: {
        title: 'Projects',
        items: getProjects
        .filter(getProjects => getProjects.status === 'Projects')
        .map((item, index) => ({ ...item, position: index })),
      },
      [uuidv4()]: {
        title: 'Assigned',
        items: getProjects
        .filter(getProjects => getProjects.status === 'Assigned')
        .map((item, index) => ({ ...item, position: index })),
      },
    }
  );

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // Get the source and destination columns
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    // Get the dragged item
    const item = sourceColumn.items[source.index];
    // Update the item's status
    item.Status = destColumn.title;
    // Update the state locally to provide a smooth UI update
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceColumn.items.filter((_, index) => index !== source.index),
      },
      [destination.droppableId]: {
        ...destColumn,
        items: [...destColumn.items, item],
      },
    });
  
   // Send an AJAX request to update the item's status on the server
    axios.put(`/api/project-users/store`, { 
      project_id: item.id,
      user_id: user.id,
      position: destColumn.title
    })
      .then(response => {
       
        console.log(response);
      })
      .catch(error => {
   
        console.error(error);
      });
    
  };
  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, columns, setColumns);
      }}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={index} droppableId={columnId}>
                {(provided, snapshot ) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={12} key={index}>
                          <Title>{column.title}</Title>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          key={index}
                          display="flex"
                          alignContent="flex-end"
                          justifyContent="flex-end"
                        >
                         
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider />

                    {column.items.map((item, index) => (
                     
                      <TaskCard key={index} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default AssignProject;
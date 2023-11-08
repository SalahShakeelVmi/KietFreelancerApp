import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import WorkspaceTaskCard from "./WorkspaceTaskCard";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
}));

const TaskList = styled("div")(() => ({
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  background: "#d7dce8",
  minWidth: "341px",
  borderRadius: "5px",
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
const FilterIcon = styled("span")(() => ({
  marginBottom: "1.5px",
  color: "text.secondary",
}));

const Workspace = ({ project }) => {
  // Convert the object to an array using Object.values()
  const projectArray = Object.values([project]);

  const initialColumns = {
    [uuidv4()]: {
      title: '',
      items: projectArray.filter(item => item.freelancer_status === null).map((item, index) => ({ ...item, position: index })),
    },
    [uuidv4()]: {
      title: 'progress',
      items: projectArray.filter(item => item.freelancer_status === 'progress').map((item, index) => ({ ...item, position: index })),
    },
    [uuidv4()]: {
      title: 'pending',
      items: projectArray.filter(item => item.freelancer_status === 'pending').map((item, index) => ({ ...item, position: index })),
    },
    [uuidv4()]: {
      title: 'completed',
      items: projectArray.filter(item => item.freelancer_status === 'completed').map((item, index) => ({ ...item, position: index })),
    },
  };

  const [columns, setColumns] = useState(initialColumns);
  

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    // Get the source and destination columns
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
  
    // Get the dragged item
    const item = sourceColumn.items[source.index];
  
    // Check if the item's title is the same as the destination column's title
    if (sourceColumn.title === destColumn.title) {
      // No need to move the item within the same column
      return;
    }
  
    // Update the item's status
    item.Status = destColumn.title;
  
    // Update the state locally to provide a smooth UI update
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
  
      updatedColumns[source.droppableId] = {
        ...sourceColumn,
        items: sourceColumn.items.filter((_, index) => index !== source.index),
      };
  
      updatedColumns[destination.droppableId] = {
        ...destColumn,
        items: [...destColumn.items, item],
      };
  
      return updatedColumns;
    });
  
    // Handle API calls based on the destination column title
  
      axios.put(`/api/workspace/update/${item.id}`, {
       freelancer_status: destColumn.title
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
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
                      <WorkspaceTaskCard  key={index} item={item} index={index}/>
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

export default Workspace;
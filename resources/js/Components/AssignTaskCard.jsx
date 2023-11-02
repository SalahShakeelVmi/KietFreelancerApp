import * as React from "react";
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import {
  Box,
  Card,
  CardHeader,
  Grid,
  Chip,
  Badge,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { styled } from "@mui/system";


const Title = styled("div")(() => ({
  marginBottom: "1.5px",
  color: "#666666",
}));

const SubTitle = styled("span")(() => ({
  marginBottom: "1.5px",
  color: "#333333",
  fontWeight: "bold",
}));
const Heading = styled("div")(() => ({
  color: "#333333",
  fontWeight: "bold",
  fontSize: "16px",
}));


const AssignTaskCard = ({ item, index }) => {

  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card sx={{ minWidth: 275, m: "8px 1px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#2C5CC9" }} aria-label="recipe">
                  {item.project_title.charAt(0).toUpperCase()}
                </Avatar>
              }
           
            />
            <CardContent sx={{ p: "0 16px" }}>
              <Heading className="text-left">{item.project_title}</Heading>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {item.task}
              </Typography>
              <Box sx={{ flexGrow: 1, color: "#333333", m: "20px 0 0" }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Title>Amount</Title>
                    <SubTitle>
                    <NumericFormat
  value={ item.price}
  thousandsGroupStyle="lakh"
  thousandSeparator=","
  displayType="text"

/>
                    </SubTitle>

                  </Grid>
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Title>Category</Title>
                    <SubTitle>{item.projectcategory.category_name}</SubTitle>

                  </Grid>
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Title>Due Date</Title>
                    <SubTitle>
                      
                      {   moment(new Date(item.delivery_datetime)).format('MMM D YY, h:mm:ss a')}</SubTitle>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
           
          </Card>
        </div>
      )}
    </Draggable>
  );
};
export default AssignTaskCard;
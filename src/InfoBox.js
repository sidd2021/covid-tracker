import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Map.css";
const InfoBox = ({ title, cases, isRed, total, ...props }) => {
  return (
    <div>
      {console.log(props.isRed)}
      <Card onClick={props.onClick}>
        <CardContent
          className={`infoBox ${props.active && "info--active"} ${
            props.active && isRed && "info--red"
          }`}
        >
          <Typography color="textSecondary" className="infoBox__title">
            {title}
          </Typography>
          <h2 className="infoBox__cases">{cases}</h2>
          <Typography color="textSecondary" className="infoBox__total">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default InfoBox;

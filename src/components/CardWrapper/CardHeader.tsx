import React, { FC, ReactNode } from "react";
import MuiCardHeader from "@mui/material/CardHeader";
import { isArray } from "lodash";
import { isDefined, isDefinedAndNotEmpty } from "../../utils/helper";
import { Stack } from "@mui/material";

interface CardHeaderProps {
  collapsable?: boolean;
  actions?: any;
  expandButton?: ReactNode;
  [rest: string]: any;
}

const CardHeader: FC<CardHeaderProps> = ({
  collapsable,
  expandButton,
  actions,
  ...rest
}) => {
  const actionWidgets = [];

  if (isDefined(actions)) {
    if (isArray(actions)) {
      actions.forEach((action) => {
        actionWidgets.push(action);
      });
    } else {
      actionWidgets.push(actions);
    }
  }

  if (isDefined(expandButton) && typeof expandButton !== "boolean") {
    actionWidgets.push(expandButton);
  }
  //console.log("actionWidgets", actionWidgets);

  return (
    <MuiCardHeader
      titleTypographyProps={{
        fontSize: "15px",
        fontWeight: 500,
        fontStretch: "normal",
        letterSpacing: "0.15px",
        lineHeight: 1.6,
        variant: "subtitle1",
        //color: "#3a4b95",
        color: "text.modalCardTitle",
        //flexGrow: 0,
      }}
      {...(isDefinedAndNotEmpty(actionWidgets)
        ? {
            action: (
              <Stack direction="row" spacing={1} alignItems="center">
                {actionWidgets}
              </Stack>
            ),
          }
        : {})}
      {...rest}
    />
  );
};

export default CardHeader;

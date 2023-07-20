import React, { ComponentType, FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActions,
  Collapse,
  Divider,
  Grid,
  Icon,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import MuiCardHeader from "@mui/material/CardHeader";
import MuiCardContent from "@mui/material/CardContent";
import {
  AddOutlined as AddOutlinedIcon,
  RemoveOutlined as RemoveOutlinedIcon,
} from "@mui/icons-material";

import RenderText from "../../utils/RenderText";
import { isDefined } from "../../utils/helper";
import CardHeader from "./CardHeader";

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: 0,
}));

interface CardWrapperProps {
  title?: string | object;
  actions?: any;
  children: any;
  container?: boolean;
  stack?: boolean;
  //elevation?: number;
  icon?: ComponentType;
  hasBorder?: boolean;
  collapsable?: boolean;
  isExpanded?: boolean;
  footerActions?: ReactNode[];
  cardProps?: any;
  contentProps?: any;
  stackProps?: any;
}

const CardWrapper: FC<CardWrapperProps> = ({
  title,
  actions,
  container = false,
  stack = false,
  footerActions,
  icon,
  hasBorder = false,
  collapsable = false,
  isExpanded = true,
  cardProps,
  contentProps,
  stackProps,
  children,
}) => {



  return (
    <Card
      {...cardProps}
      sx={{
        //backgroundColor: alpha("#f3f7ff", 0.5), // theme.palette.background.modalCardBackground,
        //backgroundColor: "#f3f7ff",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "none",
        border: hasBorder ? "1px solid rgba(168, 188, 197, 0.4)" : undefined,
        //p: 2,
        p: 2,
        ...cardProps?.sx,
      }}
    >
      {isDefined(title) ? (
        <CardHeader
          title={<RenderText value={title || ""} />}
          actions={actions}
          avatar={icon && <Icon component={icon} />}
          sx={{
            p: 0,
            pb: 1,
            //pl: 2, pr: 2
          }}
        />
      ) : undefined}
      <Collapse timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            p: 0,
            //pl: 2, pr: 2
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          {container ? (
            <Grid
              container
              spacing={2}
              alignItems="center"
              alignContent="center"
            >
              {children}
            </Grid>
          ) : stack ? (
            <Stack spacing={2}>{children}</Stack>
          ) : (
            children
          )}
        </CardContent>
        {isDefined(footerActions) ? (
          <>
            {/*<Divider />*/}
            <CardActions
            //sx={{ bgcolor: alpha("#f3f7ff", 1) }}
            >
              <Stack
                sx={{ width: "100%" }}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                //justifyContent="space-between"
                {...stackProps}
              >
                {footerActions}
              </Stack>
            </CardActions>
          </>
        ) : undefined}
      </Collapse>
    </Card>
  );
};

export default CardWrapper;

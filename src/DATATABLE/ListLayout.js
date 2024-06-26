import React from "react";
import RightViewLayout from "./RighViewLayout";
import GlobalFilter from "./GlobalFilter";
import { Box, Grid } from "@mui/material";
import { ReactComponent as AddIcon } from "../assets/images/Plus_icon.svg";
import { ReactComponent as FilterIcon } from "../assets/images/icon_filter.svg";
import { ReactComponent as RefreshIcon } from "../assets/images/Refresh_Icon .svg";
import LocationMenu from "./LocationMenu";

export default function ListLayout(props) {
  return (
    <RightViewLayout {...props} type="table" >
      <Grid>
        {props.globalFilterProps && <GlobalFilter {...props.globalFilterProps} />}
        {props.locationMenuProps && (
          <LocationMenu {...props.locationMenuProps}>
            {props.toolbarProps && (
              <Box display={"flex"} width={"100%"} flexDirection={"row-reverse"} my={2} mr={0}>
                {props.toolbarProps.add && (
                  <Box item pl={2} onClick={() => props.toolbarProps.onAdd()}>
                    <AddIcon width={"35"} height={"35"} className="pointer" id="ListLayout-add" />
                  </Box>
                )}
                {props.toolbarProps.filter && (
                  <Box item pl={2} onClick={() => props.toolbarProps.onFilter()}>
                    <FilterIcon width={"35"} height={"35"} className="pointer" id="ListLayout-filter" />
                  </Box>
                )}
                {props.toolbarProps.refresh && (
                  <Box item pl={2} onClick={() => props.toolbarProps.onRefresh()}>
                    <RefreshIcon width={"35"} height={"35"} className="pointer" id="ListLayout-refresh" />
                  </Box>
                )}
              </Box>
            )}
          </LocationMenu>
        )}
        {!props.locationMenuProps && props.toolbarProps && (
          <Grid display={"flex"} width={"100%"} flexDirection={"row-reverse"} >
            {props.toolbarProps.add && (
              <Box item pl={2} onClick={() => props.toolbarProps.onAdd()}>
                <AddIcon width={"35"} height={"35"} className="pointer" id="ListLayout-add-1" />
              </Box>
            )}
            {props.toolbarProps.filter && (
              <Box item pl={2} onClick={() => props.toolbarProps.onFilter()}>
                <FilterIcon width={"35"} height={"35"} className="pointer" id="ListLayout-filter-1" />
              </Box>
            )}
            {props.toolbarProps.refresh && (
              <Box item pl={2} onClick={() => props.toolbarProps.onRefresh()}>
                <RefreshIcon width={"35"} height={"35"} className="pointer" id="ListLayout-refresh-1" />
              </Box>
            )}
          </Grid>
        )}

        {props.children}
      </Grid>

    </RightViewLayout>
  );
}

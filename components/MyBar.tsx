"use client";
import React, { useState } from "react";
import {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    Drawer,
    Box,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import Image from "next/image";
export const MyBar = ({}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <IconButton
                        size={"large"}
                        edge={"start"}
                        color={"inherit"}
                        aria-label={"logo"}
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <Image
                            src="/images/JacobsGameIcon_2.png"
                            alt="Jacob`s Game Logo"
                            // className="dark:invert"
                            width={60}
                            height={60}
                            priority
                        />
                    </IconButton>
                </Link>
                <Typography
                    variant={"h6"}
                    component={"div"}
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    Jacob`s Game
                </Typography>
                <Stack direction={"row"} spacing={100}>
                    <Button color={"inherit"}>Features</Button>
                    <Button color={"inherit"}>Pricing</Button>
                    <Button color={"inherit"}>About</Button>
                    <Button
                        color={"inherit"}
                        id="resources-button"
                        onClick={handleClick}
                        aria-controls={open ? "resources-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Resources
                    </Button>
                    <Button color={"inherit"}>Login</Button>
                    <Button color={"inherit"}>
                        <Link href="/game/simple">Simple</Link>
                    </Button>
                    <Button color={"inherit"}>
                        <Link href="/game/carshader">Car Shader</Link>
                    </Button>
                </Stack>
                <Menu
                    id="resources-menu"
                    open={open}
                    anchorEl={anchorEl}
                    MenuListProps={{
                        "aria-labelledby": "resources-button",
                    }}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={handleClose}>Blog</MenuItem>
                    <MenuItem onClick={handleClose}>Podcast</MenuItem>
                </Menu>
                <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                >
                    {/* <Box>
                        <Typography variant="h6" component={"div"}>
                            Side Panel
                        </Typography>
                    </Box> */}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

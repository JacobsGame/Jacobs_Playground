"use client";
import {
    Stack,
    Avatar,
    IconButton,
    IconButtonProps,
    Typography,
    Collapse,
    colors,
} from "@mui/material";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@mui/material/Card"), {
    ssr: false,
});

const CardHeader = dynamic(() => import("@mui/material/CardHeader"), {
    ssr: false,
});

const CardContent = dynamic(() => import("@mui/material/CardContent"), {
    ssr: false,
});

// const CardMedia = dynamic(() => import("@mui/material/CardMedia"), {
//     ssr: false,
// });

const CardActions = dynamic(() => import("@mui/material/CardActions"), {
    ssr: false,
});

import CardMedia from "@mui/material/CardMedia";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/system";
import { useState } from "react";

interface CardData {
    avatar: string;
    title: string;
    time: number;
    photoUrl: string;
    content: string;
    detail: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: (theme.transitions as any).create("transform", {
        duration: (theme.transitions as any).duration.shortest,
    }),
}));

const MyCard = ({
    avatar,
    title,
    time,
    photoUrl,
    content,
    detail,
}: CardData) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandedClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card
            sx={{
                maxWidth: 345,
                m: 3,
            }}
        >
            <CardHeader
                avatar={<Avatar>{avatar}</Avatar>}
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={`${time}`}
            />
            <CardMedia component={"img"} height={50} image={photoUrl} />
            <CardContent>
                <Typography variant="body2" color={"text.secondary"}>
                    {content}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Stack
                    direction={"row"}
                    spacing={10}
                    bgcolor={colors.cyan[200]}
                >
                    <IconButton
                        aria-label="add to favorites"
                        sx={{
                            mx: "10px",
                        }}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </Stack>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandedClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout={"auto"} unmountOnExit>
                <CardContent>
                    <Typography paragraph>Methods</Typography>
                    <Typography paragraph>{detail}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export type { CardData };
export { MyCard };

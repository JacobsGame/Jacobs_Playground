"use client";
import {
    Stack,
    Grid,
    Box,
    Avatar,
    IconButton,
    IconButtonProps,
    Typography,
    Theme,
    Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

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

const MockData: CardData[] = [
    {
        avatar: "R",
        title: "Shrimp and Chorizo Paella",
        time: Date.now(),
        photoUrl: "https://picsum.photos/200",
        content: `This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like.`,
        detail: `Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        large plate and set aside, leaving chicken and chorizo in the pan. Add
        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        stirring often until thickened and fragrant, about 10 minutes. Add
        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`,
    },
    {
        avatar: "B",
        title: "Shrimp and Chorizo Paella",
        time: Date.now(),
        photoUrl: "https://picsum.photos/200",
        content: `This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like.`,
        detail: `Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        large plate and set aside, leaving chicken and chorizo in the pan. Add
        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        stirring often until thickened and fragrant, about 10 minutes. Add
        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`,
    },
    {
        avatar: "C",
        title: "Shrimp and Chorizo Paella",
        time: Date.now(),
        photoUrl: "https://picsum.photos/200",
        content: `This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like.`,
        detail: `Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        large plate and set aside, leaving chicken and chorizo in the pan. Add
        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        stirring often until thickened and fragrant, about 10 minutes. Add
        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`,
    },
];

export default function Home() {
    return (
        <Grid m={5} container>
            {MockData.map((data, index) => (
                <Grid key={`grid_${index}`} item xs={6}>
                    <CustomCard key={index} {...data} />
                </Grid>
            ))}
        </Grid>
    );
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

const CustomCard = ({
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
                m: 10,
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
            <CardMedia component={"img"} height={194} image={photoUrl} />
            <CardContent>
                <Typography variant="body2" color={"text.secondary"}>
                    {content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
                <ExpandMore expand={expanded} onClick={handleExpandedClick}>
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

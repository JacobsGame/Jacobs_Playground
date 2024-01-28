"use client";
import { CardData, MyCard } from "@/components/MyCard";
import { Grid, Stack, colors } from "@mui/material";
import { Suspense } from "react";
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
        <Grid container display={"flex"} my={10}>
            {MockData.map((data, index) => (
                <Grid key={`grid_${index}`} item xs>
                    <Stack display={"flex"} alignItems={"center"}>
                        <Suspense fallback={<div></div>}>
                            <MyCard key={index} {...data} />
                        </Suspense>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
}

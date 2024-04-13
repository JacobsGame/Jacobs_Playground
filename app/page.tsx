import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
    return (
        <Stack
            mt="10em"
            justifyContent={"center"}
            alignItems={"center"}
            // alignContent={"center"}
            width={"100vw"}
            style={{
                gap: "5em",
            }}
        >
            <Image
                src="/images/JacobsGameIcon_1.png"
                alt="Jacob`s Game Logo"
                // className="dark:invert"
                width={300}
                height={300}
                priority
            />
            <Typography variant="body1">My Name is Jacob</Typography>
        </Stack>
    );
}

// Card sample
// <Grid container display={"flex"} my={10}>
// {MockData.map((data, index) => (
//     <Grid key={`grid_${index}`} item xs>
//         <Stack display={"flex"} alignItems={"center"}>
//             <Suspense fallback={<div></div>}>
//                 <MyCard key={index} {...data} />
//             </Suspense>
//         </Stack>
//     </Grid>
// ))}
// </Grid>

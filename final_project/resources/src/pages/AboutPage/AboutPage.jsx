import { Footer, Header } from "@/components";
import classes from "./AboutPage.module.scss";

export const AboutPage = () => {
    return (
        <>
            <Header />

            <main className={classes.about}>
                <h1>AboutPage</h1>

                <a href="/">На главную</a>
            </main>

            <Footer />
        </>
    );
};

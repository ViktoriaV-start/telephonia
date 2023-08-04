import { Footer, Header } from "@/components";
import classes from "./HomePage.module.scss";
import { SendRequest } from "./components/SendRequest";
import { CityNumber } from "./components";
import { Tariffs } from "./components";
import { MainBlock } from "./components/MainBlock";
import { useEffect, useState } from "react";
import { useFetching } from "@/hooks/useFetching";
import { GetService } from "@/api/GetService";
import { CreateService } from "@/api/CreateService";
import { ChooseNumber } from "./components/ChooseNumber";
import { Carousel } from "./components/Carousel/Carousel";
import {
    checkAdminMethod,
    checkAdminRoute,
    createApplicationMethod,
    createApplicationRoute,
    dbErrorMessage,
    doubleOrderMessage, formError,
    initialAgentId,
    successSending,
} from "@/constants/adminConstants";

export const HomePage = () => {
    const [admin, setAdmin] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [agentId, setAgentId] = useState(initialAgentId);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const {
        fetching: checkUser,
        isLoading: loading,
        error: checkError,
    } = useFetching(async () => {
        const authedUser = await GetService.getData(
            checkAdminRoute,
            checkAdminMethod
        );
        if (authedUser.status) {
            setAdmin(authedUser.name + " " + authedUser.surname);
            setAdminId(authedUser.id);
            setAgentId(authedUser.agentId);
        }
    });

    const {
        fetching: fetchCreate,
        isLoading: isLoading,
        error: error,
    } = useFetching(async (
        order,
        client_name,
        client_phone,
        description=null,
    ) => {
        const result = await CreateService.addTuple(
            createApplicationRoute,
            createApplicationMethod,
            {
                order,
                client_name,
                description,
                client_phone: +client_phone.slice(1),
                status: "в работе",
                partner_id: agentId,
                user_id: adminId,
            }
        );

        if (result.status === "ok") {
            console.log("Successfully created!");
            setModalContent(successSending);
            setShowModal(true);
            document.body.style.overflow = "hidden";
        } else {
            if (result.errors) {
                setModalContent(formError);
                setShowModal(true);
                document.body.style.overflow = "hidden";
            }
            if (result.message) {
                result.message.includes("Duplicate entry")
                    ? setModalContent(doubleOrderMessage)
                    : setModalContent(dbErrorMessage);
                setShowModal(true);
                document.body.style.overflow = "hidden";
            }
        }
    });

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        if(!showModal) {
            setModalContent('');
        }
    }, [showModal]);


    return (
        <>
            <Header admin={admin} />

            <main className={classes.wrap}>
                <MainBlock />
                <CityNumber />
                <Tariffs />
                <ChooseNumber />
                <SendRequest fetchCreate={fetchCreate}
                             adminId={adminId}
                             showModal={showModal}
                             setShowModal={setShowModal}
                             modalContent={modalContent}
                             setModalContent={setModalContent}
                />
                <Carousel />
            </main>

            <Footer />
        </>
    );
};

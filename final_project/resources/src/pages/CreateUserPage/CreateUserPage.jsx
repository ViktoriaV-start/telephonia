import classes from "./CreateUserPage.module.scss";
import { useEffect, useState } from "react";
import { useFetching } from "@/hooks/useFetching";
import { CreateService } from "@/api/CreateService";
import { CreateForm } from "./components/CreateForm";
import { Title } from "@/pages/CreateUserPage/components/Title";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminFooter} from "@/components/AdminFooter";
import { GetService } from "@/api/GetService";
import {
    managersRoute,
    createUserMethod,
    linkToManagers,
    initialAgentId,
    initialStatus,
    doubleEmailMessage,
    dbErrorMessage,
    checkAdminRoute,
    checkAdminMethod,
    linkToLogin,
} from "@/constants/adminConstants";


const applicationsLink = 'admin__link';
const managersLink = 'admin__link';

export const CreateUserPage = () => {

    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('manager');
    const [agentId, setAgentId] = useState(initialAgentId);
    const [admin, setAdmin] = useState(null);
    const [errors, setErrors] = useState({});
    const [adminRole, setAdminRole] = useState(null);
    const [adminId, setAdminId] = useState(null);

    const {
        fetching: fetchCreate,
        isLoading: loading,
        error: error,
    } = useFetching(async () => {
        const result = await CreateService.addTuple(
                            managersRoute,
                            createUserMethod,
                    {
                                surname: surname,
                                first_name: firstName,
                                second_name: secondName,
                                email: email,
                                password: password,
                                phone: phone,
                                role: role,
                                status: initialStatus,
                                agent_id: agentId
                            });

        if(result.status === 'ok') {
            window.location.href = linkToManagers;
        } else {
            if(result.errors) {
                setErrors(result.errors);
            }
            if(result.message) {
                result.message.includes('Duplicate entry') ? setErrors({'email': doubleEmailMessage}) : setErrors({'email': dbErrorMessage});
            }
        }
    });

    const {
        fetching: checkUser,
        isLoading: isLoading,
        error: checkError,
    } = useFetching(async () => {
        const authedUser = await GetService.getData(checkAdminRoute, checkAdminMethod);
        if(authedUser.status) {
            setAdmin(authedUser.name + ' ' + authedUser.surname);
            setAdminId(authedUser.id);
            setAdminRole(authedUser.role);
        } else {
            window.location.href = linkToLogin;
        }
    });

    const handleChangeValue = (e, field) => {
        switch (field) {
            case 'surname': setSurname(e.target.value);
            break;
            case 'first_name': setFirstName(e.target.value);
            break;
            case 'second_name': setSecondName(e.target.value);
            break;
            case 'email': setEmail(e.target.value);
            break;
            case 'password': setPassword(e.target.value);
            break;
            case 'phone': setPhone(e.target.value);
            break;
            case 'agent_id': setAgentId(e.target.value);
            break;
            case 'role': setRole(e.target.value);
            break;
        }
    }

    const addUser = (e) => {
       e.preventDefault();
       setErrors({});
       fetchCreate();
    }

    const clearForm = (e) => {
        setSurname('');
        setFirstName('');
        setSecondName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setErrors({});
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <>
            <div className={classes.content}>
                <AdminHeader admin={admin} adminRole={adminRole} applicationsLink={applicationsLink} managersLink={managersLink}/>
                <Title />
                <CreateForm addUser={addUser}
                            surname={surname}
                            firstName={firstName}
                            secondName={secondName}
                            email={email}
                            phone={phone}
                            password={password}
                            role={role}
                            agentId={agentId}
                            handleChangeValue={handleChangeValue}
                            clearForm={clearForm}
                            errors={errors}
                />
            </div>
            <AdminFooter />
        </>
    )
}

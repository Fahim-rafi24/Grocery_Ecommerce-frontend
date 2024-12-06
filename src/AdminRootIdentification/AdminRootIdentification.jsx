// navigate
import { useNavigate } from "react-router-dom";
// context
import { useContext, useEffect } from "react"
import { UserContext } from "../ContextStorage/UserContext"


const AdminRootIdentification = ({ children }) => {
    // user context call
    const { user } = useContext(UserContext);

    // navigate
    const navigate = useNavigate();

    // effect
    useEffect(() => {
        if (user && !user.isAdmin) {
            navigate("/");
        }
        if (user === undefined) {
            navigate("/");
        }
    }, [user]);

    if (user === null) {
        return <div>Loading...</div>;
    }

    if (user?.isAdmin) {
        return <>{children}</>;
    }

    return null;
};
export { AdminRootIdentification }
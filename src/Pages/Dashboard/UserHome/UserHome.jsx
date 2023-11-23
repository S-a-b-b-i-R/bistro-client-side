import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div className="p-10">
            <h2 className="text-3xl">
                <span>
                    Hi, Welcome
                    {user?.displayName ? `, ${user.displayName}` : "Back"}
                </span>
            </h2>
        </div>
    );
};

export default UserHome;

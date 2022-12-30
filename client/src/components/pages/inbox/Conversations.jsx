const Conversations = () => {
    return (
        <div className="card mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header d-flex align-items-center">
                <img
                    src="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
                    className="rounded-circle"
                    alt="User Image"
                    width="50"
                    height="50"
                />
                <div className="ml-3">
                    <h5 className="card-title mb-0">User Name</h5>
                    <small className="text-muted">1 hour ago</small>
                </div>
            </div>
        </div>
    );
};
export default Conversations;
